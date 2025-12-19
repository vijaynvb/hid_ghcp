import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() created = new EventEmitter<any>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
    priority: ['Medium', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly taskService: TaskService) {}

  /** Sends the form payload to the backend and emits the created task. */
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.taskService.create(this.form.value).subscribe(res => {
      this.created.emit(res);
      this.form.reset({ title: '', description: '', dueDate: '', priority: 'Medium' });
    });
  }
}
