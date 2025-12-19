import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

interface UserViewModel {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  role?: string;
}

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  users: UserViewModel[] = [];
  form = this.fb.group({
    username: ['', Validators.required],
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['Employee', Validators.required]
  });

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly userService: UserService, private readonly fb: FormBuilder) {}

  /** Loads initial data. */
  ngOnInit(): void {
    this.reload();
  }

  /** Tears down component subscriptions. */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Refreshes the list of users from backend. */
  reload(): void {
    this.userService
      .listTyped$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.users = res?.content || res || [];
      });
  }

  /** Submits the create-user form. */
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.userService
      .create(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.reset({ role: 'Employee' });
        this.reload();
      });
  }

  /** Deletes the selected user after confirmation. */
  deleteUser(id: string): void {
    if (!id) {
      return;
    }
    if (!confirm('Delete user?')) {
      return;
    }
    this.userService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.reload());
  }
}
