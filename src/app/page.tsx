export const revalidate = 60; // Revalidate every 60 seconds

// List of selected repository names
const selectedRepos = ['notion-desktop',
    'whatsapp-desktop-client',
    'chatgpt-desktop-client',
    'ownai',
    'xeoly',
    'wther',
    'medinova',
    'drawflow',
];

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    // Other properties if needed
}

async function getRepos() {
    let allRepos: Repo[] = [];
    let page = 1;
    const perPage = 100; // Number of repos per page

    while (true) {
        const res = await fetch(`https://api.github.com/users/xanmoy/repos?per_page=${perPage}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos: Repo[] = await res.json();
        if (repos.length === 0) break; // No more repos

        allRepos = allRepos.concat(repos);
        page++;
    }

    console.log('All repos fetched with pagination:', allRepos);
    return allRepos.filter((repo) => selectedRepos.includes(repo.name));
}

export default async function ReposPage() {
    const repos = await getRepos();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-extrabold text-center mb-8">
                My Open Source Repositories
            </h1>
            <div className="p-6 rounded-lg ">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Selected Projects</h2>
                <ul className="space-y-4">
                    {repos.map((repo: Repo) => (
                        <li key={repo.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div>
                                <a
                                    href={`/${repo.name}`}
                                    
                                    rel="noopener noreferrer"
                                    className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    {repo.name}
                                </a>
                                <p className="text-gray-400 text-sm mt-1">{repo.description || 'No description provided'}</p>
                            </div>
                            <a
                                href={`/${repo.name}`}
                                className="text-blue-600 hover:underline"
                            >
                                View Details
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
