import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from './home-list/home-list.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Loc8rDataService {
  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api';

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    // const lng: number = 126.941387;
    // const lat: number = 37.473339;
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return firstValueFrom(this.http.get<Location[]>(url))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}