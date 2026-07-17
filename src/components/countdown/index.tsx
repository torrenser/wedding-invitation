import { useEffect, useState } from "react";
import { FlipUnit } from "@/components/8starlabs-ui/flip-clock";

const WEDDING_DATE = new Date("2026-10-10T13:00:00+09:00");

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function UnitGroup({ label, digits }: { label: string; digits: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[0.58rem] font-semibold tracking-[0.15em] text-gray-400 uppercase">
        {label}
      </span>
      <div className="flex gap-0.5">
        {digits.split("").map((d, i) => (
          <FlipUnit key={i} digit={d} size="sm" variant="muted" />
        ))}
      </div>
    </div>
  );
}

function Colon() {
  return (
    <span className="text-xl font-bold text-gray-300 mt-[22px] select-none">
      :
    </span>
  );
}

export function WeddingCountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isAfter = Date.now() >= WEDDING_DATE.getTime();

  if (isAfter) {
    const daysAfter = Math.floor(
      (Date.now() - WEDDING_DATE.getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
      <div className="flex flex-col items-center gap-3 pt-8 pb-2 w-full">
        <p className="text-[0.65rem] tracking-[0.2em] text-primary font-medium uppercase">
          Our Wedding Was
        </p>
        <p className="text-3xl font-bold text-gray-800">{daysAfter} days ago</p>
        <p className="text-xs text-gray-500">
          석영, 예진이 결혼한 지 {daysAfter}일이 지났습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 pt-8 pb-2 w-full overflow-hidden">
      <p className="text-[0.65rem] tracking-[0.2em] text-primary font-medium uppercase">
        Our Wedding Begins In
      </p>
      <div className="flex items-start gap-1.5">
        <UnitGroup label="DAYS" digits={String(time.days).padStart(2, "0")} />
        <Colon />
        <UnitGroup label="HOUR" digits={String(time.hours).padStart(2, "0")} />
        <Colon />
        <UnitGroup label="MIN" digits={String(time.minutes).padStart(2, "0")} />
        <Colon />
        <UnitGroup label="SEC" digits={String(time.seconds).padStart(2, "0")} />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        석영, 예진의 결혼식이 <span className="font-semibold text-gray-700">{time.days}일</span> 남았습니다.
      </p>
    </div>
  );
}
