import { createContext } from "react"

export interface GoogleContextProps {
  isSignedIn: boolean
  signIn: () => void
  signOut: () => void
  listFiles: () => Promise<any[]>
  uploadFiles: (files: File[], guestName: string) => Promise<void>
}

export const GoogleContext = createContext<GoogleContextProps>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  listFiles: async () => [],
  uploadFiles: async () => {},
})