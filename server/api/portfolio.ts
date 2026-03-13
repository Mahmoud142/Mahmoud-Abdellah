import { portfolioData } from "../src/data/portfolio";
import { applyCors, handleOptions } from "./_lib/http";

type RequestLike = { method?: string };

export default async function handler(request: RequestLike, response: any) {
    applyCors(response);

    if (handleOptions(request.method, response)) {
        return;
    }

    response.status(200).json(portfolioData);
}
