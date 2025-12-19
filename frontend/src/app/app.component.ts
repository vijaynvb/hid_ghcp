import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public readonly auth: AuthService, private readonly router: Router) {}

  /** Logs the current user out and redirects to the login screen. */
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
