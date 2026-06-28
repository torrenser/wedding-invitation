import { motion } from "motion/react"

export function InvitationText() {
  const paragraphs = [
    [
      "사랑은 오래 참고, 사랑은 온유하며",
      "서로를 있는 그대로 품어주는 마음이라 믿습니다.",
    ],
    [
      "저희 두 사람이 하나 되어 새로운 시작을 맞이합니다.",
      "서로를 향한 변함없는 마음으로",
      "기쁠 때나 어려울 때나 서로의 손을 놓지 않고,",
      "언제나 함께 걸어가는 부부가 되겠습니다.",
    ],
    [
      "믿음 안에서 시작하는 약속의 자리에",
      "귀한 걸음으로 함께하시어",
      "축복해 주시면 감사하겠습니다.",
    ],
  ]

  // 각 문단의 fade-in delay: 이전 문단 줄 수 × 줄당 노출 시간
  const lineDelay = 0.8 // 줄 하나 당 초
  let cumulativeDelay = 0

  return (
    <section className="py-16 px-8 flex flex-col items-start justify-center space-y-6">
      {paragraphs.map((lines, pi) => (
        <motion.div
          key={pi}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: pi * 1.2 }} // 문단마다 1.2초 간격
          className="text-left space-y-1"
        >
          {lines.map((line, li) => (
            <p key={li} className="text-md text-gray-600 leading-relaxed">
              {line}
            </p>
          ))}
        </motion.div>
      ))}
    </section>
  )
}