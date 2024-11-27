import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IRouteResponse {
  routes: [
    {
      legs: [
        {
          startLocation: { latLng: ILocation };
          endLocation: { latLng: ILocation };
        },
      ];
      distanceMeters: number;
      duration: string;
    },
  ];
}

@Injectable()
export class GoogleMapsRouting {
  private readonly API_KEY = process.env.GOOGLE_API_KEY;
  private readonly ENDPOINT = 'https://routes.googleapis.com/directions/v2:computeRoutes';

  constructor(private readonly httpService: HttpService) {}

  computeRoute(origin: string, destination: string): Promise<axios.AxiosResponse<IRouteResponse>> {
    const request = this.buildPayload(origin, destination);
    const headers = this.headers();

    return this.httpService.axiosRef.post(this.ENDPOINT, request, { headers });
  }

  private buildPayload(origin: string, destination: string) {
    return {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: 'DRIVE',
    };
  }

  private headers() {
    return {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': this.API_KEY,
      'X-Goog-FieldMask': this.fieldMask(),
    };
  }

  private fieldMask() {
    return [
      'routes.duration',
      'routes.distanceMeters',
      'routes.legs.startLocation',
      'routes.legs.endLocation',
    ].join(',');
  }
}
