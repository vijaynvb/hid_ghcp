import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a> | <a routerLink="/tasks">Tasks</a> | <a routerLink="/tasks-generated">Generated Tasks</a> | <a routerLink="/users">Users</a>
    </nav>
    <app-loading></app-loading>
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  `
})
export class AppComponent {}
