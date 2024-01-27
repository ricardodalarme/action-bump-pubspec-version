import * as core from '@actions/core'
import {readPubspec} from './pubspec'
import {context} from '@actions/github'
import {getInputs} from './action'
import {updateFiles} from './git'
import {Version} from './update-version'

async function run(): Promise<void> {
  const {mode, githubToken} = getInputs()

  const pubspecContent = readPubspec()
  const currentVersion = pubspecContent.version

  const newVersion = new Version(currentVersion)
  newVersion.bump(mode)

  const {owner, repo} = context.repo

  await updateFiles(
    newVersion.toString(),
    githubToken,
    owner,
    repo,
    context.sha
  )
}

run()
  .then(() => core.info('done!'))
  .catch(e => core.setFailed(e))
