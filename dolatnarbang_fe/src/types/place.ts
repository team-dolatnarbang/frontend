// 1. GET /sites - 목록 아이템
export interface SiteSummary {
  id: string;
  order: number;
  name: string;
  latitude: number;
  longitude: number;
  thumbnailUrl: string;
  shortDescription: string;
}

export interface SiteListResponse {
  sites: SiteSummary[];
}

// 2. GET /sites/:id - 상세
export interface ElderStory {
  text: string;
  audioUrl: string;
  contributorLabel: string;
}

export interface SiteDetail {
  id: string;
  order: number;
  name: string;
  latitude: number;
  longitude: number;
  imageUrls: string[];
  descriptionText: string;
  narrationAudioUrl: string;
  narrationDurationSec: number;
  unlocked: boolean;
  listenCompleted: boolean;
  elderStory: ElderStory | null;
}

// 3. POST /sites/:id/complete-listen
export interface CompleteListenRequest {
  durationListenedSec?: number;
}

export interface CompleteListenResponse {
  siteId: string;
  listenCompleted: boolean;
  nextSiteId: string | null;
}
