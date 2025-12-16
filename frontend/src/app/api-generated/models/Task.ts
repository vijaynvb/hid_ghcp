/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
import type { Status } from './Status';
export type Task = {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    dueDate?: string | null;
    assigneeId?: string | null;
    tags?: Array<string>;
    teamId?: string | null;
    createdBy?: string;
    createdAt: string;
    updatedAt?: string;
    overdueFlag?: boolean;
};

