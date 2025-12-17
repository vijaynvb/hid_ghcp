import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  template: `
    <div class="task-item card">
      <div class="left">
        <mat-checkbox [checked]="task.completed"></mat-checkbox>
      </div>
      <div class="middle">
        <div class="title-row">
          <strong class="title">{{task.title}}</strong>
          <span class="meta"><mat-icon inline>schedule</mat-icon> {{task.dueDate ? (task.dueDate | date:'EEE MMM d yyyy') : ''}}</span>
        </div>
        <div class="sub">{{task.description || ''}}</div>
      </div>
      <div class="right">
        <button mat-icon-button color="primary" (click)="onEdit()" title="Edit"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button color="warn" (click)="onDelete()" title="Delete"><mat-icon>delete</mat-icon></button>
        <div class="priority-wrap">
          <span class="priority" [ngClass]="priorityClass()"></span>
        </div>
      </div>
    </div>
  `
})
export class TaskItemComponent {
  @Input() task: any = {};
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<string>();
  editing = false;
  editable: any = {};

  onEdit() {
    this.editing = true;
    this.editable = { ...this.task };
  }

  save() {
    this.edit.emit(this.editable);
    this.editing = false;
  }

  cancel() { this.editing = false; }

  onDelete() { this.remove.emit(this.task.id); }

  priorityClass() {
    const p = (this.task.priority || '').toLowerCase();
    if (p === 'high' || p === 'urgent') return 'prio-high';
    if (p === 'low') return 'prio-low';
    return 'prio-med';
  }
}
