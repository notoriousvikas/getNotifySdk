/**
 * Supported notification delivery channels.
 * Note: The backend schema expects snake_case 'in_app'.
 */
export type NotificationChannel = "in_app" | "email" | "sms" | "push";
export type NotificationChannelInput = NotificationChannel | "in-app";
/**
 * Configuration options for initializing the getNotify SDK client.
 */
export interface GetNotifyConfig {
    /**
     * The API key used for authenticating requests.
     * Can be a live or test key (e.g., 'gnt_live_...').
     */
    apiKey: string;
    /**
     * @deprecated The backend resolves the project from the API key. This value
     * is retained for compatibility and is not sent to the API.
     */
    projectId?: string;
    /**
     * Base URL for the getNotify API backend.
     * Defaults to https://getnotify-y0ig.onrender.com.
     */
    baseUrl?: string;
    /**
     * Request timeout in milliseconds.
     * Defaults to 10,000 (10 seconds).
     */
    timeout?: number;
    /**
     * Optional custom headers to be sent with every HTTP request.
     */
    headers?: Record<string, string>;
    /**
     * Custom fetch implementation (optional, defaults to global fetch).
     */
    fetch?: typeof fetch;
}
/**
 * Parameters for sending a notification.
 */
export interface SendNotificationOptions {
    /**
     * The unique identifier of the recipient (e.g. user ID or email).
     */
    recipientId?: string;
    /** Backward-compatible misspelling accepted by the backend. */
    recieptId?: string;
    /** Notification channel to route through. */
    channel: NotificationChannelInput;
    /**
     * Short notification title or subject line.
     */
    title?: string;
    /**
     * Main text body or message content.
     */
    body?: string;
    /**
     * Arbitrary custom JSON metadata or payload.
     */
    data?: Record<string, unknown>;
    /**
     * Target destination (e.g., recipient email address).
     * Used for channels like 'email'.
     */
    to?: string;
    /**
     * Schedule delivery at this date/time. The backend scheduler checks scheduled
     * notifications once per minute.
     */
    scheduleAt?: string | Date;
    /**
     * @deprecated Project selection is determined by the API key and this value
     * is ignored by the backend.
     */
    projectId?: string;
}
/** A recipient ID is required under either supported spelling. */
export type SendNotificationPayload = SendNotificationOptions & ({
    recipientId: string;
    recieptId?: string;
} | {
    recipientId?: string;
    recieptId: string;
});
/**
 * Returned notification model from the backend.
 */
export interface NotificationRecord {
    _id: string;
    projectId: string;
    recipientId: string;
    title?: string;
    body?: string;
    channel: NotificationChannel;
    data?: Record<string, unknown>;
    readAt?: string | null;
    read?: boolean;
    createdAt: string;
    to?: string;
    [key: string]: unknown;
}
/**
 * Standard envelope returned by the getNotify API.
 */
export interface ApiResponse<T> {
    status: "success" | "fail" | "error";
    message?: string;
    data?: T;
    results?: number;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    errors?: Array<{
        source?: string;
        field?: string;
        message: string;
        code?: string;
    }>;
}
/** Error details returned by SDK calls when a request or validation fails. */
export interface GetNotifyErrorResponse {
    code: string;
    message: string;
    statusCode?: number;
    details?: unknown;
    errors?: Array<{
        source?: string;
        field?: string;
        message: string;
        code?: string;
    }>;
}
/** Result returned by SDK operations. Errors are values, so callers do not need to import error classes. */
export type GetNotifyResult<T> = {
    status: "success";
    data: T;
} | {
    status: "error";
    error: GetNotifyErrorResponse;
};
/**
 * Response for get unread count.
 */
export interface UnreadCountResponse {
    unreadCount: number;
}
//# sourceMappingURL=types.d.ts.map