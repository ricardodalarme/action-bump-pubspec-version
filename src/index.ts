import * as core from '@actions/core'
import {readPubspec, writeUpdatedVersion} from './pubspec'
import {getInputs} from './action'
import {Version} from './update-version'

async function run(): Promise<void> {
  const {mode} = getInputs()

  const pubspecContent = readPubspec()
  const currentVersion = pubspecContent.version

  core.info(`current version: ${currentVersion}`)

  const newVersion = new Version(currentVersion)
  newVersion.bump(mode)

  const newVersionString = newVersion.toString()
  core.info(`new version: ${newVersionString}`)

  core.info('writing new version to pubspec.yaml')
  writeUpdatedVersion(pubspecContent, newVersionString)
}

run()
  .then(() => core.info('done!'))
  .catch(e => core.setFailed(e))
