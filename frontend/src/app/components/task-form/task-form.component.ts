import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="title" placeholder="Title" />
      <div *ngIf="form.get('title')?.invalid && form.get('title')?.touched" class="error">Title is required</div>
      <button type="submit" [disabled]="form.invalid">Create</button>
    </form>
  `
})
export class TaskFormComponent {
  @Output() created = new EventEmitter<any>();
  form = this.fb.group({ title: ['', Validators.required], description: [''] });
  constructor(private fb: FormBuilder, private taskService: TaskService) {}
  submit() {
    if (this.form.valid) {
      this.taskService.create(this.form.value).subscribe(res => this.created.emit(res));
      this.form.reset();
    }
  }
}
