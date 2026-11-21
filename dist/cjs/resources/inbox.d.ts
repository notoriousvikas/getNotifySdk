import type { HttpClient } from "../http.js";
import type { GetNotifyResult, NotificationRecord } from "../types.js";
export declare class InboxResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Fetch in-app notifications for a specific recipient.
     *
     * @param recipientId Identifier of the recipient (e.g. user ID)
     */
    list(recipientId: string): Promise<GetNotifyResult<NotificationRecord[]>>;
    /**
     * Mark an inbox notification as read by its notification ID.
     */
    markAsRead(notificationId: string): Promise<GetNotifyResult<NotificationRecord>>;
    /**
     * Delete an inbox notification by its notification ID.
     */
    delete(notificationId: string): Promise<GetNotifyResult<{
        success: boolean;
        message: string;
    }>>;
    /**
     * Get the count of unread notifications for a recipient.
     */
    getUnreadCount(recipientId: string): Promise<GetNotifyResult<number>>;
}
//# sourceMappingURL=inbox.d.ts.map