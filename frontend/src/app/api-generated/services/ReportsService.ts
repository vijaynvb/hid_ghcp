/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Task } from '../models/Task';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ReportsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Completed tasks report
     * Return list of completed tasks within a date range. Supports CSV export
     * by providing `Accept: text/csv`.
     *
     * @returns Task Tasks list (JSON or CSV)
     * @throws ApiError
     */
    public getReportsCompleted({
        fromDate,
        toDate,
    }: {
        fromDate?: string,
        toDate?: string,
    }): CancelablePromise<Array<Task>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/completed',
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
            },
            errors: {
                400: `Invalid dates`,
            },
        });
    }
    /**
     * Overdue tasks report
     * Returns overdue tasks and metrics. Supports CSV.
     * @returns any Overdue tasks and summary
     * @throws ApiError
     */
    public getReportsOverdue({
        teamId,
    }: {
        teamId?: string,
    }): CancelablePromise<{
        overdueCount?: number;
        tasks?: Array<Task>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/overdue',
            query: {
                'teamId': teamId,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
}
