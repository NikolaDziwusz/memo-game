# GitHub Actions Workflow

This repository uses a GitHub Actions workflow for continuous integration, security scanning, and automated deployment to GitHub Pages.

## Workflow Overview

The workflow (`.github/workflows/deploy.yml`) consists of three main jobs:

### 1. Security Scan Job (`security-scan`)
- **Purpose**: Analyzes the codebase for security vulnerabilities and code quality issues
- **Tool**: GitHub CodeQL with JavaScript/TypeScript analysis
- **Queries**: Uses both `security-extended` and `security-and-quality` query suites
- **Triggers**: Runs on every push to main and on pull requests

### 2. Build Job (`build`)
- **Purpose**: Builds the React application and prepares it for deployment
- **Dependencies**: Runs after security scan completes successfully
- **Output**: Creates deployment artifacts in the `./dist` directory
- **Caching**: Uses pnpm for efficient dependency management

### 3. Deploy Job (`deploy`)
- **Purpose**: Deploys the built application to GitHub Pages
- **Condition**: Only runs on pushes to the main branch (not on PRs)
- **Environment**: Uses the `github-pages` environment for deployment protection
- **Method**: Uses official GitHub Pages deployment actions

## Key Features

- **Modern GitHub Pages Deployment**: Uses the official `actions/deploy-pages@v4` action instead of third-party alternatives
- **Security-First Approach**: All code is scanned before deployment
- **Efficient Builds**: Uses pnpm with proper caching for faster builds
- **Environment Protection**: Deploys only from main branch with proper permissions
- **Concurrency Control**: Prevents multiple simultaneous deployments

## Permissions

The workflow uses minimal required permissions:
- `contents: read` - To checkout code
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For OIDC authentication
- `security-events: write` - To upload security scan results
- `actions: read` - To read workflow artifacts

## Configuration

To use this workflow:
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Ensure the `base` path in `vite.config.ts` matches your repository name
4. The workflow will automatically run on pushes to main

## Local Development

To test the build process locally:
```bash
pnpm install
pnpm run lint
pnpm run build
pnpm run preview
```