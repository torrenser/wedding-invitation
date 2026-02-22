import cover from "@/assets/images/cover.png";

export function Cover() {
  return (
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
  );
}