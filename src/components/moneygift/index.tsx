import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon as ArrowDownIcon,
} from "@hugeicons/core-free-icons";
import { WeddingSection } from "@/components/section";
import { GROOM_INFO, BRIDE_INFO } from "@/const";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AccountItem = ({ info }: { info: typeof GROOM_INFO[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(() => {
        alert("복사에 실패했습니다.");
    });
  };

  return (
    <div className="border-b last:border-b-0">
      <div
        className={cn(
          "flex justify-between items-center p-4 cursor-pointer transition-colors",
          isOpen ? "bg-gray-50" : "hover:bg-gray-50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{info.relation}</span>
            <span className="text-sm text-gray-600">{info.name}</span>
        </div>
        <HugeiconsIcon
          icon={ArrowDownIcon}
          size={16}
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        />
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t text-sm">
          <div className="flex justify-between items-center bg-white p-3 rounded border">
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 mb-1">은행 / 계좌번호</span>
                <span className="text-gray-800">{info.account}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-2 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(info.account);
              }}
            >
              복사
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export function MoneyGift() {
  return (
    <WeddingSection title="마음 전하실 곳" subtitle="축하의 마음을 전해주세요" className="bg-white">
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-4 py-3 border-b">
            <span className="text-sm font-bold text-gray-700">신랑측</span>
          </div>
          {GROOM_INFO.map((info, idx) => (
            <AccountItem key={idx} info={info} />
          ))}
        </div>
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-4 py-3 border-b">
            <span className="text-sm font-bold text-gray-700">신부측</span>
          </div>
          {BRIDE_INFO.map((info, idx) => (
            <AccountItem key={idx} info={info} />
          ))}
        </div>
      </div>
    </WeddingSection>
  );
}