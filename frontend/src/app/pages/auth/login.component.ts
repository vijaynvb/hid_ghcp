import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-toolbar>Login</mat-toolbar>
      <form [formGroup]="form" (ngSubmit)="submit()" class="login-form">
        <mat-form-field appearance="fill"><mat-label>Username</mat-label><input matInput formControlName="username" /></mat-form-field>
        <mat-form-field appearance="fill"><mat-label>Password</mat-label><input matInput type="password" formControlName="password" /></mat-form-field>
        <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Sign in</button>
          <span *ngIf="error" style="color:#b00020">{{error}}</span>
        </div>
      </form>
    </mat-card>
  `
})
export class LoginComponent {
  error = '';
  form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.error = err?.error?.message || 'Login failed'
    });
  }
}
