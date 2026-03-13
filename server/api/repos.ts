import { fetchRepos } from "./_lib/repos";
import { applyCors, handleOptions } from "./_lib/http";

type RequestLike = { method?: string };

export default async function handler(request: RequestLike, response: any) {
    applyCors(response);

    if (handleOptions(request.method, response)) {
        return;
    }

    const repos = await fetchRepos();
    response.status(200).json(repos);
}
