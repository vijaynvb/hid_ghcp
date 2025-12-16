import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-page',
  template: `
    <mat-card>
      <mat-toolbar>Tasks</mat-toolbar>
      <app-task-form (created)="reload()"></app-task-form>
      <mat-list>
        <mat-list-item *ngFor="let t of tasks">
          <app-task-item [task]="t" (edit)="onEdit($event)" (remove)="onDelete($event)"></app-task-item>
        </mat-list-item>
      </mat-list>
    </mat-card>
  `
})
export class TasksPageComponent implements OnInit {
  tasks: any[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void { this.reload(); }
  reload() { this.taskService.listTyped$().subscribe((res:any) => this.tasks = res?.content || res || []); }
  onEdit(payload:any) { const id = payload.id || payload._id; if (!id) return; this.taskService.update(id, payload).subscribe(() => this.reload()); }
  onDelete(id:string) { if (!confirm('Delete task?')) return; this.taskService.delete(id).subscribe(() => this.reload()); }
}
