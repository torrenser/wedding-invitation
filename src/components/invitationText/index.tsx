import { TypingAnimation } from "@/components/ui/typing-animation"

export function InvitationText() {
  const lines = [
    "사랑은 오래 참고, 사랑은 온유하며",
    "서로를 있는 그대로 품어주는 마음이라 믿습니다.",
    "저희 두 사람이 하나 되어 새로운 시작을 맞이합니다.",
    "서로를 향한 변함없는 마음으로",
    "기쁠 때나 어려울 때나 서로의 손을 놓지 않고,",
    "언제나 함께 걸어가는 부부가 되겠습니다.",
    "믿음 안에서 시작하는 약속의 자리에",
    "귀한 걸음으로 함께하시어",
    "축복해 주시면 감사하겠습니다.",
  ]
  const typeSpeed = 50 // TypingAnimation 기본값

  return (
    <section
      className="py-20 px-8 text-center flex flex-col items-center justify-center space-y-8"
    >
      <div className="text-sm">
        {lines.map((line, i) => {
          const prevDelay = lines.slice(0, i).join("").length * typeSpeed
          return (
            <p
              key={i}
              className={`text-gray-600 leading-snug ${lines[i - 1]?.endsWith(".") ? "mt-4" : "mt-1"
                }`}
            >
              <TypingAnimation
                showCursor={false}
                typeSpeed={typeSpeed}
                delay={prevDelay}
                className="text-sm text-gray-600"
              >
                {line}
              </TypingAnimation>
            </p>
          )
        })}
      </div>
    </section>
  );
}