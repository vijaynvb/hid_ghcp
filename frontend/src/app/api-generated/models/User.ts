/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    id: string;
    username: string;
    displayName: string;
    email: string;
    role: User.role;
    teamId?: string | null;
};
export namespace User {
    export enum role {
        EMPLOYEE = 'Employee',
        MANAGER = 'Manager',
        ADMIN = 'Admin',
        EXECUTIVE = 'Executive',
    }
}

