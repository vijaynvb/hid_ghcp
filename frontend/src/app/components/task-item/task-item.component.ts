import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  template: `
    <div class="task-item">
      <div *ngIf="!editing">
        <strong>{{task.title}}</strong>
        <div class="meta">{{task.status}} - {{task.assignee || ''}}</div>
      </div>
      <form *ngIf="editing" (ngSubmit)="save()" #f="ngForm">
        <input name="title" [(ngModel)]="editable.title" required />
        <input name="status" [(ngModel)]="editable.status" />
        <button type="submit" [disabled]="!f.form.valid">Save</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </form>
      <div class="actions">
        <button (click)="onEdit()">Edit</button>
        <button (click)="onDelete()">Delete</button>
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
}
