/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserCreateRequest = {
    username: string;
    displayName: string;
    email: string;
    role: UserCreateRequest.role;
};
export namespace UserCreateRequest {
    export enum role {
        EMPLOYEE = 'Employee',
        MANAGER = 'Manager',
        ADMIN = 'Admin',
        EXECUTIVE = 'Executive',
    }
}

