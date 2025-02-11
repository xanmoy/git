// app/repos/[repo]/commits/page.tsx

import Link from 'next/link';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

/**
 * Utility function to convert a commit date to relative time, e.g. "2 days ago".
 */
function getRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = diffMs / 1000;
    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours >= 1) {
        return `${Math.floor(diffHours)} hour${diffHours >= 2 ? 's' : ''} ago`;
    } else if (diffMinutes >= 1) {
        return `${Math.floor(diffMinutes)} minute${diffMinutes >= 2 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

async function getCommits(repo: string) {
    // Replace with your GitHub username or store it in an ENV var
    const owner = process.env.GITHUB_USERNAME ?? 'xanmoy';

    const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        }
    );

    if (!res.ok) {
        const errorData = await res.json();
        console.error('GitHub API error:', res.status, errorData);
        throw new Error('Failed to fetch commits');
    }

    return res.json();
}

interface CommitsPageProps {
    params: {
        repo: string;
    };
}

export default async function CommitsPage({ params }: CommitsPageProps) {
    const { repo } = params;
    const commits = await getCommits(repo);

    return (
        <div className="bg-black min-h-screen text-white">
            {/* Header section (like kernel.org’s “index : kernel/git/torvalds/linux.git”) */}
            <header className="border-b border-gray-700 p-4">
                <h1 className="text-xl">
                    index : mirror/git/xanmoy/sources.git
                </h1>
            </header>

            {/* Main content: Table of commits */}
            <main className="p-4">
                <table className="w-full table-auto text-sm">
                    <thead className="border-b border-gray-700 text-gray-300">
                        <tr>
                            <th className="px-2 py-1 text-left">Commit message</th>
                            <th className="px-2 py-1 text-left">Author</th>
                            <th className="px-2 py-1 text-left">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commits.map((commit: { sha: string; commit: { message: string; author: { name: string; date: string; }; }; }) => {
                            const authorName = commit.commit.author?.name ?? 'Unknown';
                            const dateString = commit.commit.author?.date ?? new Date().toISOString();
                            const relativeTime = getRelativeTime(dateString);

                            return (
                                <tr key={commit.sha} className="border-b border-gray-800">
                                    <td className="px-2 py-1">
                                        <Link
                                            href={`/repos/${repo}/commits/${commit.sha}`}
                                            className="text-blue-400 hover:underline"
                                        >
                                            {commit.commit.message}
                                        </Link>
                                    </td>
                                    <td className="px-2 py-1">
                                        {authorName}
                                    </td>
                                    <td className="px-2 py-1">
                                        {relativeTime}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
