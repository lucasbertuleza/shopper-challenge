import type { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import { Inject, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { GoogleMapsRouting, ILocation, IRouteResponse } from 'src/clients/google/routes-api';
import { KM } from 'src/constants/numeric';

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
  ) {}

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
      return { ...driverDto, value: rideValue };
    });
  }
}
