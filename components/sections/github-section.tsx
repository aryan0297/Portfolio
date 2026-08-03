import { GitFork, Github, Star, Users } from 'lucide-react';

import { fadeUp } from '@/animations/variants';
import { Reveal } from '@/components/shared/reveal';
import { Section, SectionHeading } from '@/components/shared/section';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { profile } from '@/constants/profile';
import { getGitHubData } from '@/lib/github';
import { compactNumber, languageColor, relativeTime } from '@/utils/format';

/**
 * GitHub.
 *
 * Async server component: the API call happens on the server and the result is
 * ISR-cached for an hour, so the browser never pays for it and no token is ever
 * exposed. Failure is a first-class state — rate limits and unconfigured
 * usernames render a clean profile link rather than an error.
 */
export async function GitHubSection() {
  const { profile: githubProfile, repos, lastPushedAt, error } = await getGitHubData();

  const stats = githubProfile
    ? [
        { label: 'Public repos', value: compactNumber(githubProfile.public_repos), icon: Github },
        { label: 'Followers', value: compactNumber(githubProfile.followers), icon: Users },
        {
          label: 'Stars earned',
          value: compactNumber(repos.reduce((total, repo) => total + repo.stargazers_count, 0)),
          icon: Star,
        },
        {
          label: 'Last push',
          value: lastPushedAt ? relativeTime(lastPushedAt) : '—',
          icon: GitFork,
        },
      ]
    : [];

  return (
    <Section id="github">
      <SectionHeading
        id="github"
        eyebrow="Open source"
        title="Live from GitHub"
        description="Repositories and activity pulled straight from the GitHub API, refreshed hourly."
      />

      {/* --- Failure / unconfigured state --- */}
      {error && (
        <Reveal variants={fadeUp} className="mt-14">
          <GlassCard className="mx-auto max-w-xl p-8 text-center">
            <Github className="mx-auto h-8 w-8 text-primary-soft" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-white">Live stats unavailable</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm">
              The GitHub API could not be reached right now — most often an hourly rate limit.
              The profile itself is always available.
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-6">
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" aria-hidden />
                Open GitHub profile
              </a>
            </Button>
          </GlassCard>
        </Reveal>
      )}

      {/* --- Success state --- */}
      {!error && githubProfile && (
        <>
          <Reveal variants={fadeUp} className="mt-14">
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <GlassCard key={label} className="p-5">
                  <Icon className="h-4 w-4 text-primary-soft" aria-hidden />
                  <dd className="mt-3 text-2xl font-semibold text-white">{value}</dd>
                  <dt className="mt-1 text-xs text-muted">{label}</dt>
                </GlassCard>
              ))}
            </dl>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <Reveal key={repo.id} variants={fadeUp} delay={index * 0.05} className="h-full">
                <GlassCard className="h-full">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col p-5 transition-transform duration-500 ease-premium hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate text-sm font-semibold text-white">{repo.name}</h3>
                      <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted">
                        <Star className="h-3 w-3" aria-hidden />
                        {repo.stargazers_count}
                      </span>
                    </div>

                    <p className="mt-2.5 line-clamp-2 text-xs text-pretty">
                      {repo.description ?? 'No description provided.'}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[11px] text-muted">
                      <span className="flex items-center gap-1.5">
                        {repo.language && (
                          <>
                            <span
                              aria-hidden
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: languageColor(repo.language) }}
                            />
                            {repo.language}
                          </>
                        )}
                      </span>
                      <span className="font-mono">Updated {relativeTime(repo.pushed_at)}</span>
                    </div>
                  </a>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {repos.length === 0 && (
            <Reveal variants={fadeUp} className="mt-6">
              <GlassCard className="p-8 text-center">
                <p className="text-sm">
                  No public repositories yet — the production work lives in private company
                  repositories.
                </p>
              </GlassCard>
            </Reveal>
          )}

          <Reveal variants={fadeUp} className="mt-8 flex justify-center">
            <Button asChild variant="secondary">
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" aria-hidden />
                View full profile
              </a>
            </Button>
          </Reveal>
        </>
      )}
    </Section>
  );
}
