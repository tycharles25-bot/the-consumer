// localStorage-based cache for video data during the upload flow
type VideoData = {
  blobUrl: string;
  base64: string;
  frames: string[];
  thumbnail?: string;
};

const STORAGE_KEY = 'the_consumer_video_cache';

export function cacheVideoData(data: VideoData) {
  if (typeof window !== 'undefined') {
    try {
      // Store in localStorage for persistence across page reloads
      const toStore = {
        blobUrl: data.blobUrl,
        base64: data.base64, // Can be R2 key or base64
        frames: data.frames,
        thumbnail: data.thumbnail || ''
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      console.log('📦 Video cached:', data.base64.startsWith('data:') ? 'base64' : 'R2-key');
    } catch (e) {
      console.error('Failed to cache video data:', e);
    }
  }
}

export function getCachedVideoData(): VideoData | null {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          blobUrl: parsed.blobUrl,
          base64: parsed.base64,
          frames: parsed.frames,
          thumbnail: parsed.thumbnail || undefined
        };
      }
    } catch (e) {
      console.error('Failed to get cached video data:', e);
    }
  }
  return null;
}

export function clearCachedVideoData() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear cached video data:', e);
    }
  }
}

