import cors from "cors";
import express from "express";

import { portfolioData } from "./data/portfolio.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const githubUser = process.env.GITHUB_USERNAME ?? "Mahmoud142";
const githubToken = process.env.GITHUB_TOKEN;

function getFallbackRepos() {
    return portfolioData.projects
        .filter((project) => Boolean(project.github))
        .slice(0, 6)
        .map((project, index) => {
            const repoUrl = project.github ?? "";
            const repoName = repoUrl.split("/").pop() ?? project.title;

            return {
                id: -1 * (index + 1),
                name: repoName,
                description: project.summary,
                url: repoUrl,
                language: project.stack[0] ?? "Unknown",
                stars: 0,
                updatedAt: new Date().toISOString(),
            };
        });
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
});

app.get("/api/portfolio", (_request, response) => {
    response.json(portfolioData);
});

app.get("/api/repos", async (_request, response) => {
    try {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            "User-Agent": "portfolio-server",
            "X-GitHub-Api-Version": "2022-11-28",
        };

        if (githubToken) {
            headers.Authorization = `Bearer ${githubToken}`;
        }

        const githubResponse = await fetch(
            `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=6`,
            { headers },
        );

        if (!githubResponse.ok) {
            response.json(getFallbackRepos());
            return;
        }

        const repos = (await githubResponse.json()) as Array<{
            id: number;
            name: string;
            description: string | null;
            html_url: string;
            language: string | null;
            stargazers_count: number;
            updated_at: string;
            fork: boolean;
        }>;

        const cleanedRepos = repos
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description ?? "No description provided.",
                url: repo.html_url,
                language: repo.language ?? "Unknown",
                stars: repo.stargazers_count,
                updatedAt: repo.updated_at,
            }));

        response.json(
            cleanedRepos.length > 0 ? cleanedRepos : getFallbackRepos(),
        );
    } catch (error) {
        response.json(getFallbackRepos());
    }
});

app.listen(port, () => {
    console.log(`Portfolio API running on http://localhost:${port}`);
});
