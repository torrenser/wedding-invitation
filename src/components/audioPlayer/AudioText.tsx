import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01FreeIcons as ArrowRightIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

interface AudioTextProps {
  onClick: () => void;
}

export function AudioText({ onClick }: AudioTextProps) {
  return (
    <div className="fixed top-4 right-16 flex items-center justify-center z-50" onClick={onClick}>
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>🔔 음악이 준비되었습니다.</span>
          <HugeiconsIcon icon={ArrowRightIcon} size={16} className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  )
}