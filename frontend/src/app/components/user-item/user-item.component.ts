import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-item',
  template: `
    <div class="user-item">
      <span>{{user.displayName || user.username}}</span>
      <div class="actions">
        <button (click)="remove()">Delete</button>
      </div>
    </div>
  `
})
export class UserItemComponent {
  @Input() user: any = {};
  @Output() deleted = new EventEmitter<string>();

  remove() { this.deleted.emit(this.user.id); }
}
