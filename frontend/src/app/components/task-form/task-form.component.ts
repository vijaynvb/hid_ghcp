import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="task-create">
      <mat-form-field appearance="fill" style="flex:1">
        <mat-label>New task</mat-label>
        <input matInput formControlName="title" placeholder="e.g. Draft project proposal" />
      </mat-form-field>
      <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">+ Add</button>
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
