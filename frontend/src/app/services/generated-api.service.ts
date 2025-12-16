import { Injectable } from '@angular/core';
import { ApiClient } from '../api-generated';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeneratedApiService {
  private client: ApiClient;

  constructor() {
    // configure base URL for generated client from environment
    this.client = new ApiClient({ BASE: environment.apiBase });
  }

  // Users - return Promises (original) and also Observable wrappers
  listUsers(params?: any): Promise<any> { return this.client.users.getUsers(params); }
  listUsers$ (params?: any): Observable<any> { return from(this.listUsers(params)); }
  createUser(dto: any): Promise<any> { return this.client.users.postUsers({ requestBody: dto }); }
  createUser$(dto: any): Observable<any> { return from(this.createUser(dto)); }

  // Tasks
  listTasks(params?: any): Promise<any> { return this.client.tasks.getTasks(params); }
  listTasks$ (params?: any): Observable<any> { return from(this.listTasks(params)); }
  createTask(dto: any): Promise<any> { return this.client.tasks.postTasks({ requestBody: dto }); }
  createTask$(dto: any): Observable<any> { return from(this.createTask(dto)); }
}
