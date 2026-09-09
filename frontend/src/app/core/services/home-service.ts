import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IHome } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly apiUrl = `${environment.apiBaseUrl}/home`;

  constructor(private readonly http: HttpClient) {}

  getHome() {
    return this.http.get<IHome>(this.apiUrl, { params: { t: Date.now() } });
  }

  updateHome(data: FormData) {
    return this.http.put<IHome>(this.apiUrl, data);
  }
}
