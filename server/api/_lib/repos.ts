/// <reference types="node" />

import { portfolioData } from "../../src/data/portfolio";

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

export async function fetchRepos() {
    const githubUser = process.env.GITHUB_USERNAME ?? "Mahmoud142";
    const githubToken = process.env.GITHUB_TOKEN;

    try {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            "User-Agent": "portfolio-serverless-api",
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
            return getFallbackRepos();
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

        return cleanedRepos.length > 0 ? cleanedRepos : getFallbackRepos();
    } catch {
        return getFallbackRepos();
    }
}
