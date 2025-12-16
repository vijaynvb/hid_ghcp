import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { map, finalize } from 'rxjs/operators';
import { GeneratedApiService } from './generated-api.service';
import { LoadingService } from './loading.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiClientService, private gen: GeneratedApiService, private loading: LoadingService, private notify: NotificationService) {}
  // backend returns Page; map to content array when available
  list(params?: any) { return this.api.get('/users', params).pipe(map((res:any) => res?.content || res || [])); }
  create(payload:any) { this.loading.show(); return this.api.post('/users', payload).pipe(finalize(()=>this.loading.hide())); }
  delete(id:string) { this.loading.show(); return this.api.delete(`/users/${id}`).pipe(finalize(()=>this.loading.hide())); }
  get(id:string) { return this.api.get(`/users/${id}`); }

  // typed wrappers
  listTyped$(params?: any) { this.loading.show(); return this.gen.listUsers$(params).pipe(finalize(()=>this.loading.hide())); }
  createTyped$(payload:any) { this.loading.show(); return this.gen.createUser$(payload).pipe(finalize(()=>this.loading.hide())); }
}
