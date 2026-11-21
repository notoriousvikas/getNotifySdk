import type { ApiResponse, GetNotifyConfig } from "./types.js";
export declare const DEFAULT_BASE_URL = "https://getnotify-y0ig.onrender.com";
export declare class HttpClient {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly timeout;
    private readonly customHeaders;
    private readonly fetchFn;
    constructor(config: GetNotifyConfig);
    request<T>(endpoint: string, options?: {
        method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
        body?: unknown;
        query?: Record<string, string | number | boolean | undefined | null>;
        headers?: Record<string, string>;
    }): Promise<ApiResponse<T>>;
}
//# sourceMappingURL=http.d.ts.map