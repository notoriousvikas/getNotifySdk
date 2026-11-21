import type { GetNotifyResult } from "./types.js";
/** Base class for internal getNotify SDK errors. */
export declare class GetNotifyError extends Error {
    readonly code: string;
    constructor(message: string, code?: string);
}
/** Internal SDK error for HTTP failures; public SDK methods return it in their result. */
export declare class GetNotifyAPIError extends GetNotifyError {
    readonly statusCode: number;
    readonly responseBody?: unknown;
    readonly errors?: Array<{
        source?: string;
        field?: string;
        message: string;
        code?: string;
    }>;
    constructor(message: string, statusCode: number, responseBody?: unknown, errors?: Array<{
        source?: string;
        field?: string;
        message: string;
        code?: string;
    }>);
}
/** Internal SDK error for invalid client input; public SDK methods return it in their result. */
export declare class GetNotifyValidationError extends GetNotifyError {
    constructor(message: string);
}
/** Internal SDK error for a missing or unauthorized API key (401/403). */
export declare class GetNotifyAuthenticationError extends GetNotifyAPIError {
    constructor(message?: string, statusCode?: number, responseBody?: unknown);
}
/** Internal SDK error for HTTP request timeouts. */
export declare class GetNotifyTimeoutError extends GetNotifyError {
    constructor(message?: string);
}
/** Convert internal SDK exceptions into a plain response object for callers. */
export declare function asGetNotifyResult<T>(operation: () => Promise<T>): Promise<GetNotifyResult<T>>;
//# sourceMappingURL=errors.d.ts.map