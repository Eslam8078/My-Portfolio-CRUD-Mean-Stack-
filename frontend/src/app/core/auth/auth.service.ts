import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthUser, LoginResponse } from "../models/auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/auth`;
  private readonly tokenKey = "portfolio_admin_token";
  readonly user = signal<AuthUser | null>(null);

  constructor(private readonly http: HttpClient) {
    this.restoreSession();
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.user.set(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private restoreSession(): void {
    if (!this.getToken()) return;
    this.http.get<AuthUser>(`${this.apiUrl}/me`).subscribe({
      next: user => this.user.set(user),
      error: () => this.logout()
    });
  }
}
