import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { map, finalize } from 'rxjs/operators';
import { GeneratedApiService } from './generated-api.service';
import { LoadingService } from './loading.service';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private api: ApiClientService, private gen: GeneratedApiService, private loading: LoadingService, private notify: NotificationService) {}
  // list uses the ApiClientService (observable) and maps Page -> content
  list(params?: any) { return this.api.get('/tasks', params).pipe(map((res:any) => res?.content || res || [])); }
  create(payload:any) { this.loading.show(); return this.api.post('/tasks', payload).pipe(finalize(()=>this.loading.hide())); }
  get(id:string) { return this.api.get(`/tasks/${id}`); }
  update(id:string, payload:any) { this.loading.show(); return this.api.put(`/tasks/${id}`, payload).pipe(finalize(()=>this.loading.hide())); }
  delete(id:string) { this.loading.show(); return this.api.delete(`/tasks/${id}`).pipe(finalize(()=>this.loading.hide())); }

  // typed wrappers using generated client (Observables)
  listTyped$(params?: any) { this.loading.show(); return this.gen.listTasks$(params).pipe(finalize(()=>this.loading.hide())); }
  createTyped$(payload:any) { this.loading.show(); return this.gen.createTask$(payload).pipe(finalize(()=>this.loading.hide())); }
}
