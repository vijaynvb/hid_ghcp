import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-card class="dashboard-card">
      <mat-toolbar color="primary">Admin Dashboard</mat-toolbar>
      <div class="columns">
        <section class="col">
          <h3>Tasks</h3>
          <mat-card>
            <app-task-form (created)="reloadTasks()"></app-task-form>
          </mat-card>
          <mat-list>
            <mat-list-item *ngFor="let t of tasks">
              <app-task-item [task]="t" (edit)="onTaskEdit($event)" (remove)="onTaskDelete($event)"></app-task-item>
            </mat-list-item>
          </mat-list>
        </section>

        <section class="col">
          <h3>Users</h3>
          <mat-card>
            <form [formGroup]="userForm" (ngSubmit)="createUser()" class="user-form">
              <mat-form-field appearance="fill"><mat-label>Username</mat-label><input matInput formControlName="username" /></mat-form-field>
              <mat-form-field appearance="fill"><mat-label>Display name</mat-label><input matInput formControlName="displayName" /></mat-form-field>
              <mat-form-field appearance="fill"><mat-label>Email</mat-label><input matInput formControlName="email" /></mat-form-field>
              <mat-form-field appearance="fill"><mat-label>Role</mat-label><mat-select formControlName="role"><mat-option value="Employee">Employee</mat-option><mat-option value="Manager">Manager</mat-option><mat-option value="Admin">Admin</mat-option><mat-option value="Executive">Executive</mat-option></mat-select></mat-form-field>
              <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid">Create User</button>
            </form>
          </mat-card>
          <mat-list>
            <mat-list-item *ngFor="let u of users">
              <app-user-item [user]="u" (deleted)="onUserDelete($event)"></app-user-item>
            </mat-list-item>
          </mat-list>
        </section>
      </div>
    </mat-card>
  `,
  styles: [`.dashboard-card { padding: 8px } .columns { display:flex; gap:24px } .col { flex:1 } .user-form { display:flex; flex-direction:column; gap:8px }`]
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  users: any[] = [];
  userForm: FormGroup;

  constructor(private taskService: TaskService, private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({ username: ['', Validators.required], displayName: ['', Validators.required], email: ['', [Validators.required, Validators.email]], role: ['Employee', Validators.required] });
  }

  ngOnInit(): void { this.reloadTasks(); this.reloadUsers(); }

  reloadTasks() { this.taskService.list().subscribe((res:any) => this.tasks = res || []); }
  reloadUsers() { this.userService.list().subscribe((res:any) => this.users = res || []); }

  onTaskEdit(payload:any) {
    const id = payload.id || payload._id; if (!id) return; this.taskService.update(id, payload).subscribe(() => this.reloadTasks());
  }

  onTaskDelete(id:string) { if (!confirm('Delete task?')) return; this.taskService.delete(id).subscribe(() => this.reloadTasks()); }

  createUser() {
    if (this.userForm.invalid) return;
    this.userService.create(this.userForm.value).subscribe(() => { this.userForm.reset({ role: 'Employee' }); this.reloadUsers(); });
  }

  onUserDelete(id:string) { if (!confirm('Delete user?')) return; this.userService.delete(id).subscribe(() => this.reloadUsers()); }
}
