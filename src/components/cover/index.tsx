import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import cover from "@/assets/images/cover.png";

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
            backgroundImage: `url(${cover})`,
            scale: bgScale,
            filter: bgFilter,
            opacity: bgOpacity,
          }}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.div
          className="text-center text-white px-6 will-change-transform"
          style={{
            y: textY,
            opacity: textOpacity,
            filter: textFilter,
          }}
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-md tracking-widest">
            우리 결혼합니다.
          </h1>
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