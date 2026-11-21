/** Base class for internal getNotify SDK errors. */
export class GetNotifyError extends Error {
    code;
    constructor(message, code = "GETNOTIFY_ERROR") {
        super(message);
        this.name = "GetNotifyError";
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/** Internal SDK error for HTTP failures; public SDK methods return it in their result. */
export class GetNotifyAPIError extends GetNotifyError {
    statusCode;
    responseBody;
    errors;
    constructor(message, statusCode, responseBody, errors) {
        super(message, `HTTP_${statusCode}`);
        this.name = "GetNotifyAPIError";
        this.statusCode = statusCode;
        this.responseBody = responseBody;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/** Internal SDK error for invalid client input; public SDK methods return it in their result. */
export class GetNotifyValidationError extends GetNotifyError {
    constructor(message) {
        super(message, "CLIENT_VALIDATION_ERROR");
        this.name = "GetNotifyValidationError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/** Internal SDK error for a missing or unauthorized API key (401/403). */
export class GetNotifyAuthenticationError extends GetNotifyAPIError {
    constructor(message = "Invalid or missing getNotify API key", statusCode = 401, responseBody) {
        super(message, statusCode, responseBody);
        this.name = "GetNotifyAuthenticationError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/** Internal SDK error for HTTP request timeouts. */
export class GetNotifyTimeoutError extends GetNotifyError {
    constructor(message = "Request timed out") {
        super(message, "TIMEOUT_ERROR");
        this.name = "GetNotifyTimeoutError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/** Convert internal SDK exceptions into a plain response object for callers. */
export async function asGetNotifyResult(operation) {
    try {
        return { status: "success", data: await operation() };
    }
    catch (error) {
        if (error instanceof GetNotifyError) {
            const response = {
                status: "error",
                error: {
                    code: error.code,
                    message: error.message,
                    ...(error instanceof GetNotifyAPIError && {
                        statusCode: error.statusCode,
                        details: error.responseBody,
                        errors: error.errors,
                    }),
                },
            };
            return response;
        }
        return {
            status: "error",
            error: {
                code: "GETNOTIFY_ERROR",
                message: error instanceof Error ? error.message : String(error),
            },
        };
    }
}
//# sourceMappingURL=errors.js.map