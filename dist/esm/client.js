import { HttpClient } from "./http.js";
import { InboxResource } from "./resources/inbox.js";
import { NotificationsResource } from "./resources/notifications.js";
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
export class GetNotify {
    notifications;
    inbox;
    http;
    config;
    constructor(config) {
        this.config = { ...config };
        this.http = new HttpClient(this.config);
        this.notifications = new NotificationsResource(this.http);
        this.inbox = new InboxResource(this.http);
    }
    /**
     * Send a notification across any supported channel ('in_app', 'email', 'sms', 'push').
     *
     * @param payload Parameters including recipientId, channel, title, body, and data.
     */
    async sendNotification(payload) {
        return await this.notifications.send(payload);
    }
    /** Send a notification through the backend's trigger-event endpoint. */
    async triggerEvent(payload) {
        return await this.notifications.triggerEvent(payload);
    }
    /**
     * Alias for sendNotification (matches typo variants).
     */
    async sendNotidication(payload) {
        return await this.sendNotification(payload);
    }
    /**
     * Retrieve list of notifications in the recipient's inbox.
     */
    async getNotifications(recipientId) {
        return await this.inbox.list(recipientId);
    }
    /** Alias for inbox.list. */
    async listNotifications(recipientId) {
        return await this.inbox.list(recipientId);
    }
    /**
     * Mark a specific notification as read.
     */
    async markAsRead(notificationId) {
        return await this.inbox.markAsRead(notificationId);
    }
    /** Alias for markAsRead. */
    async markNotificationAsRead(notificationId) {
        return await this.inbox.markAsRead(notificationId);
    }
    /**
     * Delete a notification from the inbox.
     */
    async deleteNotification(notificationId) {
        return await this.inbox.delete(notificationId);
    }
    /**
     * Get total number of unread notifications for a recipient.
     */
    async getUnreadCount(recipientId) {
        return await this.inbox.getUnreadCount(recipientId);
    }
}
/**
 * Lowercase constructor alias so users can write:
 * `const client = new getNotify({ apiKey: "..." });`
 */
export const getNotify = GetNotify;
//# sourceMappingURL=client.js.map