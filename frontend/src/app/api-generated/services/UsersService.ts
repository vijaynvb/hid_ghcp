/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page } from '../models/Page';
import type { User } from '../models/User';
import type { UserCreateRequest } from '../models/UserCreateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List users
     * Returns a paginated list of users. Admin access required.
     * @returns Page Paginated users
     * @throws ApiError
     */
    public getUsers({
        page,
        size = 20,
        sort,
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
    }): CancelablePromise<Page> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Create user (Admin)
     * Create a new user (Admin only). For SSO/SCIM environments, user provisioning may be handled externally.
     * @returns User User created
     * @throws ApiError
     */
    public postUsers({
        requestBody,
    }: {
        requestBody: UserCreateRequest,
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Get user by id
     * @returns User User found
     * @throws ApiError
     */
    public getUsers1({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{userId}',
            path: {
                'userId': userId,
            },
            errors: {
                404: `Not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Update user (Admin)
     * @returns User Updated user
     * @throws ApiError
     */
    public putUsers({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: UserCreateRequest,
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
}
