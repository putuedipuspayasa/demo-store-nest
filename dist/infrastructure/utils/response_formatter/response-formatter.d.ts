export interface ResponseFormat<T> {
    statusCode: number;
    message: string;
    data: T | null;
}
export declare function formatResponse<T>(data: T, message: string, statusCode?: number): ResponseFormat<T>;
