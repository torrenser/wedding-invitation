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
import { YAKDO_IMAGE } from "@/assets/images";

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

      {/* 추가 안내 섹션 */}
      <div className="mt-8 px-4">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-1.5 text-sm">
          📍 추가 안내
        </h4>
        <img
          src={YAKDO_IMAGE}
          alt="청주동산교회 약도"
          loading="lazy"
          className="w-full rounded-xl shadow-sm border border-gray-100 mb-4"
        />
        <ul className="space-y-2.5 text-xs text-gray-600 bg-gray-50 rounded-xl p-4">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">•</span>
            <span>예식은 <strong className="text-gray-800">본당 2층</strong>에서 진행됩니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">•</span>
            <span>신부대기실은 <strong className="text-gray-800">본당 3층</strong>에 마련되어 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">•</span>
            <span>연회장은 <strong className="text-gray-800">동산교육문화센터 1층</strong>에 준비되어 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">•</span>
            <span>샬롬카페는 <strong className="text-gray-800">샬롬관 2층</strong>에 위치해 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">•</span>
            <span>편의를 위해 <strong className="text-gray-800">각 건물마다 엘리베이터</strong>가 설치되어 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">•</span>
            <span>ATM 기기는 <strong className="text-gray-800">탑동 센트럴 힐데스하임 아파트 정문 왼편</strong>에서 이용하실 수 있습니다.</span>
          </li>
        </ul>
      </div>
    </WeddingSection>
  );
}