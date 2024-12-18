import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
// import { Location } from './home-list/home-list.component';
import { environment } from '../environments/environment';
import { Location, Review } from './location';

@Injectable({
  providedIn: 'root',
})
export class Loc8rDataService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = environment.apiBaseUrl;

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return firstValueFrom(this.http.get<Location[]>(url)).catch(
      this.handleError
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return firstValueFrom(this.http.get<Location>(url)).catch(this.handleError);
  }

  public addReviewByLocationId(
    locationId: string,
    formData: Review
  ): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    return lastValueFrom(this.http.post(url, formData))
      .then((response) => response as any)
      .catch(this.handleError);
  }
}
