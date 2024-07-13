import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _httpClient: HttpClient) {}

  private baseApi = isDevMode()
    ? 'http://localhost:3000'
    : 'https://route-task-mauve.vercel.app/api/json-server';

  inputValueSubject = new BehaviorSubject<number>(0);
  resultOfSearch = new BehaviorSubject<number>(0);
  getCustomers(): Observable<any> {
    return this._httpClient.get(`${this.baseApi}/customers`);
  }
  getTransactions(): Observable<any> {
    return this._httpClient.get(`${this.baseApi}/transactions`);
  }
}
