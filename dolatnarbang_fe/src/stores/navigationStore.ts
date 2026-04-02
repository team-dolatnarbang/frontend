import { create } from 'zustand'

type Page = 'loading' | 'onboarding' | 'map' | 'detail'

interface NavigationStore {
  page: Page
  selectedPlaceId: number
  goTo: (page: Page, placeId?: number) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  page: 'loading',
  selectedPlaceId: 1,
  goTo: (page, placeId) =>
    set((state) => ({
      page,
      selectedPlaceId: placeId ?? state.selectedPlaceId,
    })),
}))
