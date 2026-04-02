type BadgeColorPalette = 'primary' | 'hint' | 'danger' | 'success' | 'warning' | 'contrast'

export interface Place {
  id: number
  name: string
  location: string
  locationColor: BadgeColorPalette
  category: string
  categoryColor: BadgeColorPalette
  memory: {
    narrator: string
    title: string
  }
  record: string
  buttonLabel: string
  imageGradient: string
}

export const places: Place[] = [
  {
    id: 1,
    name: '수악 주둔소',
    location: '서귀포시',
    locationColor: 'primary',
    category: '유적지',
    categoryColor: 'warning',
    memory: {
      narrator: '김철수 할아버지',
      title: '산에서 내려오지 못했던 그해 겨울',
    },
    record:
      '초토화 작전으로 마을을 잃은 주민들이 한라산으로 피신했던 날,\n군경토벌대는 주민들을 억압하기 위해 수악주둔소를 세웠습니다',
    buttonLabel: '들어보기',
    imageGradient: 'from-stone-600 via-stone-700 to-stone-900',
  },
  {
    id: 2,
    name: '고산 국민학교',
    location: '제주시',
    locationColor: 'success',
    category: '사적지',
    categoryColor: 'danger',
    memory: {
      narrator: '김철수 할아버지',
      title: '산에서 내려오지 못했던 그해 겨울',
    },
    record:
      '초토화 작전으로 마을을 잃은 주민들이 한라산으로 피신했던 날,\n군경토벌대는 주민들을 억압하기 위해 수악주둔소를 세웠습니다',
    buttonLabel: '들어보기',
    imageGradient: 'from-green-700 via-green-800 to-green-950',
  },
  {
    id: 3,
    name: '너븐 숭이',
    location: '조천읍',
    locationColor: 'contrast',
    category: '기념관',
    categoryColor: 'hint',
    memory: {
      narrator: '김철수 할아버지',
      title: '산에서 내려오지 못했던 그해 겨울',
    },
    record:
      '초토화 작전으로 마을을 잃은 주민들이 한라산으로 피신했던 날,\n군경토벌대는 주민들을 억압하기 위해 수악주둔소를 세웠습니다',
    buttonLabel: '들어보기',
    imageGradient: 'from-slate-600 via-slate-700 to-slate-900',
  },
  {
    id: 4,
    name: '관덕정',
    location: '제주시',
    locationColor: 'success',
    category: '역사 유적',
    categoryColor: 'contrast',
    memory: {
      narrator: '김철수 할아버지',
      title: '산에서 내려오지 못했던 그해 겨울',
    },
    record:
      '초토화 작전으로 마을을 잃은 주민들이 한라산으로 피신했던 날,\n군경토벌대는 주민들을 억압하기 위해 수악주둔소를 세웠습니다',
    buttonLabel: '들어보기',
    imageGradient: 'from-yellow-700 via-yellow-800 to-yellow-950',
  },
  {
    id: 5,
    name: '주정 공장',
    location: '제주시',
    locationColor: 'success',
    category: '기념관',
    categoryColor: 'hint',
    memory: {
      narrator: '김철수 할아버지',
      title: '산에서 내려오지 못했던 그해 겨울',
    },
    record:
      '초토화 작전으로 마을을 잃은 주민들이 한라산으로 피신했던 날,\n군경토벌대는 주민들을 억압하기 위해 수악주둔소를 세웠습니다',
    buttonLabel: '들어보기',
    imageGradient: 'from-zinc-600 via-zinc-700 to-zinc-900',
  },
]
