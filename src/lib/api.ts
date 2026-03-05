import { createHttpClient } from "@nhatdev94/util";

const api = createHttpClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.str-miennam.com/v1",
});

export default api;