const versionModes = ['major', 'minor', 'patch'] as const
export type BumpMode = (typeof versionModes)[number]

export class Version {
  major: number
  minor: number
  patch: number

  constructor(version: String) {
    const splittedVersion = version.split('.').map(part => parseInt(part))

    if (splittedVersion.length !== 3) {
      throw new Error('Invalid version format')
    }
    const [major, minor, patch] = splittedVersion

    this.major = major
    this.minor = minor
    this.patch = patch
  }

  bump(versionParam: BumpMode): void {
    switch (versionParam) {
      case 'major':
        this.major += 1
        this.minor = 0
        this.patch = 0
        break
      case 'minor':
        this.minor += 1
        this.patch = 0
        break
      case 'patch':
        this.patch += 1
        break
    }
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`
  }
}

export function parseVersionMode(value: string): BumpMode {
  if (versionModes.includes(value as BumpMode)) {
    return value as BumpMode
  }
  throw new Error('That is not a sheep name.')
}
