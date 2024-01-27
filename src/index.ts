import * as core from '@actions/core'
import {readPubspec, writeUpdatedVersion} from './pubspec'
import {getInputs} from './action'
import {Version} from './version'

async function run(): Promise<void> {
  const {mode, considerCode} = getInputs()

  const pubspecContent = readPubspec()
  const currentVersion = pubspecContent.version

  core.info(`current version: ${currentVersion}`)

  const newVersion = new Version(currentVersion, considerCode)
  newVersion.bump(mode)

  const newVersionString = newVersion.toString()
  core.info(`new version: ${newVersionString}`)

  core.info('writing new version to pubspec.yaml')
  writeUpdatedVersion(newVersionString)

  core.info('setting outputs')
  core.setOutput('new_version', newVersionString)
}

run()
  .then(() => core.info('done!'))
  .catch(e => core.setFailed(e))
