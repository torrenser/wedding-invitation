import { useCallback, useEffect, useState } from "react";
import { ADMIN_EMAIL } from "@/const";

/**
 * 관리자 인증 팝업을 관리하고 인증 성공을 처리하는 React Custom Hook.
 * @param onSuccess - 인증 성공 시 호출될 콜백 함수.
 */
export const useAdminAuth = (onSuccess: () => void) => {
  const [popup, setPopup] = useState<Window | null>(null);

  const openLoginPopup = useCallback(() => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

    if (!SUPABASE_URL) {
      console.error("Supabase URL is missing.");
      alert("환경 변수 설정이 누락되었습니다.");
      return;
    }

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newPopup = window.open(
      `${SUPABASE_URL}/functions/v1/auth-init`,
      "google_auth_popup",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setPopup(newPopup);
  }, []);

  useEffect(() => {
    if (!popup) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === "auth-success") {
        onSuccess();
        popup.close();
        setPopup(null);
      }
    };

    const checkPopupInterval = setInterval(() => {
      if (popup.closed) {
        setPopup(null); // 팝업이 닫히면 state를 업데이트하여 effect cleanup을 트리거합니다.
      }
    }, 500);

    window.addEventListener("message", handleMessage);

    // 컴포넌트가 unmount되거나 popup state가 변경될 때 리스너와 인터벌을 정리합니다.
    return () => {
      clearInterval(checkPopupInterval);
      window.removeEventListener("message", handleMessage);
    };
  }, [popup, onSuccess]);

  return openLoginPopup;
};

export const checkAdminToken = async () => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const response = await fetch(`${SUPABASE_URL}/functions/v1/check_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_prefix: ADMIN_EMAIL }),
  });

  if (!response.ok) {
    throw new Error("Admin check failed");
  }

  const data = await response.json();
  return data;
};

export const checkAuthPopup = () => {
  if (typeof window !== "undefined" && window.opener) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "success") {
      window.opener.postMessage("auth-success", window.location.origin);
      window.close();
    }
  }
};