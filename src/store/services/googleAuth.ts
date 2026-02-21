export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const SCOPES = 'https://www.googleapis.com/auth/drive.file'

let tokenClient: any
let accessToken: string | null = null

export const initGIS = (callbackTc: (nR: any) => void) => {
	try {
		if (!CLIENT_ID) {
			throw new Error('VITE_GOOGLE_CLIENT_ID is not defined in environment variables')
		}

		if (!google || !google.accounts || !google.accounts.oauth2) {
			throw new Error('Google Identity Services not available')
		}

		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: (response: any) => {
				if (response.error) {
					console.error('Token client error:', response.error)
					return
				}
				if (response.access_token) {
					accessToken = response.access_token
				}
				callbackTc(response)
			},
		})
	} catch (error) {
		console.error('Failed to initialize Google Identity Services:', error)
		throw error
	}
}

export const signIn = () => {
	console.log('[Auth Service] signIn called. TokenClient initialized:', !!tokenClient)
	// GIS triggers the popup
	if (tokenClient) {
		tokenClient.requestAccessToken()
	} else {
		console.error('[Auth Service] Cannot sign in: TokenClient is null')
	}
}

export const signInWithConsent = () => {
	if (tokenClient) tokenClient.requestAccessToken({ prompt: 'consent' })
}

export const signOut = () => {
	if (accessToken) {
		google.accounts.oauth2.revoke(accessToken, () => {
			console.log('Access token revoked')
		})
		accessToken = null
	}
}

export const getAccessToken = () => accessToken