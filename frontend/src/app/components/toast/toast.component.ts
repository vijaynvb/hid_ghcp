import { Component, OnDestroy } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" *ngIf="current">
      <div [class]="'msg '+current.type">{{current.message}}</div>
    </div>
  `,
  styles: [
    `.toast { position: fixed; right: 16px; bottom: 16px; z-index: 10000 }
     .msg { padding: 10px 14px; border-radius:6px; color:#fff }
     .msg.info { background:#1976d2 }
     .msg.success { background:#388e3c }
     .msg.error { background:#d32f2f }
    `
  ]
})
export class ToastComponent implements OnDestroy {
  current: Notification | null = null;
  sub: Subscription;
  timerSub?: Subscription;
  constructor(private ns: NotificationService) {
    this.sub = this.ns.messages$.subscribe(m => { this.current = m; this.timerSub?.unsubscribe(); this.timerSub = timer(4000).subscribe(()=>this.current=null); });
  }
  ngOnDestroy() { this.sub.unsubscribe(); this.timerSub?.unsubscribe(); }
}
