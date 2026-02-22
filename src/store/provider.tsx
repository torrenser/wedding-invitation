import { useState, useEffect, type ReactNode } from "react";
import { GoogleContext } from "./context";
import { initGIS, signIn, signOut } from "./services/googleAuth";
import { uploadFiles } from "./services/googleAPI";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window.google !== "undefined" && window.google.accounts) {
        clearInterval(interval);
        initGIS((response) => {
          if (response && response.access_token) {
            setIsSignedIn(true);
          }
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsSignedIn(false);
  };

  return (
    <GoogleContext.Provider
      value={{
        isSignedIn,
        signIn,
        signOut: handleSignOut,
        uploadFiles,
      }}
    >
      {children}
    </GoogleContext.Provider>
  );
};