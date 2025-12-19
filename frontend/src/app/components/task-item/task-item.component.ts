import { Component, EventEmitter, Input, Output } from '@angular/core';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  dueDate?: string | Date;
  completed?: boolean;
  priority?: string;
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: TaskItem | null = null;
  @Output() edit = new EventEmitter<TaskItem>();
  @Output() remove = new EventEmitter<string>();
  @Output() toggleComplete = new EventEmitter<boolean>();

  /** Emits an edit request with the current task payload. */
  onEdit(): void {
    if (!this.task) {
      return;
    }
    this.edit.emit({ ...this.task });
  }

  /** Emits a delete request with the task identifier. */
  onDelete(): void {
    if (!this.task?.id) {
      return;
    }
    this.remove.emit(this.task.id);
  }

  /** Emits a toggle event when completion checkbox changes. */
  onToggle(completed: boolean): void {
    this.toggleComplete.emit(completed);
  }

  /** Returns a CSS class based on the current task priority. */
  priorityClass(): string {
    const p = (this.task?.priority || '').toLowerCase();
    if (p === 'high' || p === 'urgent' || p === 'critical') {
      return 'prio-high';
    }
    if (p === 'low') {
      return 'prio-low';
    }
    return 'prio-med';
  }
}
