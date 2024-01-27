import * as core from '@actions/core'
import {BumpMode, parseBumpMode} from './version'

type Input = {
  mode: BumpMode
  considerCode: boolean
}

type Output = {
  newVersion: string
}

export function getInputs(): Input {
  return {
    mode: parseBumpMode(core.getInput('mode', {required: true})),
    considerCode: core.getBooleanInput('consider_code', {required: true})
  }
}

export function setOutputs(output: Output): void {
  const {newVersion} = output
  core.setOutput('new_version', newVersion)
}
