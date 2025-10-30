// In-memory cache for video data during the upload flow
type VideoData = {
  blobUrl: string;
  base64: string;
  frames: string[];
  thumbnail?: string;
};

let cachedVideoData: VideoData | null = null;

export function cacheVideoData(data: VideoData) {
  cachedVideoData = data;
}

export function getCachedVideoData(): VideoData | null {
  return cachedVideoData;
}

export function clearCachedVideoData() {
  cachedVideoData = null;
}

