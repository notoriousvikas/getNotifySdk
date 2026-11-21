import { asGetNotifyResult, GetNotifyValidationError } from "../errors.js";
export class InboxResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * Fetch in-app notifications for a specific recipient.
     *
     * @param recipientId Identifier of the recipient (e.g. user ID)
     */
    async list(recipientId) {
        return asGetNotifyResult(async () => {
            if (!recipientId || typeof recipientId !== "string" || !recipientId.trim()) {
                throw new GetNotifyValidationError("recipientId is required to fetch inbox notifications");
            }
            const res = await this.http.request("/inbox", {
                method: "GET",
                query: { recipientId: recipientId.trim() },
            });
            return (res.data || []);
        });
    }
    /**
     * Mark an inbox notification as read by its notification ID.
     */
    async markAsRead(notificationId) {
        return asGetNotifyResult(async () => {
            if (!notificationId || typeof notificationId !== "string" || !notificationId.trim()) {
                throw new GetNotifyValidationError("notificationId is required to mark notification as read");
            }
            const res = await this.http.request(`/inbox/${encodeURIComponent(notificationId.trim())}/read`, {
                method: "PATCH",
            });
            return res.data;
        });
    }
    /**
     * Delete an inbox notification by its notification ID.
     */
    async delete(notificationId) {
        return asGetNotifyResult(async () => {
            if (!notificationId || typeof notificationId !== "string" || !notificationId.trim()) {
                throw new GetNotifyValidationError("notificationId is required to delete notification");
            }
            const res = await this.http.request(`/inbox/${encodeURIComponent(notificationId.trim())}`, {
                method: "DELETE",
            });
            return {
                success: true,
                message: res.message || "Notification deleted successfully",
            };
        });
    }
    /**
     * Get the count of unread notifications for a recipient.
     */
    async getUnreadCount(recipientId) {
        return asGetNotifyResult(async () => {
            if (!recipientId || typeof recipientId !== "string" || !recipientId.trim()) {
                throw new GetNotifyValidationError("recipientId is required to get unread count");
            }
            const res = await this.http.request("/inbox/unread/count", {
                method: "GET",
                query: { recipientId: recipientId.trim() },
            });
            return res.data?.unreadCount ?? 0;
        });
    }
}
//# sourceMappingURL=inbox.js.map