import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'tm_token';
  private _token = new BehaviorSubject<string | null>(localStorage.getItem(this.tokenKey));
  readonly token$ = this._token.asObservable();

  constructor(private api: ApiClientService) {}

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this._token.next(token);
  }

  get token() { return this._token.value; }

  // simple login against /auth/login; expects { accessToken }
  login(username: string, password: string): Observable<any> {
    return this.api.post('/auth/login', { username, password }).pipe(
      tap((res: any) => { if (res?.accessToken) this.setToken(res.accessToken); })
    );
  }

  logout() { this.setToken(null); }
}
