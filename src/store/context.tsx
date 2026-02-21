import { createContext } from "react";

interface GoogleContextType {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  uploadFiles: (files: File[], guestName: string, onProgress: (progress: number) => void) => Promise<void>;
}

export const GoogleContext = createContext<GoogleContextType>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  uploadFiles: async () => {},
});