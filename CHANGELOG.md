# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-09-30

### Added

- Enhanced TypeScript support with `typesVersions` configuration for better module resolution
- Improved React submodule type definitions with dedicated type mapping for `@genway-ai/youtube-link-utils/react`

## [1.0.0] - 2025-09-14

### Added

- Initial release of youtube-link-utils
- YouTube URL validation functionality (`isValidYouTubeUrl`)
- Video ID extraction from various YouTube URL formats (`extractYouTubeVideoId`)
- YouTube to embed URL conversion (`convertYouTubeToEmbedUrl`)
- Video information fetching via oEmbed API (`getYouTubeVideoInfo`)
- Comprehensive URL validation with existence checking (`validateYouTubeUrlComprehensive`)
- React hook for YouTube URL validation with loading states (`useYouTubeValidationLoading`)
- Full TypeScript support with type definitions
- Browser, Node.js, and CommonJS compatibility
- CDN distribution for browser usage

### Features

- Support for multiple YouTube URL formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`
  - `https://www.youtube.com/playlist?list=PLAYLIST_ID`
- Browser-first design with minimal dependencies
- Peer dependency model for axios and React
- Comprehensive test coverage with Vitest
- ESLint and TypeScript configuration
- Build system with tsup for multiple output formats
