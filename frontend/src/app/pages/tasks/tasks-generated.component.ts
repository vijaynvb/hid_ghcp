import { Component, OnInit } from '@angular/core';
import { GeneratedApiService } from '../../services/generated-api.service';

@Component({
  selector: 'app-tasks-generated',
  template: `
    <h2>Tasks (generated client)</h2>
    <button (click)="reload()">Reload</button>
    <ul>
      <li *ngFor="let t of tasks">{{t.title || t.id}} - {{t.status}}</li>
    </ul>
    <form (ngSubmit)="create()">
      <input [(ngModel)]="title" name="title" placeholder="Title" required />
      <button type="submit">Create</button>
    </form>
  `
})
export class TasksGeneratedComponent implements OnInit {
  tasks: any[] = [];
  title = '';
  constructor(private api: GeneratedApiService) {}
  ngOnInit(): void { this.reload(); }
  reload() {
    this.api.listTasks().then((res:any) => {
      // service returns Page or array depending on generation; handle both
      this.tasks = res?.content || res || [];
    }).catch(err => console.error(err));
  }
  create() {
    if (!this.title) return;
    this.api.createTask({ title: this.title }).then(() => { this.title = ''; this.reload(); }).catch(e=>console.error(e));
  }
}
