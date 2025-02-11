// app/repos/page.tsx

export const revalidate = 60; // Revalidate every 60 seconds

async function getRepos() {
    const res = await fetch(
        'https://api.github.com/users/xanmoy/repos',
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
            // next: { revalidate: 60 } // alternative approach for Next.js 13 caching
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch repositories');
    }

    return res.json();
}

export default async function ReposPage() {
    const repos = await getRepos();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Repositories</h1>
            <ul className="space-y-2">
                {repos.map((repo: { id: number; name: string }) => (
                    <li key={repo.id}>
                        <a
                            href={`/repos/${repo.name}`}
                            className="text-blue-600 hover:underline"
                        >
                            {repo.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
