import { useEffect } from "react";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useAdminAuth, checkAdminToken, checkAuthPopup } from "@/api/googleAuth";
import { useQuery } from "@tanstack/react-query";

export function Footer() {
  const { isSuccess, refetch } = useQuery({
    queryKey: ["adminCheck"],
    queryFn: checkAdminToken,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    checkAuthPopup();
  }, []);

  // 인증 성공 시 실행될 콜백 함수
  const handleAuthSuccess = () => {
    alert("관리자 인증에 성공했습니다.");
    refetch(); // 인증 성공 후 토큰을 다시 가져옵니다.
  };

  // 훅을 사용하여 팝업을 여는 함수를 가져옵니다.
  const openLoginPopup = useAdminAuth(handleAuthSuccess);

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
      {isSuccess ? (
        <div className="mt-4 text-xs text-green-600">✅ 관리자로 로그인되었습니다.</div>
      ) : (
        /* 관리자(신랑) 인증용 링크 */
        <button onClick={openLoginPopup} className="mt-4 text-[10px] text-gray-300 hover:text-gray-500 transition-colors bg-transparent border-none cursor-pointer">
          Admin Login
        </button>
      )}
    </footer>
  );
}   