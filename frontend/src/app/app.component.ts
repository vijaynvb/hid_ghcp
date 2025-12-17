import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <header class="hero">
      <div class="hero-inner">
        <h1 class="title">Todo App</h1>
        <div class="nav-row">
          <nav class="main-nav">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/tasks" routerLinkActive="active">Tasks</a>
            <a routerLink="/users" routerLinkActive="active">Users</a>
          </nav>
          <div class="auth">
            <ng-container *ngIf="(auth.user$ | async) as user; else showLogin">
              <span class="welcome">{{user.displayName || user.username || 'Welcome'}}</span>
              <button mat-stroked-button color="primary" class="logout" (click)="logout()">Logout</button>
            </ng-container>
            <ng-template #showLogin>
              <a routerLink="/login" class="login-link">Login</a>
            </ng-template>
          </div>
        </div>
      </div>
    </header>

    <app-loading></app-loading>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <app-toast></app-toast>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
