import { Injectable, PLATFORM_ID, computed, inject, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { environment } from "../../../environments/environment";
import {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
  SendLoginOtpRequest,
  SendLoginOtpResponse,
  SendRegistrationOtpRequest,
  SendRegistrationOtpResponse,
  VerifyLoginOtpRequest,
} from "../models/auth.models";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly baseUrl = `${environment.apiUrl}/api/auth`;

  private readonly _currentUser = signal<AuthUser | null>(this.loadUser());
  private readonly _token = signal<string | null>(
    this.isBrowser ? localStorage.getItem("auth_token") : null,
  );

  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = computed(() => !!this._currentUser());

  public login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, payload)
      .pipe(tap((res) => this.persistSession(res)));
  }

  public register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, payload)
      .pipe(tap((res) => this.persistSession(res)));
  }

  public sendLoginOtp(payload: SendLoginOtpRequest): Observable<SendLoginOtpResponse> {
    return this.http.post<SendLoginOtpResponse>(`${this.baseUrl}/send-otp`, payload);
  }

  public verifyLoginOtp(payload: VerifyLoginOtpRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/verify-otp`, payload)
      .pipe(tap((res) => this.persistSession(res)));
  }

  public sendRegistrationOtp(
    payload: SendRegistrationOtpRequest,
  ): Observable<SendRegistrationOtpResponse> {
    return this.http.post<SendRegistrationOtpResponse>(
      `${this.baseUrl}/send-registration-otp`,
      payload,
    );
  }

  public logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
    this._token.set(null);
    this._currentUser.set(null);
  }

  public getToken(): string | null {
    return this._token();
  }

  private persistSession(res: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem("auth_token", res.token);
      localStorage.setItem("auth_user", JSON.stringify(res.user));
    }
    this._token.set(res.token);
    this._currentUser.set(res.user);
  }

  private loadUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}
