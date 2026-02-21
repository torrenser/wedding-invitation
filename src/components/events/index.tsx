import { WeddingSection } from "@/components/section";
import { EventItem, GuestSnapEvent } from "./SnapShotEvent";

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
          subtitle="행운의 주인공은 누구?"
        >
          <div className="p-8 text-center text-gray-500 text-sm">
            준비 중입니다.
          </div>
        </EventItem>
      </div>
    </WeddingSection>
  );
}