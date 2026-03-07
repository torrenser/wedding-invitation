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
import { KMAP_TIMESTAMP, KMAP_MAPKEY, TMAP_URL, NMAP_URL, KMAP_URL, LOCATION, LOCATION_ADDRESS, LOCATION_BUS_GUIDE_1, LOCATION_BUS_GUIDE_2, LOCATION_TRAIN_GUIDE_1, LOCATION_TRAIN_GUIDE_2, LOCATION_PARKING_GUIDE } from "@/const";

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
      <div className="space-y-6 text-sm text-gray-600 px-2">
        <div>
          <h4 className="font-bold text-gray-900 mb-1">버스 안내</h4>
          <p>{LOCATION_BUS_GUIDE_1}</p>
          <p>{LOCATION_BUS_GUIDE_2}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">기차 안내</h4>
          <p>{LOCATION_TRAIN_GUIDE_1}</p>
          <p>{LOCATION_TRAIN_GUIDE_2}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">주차 안내</h4>
          <p>{LOCATION_PARKING_GUIDE}</p>
        </div>
      </div>
    </WeddingSection>
  );
}