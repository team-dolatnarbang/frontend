export interface Place {
  // uuid
  id: string

  // 몇번째 마커
  order: number
  
  // 이미지
  imageUrl: string

  // 뱃지
  name: string // 메인 이름
  region: string // 지역 - 제주시
  detailRegion: string // 기념관, 유적지

  contributorLabel: string // 시니어 이름

  title: string // 제목

  acRecord: string // 사건 기록
  
  
  // + 들어보기 page

  subTitle: string // 부제목
  
  // 오디오
  narrationAudioUrl: string
  narrationDurationSec: number

  // 상태
  unlocked: boolean
  listenCompleted: boolean

  // 음성
  elderStory: {
    audioUrl: string // 오디오
    Longtext: string // 나레이션
  }

  acInfoTitle: string // 사건 정보 제목
  acInfoDate: string // 사건 정보 날짜
  acInfoText: string // 사건 정보 글

  acImageUrl: string[] // 사건 현장 살펴보기 3개 사진
}

export const places: Place[] = [
  {
    id: '1',
    order: 1,
    imageUrl: '/images/map/제주시.svg',

    name: '주정 공장',
    region: '제주시',
    detailRegion: '기념관',

    contributorLabel: '양치권 할아버지',
    title: '굴뚝 너머로 사라진 아버지',

    acRecord: `주정 공장 수용자들은 불법 군법 회의로 인해, 육지 형무소로 끌려가
끝내 돌아오지 못하고, 6.25직후 보도 연맹학살로 희생되었습니다.`,

    subTitle: `양치권 할아버지의 1949년의 기억`,

    narrationAudioUrl: '',
    narrationDurationSec: 0,

    unlocked: false,
    listenCompleted: false,

    elderStory: {
      audioUrl: '',
      Longtext: `그날 아버지는 그냥 끌려갔어
그때 나는 열두 살이었어. 아버지가 아침에 밭에 나가려고 문을 여는데, 군인들이 이미 마당 앞에 와 있었어. 아무 말도 없이 그냥 데려가는 거야.
어머니가 어디 가느냐고 물었더니, 잠깐 조사하고 온다고 했어. 그 말 믿었지. 우리도 믿었고, 아버지도 믿었을 거야.
근데 며칠이 지나도 안 오는 거야. 주정공장에 있다는 말을 나중에 동네 사람한테 들었어. 면회도 안 됐어. 뭘 잘못했는지도 몰랐고.
그러다 육지로 보냈다는 말이 들려왔어. 형무소라고 했어. 그게 마지막이었어.
6·25가 터지고 나서, 그 사람들 다 죽였다는 걸 나중에야 알았어. 재판도 없이.
아버지 얼굴을 이제 잘 기억도 못 해. 근데 있잖아, 너희는 기억해줘. 내가 잊어가는 걸, 너희가 대신 기억해줬으면 해. 그게 우리한테 남은 사람들이 할 수 있는 전부야.`,
    },

    acInfoTitle: '주정공장 수용소',
    acInfoDate: '1948.12',
    acInfoText: '중산간 마을에서 붙잡혀 온 도민들을 수용하고 고문 및 즉결 처형했던 비극의 현장입니다. 선무 공작에 속아 하산한 주민들이 재판이나 형무소로 압송되거나 처형당했습니다.',

    acImageUrl: ['/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg']
  },

  {
    id: '2',
    order: 2,
    imageUrl: '/images/map/제주시.svg',

    name: '너븐 숭이',
    region: '조천읍',
    detailRegion: '기념관',

    contributorLabel: '고정순 할머니',
    title: '하얀 눈 위 핀 붉은 동백꽃 처럼',

    acRecord: `가장 많은 인명 희생을 가져온 북촌리 학살이 자행된 현장입니다
돌아가지 못한 영혼들이 임시 매장되어 애기무덤으로 남아있습니다`,

    subTitle: '고정순 할머니의 1949년의 기억',

    narrationAudioUrl: '',
    narrationDurationSec: 0,

    unlocked: false,
    listenCompleted: false,

    elderStory: {
      audioUrl: '',
      Longtext: `
그날 운동장에서
그날 아침, 총소리가 났어.
군인들이 집집마다 문을 두드렸어. 나오라고. 안 나오면 불 지른다고. 그러니까 다들 나왔지. 아기 업은 엄마도, 지팡이 짚은 할아버지도.
운동장에 마을 사람이 다 모였어. 기관총이 우리를 빙 둘러쌌고.
그러더니 50명씩 데리고 나가는 거야. 밭 쪽으로. 잠시 후에 총소리.
또 50명. 또 총소리.
우리 아버지는 세 번째였어.
나는 살았어. 왜 나만 살았는지, 그걸 아직도 몰라. 살아있는 게 더 무거웠어.
너븐숭이 애기무덤 있잖아. 거기 묻힌 애기들, 엄마 이름도 아버지 이름도 몰라. 그냥 거기 있어. 지금도.`,
    },

    acInfoTitle: '너븐숭이 아기 무덤',
    acInfoDate: '1949.01.17',
    acInfoText: '가장 많은 인명 희생을 가져온 북촌리 학살이 자행된 현장입니다. 어린아이나 무연고자들은 시신을 수숩되지 못하고 임시 매장되어 애기무덤으로 남아있습니다',

    acImageUrl: ['/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg']
  },

  {
    id: '3',
    order: 3,
    imageUrl: '/images/map/제주시.svg',

    name: '수악 주둔소',
    region: '서귀포시',
    detailRegion: '유적지',

    contributorLabel: '양자경 이모',
    title: '산에서 내려오지 못했던 그해 겨울',

    acRecord: `초토화 작전으로 마을을 잃은 주민들이 한라산으로 피신했던 날,
군경토벌대는 주민들을 억압하기 위해 수악 주둔소를 세웠습니다`,

    subTitle: '양자경 이모의 1949년의 기억',

    narrationAudioUrl: '',
    narrationDurationSec: 0,

    unlocked: false,
    listenCompleted: false,

    elderStory: {
      audioUrl: '',
      Longtext: `이모가 그런 말을 했어. 그때 스물둘이었다고.
경찰이 마을에 와서 산에 올라가야 한다고 했대. 여자라도 예외가 없었어. 거부할 수가 없었다고.
수악 주둔소에서 경계를 섰대. 낮에는 산을 뒤지고, 밤에는 차가운 돌담 안에서 잠을 잤다고. 이모가 그 돌담 얘기를 할 때마다 손을 꼭 쥐었어.
제일 힘든 건 싸우는 게 아니었대. 마을에서 밥이랑 반찬을 가파른 산길로 날라야 했는데, 할머니가 그 길을 오르내리는 게 제일 마음에 걸렸다고.
한번은 산에서 잡혀온 사람 중에 아는 얼굴이 있었대. 어릴 때 같이 놀던 친구였는데, 아무 말도 못 했다고.
이모는 그 얘기 끝에 항상 이렇게 말했어.
"그게 지금도 제일 부끄러워."
나는 그 말이 오래 마음에 남았어.`,
    },

    acInfoTitle: '수악 주둔소',
    acInfoDate: '1950.06',
    acInfoText: `초토화 작전으로 집을 잃은 주민들이 한라산으로 대피하자, 60여 명의 토벌대가 상주하며 한라산을 포위하여 강제로 경계나 부식 배송에 강제로 주민을 이용했습니다.`,

    acImageUrl: ['/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg']
  },

  {
    id: '4',
    order: 4,
    imageUrl: '/images/map/제주시.svg',

    name: '고산 국민 학교',
    region: '제주시',
    detailRegion: '시적지',

    contributorLabel: '임성배 할아버지',
    title: '운동장에 드리워진 그림자',

    acRecord: `아이들의 웃음소리가 들리던 학교는 한경면 주민들을 가두고 취조
하는 거대한 수용소가 되어 제주 인구 약 3만 명이 희생되었습니다`,

    subTitle: `임성배 할아버지의 1948년의 기억`,

    narrationAudioUrl: '',
    narrationDurationSec: 0,

    unlocked: false,
    listenCompleted: false,

    elderStory: {
      audioUrl: '',
      Longtext: `
어제까지 동무들과 뛰어놀던 운동장이었지. 
그런데 총을 든 군인들이 우리를 한 줄로 세우더니, 왼쪽으로, 오른쪽으로 가라고 했어.
그 손짓 하나에 내 친구는 집으로 가고, 내 삼촌은 다시 돌아오지 못할 길로 떠났단다.
그날 이후로 나한테 학교는 달라졌어. 운동장만 봐도 그 줄이 떠올랐거든. 아이들 웃음소리가 들려도, 난 그날의 침묵이 먼저 생각났어.
너희는 지금 이 운동장에서 뭘 하고 있니. 뛰어놀고, 친구랑 싸우고, 또 화해하고. 그게 얼마나 당연하지 않은 건지, 나는 알아. 그러니까 너희는 그 당연한 것들을 당연하게 여기지 말았으면 해. 그게 내가 너희한테 바라는 전부야.`,
    },

    acInfoTitle: '고산 국민 학교',
    acInfoDate: '1948.11.17',
    acInfoText: '4.3 사건의 중심에 있던 학교로, 주민들을 운동장에 강제로 끌어내어 일렬로 세우거나, 주민들을 학교에 집결 시키는 등, 학생들의 안전한 학교가 수용소로 변질 되었습니다.',

    acImageUrl: ['/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg']
  },

  {
    id: '5',
    order: 5,
    imageUrl: '/images/map/제주시.svg',

    name: '관덕정',
    region: '제주시',
    detailRegion: '역사 유적',

    contributorLabel: '고순희 할머니',
    title: '그  마당이 무얼 봤는지',

    acRecord: `1947년 3·1절, 기마경찰의 말발굽에 어린이가 치였다. 경찰의 
발포로 주민 6명이 숨졌고, 그것이 4·3의 도화선이 되었습니다.`,

    subTitle: '고순희 할머니의 1947년의 기억',

    narrationAudioUrl: '',
    narrationDurationSec: 0,

    unlocked: false,
    listenCompleted: false,

    elderStory: {
      audioUrl: '',
      Longtext: `나 그때 열 살이었어. 관덕정 앞에 사람이 엄청 모였거든. 3·1절이니까. 근데 갑자기 말이 달려오는 거야. 크고 무서운 말. 사람들이 막 피하고 난리가 났지.
그러다 탕, 소리가 났어. 사람들이 쓰러지는 거 봤어. 내 옆에 있던 아줌마가 나를 확 안고 엎드렸거든. 땅에 코를 박고 있는데 발소리, 울음소리, 그리고 쓰러진 사람들.
나는 그때 분명히 알았어. 말 때문이 아니라는 걸. 처음부터 우리를 향한 거였다는 걸.
관덕정 마당은 그날을 다 봤어. 나도 봤고. 우리 둘 다 잊지 않을 거야.`,
    },

    acInfoTitle: '관덕정',
    acInfoDate: '1947.03.31',
    acInfoText: `1947년 3·1절, 기마경찰의 말발굽에 어린이가 치였다. 
경찰의 발포로 주민 6명이 숨졌고, 그것이 4·3의 도화선이 되었습니. 이후 이곳은 무장대 사령관 이덕구의 시신이 효수된 장소로 역사에 남았습니다.`,

    acImageUrl: ['/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg', '/images/mapDetail/1/ac_1.svg']
  },
]