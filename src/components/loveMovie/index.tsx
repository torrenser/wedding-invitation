import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react"

interface LoveMovieSectionProps {
  videoUrl: string
}

const TITLE = "our love story"

export function LoveMovieSection({ videoUrl }: LoveMovieSectionProps) {
  const containerRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<"idle" | "typing" | "video">("idle")
  const [visibleCount, setVisibleCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.95 && phase === "idle") setPhase("typing")
    // 화면에서 거의 벗어났을 때만 초기화하여 스크롤 중 끊김 현상 방지
    if (v < 0.15 && phase !== "idle") {
      setPhase("idle")
      setVisibleCount(0)
    }
  })

  // 글자 순차 등장 로직
  useEffect(() => {
    if (phase !== "typing") return

    setVisibleCount(0)

    let i = 0
    const timer = setInterval(() => {
      i += 1
      setVisibleCount(i)

      if (i >= TITLE.length) {
        clearInterval(timer)
        // 다 써진 후 잠깐 대기 → 영상으로 전환
        setTimeout(() => setPhase("video"), 900)
      }
    }, 120) // 글자당 120ms

    return () => clearInterval(timer)
  }, [phase])

  // 비디오 재생 시점 제어 (처음부터 재생 시작)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (phase === "video") {
      video.currentTime = 0
      video.play().catch((err) => {
        console.warn("Video playback started, but autoplay was blocked or failed:", err)
      })
    } else {
      video.pause()
    }
  }, [phase])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden bg-black"
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      <div className="relative w-full overflow-hidden">

        {/* 비디오 재생 (비디오의 원래 비율에 맞춰 가로세로가 자동 조절됨) */}
        <video
          ref={videoRef}
          className={`w-full h-auto object-contain transition-opacity duration-1000 ${
            phase === "video" ? "opacity-100" : "opacity-0"
          }`}
          src={videoUrl}
          muted
          loop
          playsInline
          controls
        />

        {/* 타이핑 오버레이 */}
        <AnimatePresence>
          {phase !== "video" && (
            <motion.div
              key="typing-bg"
              className="absolute inset-0 bg-black flex items-center justify-center z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
            >
              <p className="font-continous text-3xl tracking-[0.25em] text-white/90">
                {TITLE.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={
                      i < visibleCount
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 6 }
                    }
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}