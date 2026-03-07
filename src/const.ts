import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-10-10 14:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "청주동산교회"
export const LOCATION_ADDRESS = "충청북도 청주시 상당구 탑동로 22"
export const LOCATION_BUS_GUIDE_1 = "센트럴시티(서울) <-> 청주대정류소"
export const LOCATION_BUS_GUIDE_2 = "수원버스터미널 <-> 청주시외버스터미널"
export const LOCATION_TRAIN_GUIDE_1 = "오송역"
export const LOCATION_TRAIN_GUIDE_2 = "택시 이용 (약 30분 소요), 버스 이용 (약 1시간 소요)"
export const LOCATION_PARKING_GUIDE = "청주동산교회 주차장"

export const KMAP_TIMESTAMP = "1772860552032"
export const KMAP_MAPKEY = "iv6u85kapkw"
export const TMAP_URL = "https://tmap.life/779fa60a"
export const NMAP_URL = "https://naver.me/56DHiDGb"
export const KMAP_URL = "https://kko.to/ggsCNT5mlq"

export const BRIDE_FULLNAME = "00"
export const BRIDE_FIRSTNAME = "00"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "000"
export const BRIDE_MOTHER = "000"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-0000-0000",
    account: "우리은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
]

export const GROOM_FULLNAME = "000"
export const GROOM_FIRSTNAME = "00"
export const GROOM_TITLE = "차남"
export const GROOM_FATHER = "000"
export const GROOM_MOTHER = "000"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-0000-0000",
    account: "케이뱅크 00000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "국민은행 000000000000",
  },
]

export const ADMIN_EMAIL = "whdlsdnwedding@gmail.com"