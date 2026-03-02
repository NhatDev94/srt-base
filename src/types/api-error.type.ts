// types/api-error.type.ts
export type ApiError = {
    status?: number;
    message: string;
    errors?: any;
}