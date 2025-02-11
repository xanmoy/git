export const revalidate = 60;

async function getCommitData(repo: string, commitSha: string) {
    const res = await fetch(
        `https://api.github.com/repos/xanmoy/${repo}/commits/${commitSha}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch commit data');
    }

    return res.json();
}

interface CommitPageProps {
    params: {
        repo: string;
        commit: string;
    };
}

export default async function CommitPage({ params }: CommitPageProps) {
    const { repo, commit } = params;
    const commitData = await getCommitData(repo, commit);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold text-center text-gray-100 mb-6">Commit Details</h1>

            {/* Commit Information */}
            <div className="bg-neutral-800 p-4 mb-6">
                <p className="text-lg text-gray-200 mb-2">
                    <strong>Message:</strong> {commitData.commit.message}
                </p>
                <p className="text-lg text-gray-200 mb-2">
                    <strong>Author:</strong> {commitData.commit.author.name}
                </p>
                <p className="text-lg text-gray-200 mb-4">
                    <strong>Date:</strong> {new Date(commitData.commit.author.date).toLocaleString()}
                </p>
            </div>

            {/* Files Changed Section */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">Files Changed</h2>
                {commitData.files?.length ? (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-neutral-800">
                                    <th className="py-2 px-4 text-left text-gray-200">File</th>
                                    <th className="py-2 px-4 text-left text-gray-200">Additions</th>
                                    <th className="py-2 px-4 text-left text-gray-200">Deletions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commitData.files.map((file: { filename: string; additions: number; deletions: number }) => (
                                    <tr key={file.filename} className="border-b">
                                        <td className="py-2 px-4 text-gray-200">{file.filename}</td>
                                        <td className="py-2 px-4 text-green-600">+{file.additions}</td>
                                        <td className="py-2 px-4 text-red-600">-{file.deletions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No files changed.</p>
                )}
            </div>

            {/* Back to Repo Link */}
            <div className="mt-8 text-center">
                <a
                    href={`/${repo}`}
                    className="inline-block outline text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900"
                >
                    Back to Repository
                </a>
            </div>
        </div>
    );
}
