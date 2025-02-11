// app/repos/[repo]/commits/[commit]/page.tsx

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
        <div>
            <h1 className="text-2xl font-bold mb-4">Commit Details</h1>
            <p className="mb-2">
                <strong>Message:</strong> {commitData.commit.message}
            </p>
            <p className="mb-2">
                <strong>Author:</strong> {commitData.commit.author.name}
            </p>
            <p className="mb-4">
                <strong>Date:</strong>{' '}
                {new Date(commitData.commit.author.date).toLocaleString()}
            </p>

            <h2 className="text-xl font-semibold mb-2">Files Changed</h2>
            {commitData.files?.length ? (
                <ul className="list-disc list-inside space-y-1">
                    {commitData.files.map((file: { filename: string; additions: number; deletions: number }) => (
                        <li key={file.filename}>
                            {file.filename} (+{file.additions}/-{file.deletions})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files changed.</p>
            )}
        </div>
    );
}
