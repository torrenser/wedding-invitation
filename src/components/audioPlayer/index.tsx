import { useState, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  VolumeLowIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { AudioText } from "./AudioText";

interface AudioPlayerProps {
  src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCanPlayThrough = () => {
    if (!isPlaying) {
      setShowText(true);
      setTimeout(() => setShowText(false), 60000); // 1분 후 텍스트 숨김
    }
  };

  return (
    <>
      {showText && <AudioText onClick={togglePlay} />}
      <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} src={src} loop onCanPlayThrough={handleCanPlayThrough} />
      <Button onClick={togglePlay} variant="outline" size="icon">
        {isPlaying ? (
          <HugeiconsIcon icon={VolumeLowIcon} size={16} />
        ) : (
          <HugeiconsIcon icon={PlayIcon} size={16} />
        )}
      </Button>
    </div>
    </>
  );
}