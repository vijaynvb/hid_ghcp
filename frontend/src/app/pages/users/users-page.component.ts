import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  template: `
    <mat-card>
      <mat-toolbar>Users</mat-toolbar>
      <div class="users-top">
        <form [formGroup]="form" (ngSubmit)="submit()" class="user-form card">
          <mat-form-field appearance="fill"><mat-label>Username</mat-label><input matInput formControlName="username" /></mat-form-field>
          <mat-form-field appearance="fill"><mat-label>Display name</mat-label><input matInput formControlName="displayName" /></mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">Create User</button>
        </form>
      </div>
      <div class="users-list">
        <app-user-item *ngFor="let u of users" [user]="u" (deleted)="deleteUser($event)"></app-user-item>
      </div>
    </mat-card>
  `
})
export class UsersPageComponent implements OnInit {
  users: any[] = [];
  form = this.fb.group({ username: ['', Validators.required], displayName: ['', Validators.required] });
  constructor(private userService: UserService, private fb: FormBuilder) {}
  ngOnInit(): void { this.reload(); }
  reload() { this.userService.listTyped$().subscribe((res:any) => this.users = res?.content || res || []); }
  submit() { if (!this.form.valid) return; this.userService.create(this.form.value).subscribe(() => { this.form.reset(); this.reload(); }); }
  deleteUser(id:string) { if (!confirm('Delete user?')) return; this.userService.delete(id).subscribe(() => this.reload()); }
}
