import { asGetNotifyResult, GetNotifyValidationError } from "../errors.js";
export class NotificationsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * Send a notification to a recipient across a specified channel (in_app, email, sms, push).
     *
     * @param payload Notification parameters
     * @returns The created notification record
     */
    async send(payload) {
        return asGetNotifyResult(async () => {
            const body = this.buildPayload(payload);
            const res = await this.http.request("/notifications", {
                method: "POST",
                body,
            });
            return (res.data || res);
        });
    }
    /** Trigger a notification through the backend's trigger-event route. */
    async triggerEvent(payload) {
        return asGetNotifyResult(async () => {
            const body = this.buildPayload(payload, false);
            const res = await this.http.request("/notifications/triggerEvent", {
                method: "POST",
                body,
            });
            return (res.data || res);
        });
    }
    buildPayload(payload, allowSchedule = true) {
        if (!payload) {
            throw new GetNotifyValidationError("Notification payload is required");
        }
        const recipientId = payload.recipientId || payload.recieptId;
        if (!recipientId || typeof recipientId !== "string" || !recipientId.trim()) {
            throw new GetNotifyValidationError("recipientId is required and cannot be empty");
        }
        if (!payload.channel) {
            throw new GetNotifyValidationError("channel is required (must be 'in_app', 'email', 'sms', or 'push')");
        }
        // Normalize hyphenated 'in-app' to 'in_app' to match backend enum
        let channel = payload.channel;
        if (channel === "in-app") {
            channel = "in_app";
        }
        const validChannels = ["in_app", "email", "sms", "push"];
        if (!validChannels.includes(channel)) {
            throw new GetNotifyValidationError(`Invalid channel '${channel}'. Allowed channels: ${validChannels.join(", ")}`);
        }
        if ((channel === "email" || channel === "sms") && (!payload.to || !payload.to.trim())) {
            throw new GetNotifyValidationError(`to is required for ${channel} notifications`);
        }
        if (payload.scheduleAt !== undefined && allowSchedule) {
            const scheduleDate = payload.scheduleAt instanceof Date
                ? payload.scheduleAt
                : new Date(payload.scheduleAt);
            if (Number.isNaN(scheduleDate.getTime())) {
                throw new GetNotifyValidationError("scheduleAt must be a valid date or date-time string");
            }
        }
        if (!allowSchedule && payload.scheduleAt !== undefined) {
            throw new GetNotifyValidationError("scheduleAt is supported by sendNotification, not triggerEvent");
        }
        return {
            recipientId: recipientId.trim(),
            channel,
            ...(payload.title !== undefined && { title: payload.title }),
            ...(payload.body !== undefined && { body: payload.body }),
            ...(payload.data !== undefined && { data: payload.data }),
            ...(payload.to !== undefined && { to: payload.to }),
            ...(allowSchedule && payload.scheduleAt !== undefined && {
                scheduleAt: payload.scheduleAt instanceof Date
                    ? payload.scheduleAt.toISOString()
                    : payload.scheduleAt,
            }),
        };
    }
}
//# sourceMappingURL=notifications.js.map