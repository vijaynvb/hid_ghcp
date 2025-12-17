import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-item',
  template: `
    <div class="user-item card">
      <div class="user-left">
        <div class="avatar">{{(user.displayName || user.username)?.charAt(0)?.toUpperCase()}}</div>
      </div>
      <div class="user-middle">
        <div class="name">{{user.displayName || user.username}}</div>
        <div class="email">{{user.email}}</div>
      </div>
      <div class="user-right">
        <button mat-icon-button color="warn" (click)="remove()"><mat-icon>delete</mat-icon></button>
      </div>
    </div>
  `
})
export class UserItemComponent {
  @Input() user: any = {};
  @Output() deleted = new EventEmitter<string>();

  remove() { this.deleted.emit(this.user.id); }
}
