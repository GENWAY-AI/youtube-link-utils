# youtube-link-utils

Tiny browser-first utilities to extract and validate YouTube video links.

## Installation

```bash
npm install @genway-ai/youtube-link-utils
```

## Usage

### Node.js / ES Modules

```javascript
import {
  isValidYouTubeUrl,
  extractYouTubeVideoId,
  convertYouTubeToEmbedUrl,
  getYouTubeVideoInfo,
} from '@genway-ai/youtube-link-utils';

// Basic validation
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
console.log(isValidYouTubeUrl(url)); // true

// Extract video ID
const videoId = extractYouTubeVideoId(url);
console.log(videoId); // 'dQw4w9WgXcQ'

// Convert to embed URL
const embedUrl = convertYouTubeToEmbedUrl(url);
console.log(embedUrl); // 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1...'

// Fetch video information (requires axios)
const videoInfo = await getYouTubeVideoInfo(url);
console.log(videoInfo?.title); // Video title
```

### CommonJS

```javascript
const {
  isValidYouTubeUrl,
  extractYouTubeVideoId,
} = require('@genway-ai/youtube-link-utils');

const isValid = isValidYouTubeUrl('https://youtu.be/dQw4w9WgXcQ');
console.log(isValid); // true
```

### Browser (CDN)

```html
<script src="https://unpkg.com/@genway-ai/youtube-link-utils/dist/index.browser.js"></script>
<script>
  const { isValidYouTubeUrl, extractYouTubeVideoId } = YouTubeLinkUtils;

  const isValid = isValidYouTubeUrl(
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  );
  console.log(isValid); // true
</script>
```

## API Reference

### `isValidYouTubeUrl(url: string): boolean`

Validates if a URL is a valid YouTube URL format.

### `extractYouTubeVideoId(url: string): string | null`

Extracts the video ID from a YouTube URL.

### `convertYouTubeToEmbedUrl(url: string): string | null`

Converts a YouTube URL to an embed URL.

### `getYouTubeVideoInfo(url: string): Promise<VideoInfo | null>`

Fetches video information from YouTube's oEmbed API. **Requires axios**.

### `validateYouTubeUrlComprehensive(url: string, checkExists?: boolean): Promise<YouTubeValidationResult>`

Comprehensive validation with optional existence check.

## Peer Dependencies

This package requires `axios` for network-related functions:

```bash
npm install axios
```

For browser-only usage (validation/parsing), axios is not required.

## Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/playlist?list=PLAYLIST_ID`

## TypeScript

This package includes full TypeScript definitions.

```typescript
import type { YouTubeValidationResult } from '@genway-ai/youtube-link-utils';
```
