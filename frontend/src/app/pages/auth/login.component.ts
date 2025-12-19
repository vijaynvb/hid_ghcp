import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = '';
  isSubmitting = false;
  private readonly returnUrl: string | null;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router, private readonly route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  /** Attempts to authenticate the user and routes to the dashboard on success. */
  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }
    const { username, password } = this.form.value;
    this.error = '';
    this.isSubmitting = true;
    this.auth
      .login(username, password)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const destination = this.returnUrl || '/dashboard';
          this.router.navigate([destination]);
        },
        error: err => {
          this.error = err?.error?.message || 'Login failed';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
