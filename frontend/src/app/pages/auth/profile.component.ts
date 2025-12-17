import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <mat-card>
      <mat-toolbar>Profile</mat-toolbar>
      <div style="padding:12px">
        <ng-container *ngIf="(auth.user$ | async) as user; else anon">
          <p><strong>Username:</strong> {{user.username || user.email}}</p>
          <p *ngIf="user.displayName"><strong>Name:</strong> {{user.displayName}}</p>
          <p *ngIf="user.email"><strong>Email:</strong> {{user.email}}</p>
          <p *ngIf="user.role"><strong>Role:</strong> {{user.role}}</p>
          <div style="margin-top:12px">
            <button mat-stroked-button color="primary" (click)="logout()">Logout</button>
          </div>
        </ng-container>
        <ng-template #anon>
          <p><strong>Status:</strong> Not logged in</p>
          <a routerLink="/login">Sign in</a>
        </ng-template>
      </div>
    </mat-card>
  `
})
export class ProfileComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
