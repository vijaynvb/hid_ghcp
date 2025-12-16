/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditLog } from '../models/AuditLog';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AdminService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Export audit logs
     * Admin can export audit logs filtered by entity type and date range.
     * @returns AuditLog Audit logs (JSON)
     * @throws ApiError
     */
    public getAdminAudit({
        entityType,
        fromDate,
        toDate,
    }: {
        entityType?: string,
        fromDate?: string,
        toDate?: string,
    }): CancelablePromise<Array<AuditLog>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/audit',
            query: {
                'entityType': entityType,
                'fromDate': fromDate,
                'toDate': toDate,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
}
