import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseApi: string;

  constructor(private _httpClient: HttpClient) {
    this.baseApi =
      typeof window === 'undefined'
        ? 'http://localhost:3000/api/json-server' // Server-side URL
        : '/api/json-server'; // Client-side URL
  }

  inputValueSubject = new BehaviorSubject<number>(0);
  resultOfSearch = new BehaviorSubject<number>(0);
  getCustomers(): Observable<any> {
    return this._httpClient.get(`${this.baseApi}/customers`);
  }
  getTransactions(): Observable<any> {
    return this._httpClient.get(`${this.baseApi}/transactions`);
  }
}
