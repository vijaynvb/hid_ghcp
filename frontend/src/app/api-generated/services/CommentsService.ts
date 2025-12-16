/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CommentCreateRequest } from '../models/CommentCreateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CommentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List comments for a task
     * @returns Comment List of comments
     * @throws ApiError
     */
    public getTasksComments({
        taskId,
    }: {
        taskId: string,
    }): CancelablePromise<Array<Comment>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tasks/{taskId}/comments',
            path: {
                'taskId': taskId,
            },
            errors: {
                404: `Task not found`,
            },
        });
    }
    /**
     * Add comment to task
     * @returns Comment Comment created
     * @throws ApiError
     */
    public postTasksComments({
        taskId,
        requestBody,
    }: {
        taskId: string,
        requestBody: CommentCreateRequest,
    }): CancelablePromise<Comment> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/tasks/{taskId}/comments',
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
}
