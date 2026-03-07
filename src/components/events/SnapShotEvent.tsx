import { useState, useEffect, type ReactNode } from "react";
import { uploadFile } from "@/api/snapshotUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export function EventItem({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div
        className={cn(
          "flex justify-between items-center p-4 cursor-pointer transition-colors",
          isOpen ? "bg-gray-50" : "hover:bg-gray-50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">{title}</span>
          <span className="text-xs text-gray-500">{subtitle}</span>
        </div>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={20}
          className={cn("transition-transform duration-200 text-gray-400", isOpen && "rotate-180")}
        />
      </div>
      {isOpen && <div className="border-t bg-white">{children}</div>}
    </div>
  );
}

export function GuestSnapEvent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-6 text-center space-y-6">
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-primary">📸 저희의 스냅 작가가 되어주세요! 📸</h4>
        <div className="text-sm text-gray-600 leading-relaxed space-y-4">
          <p>신랑 신부의 아름다운 모습들을 사진으로 남겨주세요!</p>
          <ul className="text-left inline-block space-y-1 text-xs bg-gray-50 p-4 rounded-lg mx-auto">
            <li>1. 신부 대기실 사진</li>
            <li>2. 웃고 있는 신랑신부</li>
            <li>3. 마주 보는 신랑신부</li>
            <li>4. 신랑 입장</li>
            <li>5. 신부 입장</li>
            <li>6. 축가 사진</li>
            <li>7. 신랑신부 행진</li>
            <li>8. '예술이란 이런 것이다' 한 컷</li>
          </ul>
          <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 font-medium">
            🎁 미션 수행자 중 가장 멋진 컷을<br/>
            남겨주신 분께 치킨 기프티콘을 쏩니다!
          </div>
          <p className="text-xs text-gray-500">
            당일, 아래 공유 버튼을 통해 올려주세요!<br/>
            많은 참여 부탁드려요! 💖
          </p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger render={
          <Button className="w-full">사진 업로드 하기</Button>
        } />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>게스트 스냅 업로드</DialogTitle>
            <DialogDescription>
              멋진 사진을 공유해주세요!
            </DialogDescription>
          </DialogHeader>
          <UploadForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function UploadForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !files || files.length === 0) {
      alert("이름과 사진을 모두 입력해주세요.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const fileList = Array.from(files);
      const totalFiles = fileList.length;
      let completedCount = 0;

      // 병렬 업로드 처리 및 진행률 업데이트
      await Promise.all(fileList.map(async (file) => {
        await uploadFile(file, name);
        completedCount++;
        setProgress(Math.round((completedCount / totalFiles) * 100));
      }));

      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("업로드가 완료되었습니다! 참여해 주셔서 감사합니다.");
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={uploading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="files">사진 선택 (다중 선택 가능)</Label>
        <Input
          id="files"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden border bg-gray-100">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {files && files.length > 0 && (
            <div className="text-xs text-gray-500">
                {files.length}개의 파일 선택됨
            </div>
        )}
      </div>

      {uploading && (
        <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
                <span>업로드 중...</span>
                <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={uploading}>
          취소
        </Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? "업로드 중..." : "업로드"}
        </Button>
      </div>
    </form>
  );
}
