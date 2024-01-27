import * as core from '@actions/core'
import {readPubspec, writeUpdatedVersion} from './pubspec'
import {context} from '@actions/github'
import {getInputs} from './action'
import {updateFiles} from './git'
import {Version} from './update-version'

async function run(): Promise<void> {
  const {mode, githubToken} = getInputs()

  const pubspecContent = readPubspec()
  const currentVersion = pubspecContent.version

  core.info(`current version: ${currentVersion}`)

  const newVersion = new Version(currentVersion)
  newVersion.bump(mode)

  const newVersionString = newVersion.toString()
  core.info(`new version: ${newVersionString}`)

  core.info('writing new version to pubspec.yaml')
  writeUpdatedVersion(pubspecContent, newVersionString)

  core.info('committing and pushing changes')
  const {owner, repo} = context.repo
  await updateFiles(newVersionString, githubToken, owner, repo, context.sha)
}

run()
  .then(() => core.info('done!'))
  .catch(e => core.setFailed(e))
