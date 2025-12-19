import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';

interface TaskViewModel {
  id: string;
  title: string;
  description?: string;
  dueDate?: string | Date;
  completed?: boolean;
  priority?: string;
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasks: TaskViewModel[] = [];
  filtered: TaskViewModel[] = [];
  completedTasks: TaskViewModel[] = [];
  activeFilter: 'today' | 'pending' | 'overdue' = 'today';
  showForm = false;
  showCompleted = false;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly taskService: TaskService) {}

  /** Loads tasks on component initialisation. */
  ngOnInit(): void {
    this.reload();
  }

  /** Cleans up subscriptions to avoid memory leaks. */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Refreshes task lists from the backend service. */
  reload(): void {
    this.taskService
      .listTyped$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        const entries: TaskViewModel[] = res?.content || res || [];
        this.tasks = entries;
        this.partitionTasks();
      });
  }

  /** Handles successful task creation. */
  onCreated(): void {
    this.showForm = false;
    this.reload();
  }

  /** Updates the active filter and recomputes the filtered list. */
  onFilterChange(filter: 'today' | 'pending' | 'overdue'): void {
    this.activeFilter = filter;
    this.partitionTasks();
  }

  /** Requests task deletion after user confirmation. */
  onDelete(id: string): void {
    if (!id) {
      return;
    }
    if (!confirm('Delete task?')) {
      return;
    }
    this.taskService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.reload());
  }

  /** Applies updates to a task via the backend. */
  onEdit(payload: TaskViewModel): void {
    const id = payload?.id;
    if (!id) {
      return;
    }
    this.taskService.update(id, payload).pipe(takeUntil(this.destroy$)).subscribe(() => this.reload());
  }

  /** Toggles task completion state and persists it. */
  onToggleCompletion(task: TaskViewModel, completed: boolean): void {
    const id = task?.id;
    if (!id) {
      return;
    }
    this.taskService
      .update(id, { ...task, completed })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.reload());
  }

  private partitionTasks(): void {
    if (!this.tasks) {
      this.filtered = [];
      this.completedTasks = [];
      return;
    }
    const now = new Date();
    this.completedTasks = this.tasks.filter(t => !!t.completed);
    const pending = this.tasks.filter(t => !t.completed);

    if (this.activeFilter === 'today') {
      this.filtered = pending.filter(t => {
        if (!t.dueDate) {
          return true;
        }
        const due = new Date(t.dueDate);
        return due.toDateString() === now.toDateString();
      });
    } else if (this.activeFilter === 'pending') {
      this.filtered = pending.filter(t => {
        if (!t.dueDate) {
          return true;
        }
        return new Date(t.dueDate) > now;
      });
    } else {
      this.filtered = pending.filter(t => {
        if (!t.dueDate) {
          return false;
        }
        return new Date(t.dueDate) < now;
      });
    }
  }
}
