import { Cover } from "@/components/cover";
import { InvitationText } from "@/components/invitationText";
import { AudioPlayer } from "@/components/audioPlayer";
import { WeddingSchedule } from "@/components/schedule";
import { WeddingGallery } from "@/components/gallery";
import { WeddingLocation } from "@/components/location";
import { GuestBook } from "@/components/guestBook";
import { Separator } from "@/components/ui/separator";
import { WeddingEvent } from "@/components/events";
import { MoneyGift } from "@/components/moneyGift";
import { Footer } from "@/components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] bg-white shadow-xl min-h-screen flex flex-col relative">
        <Cover />

        <InvitationText />

        <Separator />

        <WeddingSchedule />

        <Separator />

        <WeddingGallery />

        <Separator />

        <WeddingLocation />

        <Separator />

        <WeddingEvent />

        <Separator />

        <MoneyGift />

        <Separator />

        <GuestBook />

        <Separator />

        <Footer />

        <AudioPlayer src={`${import.meta.env.BASE_URL}bgm.mp3`} />
      </div>
    </div>
  );
}