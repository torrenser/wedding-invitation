import { AudioPlayer } from "@/components/audioPlayer";
import { WeddingSchedule } from "@/components/schedule";
import { WeddingGallery } from "@/components/gallery";
import { WeddingLocation } from "@/components/location";
import { GuestBook } from "@/components/guestBook";
import { Separator } from "@/components/ui/separator";
import { WeddingEvent } from "@/components/events";
import { MoneyGift } from "@/components/moneyGift";
import cover from "@/assets/images/cover.png";
import bgm from "@/assets/sounds/bgm.mp3";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] bg-white shadow-xl min-h-screen flex flex-col relative">
        {/* Cover Section */}
        <div className="relative w-full h-[600px] bg-gray-200">
          <img
            src={cover}
            alt="Wedding Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-16 left-0 w-full flex justify-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-md tracking-widest">
              우리 결혼합니다.
            </h1>
          </div>
        </div>

        {/* Invitation Text Section */}
        <section className="py-20 px-8 text-center flex flex-col items-center justify-center space-y-8 bg-white">
          <h2 className="text-lg font-bold text-primary tracking-wide mb-2">
            소중한 분들을 초대합니다.
          </h2>
          <div className="space-y-3 text-gray-600 leading-loose text-sm">
            <p>포근한 바람이 머물던 봄,</p>
            <p>서로에게 작은 쉼이 되어 준 두 사람이</p>
            <p>계절을 함께 지나오며</p>
            <p>겨울의 깊은 온기 속에서 하나의 결실을 맺고자 합니다.</p>
            <br />
            <p className="text-base font-semibold text-gray-800">
              10월 10일 토요일,
            </p>
            <br />
            <p>저희의 첫걸음을 축복해 주신다면</p>
            <p>그 따스한 마음을 두 사람의 삶 속에 간직하겠습니다.</p>
          </div>
        </section>

        <Separator />

        {/* Wedding Schedule Section */}
        <WeddingSchedule />

        <Separator />

        {/* Gallery Section */}
        <WeddingGallery />

        <Separator />

        {/* Location Section */}
        <WeddingLocation />

        <Separator />

        <WeddingEvent />

        <Separator />

        <MoneyGift />

        <Separator />

        <GuestBook />

        {/* Audio Player */}
        <AudioPlayer src={bgm} />
      </div>
    </div>
  );
}