import { HttpClient } from "./http.js";
import { InboxResource } from "./resources/inbox.js";
import { NotificationsResource } from "./resources/notifications.js";
import type {
  GetNotifyConfig,
  GetNotifyResult,
  NotificationRecord,
  SendNotificationPayload,
} from "./types.js";

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
  public readonly notifications: NotificationsResource;
  public readonly inbox: InboxResource;
  private readonly http: HttpClient;
  private readonly config: GetNotifyConfig;

  constructor(config: GetNotifyConfig) {
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
  public async sendNotification(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>> {
    return await this.notifications.send(payload);
  }

  /** Send a notification through the backend's trigger-event endpoint. */
  public async triggerEvent(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>> {
    return await this.notifications.triggerEvent(payload);
  }

  /**
   * Alias for sendNotification (matches typo variants).
   */
  public async sendNotidication(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>> {
    return await this.sendNotification(payload);
  }

  /**
   * Retrieve list of notifications in the recipient's inbox.
   */
  public async getNotifications(recipientId: string): Promise<GetNotifyResult<NotificationRecord[]>> {
    return await this.inbox.list(recipientId);
  }

  /** Alias for inbox.list. */
  public async listNotifications(recipientId: string): Promise<GetNotifyResult<NotificationRecord[]>> {
    return await this.inbox.list(recipientId);
  }

  /**
   * Mark a specific notification as read.
   */
  public async markAsRead(notificationId: string): Promise<GetNotifyResult<NotificationRecord>> {
    return await this.inbox.markAsRead(notificationId);
  }

  /** Alias for markAsRead. */
  public async markNotificationAsRead(notificationId: string): Promise<GetNotifyResult<NotificationRecord>> {
    return await this.inbox.markAsRead(notificationId);
  }

  /**
   * Delete a notification from the inbox.
   */
  public async deleteNotification(
    notificationId: string
  ): Promise<GetNotifyResult<{ success: boolean; message: string }>> {
    return await this.inbox.delete(notificationId);
  }

  /**
   * Get total number of unread notifications for a recipient.
   */
  public async getUnreadCount(recipientId: string): Promise<GetNotifyResult<number>> {
    return await this.inbox.getUnreadCount(recipientId);
  }
}

/**
 * Lowercase constructor alias so users can write:
 * `const client = new getNotify({ apiKey: "..." });`
 */
export const getNotify = GetNotify;
