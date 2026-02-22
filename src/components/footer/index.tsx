import { SparklesText } from "@/components/ui/sparkles-text";

export function Footer() {
  return (
    <footer className="py-8 bg-gray-50 flex flex-col items-center justify-center">
      <p className="text-xs text-gray-500 mb-2">Created, Designed by</p>
      <div className="flex items-start gap-1">
        <span className="text-[10px] text-gray-400 -rotate-6 animate-pulse mb-1">
          (AI 를 곁들인)
        </span>
        <SparklesText className="text-2xl font-medium [&_strong]:font-medium" sparklesCount={4}>
          새 신랑
        </SparklesText>
      </div>
    </footer>
  );
}   