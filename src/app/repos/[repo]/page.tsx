// app/repos/[repo]/page.tsx

export const revalidate = 60;

async function getRepoData(repoName: string) {
    const res = await fetch(
        `https://api.github.com/repos/xanmoy/${repoName}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch repo data');
    }

    return res.json();
}

interface RepoPageProps {
    params: {
        repo: string;
    };
}

export default async function RepoPage({ params }: RepoPageProps) {
    const { repo } = params;
    const repoData = await getRepoData(repo);

    return (
        <div className="max-w-4xl mx-auto p-6 ">
            <h1 className="text-4xl font-extrabold text-center  mb-6">
                {repoData.name}
            </h1>
            <div className="text-center mb-6">
                <p className="text-xl text-gray-300">{repoData.description || 'No description available.'}</p>
            </div>

            <div className="flex justify-center mb-6">
                <a
                    href={repoData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    View on GitHub
                </a>
            </div>

            <hr className="my-6 border-t-2 border-gray-300" />

            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Commits</h2>
                <a
                    href={`/repos/${repo}/commits`}
                    className="inline-block bg-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                    View commits for {repoData.name}
                </a>
            </div>
        </div>
    );
}
