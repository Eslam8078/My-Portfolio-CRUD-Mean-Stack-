import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHome } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/api/home';

  constructor(private http: HttpClient) {}

  getHome() {
    return this.http.get<IHome>(this.apiUrl);
  }

  updateHome(data: FormData) {
    return this.http.put<IHome>(this.apiUrl, data);
  }
}