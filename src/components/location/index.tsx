import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeddingSection } from "@/components/section";
import KakaoMap from "@/components/location/kakaoMap";
import { KMAP_TIMESTAMP, KMAP_MAPKEY, TMAP_URL, NMAP_URL, KMAP_URL, LOCATION, LOCATION_ADDRESS } from "@/const";

export function WeddingLocation() {
  return (
    <WeddingSection title="LOCATION" subtitle="오시는 길" className="bg-white">
      <Card className="w-full mb-6 shadow-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg">{LOCATION}</CardTitle>
          <CardDescription>{LOCATION_ADDRESS}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <KakaoMap className="w-full h-48 rounded-md" timestamp={KMAP_TIMESTAMP} mapKey={KMAP_MAPKEY} />
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="w-full text-xs">
              <a href={TMAP_URL} target="_blank" rel="noreferrer">T 맵</a>
            </Button>
            <Button variant="outline" size="sm" className="w-full text-xs">
              <a href={NMAP_URL} target="_blank" rel="noreferrer">네이버 지도</a>
            </Button>
            <Button variant="outline" size="sm" className="w-full text-xs">
              <a href={KMAP_URL} target="_blank" rel="noreferrer">카카오 맵</a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6 text-sm text-gray-600 px-4 py-2">
        <div>
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
            🚌 시외버스 이용 시
          </h4>
          <div className="space-y-3 pl-1">
            <div>
              <p className="font-semibold text-gray-800 text-xs mb-1">▪️ 판교 ↔ 청주</p>
              <p className="text-xs text-gray-600 leading-relaxed pl-1">
                성남종합버스터미널 승차 → 청주시외버스터미널 하차 → 급행 509번 탑승 → 육거리 정류소 하차 → 도보 10분
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-xs mb-1">▪️ 수원 ↔ 청주</p>
              <p className="text-xs text-gray-600 leading-relaxed pl-1">
                수원버스터미널 승차 → 청주시외버스터미널 하차 → 시내버스 509번 탑승 → 육거리 정류소 하차 → 도보 10분
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
            🚄 KTX 이용 시
          </h4>
          <div className="pl-2 text-xs text-gray-600 leading-relaxed">
            오송역 하차 → 급행 509번 승차 → 육거리 정류소 하차 → 도보 10분
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
            🚗 자차 이용 시
          </h4>
          <div className="pl-2 text-xs text-gray-600 leading-relaxed">
            <p className="font-semibold text-gray-800 mb-1">네비게이션에 "청주동산교회" 검색</p>
            <p className="text-gray-500">(충북 청주시 상당구 탑동로 22)</p>
          </div>
        </div>
      </div>
    </WeddingSection>
  );
}