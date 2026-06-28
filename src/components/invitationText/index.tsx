import { TypingAnimation } from "@/components/ui/typing-animation"
import { DiaTextReveal } from "@/components/ui/dia-text-reveal"

export function InvitationText() {
  const text = `사랑은 오래 참고, 사랑은 온유하며
서로를 있는 그대로 품어주는 마음이라 믿습니다.
저희 두 사람이 하나 되어 새로운 시작을 맞이합니다.
서로를 향한 변함없는 마음으로
기쁠 때나 어려울 때나 서로의 손을 놓지 않고,
언제나 함께 걸어가는 부부가 되겠습니다.
믿음 안에서 시작하는 약속의 자리에
귀한 걸음으로 함께하시어
축복해 주시면 감사하겠습니다.`
  const typeSpeed = 50 // TypingAnimation 기본값
  const typingDelay = text.length * typeSpeed // ms 단위

  return (
    <section className="py-20 px-8 text-center flex flex-col items-center justify-center space-y-8 bg-white">
      <h2 className="text-lg font-bold text-primary tracking-wide mb-6">
        소중한 분들을 초대합니다.
      </h2>
      <div className="space-y-5 text-gray-600 leading-loose text-sm">
        <TypingAnimation className="whitespace-pre-line text-gray-600 leading-snug text-sm" typeSpeed={typeSpeed}>
          {text}
        </TypingAnimation>
        <div className="flex justify-center mt-4">
          <DiaTextReveal
            className="text-sm font-bold tracking-tight"
            colors={["#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"]}
            delay={typingDelay / 1000}
            duration={1.5}
            text="- 예비신랑 석영이와 예비신부 예진이가 -"
          />
        </div>
      </div>
    </section>
  );
}