export interface ElderStory {
  text: string
  audioUrl: string
  contributorLabel: string
}

export interface PlaceItem {
  id: string
  order: number
  name: string
  latitude: number
  longitude: number
  imageUrls: string[]
  descriptionText: string
  narrationAudioUrl: string
  narrationDurationSec: number
  unlocked: boolean
  listenCompleted: boolean
  elderStory: ElderStory
}
