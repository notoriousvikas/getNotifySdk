import { asGetNotifyResult, GetNotifyValidationError } from "../errors.js";
import type { HttpClient } from "../http.js";
import type { GetNotifyResult, NotificationRecord, UnreadCountResponse } from "../types.js";

export class InboxResource {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Fetch in-app notifications for a specific recipient.
   *
   * @param recipientId Identifier of the recipient (e.g. user ID)
   */
  public async list(recipientId: string): Promise<GetNotifyResult<NotificationRecord[]>> {
    return asGetNotifyResult(async () => {
      if (!recipientId || typeof recipientId !== "string" || !recipientId.trim()) {
        throw new GetNotifyValidationError("recipientId is required to fetch inbox notifications");
      }

      const res = await this.http.request<NotificationRecord[]>("/inbox", {
        method: "GET",
        query: { recipientId: recipientId.trim() },
      });

      return (res.data || []) as NotificationRecord[];
    });
  }

  /**
   * Mark an inbox notification as read by its notification ID.
   */
  public async markAsRead(notificationId: string): Promise<GetNotifyResult<NotificationRecord>> {
    return asGetNotifyResult(async () => {
      if (!notificationId || typeof notificationId !== "string" || !notificationId.trim()) {
        throw new GetNotifyValidationError("notificationId is required to mark notification as read");
      }

      const res = await this.http.request<NotificationRecord>(
        `/inbox/${encodeURIComponent(notificationId.trim())}/read`,
        {
          method: "PATCH",
        }
      );

      return res.data as NotificationRecord;
    });
  }

  /**
   * Delete an inbox notification by its notification ID.
   */
  public async delete(notificationId: string): Promise<GetNotifyResult<{ success: boolean; message: string }>> {
    return asGetNotifyResult(async () => {
      if (!notificationId || typeof notificationId !== "string" || !notificationId.trim()) {
        throw new GetNotifyValidationError("notificationId is required to delete notification");
      }

      const res = await this.http.request<{ success: boolean; message: string }>(
        `/inbox/${encodeURIComponent(notificationId.trim())}`,
        {
          method: "DELETE",
        }
      );

      return {
        success: true,
        message: res.message || "Notification deleted successfully",
      };
    });
  }

  /**
   * Get the count of unread notifications for a recipient.
   */
  public async getUnreadCount(recipientId: string): Promise<GetNotifyResult<number>> {
    return asGetNotifyResult(async () => {
      if (!recipientId || typeof recipientId !== "string" || !recipientId.trim()) {
        throw new GetNotifyValidationError("recipientId is required to get unread count");
      }

      const res = await this.http.request<UnreadCountResponse>("/inbox/unread/count", {
        method: "GET",
        query: { recipientId: recipientId.trim() },
      });

      return res.data?.unreadCount ?? 0;
    });
  }
}
