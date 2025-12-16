/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page } from '../models/Page';
import type { Priority } from '../models/Priority';
import type { Status } from '../models/Status';
import type { Task } from '../models/Task';
import type { TaskCreateRequest } from '../models/TaskCreateRequest';
import type { TaskUpdateRequest } from '../models/TaskUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TasksService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List tasks
     * Returns paginated list of tasks. Supports filtering by assignee, status, priority, tags, teamId, and overdue flag.
     * @returns Page Paginated tasks
     * @throws ApiError
     */
    public getTasks({
        page,
        size = 20,
        sort,
        assigneeId,
        status,
        priority,
        tag,
        teamId,
        overdue,
    }: {
        /**
         * Page index (0-based)
         */
        page?: number,
        /**
         * Page size
         */
        size?: number,
        /**
         * Sort order (field,asc|desc). e.g. createdAt,desc
         */
        sort?: string,
        assigneeId?: string,
        status?: Status,
        priority?: Priority,
        tag?: string,
        teamId?: string,
        overdue?: boolean,
    }): CancelablePromise<Page> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tasks',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'assigneeId': assigneeId,
                'status': status,
                'priority': priority,
                'tag': tag,
                'teamId': teamId,
                'overdue': overdue,
            },
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Create a task
     * @returns Task Task created
     * @throws ApiError
     */
    public postTasks({
        requestBody,
    }: {
        requestBody: TaskCreateRequest,
    }): CancelablePromise<Task> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get task by id
     * @returns Task Task found
     * @throws ApiError
     */
    public getTasks1({
        taskId,
    }: {
        taskId: string,
    }): CancelablePromise<Task> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tasks/{taskId}',
            path: {
                'taskId': taskId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Replace task
     * @returns Task Task updated
     * @throws ApiError
     */
    public putTasks({
        taskId,
        requestBody,
    }: {
        taskId: string,
        requestBody: TaskCreateRequest,
    }): CancelablePromise<Task> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/tasks/{taskId}',
            path: {
                'taskId': taskId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Update task (partial)
     * @returns Task Task updated
     * @throws ApiError
     */
    public patchTasks({
        taskId,
        requestBody,
    }: {
        taskId: string,
        requestBody: TaskUpdateRequest,
    }): CancelablePromise<Task> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/tasks/{taskId}',
            path: {
                'taskId': taskId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                404: `Not found`,
            },
        });
    }
    /**
     * Soft-delete task (Admin)
     * @returns void
     * @throws ApiError
     */
    public deleteTasks({
        taskId,
    }: {
        taskId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/tasks/{taskId}',
            path: {
                'taskId': taskId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Reassign a task
     * Managers may reassign tasks for direct reports; Admins may reassign any task.
     * @returns Task Reassigned
     * @throws ApiError
     */
    public putTasksAssignee({
        taskId,
        requestBody,
    }: {
        taskId: string,
        requestBody: {
            assigneeId: string;
        },
    }): CancelablePromise<Task> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/tasks/{taskId}/assignee',
            path: {
                'taskId': taskId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                403: `Forbidden (not manager of assignee)`,
                404: `Task not found`,
            },
        });
    }
}
