import { GetNotifyAPIError, GetNotifyAuthenticationError, GetNotifyTimeoutError, GetNotifyValidationError, } from "./errors.js";
export const DEFAULT_BASE_URL = "https://getnotify-y0ig.onrender.com";
export class HttpClient {
    baseUrl;
    apiKey;
    timeout;
    customHeaders;
    fetchFn;
    constructor(config) {
        if (!config?.apiKey?.trim()) {
            throw new GetNotifyValidationError("apiKey is required to initialize getNotify SDK");
        }
        this.apiKey = config.apiKey.trim();
        const configuredBaseUrl = config.baseUrl?.trim() || DEFAULT_BASE_URL;
        this.baseUrl = configuredBaseUrl
            .replace(/\/+$/, "")
            .replace(/\/api\/v1$/i, "");
        this.timeout = config.timeout ?? 10000;
        this.customHeaders = config.headers || {};
        this.fetchFn = config.fetch || globalThis.fetch;
        if (!this.fetchFn) {
            throw new GetNotifyValidationError("No fetch implementation found. Please run on Node.js >= 18 or provide a custom fetch in config.");
        }
    }
    async request(endpoint, options = {}) {
        const { method = "GET", body, query, headers: reqHeaders } = options;
        let path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
        if (!path.startsWith("/api/v1")) {
            path = `/api/v1${path}`;
        }
        const url = new URL(`${this.baseUrl}${path}`);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            }
        }
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...this.customHeaders,
            ...reqHeaders,
            "x-api-key": this.apiKey,
        };
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeout);
        try {
            const response = await this.fetchFn(url.toString(), {
                method,
                headers,
                body: body !== undefined ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            const contentType = response.headers.get("content-type") || "";
            const isJson = contentType.includes("application/json");
            let responseData = null;
            if (isJson) {
                try {
                    responseData = await response.json();
                }
                catch {
                    responseData = null;
                }
            }
            else {
                const text = await response.text();
                responseData = { message: text };
            }
            if (!response.ok) {
                const message = responseData?.message ||
                    (responseData?.errors && responseData.errors[0]?.message) ||
                    `Request failed with status ${response.status}`;
                if (response.status === 401 || response.status === 403) {
                    throw new GetNotifyAuthenticationError(message, response.status, responseData);
                }
                throw new GetNotifyAPIError(message, response.status, responseData, responseData?.errors);
            }
            return responseData;
        }
        catch (error) {
            if (error?.name === "AbortError" || controller.signal.aborted) {
                throw new GetNotifyTimeoutError(`Request to ${url.toString()} timed out after ${this.timeout}ms`);
            }
            if (error instanceof GetNotifyAPIError ||
                error instanceof GetNotifyAuthenticationError ||
                error instanceof GetNotifyValidationError) {
                throw error;
            }
            throw new GetNotifyAPIError(error?.message || "An unexpected error occurred while making the HTTP request", 500, error);
        }
        finally {
            clearTimeout(timer);
        }
    }
}
//# sourceMappingURL=http.js.map