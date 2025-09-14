# Contributing to youtube-link-utils

Thank you for your interest in contributing to youtube-link-utils! This document provides guidelines for contributing to this open source project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive to all community members
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git version control
- A GitHub account

### Setting up the development environment

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/youtube-link-utils.git
   cd youtube-link-utils
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

### Development Commands

- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run build` - Build the library
- `npm run dev` - Build in watch mode for development
- `npm run lint` - Check code style
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run quality` - Run lint and format checks
- `npm run quality:fix` - Auto-fix lint and format issues
- `npm run coverage` - Run tests with coverage report
- `npm run clean` - Clean build artifacts

## How to Contribute

### Reporting Bugs

Before creating a bug report, please:

- Check existing issues to avoid duplicates
- Try to reproduce the issue with the latest version

When filing a bug report, include:

- **Clear title**: Describe the issue concisely
- **Steps to reproduce**: Detailed steps to recreate the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Node.js version, browser, operating system
- **Code examples**: Minimal reproducible example
- **Screenshots**: If applicable

### Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature has already been suggested in issues
- Explain the use case and why it would be valuable
- Consider how it fits with the library's scope and goals
- Be open to discussion about implementation approaches
- Consider backward compatibility implications

### Pull Requests

#### Before submitting a pull request:

1. **Run tests** and ensure they all pass:

   ```bash
   npm test
   ```

2. **Run linting** and fix any issues:

   ```bash
   npm run lint
   npm run lint:fix  # auto-fix when possible
   ```

3. **Check code formatting**:

   ```bash
   npm run format:check
   npm run format  # auto-fix formatting
   ```

4. **Run quality checks** (combines lint and format):

   ```bash
   npm run quality
   npm run quality:fix  # auto-fix all issues
   ```

5. **Build the project** successfully:

   ```bash
   npm run build
   ```

6. **Update documentation** if needed:
   - Update README.md for new features
   - Update TypeScript type definitions

7. **Update CHANGELOG.md**: Add your changes under the `[Unreleased]` section

#### Pull request guidelines:

- **Clear title**: Use a descriptive title that explains the change
- **Detailed description**: Explain what changes you made and why
- **Link related issues**: Use "Fixes #123", "Closes #123", or "Addresses #123"
- **Stay focused**: Keep PRs focused on a single feature or fix when possible
- **Add tests**: Include tests for new functionality or bug fixes
- **Update docs**: Update relevant documentation
- **Mark breaking changes**: Clearly indicate any breaking changes

#### Pull request template:

GitHub will automatically populate new pull requests with our template (located at `.github/PULL_REQUEST_TEMPLATE.md`). The template includes sections for:

- **Description**: Brief overview of changes
- **Type of change**: Bug fix, feature, breaking change, etc.
- **Related Issue**: Link to relevant issues
- **Testing**: Confirmation of test coverage and execution
- **Documentation**: Updates to docs and type definitions
- **Checklist**: Code quality and review items

Please fill out all relevant sections when creating your pull request.

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: Follow existing code formatting (Prettier + ESLint)
- **Naming**: Use meaningful, descriptive variable and function names
- **Functions**: Keep functions small, focused, and pure when possible
- **Types**: Provide comprehensive type definitions

### Testing Requirements

- **Unit tests**: Write tests for all new functionality
- **Test coverage**: Maintain high test coverage
- **Test names**: Use descriptive test names that explain the scenario
- **Edge cases**: Test both success and error cases
- **Mocking**: Mock external dependencies appropriately (like axios)
- **Browser compatibility**: Consider testing in different environments

### Documentation Standards

- **README.md**: Update for new features with usage examples
- **Type definitions**: Include TypeScript definitions for all public APIs
- **Examples**: Provide clear usage examples
- **Changelog**: Document all changes in CHANGELOG.md

### Commit Message Convention

Use conventional commit format for clear change history:

```
type(scope): brief description

[optional longer description]

[optional footer with breaking changes or issue references]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests

**Examples:**

```
feat: add playlist URL validation support
fix: handle malformed URLs gracefully in extractYouTubeVideoId
docs: update React hook usage examples
test: add edge cases for URL parsing
refactor: simplify video ID extraction logic
```

## Library Architecture

### Core Principles

- **Browser-first**: Designed to work in browsers with Node.js compatibility
- **Minimal dependencies**: Keep external dependencies to a minimum
- **Type safety**: Full TypeScript support with comprehensive types
- **Tree-shaking**: Support for tree-shaking in bundlers
- **Peer dependencies**: Use peer dependencies for optional features

### File Structure

- `src/`: Source code
  - `utils/`: Core utility functions
  - `react/`: React-specific hooks and components
  - `types.ts`: TypeScript type definitions
  - `consts.ts`: Constants and configuration
- `tests/`: Test files mirroring src structure
- Configuration files for build, lint, and test tools

## Release Process

Releases are handled by maintainers following semantic versioning:

- **Patch** (1.0.1): Bug fixes, minor improvements
- **Minor** (1.1.0): New features, backward compatible changes
- **Major** (2.0.0): Breaking changes

The release process includes:

1. Update version in package.json
2. Update CHANGELOG.md with release notes
3. Create git tag
4. Publish to npm
5. Create GitHub release

## Getting Help

If you need help or have questions:

- **Check documentation**: README.md and code comments
- **Search issues**: Look for similar questions or problems
- **Create an issue**: Use the "question" label for general questions
- **Discussion**: Use GitHub Discussions for broader topics

## Recognition

All contributors will be recognized in our README.md and release notes. We appreciate every contribution, whether it's code, documentation, bug reports, or feature suggestions!

Thank you for helping make youtube-link-utils better! 🎉

---

_This contributing guide is inspired by open source best practices and is designed to create a welcoming environment for all contributors._
