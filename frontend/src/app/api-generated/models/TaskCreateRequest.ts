/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
export type TaskCreateRequest = {
    title: string;
    description?: string;
    priority?: Priority;
    dueDate?: string;
    assigneeId?: string | null;
    tags?: Array<string>;
};

