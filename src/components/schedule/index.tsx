import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { WeddingSection } from "@/components/section";

export function WeddingSchedule() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  // 10월 10일이 토요일이 되도록 가상의 달력 데이터 구성 (예: 1일은 목요일)
  const dates = [
    null, null, null, null, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31
  ];

  return (
    <WeddingSection title="WEDDING DAY" subtitle="10월 10일 토요일 오후 2시" className="bg-white">
      <Card className="w-full border-none shadow-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
            {days.map((day, i) => (
              <div key={day} className={`${i === 0 ? "text-red-500" : "text-gray-500"} font-medium`}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {dates.map((date, i) => (
              <div key={i} className="flex items-center justify-center aspect-square">
                {date === 10 ? (
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                    {date}
                  </div>
                ) : (
                  <span className={`${i % 7 === 0 ? "text-red-500" : "text-gray-700"}`}>
                    {date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </WeddingSection>
  );
}