import { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { GoogleMapsRouting, ILocation, IRouteResponse } from 'src/clients/google/routes-api';
import { KM, NO_RIDES_FOUND } from '@constants';
import { Ride } from './ride.entity';
import { Repository } from 'typeorm';
import { RideConfirmDto } from './ride-confirm.dto';
import { Numeric } from '@utils';

@Injectable()
export class RidesService {
  private origin: ILocation;
  private destination: ILocation;
  private duration: string;
  private distance: number;
  private routeResponse: IRouteResponse;

  constructor(
    @Inject(GoogleMapsRouting)
    private readonly googleMapsRouting: GoogleMapsRouting,

    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
  ) {}

  async list(customerId: string, driverId?: number) {
    const rides = await this.ridesRepository.find({
      relations: { partnerDriver: true },
      where: {
        customerId,
        partnerDriver: { id: driverId?.toString() },
      },
    });

    if (!rides.length) this.throwRidesNotFound(customerId, driverId);

    return { customer_id: customerId, rides };
  }

  async confirm(confirmDto: RideConfirmDto) {
    const newRide = this.ridesRepository.create(confirmDto);
    const driver = new PartnerDriver();
    driver.id = confirmDto.driver.id.toString();
    newRide.partnerDriver = driver;

    await this.ridesRepository.save(newRide);
  }

  getRideWith(availableDrivers: PartnerDriver[]) {
    return {
      origin: this.origin,
      destination: this.destination,
      distance: this.distance,
      duration: this.duration,
      options: this.getDriversDto(availableDrivers),
      routeResponse: this.routeResponse,
    };
  }

  async computeRoute(origin: string, destination: string) {
    const response = await this.googleMapsRouting.computeRoute(origin, destination);
    const waypoints = response.data.routes[0].legs[0];

    this.origin = waypoints.startLocation.latLng;
    this.destination = waypoints.endLocation.latLng;
    this.duration = response.data.routes[0].duration;
    this.distance = response.data.routes[0].distanceMeters;
    this.routeResponse = response.data;

    return this.distance;
  }

  private getDriversDto(drivers: PartnerDriver[]) {
    return drivers.map((driver) => {
      const rideValue = driver.priceRate * (this.distance / KM);
      const driverDto = instanceToPlain(driver);
      return { ...driverDto, value: Numeric.toMoney(rideValue) };
    });
  }

  private throwRidesNotFound(customer_id: string, driver_id?: number) {
    throw new NotFoundException({
      error_code: NO_RIDES_FOUND,
      error_description: `customer_id=${customer_id};driver_id=${driver_id}`,
    });
  }
}
