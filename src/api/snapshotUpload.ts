import { UPLOAD_KEY } from "@/env";
/**
 * Supabase Edge Function을 통해 파일을 업로드합니다.
 * @param file - 업로드할 File 객체
 * @param guestName - 하객 이름
 */
export const uploadFile = async (
  file: File,
  guestName: string,
): Promise<void> => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  if (!SUPABASE_URL) {
    throw new Error("Supabase URL is not defined in environment variables.");
  }
  const UPLOAD_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/drive-upload`;

  const form = new FormData();
  form.append("file", file);
  form.append("guestName", guestName);

//   let token: string | undefined;

//   try {
//     const authData: { refresh_token: string } = await queryClient.fetchQuery({
//       queryKey: ["adminCheck"],
//       queryFn: checkAdminToken,
//       staleTime: 0, // 무조건 새로 불러오거나 검증
//     });
//     token = authData?.refresh_token;
//   } catch (error) {
//     console.error("Admin check failed:", error);
//   }

//   if (!token) {
//     throw new Error("신랑 계정으로 로그인이 필요합니다. 신");
//   }

  try {
    const response = await fetch(UPLOAD_FUNCTION_URL, {
      method: "POST",
      headers: {
        "x-upload-key": UPLOAD_KEY,
      },
      body: form,
    });
    if (!response.ok) {
      // 서버에서 보낸 에러 메시지를 파싱합니다.
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error occurred on server." }));
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText} - ${
          errorData.message || "No error message"
        }`,
      );
    }
    console.log(
      `File '${file.name}' uploaded successfully for guest '${guestName}'.`,
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // UI에서 에러를 처리할 수 있도록 다시 throw합니다.
  }
};
