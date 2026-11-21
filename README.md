# getNotify JavaScript and TypeScript SDK

The SDK sends notification requests to the getNotify backend. It includes helpers for sending and scheduling notifications, triggering notification events, and using the in-app inbox endpoints.

## Install

```bash
npm install getnotified
```

## Initialize

```ts
import { getNotify } from "getnotified";

const notify = new getNotify({
  apiKey: "gnt_live_your_api_key_here",
  // Optional. Defaults to https://getnotify-y0ig.onrender.com
  baseUrl: "https://getnotify-y0ig.onrender.com",
});
```

The API key is required. The backend selects the project associated with that key, so a `projectId` does not need to be supplied. `GetNotify` is also exported as a constructor alias.

## Send notifications

```ts
const result = await notify.sendNotification({
  recipientId: "user_123",
  channel: "in_app",
  title: "Welcome!",
  body: "Thanks for signing up.",
  data: { source: "signup" },
});

if (result.status === "error") {
  console.error(result.error.message, result.error.code);
} else {
  console.log(result.data._id);
}
```

Supported channel values are `in_app`, `email`, `sms`, and `push`. Email and SMS requests also require `to`:

```ts
await notify.sendNotification({
  recipientId: "user_123",
  channel: "email",
  to: "user@example.com",
  title: "Your receipt",
  body: "Your order is confirmed.",
});
```

Schedule delivery with a date or date-time string:

```ts
await notify.sendNotification({
  recipientId: "user_123",
  channel: "in_app",
  title: "Reminder",
  scheduleAt: "2026-12-01T09:00:00.000Z",
});
```

The backend's scheduler checks due notifications once per minute. `notify.triggerEvent(payload)` calls the backend's `/notifications/triggerEvent` route; the route accepts the same notification fields except `scheduleAt`.

## In-app inbox

```ts
const inbox = await notify.getNotifications("user_123");
if (inbox.status === "error") {
  console.error(inbox.error.message);
} else {
  const unread = await notify.getUnreadCount("user_123");
  if (unread.status === "success") console.log("Unread:", unread.data);

  const first = inbox.data[0];
  if (first) {
    const marked = await notify.markAsRead(first._id);
    if (marked.status === "error") console.error(marked.error.message);
  }
}
```

The same methods are available under `notify.inbox`:

```ts
await notify.inbox.list("user_123");
await notify.inbox.getUnreadCount("user_123");
await notify.inbox.markAsRead("notification_id");
await notify.inbox.delete("notification_id");
```

These methods call the backend's existing inbox routes. The current backend inbox routes do not apply API-key project scoping, and its read and unread-count handlers use a `read` field that is absent from the notification model. The SDK cannot correct those server-side behaviors; use these methods with that limitation in mind.

The backend accepts `push` as a channel value, but the current worker and scheduler do not have a push delivery handler.

## Error responses

SDK operations return a consistent result object. Errors are returned as values, so you do not need to import error classes or wrap each call in `try/catch`:

```ts
const result = await notify.sendNotification({
  recipientId: "user_123",
  channel: "in_app",
  title: "Update",
});

if (result.status === "error") {
  console.error(result.error.message);
  console.error(result.error.code);
  console.error(result.error.statusCode); // present for HTTP errors
} else {
  console.log("Sent:", result.data._id);
}
```

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | Required | Project API key (`gnt_live_...`). |
| `baseUrl` | `string` | `https://getnotify-y0ig.onrender.com` | getNotify backend origin. |
| `timeout` | `number` | `10000` | Request timeout in milliseconds. |
| `headers` | `Record<string, string>` | `{}` | Additional request headers. The SDK sets `x-api-key` from `apiKey`. |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Optional custom fetch implementation. |
| `projectId` | `string` | — | Deprecated compatibility option; the backend selects the project from the API key. |
