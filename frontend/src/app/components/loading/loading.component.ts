import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="overlay" *ngIf="loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styles: [
    `.overlay { position: fixed; left:0; right:0; top:0; bottom:0; background: rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; z-index:9999 }
     .spinner { width:48px; height:48px; border-radius:50%; border:6px solid #ddd; border-top-color:#1976d2; animation:spin 1s linear infinite }
     @keyframes spin { to { transform: rotate(360deg) } }
    `
  ]
})
export class LoadingComponent {
  loading$ = this.loadingService.loading$;
  constructor(private loadingService: LoadingService) {}
}
