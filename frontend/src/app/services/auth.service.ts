import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this._token.next(token);
  }

  get token() { return this._token.value; }

  setUser(u: any|null){ this._user.next(u); }

  // simple login against /auth/login; expects { accessToken }
  login(username: string, password: string): Observable<any> {
    return this.api.post('/auth/login', { username, password }).pipe(
      tap((res: any) => { if (res?.accessToken) this.setToken(res.accessToken); }),
      switchMap(() => this.fetchProfile()),
      catchError(err => { return of(err); })
    );
  }

  logout() { this.setToken(null); this.setUser(null); }

  fetchProfile(): Observable<any> {
    // try common endpoints; prefer /auth/me then /users/me
    return this.api.get('/auth/me').pipe(
      tap((u:any) => this.setUser(u)),
      catchError(_ => this.api.get('/users/me').pipe(tap((u:any)=>this.setUser(u)), catchError(__ => of(null))))
    );
  }
}
