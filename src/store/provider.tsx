/* eslint-disable @typescript-eslint/no-explicit-any */

import { type PropsWithChildren, useState, useEffect } from "react"
import { GoogleContext } from "./context"
import { initGIS, signIn as gisSignIn, signOut as gisSignOut } from './services/googleAuth'
import { initGapiClient, listFiles, uploadFiles } from './services/googleAPI'

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const waitForGoogleLibraries = () => {
      return new Promise<void>((resolve, reject) => {
        let attempts = 0
        const maxAttempts = 50
        const checkLibraries = () => {
          attempts++
          // Check if both gapi and google.accounts are available
          if (typeof gapi !== 'undefined' && typeof google !== 'undefined' && google.accounts) {
            resolve()
          } else if (attempts >= maxAttempts) {
            reject(new Error('Google libraries failed to load. Please check your internet connection and refresh the page.'))
          } else {
            setTimeout(checkLibraries, 100)
          }
        }
        checkLibraries()
      })
    }

    const initializeGoogleLibraries = async () => {
      try {
        console.log('[StoreProvider] Starting Google initialization...')
        await waitForGoogleLibraries()
        console.log('[StoreProvider] Google libraries loaded.')
        try {
          await new Promise<void>(resolve => gapi.load('client', resolve))
          await initGapiClient()
          console.log('[StoreProvider] GAPI client initialized.')
        } catch (gapiError) {
          console.warn('[StoreProvider] GAPI init warning (might be re-init):', gapiError)
        }
        initGIS(tokenResponse => {
          console.log('[StoreProvider] Token response received:', tokenResponse)
          if (tokenResponse && tokenResponse.access_token) {
            gapi.client.setToken({ access_token: tokenResponse.access_token })
            setIsSignedIn(true)
            console.log('[StoreProvider] Signed in successfully.')
          }
        })
        setIsInitialized(true)
        setError(null)
        console.log('[StoreProvider] Initialization complete.')
      } catch (error) {
        console.error('[StoreProvider] Error initializing Google libraries:', error)
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to initialize Google Services. Please refresh the page and try again.'
        setError(errorMessage)
        setIsInitialized(false)
      }
    }

    initializeGoogleLibraries()
  }, [])

  const signIn = () => {
    console.log('[StoreProvider] signIn requested')
    gisSignIn()
  }

  const signOut = () => {
    console.log('[StoreProvider] signOut requested')
    if (typeof gapi !== 'undefined' && gapi.client) {
      gapi.client.setToken(null)
    }
    setIsSignedIn(false)
    gisSignOut()
  }

  return (
    <GoogleContext.Provider value={{ isSignedIn, signIn, signOut, listFiles, uploadFiles }}>
      {children}
    </GoogleContext.Provider>
  )
}
