import { useRef, useEffect } from "react"

interface LoveMovieSectionProps {
  videoUrl: string
}

export function LoveMovieSection({ videoUrl }: LoveMovieSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => {
            console.warn("Video playback started, but autoplay was blocked or failed:", err)
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden bg-black"
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      <div className="relative w-full overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-auto object-contain"
          src={videoUrl}
          muted
          loop
          playsInline
          controls
        />
      </div>
    </div>
  )
}