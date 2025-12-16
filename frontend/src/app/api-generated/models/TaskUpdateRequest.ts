/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
import type { Status } from './Status';
export type TaskUpdateRequest = {
    title?: string;
    description?: string;
    priority?: Priority;
    status?: Status;
    dueDate?: string;
    assigneeId?: string | null;
    tags?: Array<string>;
};

