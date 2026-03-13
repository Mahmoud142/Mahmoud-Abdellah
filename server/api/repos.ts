import { fetchRepos } from "./_lib/repos";
import { applyCors, handleOptions, sendJson } from "./_lib/http";

type RequestLike = { method?: string };

export default async function handler(request: RequestLike, response: any) {
    applyCors(response);

    if (handleOptions(request.method, response)) {
        return;
    }

    const repos = await fetchRepos();
    sendJson(response, 200, repos);
}
