import * as core from '@actions/core'
import {BumpMode, parseVersionMode} from './update-version'

type Input = {
  mode: BumpMode
}

type Output = {
  newVersion: string
}

export function getInputs(): Input {
  return {
    mode: parseVersionMode(core.getInput('mode', {required: true}))
  }
}

export function setOutputs(output: Output): void {
  const {newVersion} = output
  core.setOutput('new_version', newVersion)
}
