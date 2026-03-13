import { portfolioData } from "../src/data/portfolio.js";
import { applyCors, handleOptions, sendJson } from "./_lib/http.js";

type RequestLike = { method?: string };

export default async function handler(request: RequestLike, response: any) {
    applyCors(response);

    if (handleOptions(request.method, response)) {
        return;
    }

    sendJson(response, 200, portfolioData);
}
