/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Internal login (fallback)
     * Authenticate using internal username/password fallback when SSO is not available. Returns a JWT access token.
     * @returns any Token issued
     * @throws ApiError
     */
    public postAuthLogin({
        requestBody,
    }: {
        requestBody: {
            username: string;
            password: string;
        },
    }): CancelablePromise<{
        accessToken?: string;
        tokenType?: string;
        expiresIn?: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid credentials`,
                500: `Server error`,
            },
        });
    }
}
