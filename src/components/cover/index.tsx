import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { COVER_IMAGE, HAPPY_WEDDING_WHITE } from "@/assets/images";

export function Cover() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // 배경: scale up + blur + fade
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
  const bgBlur = useTransform(scrollYProgress, [0, 0.6], [0, 18])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgFilter = useTransform(bgBlur, (v) => `blur(${v}px)`)

  // 텍스트: 위로 이동 + blur + fade
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-40%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const textBlur = useTransform(scrollYProgress, [0, 0.45], [0, 10])
  const textFilter = useTransform(textBlur, (v) => `blur(${v}px)`)

  // 스크롤 힌트 fade
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-gray-200 overflow-hidden">
        <motion.div
          className="absolute -inset-[12%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${COVER_IMAGE})`,
            scale: bgScale,
            filter: bgFilter,
            opacity: bgOpacity,
          }}
        />
        <div className="relative z-10 w-full h-full flex items-start justify-center pt-24">
        <motion.div
          className="text-center will-change-transform max-w-[280px] mx-4"
          style={{
            y: textY,
            opacity: textOpacity,
            filter: textFilter,
          }}
        >
          <img
            src={HAPPY_WEDDING_WHITE}
            alt="Happy Wedding"
            className="w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
        </div>
        {/* 스크롤 힌트 */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{ opacity: hintOpacity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
          <span className="font-mono text-[0.62rem] tracking-[0.28em] uppercase text-white/80">
            scroll
          </span>
        </motion.div>
    </div>
  );
}