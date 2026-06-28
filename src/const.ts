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

export const KMAP_TIMESTAMP = "1772860552032"
export const KMAP_MAPKEY = "iv6u85kapkw"
export const TMAP_URL = "https://tmap.life/779fa60a"
export const NMAP_URL = "https://naver.me/56DHiDGb"
export const KMAP_URL = "https://kko.to/ggsCNT5mlq"

export const BRIDE_FULLNAME = "이예진"
export const BRIDE_FATHER = "이성득"
export const BRIDE_MOTHER = "최재희"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-0000-0000",
    account: "지역농축협 356049-42-84643",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "국민은행 022-21-0621-593",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "하나은행 168-890402-48407",
  },
]

export const GROOM_FULLNAME = "조석영"
export const GROOM_FATHER = "조인석"
export const GROOM_MOTHER = "이미현"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-0000-0000",
    account: "케이뱅크 100-102-700086",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "지역농협 173555-56-142901",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "토스뱅크 1000-3518-6592",
  },
]

export const ADMIN_EMAIL = "whdlsdnwedding@gmail.com"