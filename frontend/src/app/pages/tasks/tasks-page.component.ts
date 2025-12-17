import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-page',
  template: `
    <mat-card>
      <mat-toolbar>
        <span>Tasks</span>
        <span class="spacer"></span>
        <button mat-flat-button color="primary" class="add-btn" (click)="showForm = !showForm">{{showForm ? 'Close' : 'Add Task'}}</button>
      </mat-toolbar>
      <div style="margin-top:12px">
        <app-task-form *ngIf="showForm" (created)="onCreated()"></app-task-form>
      </div>

      <mat-tab-group (selectedIndexChange)="onTabChange($event)" class="task-tabs">
        <mat-tab label="Today"></mat-tab>
        <mat-tab label="Pending"></mat-tab>
        <mat-tab label="Overdue"></mat-tab>
      </mat-tab-group>

      <div class="task-list">
        <app-task-item *ngFor="let t of filtered" [task]="t" (edit)="onEdit($event)" (remove)="onDelete($event)"></app-task-item>
      </div>

      <div class="completed-section">
        <h3 (click)="showCompleted = !showCompleted" style="cursor:pointer">Completed <span [innerHTML]="showCompleted ? '&#9650;' : '&#9660;'"></span></h3>
        <div *ngIf="showCompleted">
          <app-task-item *ngFor="let t of completed" [task]="t" (edit)="onEdit($event)" (remove)="onDelete($event)"></app-task-item>
        </div>
      </div>
    </mat-card>
  `
})
export class TasksPageComponent implements OnInit {
  tasks: any[] = [];
  filtered: any[] = [];
  activeTab = 0;
  showForm = false;
  showCompleted = false;
  constructor(private taskService: TaskService) {}
  ngOnInit(): void { this.reload(); }
  reload() { this.taskService.listTyped$().subscribe((res:any) => { this.tasks = res?.content || res || []; this.applyFilter(); }); }
  onEdit(payload:any) { const id = payload.id || payload._id; if (!id) return; this.taskService.update(id, payload).subscribe(() => this.reload()); }
  onDelete(id:string) { if (!confirm('Delete task?')) return; this.taskService.delete(id).subscribe(() => this.reload()); }

  onCreated(){ this.showForm = false; this.reload(); }

  ngDoCheck(): void { this.applyFilter(); }

  onTabChange(index:number){ this.activeTab = index; this.applyFilter(); }

  applyFilter(){
    if (!this.tasks) { this.filtered = []; return; }
    const now = new Date();
    if (this.activeTab === 0) {
      // Today: due date same day or no due date and not completed
      this.filtered = this.tasks.filter(t => {
        if (t.completed) return false;
        if (!t.dueDate) return true;
        const d = new Date(t.dueDate);
        return d.toDateString() === now.toDateString();
      });
    } else if (this.activeTab === 1) {
      // Pending: future dates
      this.filtered = this.tasks.filter(t => { if (t.completed) return false; if (!t.dueDate) return true; return new Date(t.dueDate) > now; });
    } else {
      // Overdue
      this.filtered = this.tasks.filter(t => { if (t.completed) return false; if (!t.dueDate) return false; return new Date(t.dueDate) < now; });
    }
  }

  get completed(){
    return this.tasks ? this.tasks.filter(t => t.completed) : [];
  }
}
