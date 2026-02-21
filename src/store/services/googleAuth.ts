export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const SCOPES = 'https://www.googleapis.com/auth/drive.file'

let tokenClient: google.accounts.oauth2.TokenClient
let accessToken: string | null = null

export const initGIS = (callbackTc: (nR: google.accounts.oauth2.TokenResponse) => void) => {
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
			callback: response => {
				if (response.error) {
					console.error('Token client error:', response.error)
					return
				}
				if (response.access_token) {
					accessToken = response.access_token
					// 로그인 성공 시 gapi client에도 토큰을 설정하여 googleAPI.ts에서 사용할 수 있게 함
					if (typeof gapi !== 'undefined' && gapi.client) {
						gapi.client.setToken(response as any)
					}
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