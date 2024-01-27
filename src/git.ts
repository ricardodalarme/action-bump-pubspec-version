import {getOctokit} from '@actions/github'

export async function updateFiles(
  versionName: string,
  githubToken: string,
  owner: string,
  repo: string,
  treeSha: string
): Promise<void> {
  const octokit = getOctokit(githubToken)

  await octokit.rest.git.createCommit({
    owner,
    repo,
    message: `Bump version to ${versionName}`,
    tree: treeSha
  })
}
