import { profile } from '@/constants/profile';
import type { GitHubData, GitHubProfile, GitHubRepo } from '@/types';

const API = 'https://api.github.com';
const REVALIDATE_SECONDS = 3600;

/**
 * Optional token. Unauthenticated GitHub calls are limited to 60/hour per IP,
 * which is fine for an ISR-cached page but not for local development with hot
 * reload — set GITHUB_TOKEN (a fine-grained token with no scopes is enough) to
 * raise the ceiling to 5,000/hour.
 */
function headers(): HeadersInit {
  const base: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN;
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: headers(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub ${response.status} on ${path}`);
  }
  return (await response.json()) as T;
}

/**
 * Fetches the profile and top repositories.
 *
 * Never throws: a rate limit, a network blip, or an unconfigured username
 * must degrade to a static fallback card rather than fail the page render or
 * the production build.
 */
export async function getGitHubData(limit = 6): Promise<GitHubData> {
  const username = profile.githubUsername;

  try {
    const [profileData, repoData] = await Promise.all([
      getJson<GitHubProfile>(`/users/${username}`),
      getJson<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=pushed`),
    ]);

    const owned = repoData.filter((repo) => !repo.fork);

    // Latest activity across everything owned, computed before the display
    // filters below so the "last push" stat never reads "—" just because the
    // only recent push was to a repo we chose not to list.
    const lastPushedAt =
      owned
        .map((repo) => repo.pushed_at)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

    // "Pinned" is not exposed by the REST API, so rank by stars then recency —
    // in practice that surfaces the same repositories a user would pin.
    const repos = owned
      // The repo named after the account is the profile README. GitHub hides it
      // from the repo list for the same reason: it is a bio, not a project.
      .filter((repo) => repo.name.toLowerCase() !== username.toLowerCase())
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, limit);

    return { profile: profileData, repos, lastPushedAt, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown GitHub API error';
    // Logged server-side only; the UI shows a neutral message instead.
    console.warn(`[github] falling back to static card: ${message}`);
    return { profile: null, repos: [], lastPushedAt: null, error: message };
  }
}
