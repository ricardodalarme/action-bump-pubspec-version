const bumpModes = ['major', 'minor', 'patch'] as const
export type BumpMode = (typeof bumpModes)[number]

export class Version {
  major: number
  minor: number
  patch: number
  code?: number

  constructor(value: String, considerCode: boolean) {
    const [version, code] = value.split('+')
    const splittedVersion = version.split('.').map(part => parseInt(part))

    if (splittedVersion.length !== 3 || splittedVersion.some(Number.isNaN)) {
      throw new Error('Invalid version format')
    }

    const [major, minor, patch] = splittedVersion

    this.major = major
    this.minor = minor
    this.patch = patch

    if (considerCode) {
      const parsedCode = code === undefined ? 0 : parseInt(code)

      if (Number.isNaN(parsedCode)) {
        throw new Error('Invalid code format')
      }
      this.code = parsedCode
    }
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

    if (this.code !== undefined) {
      this.code += 1
    }
  }

  toString(): string {
    const version = `${this.major}.${this.minor}.${this.patch}`
    return this.code === undefined ? version : `${version}+${this.code}`
  }
}

export function parseBumpMode(value: string): BumpMode {
  if (bumpModes.includes(value as BumpMode)) {
    return value as BumpMode
  }
  throw new Error('That is not a BumpMode.')
}
