import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type?: 'info'|'success'|'error';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _messages = new Subject<Notification>();
  messages$ = this._messages.asObservable();

  info(message: string) { this._messages.next({ message, type: 'info' }); }
  success(message: string) { this._messages.next({ message, type: 'success' }); }
  error(message: string) { this._messages.next({ message, type: 'error' }); }
}
