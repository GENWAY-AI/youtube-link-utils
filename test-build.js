// Simple test to verify the build works
import { extractYouTubeVideoId, isValidYouTubeUrl } from './dist/index.js';

console.log('Testing YouTube Link Utils...');

const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const isValid = isValidYouTubeUrl(testUrl);
const videoId = extractYouTubeVideoId(testUrl);

console.log(`URL: ${testUrl}`);
console.log(`Valid: ${isValid}`);
console.log(`Video ID: ${videoId}`);

if (isValid && videoId === 'dQw4w9WgXcQ') {
  console.log('✅ Basic validation test passed!');
} else {
  console.log('❌ Basic validation test failed!');
  process.exit(1);
}
