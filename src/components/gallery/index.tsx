import { useState } from "react";
import { WeddingSection } from "@/components/section";
import { GALLERY_IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function WeddingGallery() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, GALLERY_IMAGES.length));
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  return (
    <WeddingSection title="GALLERY" subtitle="우리의 아름다운 순간들" className="bg-gray-50">
      <div className="grid grid-cols-2 gap-2">
        {visibleImages.map((src, index) => (
          <div
            key={index}
            className="aspect-[3/4] bg-gray-200 rounded-md overflow-hidden relative cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
             {/* <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                Image {index + 1}
             </div> */}
             <img src={src} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover relative transition-transform hover:scale-105 duration-300" />
          </div>
        ))}
      </div>

      {visibleCount < GALLERY_IMAGES.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={handleLoadMore} className="px-8">
            더 보기
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] bg-transparent border-none shadow-none p-0 flex items-center justify-center">
          <div className="sr-only">
            <DialogTitle>Gallery Lightbox</DialogTitle>
            <DialogDescription>
              Image {selectedIndex + 1} of {GALLERY_IMAGES.length}
            </DialogDescription>
          </div>
          <Carousel
            opts={{
              startIndex: selectedIndex,
              loop: true,
            }}
            className="w-full max-w-md"
          >
            <CarouselContent>
              {GALLERY_IMAGES.map((src, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <div className="relative w-full h-[70vh]">
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/20 hover:bg-white/40 border-none text-white" />
            <CarouselNext className="right-2 bg-white/20 hover:bg-white/40 border-none text-white" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </WeddingSection>
  );
}