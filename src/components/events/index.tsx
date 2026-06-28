import { WeddingSection } from "@/components/section";
import { EventItem, GuestSnapEvent } from "./SnapShotEvent";
import { LuckyDrawEvent } from "./LuckyDrawEvent";

export function WeddingEvent() {
  return (
    <WeddingSection title="EVENT" subtitle="함께 즐기는 특별한 순간" className="bg-white">
      <div className="space-y-4">
        <EventItem
          title="이벤트 1. 게스트스냅"
          subtitle="신랑·신부의 행복한 순간을 담아주세요"
        >
          <GuestSnapEvent />
        </EventItem>
        <EventItem
          title="이벤트 2. 럭키드로우"
          subtitle="참석해 주신 분들을 위한 감사 이벤트"
        >
          <LuckyDrawEvent />
        </EventItem>
      </div>
    </WeddingSection>
  );
}