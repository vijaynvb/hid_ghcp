import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'tm_token';
  private _token = new BehaviorSubject<string | null>(localStorage.getItem(this.tokenKey));
  readonly token$ = this._token.asObservable();

  private _user = new BehaviorSubject<any | null>(null);
  readonly user$ = this._user.asObservable();

  constructor(private api: ApiClientService) {
    // try load profile if token exists
    if (this.token) { this.fetchProfile().subscribe(() => {}); }
  }

  /** Persists the access token and updates the reactive state. */
  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this._token.next(token);
  }

  /** Returns the current access token value. */
  get token(): string | null { return this._token.value; }

  /** Updates the in-memory representation of the authenticated user. */
  setUser(u: any | null): void { this._user.next(u); }

  /** Authenticates against the backend and hydrates the user profile. */
  login(username: string, password: string): Observable<any> {
    return this.api.post('/auth/login', { username, password }).pipe(
      tap((res: any) => { if (res?.accessToken) this.setToken(res.accessToken); }),
      switchMap(() => this.fetchProfile()),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  /** Clears authentication state and tokens. */
  logout(): void { this.setToken(null); this.setUser(null); }

  /** Retrieves the authenticated user's profile from the API. */
  fetchProfile(): Observable<any> {
    // try common endpoints; prefer /auth/me then /users/me
    return this.api.get('/auth/me').pipe(
      tap((u:any) => this.setUser(u)),
      catchError(_ => this.api.get('/users/me').pipe(tap((u:any)=>this.setUser(u)), catchError(__ => of(null))))
    );
  }
}
