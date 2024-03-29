import * as fs from 'fs'
import * as yaml from 'yaml'

type PubspecContent = {
  version: string
}

const pubspecPath = 'pubspec.yaml'

export function readPubspec(): PubspecContent {
  const pubspecContent = fs.readFileSync(pubspecPath, 'utf-8')

  try {
    const pubspecData = yaml.parse(pubspecContent) as PubspecContent
    return pubspecData
  } catch (error) {
    throw new Error('Error parsing pubspec.yaml')
  }
}

export function writeUpdatedVersion(newVersion: string): void {
  const originalYaml = fs.readFileSync(pubspecPath, 'utf-8')
  const originalDocument = yaml.parseDocument(originalYaml)

  originalDocument.set('version', newVersion)

  const updatedYaml = originalDocument.toString()

  fs.writeFileSync(pubspecPath, updatedYaml, 'utf-8')
}
