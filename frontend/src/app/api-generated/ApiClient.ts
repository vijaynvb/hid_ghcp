/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AdminService } from './services/AdminService';
import { AuthService } from './services/AuthService';
import { CommentsService } from './services/CommentsService';
import { ReportsService } from './services/ReportsService';
import { TasksService } from './services/TasksService';
import { UsersService } from './services/UsersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
    public readonly admin: AdminService;
    public readonly auth: AuthService;
    public readonly comments: CommentsService;
    public readonly reports: ReportsService;
    public readonly tasks: TasksService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.example.com',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.admin = new AdminService(this.request);
        this.auth = new AuthService(this.request);
        this.comments = new CommentsService(this.request);
        this.reports = new ReportsService(this.request);
        this.tasks = new TasksService(this.request);
        this.users = new UsersService(this.request);
    }
}

