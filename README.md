# Pump Pubspec Version

This action helps you to bump the version of your pubspec.yaml file.

## Usage

The following is an example .github/workflows/main.yml that will execute when a push to the main branch occurs.

## Usage

The following is an example `.github/workflows/main.yml` that will execute when a `push` to the `main` branch occurs.

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v3
        - uses: ricardodalarme/bump-pubspec-version@main
            with:
            mode: "major" # major, minor, patch
            github_token: ${{ secrets.GITHUB_TOKEN }}
```

This **order** is important!

```yaml
- uses: actions/checkout@v3
- uses: ricardodalarme/bump-pubspec-version@main
```

> If the repository is not checked out first, the script cannot find the properties file.
> The token needs to have permissions to push to the repository.
