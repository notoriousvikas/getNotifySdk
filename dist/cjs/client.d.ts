import { InboxResource } from "./resources/inbox.js";
import { NotificationsResource } from "./resources/notifications.js";
import type { GetNotifyConfig, GetNotifyResult, NotificationRecord, SendNotificationPayload } from "./types.js";
/**
 * The official getNotify client for interacting with the getNotify API.
 *
 * Usage:
 * ```typescript
 * import { getNotify } from "getnotify";
 *
 * const client = new getNotify({
 *   apiKey: "gnt_live_your_api_key",
 *   baseUrl: "https://getnotify-y0ig.onrender.com",
 * });
 *
 * await client.sendNotification({
 *   recipientId: "user_123",
 *   channel: "in_app",
 *   title: "Welcome!",
 *   body: "Welcome to our application.",
 * });
 * ```
 */
export declare class GetNotify {
    readonly notifications: NotificationsResource;
    readonly inbox: InboxResource;
    private readonly http;
    private readonly config;
    constructor(config: GetNotifyConfig);
    /**
     * Send a notification across any supported channel ('in_app', 'email', 'sms', 'push').
     *
     * @param payload Parameters including recipientId, channel, title, body, and data.
     */
    sendNotification(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>>;
    /** Send a notification through the backend's trigger-event endpoint. */
    triggerEvent(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>>;
    /**
     * Alias for sendNotification (matches typo variants).
     */
    sendNotidication(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>>;
    /**
     * Retrieve list of notifications in the recipient's inbox.
     */
    getNotifications(recipientId: string): Promise<GetNotifyResult<NotificationRecord[]>>;
    /** Alias for inbox.list. */
    listNotifications(recipientId: string): Promise<GetNotifyResult<NotificationRecord[]>>;
    /**
     * Mark a specific notification as read.
     */
    markAsRead(notificationId: string): Promise<GetNotifyResult<NotificationRecord>>;
    /** Alias for markAsRead. */
    markNotificationAsRead(notificationId: string): Promise<GetNotifyResult<NotificationRecord>>;
    /**
     * Delete a notification from the inbox.
     */
    deleteNotification(notificationId: string): Promise<GetNotifyResult<{
        success: boolean;
        message: string;
    }>>;
    /**
     * Get total number of unread notifications for a recipient.
     */
    getUnreadCount(recipientId: string): Promise<GetNotifyResult<number>>;
}
/**
 * Lowercase constructor alias so users can write:
 * `const client = new getNotify({ apiKey: "..." });`
 */
export declare const getNotify: typeof GetNotify;
//# sourceMappingURL=client.d.ts.map