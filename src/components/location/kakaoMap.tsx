import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    daum?: {
      roughmap?: {
        Lander: new (options: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => { render: () => void };
      };
    };
  }
}

interface KakaoMapProps {
  timestamp: string;
  mapKey: string;
  className?: string;
}

type MapStatus = "loading" | "ready" | "error";

export default function KakaoMap({
  timestamp,
  mapKey,
  className,
}: KakaoMapProps) {
  const containerId = `daumRoughmapContainer${timestamp}`;
  const [status, setStatus] = useState<MapStatus>("loading");
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;

    const initMap = () => {
      try {
        if (!window.daum?.roughmap?.Lander) {
          throw new Error("roughmap SDK not available");
        }
        new window.daum.roughmap.Lander({
          timestamp,
          key: mapKey,
          mapWidth: "350",
          mapHeight: "200"
        }).render();
        rendered.current = true;
        setStatus("ready");
      } catch (e) {
        console.error("[KakaoMap] 초기화 실패:", e);
        setStatus("error");
      }
    };

    const intervalId = setInterval(() => {
      if (window.daum?.roughmap?.Lander) {
        clearInterval(intervalId);
        initMap();
      }
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      if (!rendered.current) {
        console.error("[KakaoMap] SDK loading timeout");
        setStatus("error");
      }
    }, 5000); // 5 seconds timeout

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [timestamp, mapKey]);

  return (
    <div className="relative !w-full aspect-video rounded-lg overflow-hidden">
        <div
        id={containerId}
        className={cn(
            "root_daum_roughmap root_daum_roughmap_landing",
            className
        )}
        >
        {status === "loading" && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        {status === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-500 text-sm">
            <span className="text-3xl">🗺️</span>
            <span>지도를 불러오지 못했어요</span>
            <a
                href={`https://map.kakao.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[13px] text-[#FFCD00]"
            >
                카카오맵에서 보기 →
            </a>
            </div>
        )}
        </div>
    </div>
  );
}