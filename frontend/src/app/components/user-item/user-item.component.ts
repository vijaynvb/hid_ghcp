import { Component, EventEmitter, Input, Output } from '@angular/core';

interface UserItemView {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  role?: string;
}

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() user: UserItemView | null = null;
  @Output() deleted = new EventEmitter<string>();

  /** Emits delete event for parent container. */
  remove(): void {
    if (!this.user?.id) {
      return;
    }
    this.deleted.emit(this.user.id);
  }

  /** Generates placeholder initials for avatars. */
  get initials(): string {
    const source = this.user?.displayName || this.user?.username || '';
    return source.slice(0, 2).toUpperCase();
  }
}
