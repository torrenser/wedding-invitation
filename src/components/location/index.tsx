import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeddingSection } from "@/components/section";

export function WeddingLocation() {
  return (
    <WeddingSection title="LOCATION" subtitle="오시는 길" className="bg-white">
      <Card className="w-full mb-6 shadow-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg">여디디야 컨벤션 웨딩홀</CardTitle>
          <CardDescription>서울시 강남구 테헤란로 416</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
           <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
             지도 영역
           </div>
           <div className="grid grid-cols-3 gap-2">
             <Button variant="outline" size="sm" className="w-full text-xs" asChild>
               <a href="#" target="_blank" rel="noreferrer">네이버 지도</a>
             </Button>
             <Button variant="outline" size="sm" className="w-full text-xs" asChild>
               <a href="#" target="_blank" rel="noreferrer">카카오 맵</a>
             </Button>
             <Button variant="outline" size="sm" className="w-full text-xs" asChild>
               <a href="#" target="_blank" rel="noreferrer">구글 맵</a>
             </Button>
           </div>
        </CardContent>
      </Card>

      <div className="space-y-6 text-sm text-gray-600 px-2">
        <div>
          <h4 className="font-bold text-gray-900 mb-1">지하철</h4>
          <p>2호선 선릉역 1번 출구 도보 5분</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">버스</h4>
          <p>간선 146, 333, 341, 360, 740</p>
          <p>지선 4434</p>
        </div>
      </div>
    </WeddingSection>
  );
}