import type { HttpClient } from "../http.js";
import type { NotificationRecord, GetNotifyResult, SendNotificationPayload } from "../types.js";
export declare class NotificationsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Send a notification to a recipient across a specified channel (in_app, email, sms, push).
     *
     * @param payload Notification parameters
     * @returns The created notification record
     */
    send(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>>;
    /** Trigger a notification through the backend's trigger-event route. */
    triggerEvent(payload: SendNotificationPayload): Promise<GetNotifyResult<NotificationRecord>>;
    private buildPayload;
}
//# sourceMappingURL=notifications.d.ts.map