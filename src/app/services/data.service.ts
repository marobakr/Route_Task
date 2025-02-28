import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _httpClient: HttpClient) {}

  private baseApi = 'https://db-server-amber.vercel.app';

  inputValueSubject = new BehaviorSubject<number>(0);
  resultOfSearch = new BehaviorSubject<number>(0);
  getCustomers(): Observable<any> {
    return this._httpClient.get(`${this.baseApi}/customers`);
  }
  getTransactions(): Observable<any> {
    return this._httpClient.get(`${this.baseApi}/transactions`);
  }
}
