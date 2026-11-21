"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotify = exports.GetNotify = void 0;
const http_js_1 = require("./http.js");
const inbox_js_1 = require("./resources/inbox.js");
const notifications_js_1 = require("./resources/notifications.js");
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
class GetNotify {
    notifications;
    inbox;
    http;
    config;
    constructor(config) {
        this.config = { ...config };
        this.http = new http_js_1.HttpClient(this.config);
        this.notifications = new notifications_js_1.NotificationsResource(this.http);
        this.inbox = new inbox_js_1.InboxResource(this.http);
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
exports.GetNotify = GetNotify;
/**
 * Lowercase constructor alias so users can write:
 * `const client = new getNotify({ apiKey: "..." });`
 */
exports.getNotify = GetNotify;
//# sourceMappingURL=client.js.map