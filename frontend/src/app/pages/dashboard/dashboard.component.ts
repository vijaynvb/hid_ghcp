import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

interface DashboardTask {
  id: string;
  title: string;
  dueDate?: string | Date;
  completed?: boolean;
  priority?: string;
}

interface DashboardUser {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  role?: string;
}

interface MetricCard {
  label: string;
  value: number;
  accent: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: DashboardTask[] = [];
  users: DashboardUser[] = [];
  userForm: FormGroup;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly taskService: TaskService, private readonly userService: UserService, private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['Employee', Validators.required]
    });
  }

  /** Initialises dashboard data. */
  ngOnInit(): void {
    this.reloadTasks();
    this.reloadUsers();
  }

  /** Completes subscriptions on destroy. */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Reloads tasks from backend. */
  reloadTasks(): void {
    this.taskService
      .listTyped$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.tasks = res?.content || res || [];
      });
  }

  /** Reloads users from backend. */
  reloadUsers(): void {
    this.userService
      .listTyped$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.users = res?.content || res || [];
      });
  }

  /** Handles inline task edits. */
  onTaskEdit(payload: DashboardTask): void {
    const id = payload?.id;
    if (!id) {
      return;
    }
    this.taskService.update(id, payload).pipe(takeUntil(this.destroy$)).subscribe(() => this.reloadTasks());
  }

  /** Deletes a task after user confirmation. */
  onTaskDelete(id: string): void {
    if (!id) {
      return;
    }
    if (!confirm('Delete task?')) {
      return;
    }
    this.taskService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.reloadTasks());
  }

  /** Toggles task completion from the dashboard spotlight list. */
  onTaskToggle(task: DashboardTask, completed: boolean): void {
    const id = task?.id;
    if (!id) {
      return;
    }
    this.taskService
      .update(id, { ...task, completed })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.reloadTasks());
  }

  /** Creates a user from the dashboard quick form. */
  createUser(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.userService
      .create(this.userForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userForm.reset({ role: 'Employee' });
        this.reloadUsers();
      });
  }

  /** Deletes a user after confirmation. */
  onUserDelete(id: string): void {
    if (!id) {
      return;
    }
    if (!confirm('Delete user?')) {
      return;
    }
    this.userService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.reloadUsers());
  }

  /** Derived metric summary used for the dashboard tiles. */
  get metrics(): MetricCard[] {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => !!t.completed).length;
    const overdue = this.tasks.filter(t => {
      if (t.completed || !t.dueDate) {
        return false;
      }
      return new Date(t.dueDate) < new Date();
    }).length;
    const activeUsers = this.users.length;
    return [
      { label: 'Open tasks', value: total - completed, accent: '#2f6f3b', description: 'Still in progress' },
      { label: 'Completed', value: completed, accent: '#3a7a56', description: 'Wrapped up this week' },
      { label: 'Overdue', value: overdue, accent: '#dc2626', description: 'Need attention' },
      { label: 'Active users', value: activeUsers, accent: '#f0b84e', description: 'Collaborators onboard' }
    ];
  }

  /** Convenience getter to show a short task preview. */
  get spotlightTasks(): DashboardTask[] {
    return this.tasks.filter(t => !t.completed).slice(0, 5);
  }
}
