import type { GitHubRepo } from "../types";
import { portfolioData } from "./portfolio";

const GITHUB_USERNAME = "Mahmoud142";
const CACHE_KEY = "portfolio-github-repos";
const CACHE_TIMESTAMP_KEY = "portfolio-github-repos-timestamp";
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

interface GitHubApiRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    fork: boolean;
}

function getFallbackRepos(): GitHubRepo[] {
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

function getCachedRepos(): GitHubRepo[] | null {
    try {
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        if (!cachedTimestamp) return null;

        const timestamp = parseInt(cachedTimestamp, 10);
        const now = Date.now();

        if (now - timestamp > CACHE_DURATION_MS) {
            // Cache expired
            return null;
        }

        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!cachedData) return null;

        return JSON.parse(cachedData) as GitHubRepo[];
    } catch {
        return null;
    }
}

function setCachedRepos(repos: GitHubRepo[]): void {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch {
        // LocalStorage might be full or disabled
    }
}

async function fetchFromGitHub(): Promise<GitHubRepo[]> {
    const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        },
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = (await response.json()) as GitHubApiRepo[];

    return repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? "No description provided.",
        url: repo.html_url,
        language: repo.language ?? "Unknown",
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
    }));
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
    // Check cache first
    const cached = getCachedRepos();
    if (cached && cached.length > 0) {
        return cached;
    }

    // Fetch from GitHub API
    try {
        const repos = await fetchFromGitHub();
        if (repos.length > 0) {
            setCachedRepos(repos);
            return repos;
        }
        return getFallbackRepos();
    } catch {
        return getFallbackRepos();
    }
}

export function clearReposCache(): void {
    try {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    } catch {
        // Ignore errors
    }
}
