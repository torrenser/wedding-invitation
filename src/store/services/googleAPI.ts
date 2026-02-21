export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']

export const initGapiClient = async () => {
	await gapi.client.init({
		apiKey: API_KEY,
		discoveryDocs: DISCOVERY_DOCS,
	})
}

export const listFiles = async (): Promise<gapi.client.drive.File[]> => {
	try {
		const response = await gapi.client.drive.files.list({
			pageSize: 10,
			fields: 'nextPageToken, files(id, name, mimeType)',
		})
		return response.result.files || []
	} catch (error) {
		console.error('Error listing files:', error)
		throw new Error('Failed to retrieve files from Google Drive.')
	}
}

export const uploadFile = async (file: File, folderId: string) => {
	const accessToken = gapi.client.getToken().access_token
	const metadata = {
		name: file.name,
		mimeType: file.type,
		parents: [folderId],
	}

	const form = new FormData()
	form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
	form.append('file', file)

	const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
		method: 'POST',
		headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
		body: form,
	})

	if (!response.ok) {
		throw new Error('Failed to upload file')
	}

	return await response.json()
}

export const uploadFiles = async (
  files: File[],
  guestName: string,
  onProgress: (progress: number) => void,
) => {
  if (typeof gapi === 'undefined') {
    throw new Error('Google API script not loaded')
  }

  if (!gapi.client) {
    await new Promise<void>((resolve) => gapi.load('client', resolve))
  }

  if (!gapi.client.drive) {
    await initGapiClient()
  }

  // 1. Find the parent 'wedding' folder.
  const parentFolderQuery = "mimeType='application/vnd.google-apps.folder' and name='wedding' and trashed=false";
  const parentFolderSearch = await gapi.client.drive.files.list({
    q: parentFolderQuery,
    fields: 'files(id)',
    spaces: 'drive',
  });

  if (!parentFolderSearch.result.files || parentFolderSearch.result.files.length === 0) {
    throw new Error("Parent 'wedding' folder not found in Google Drive.");
  }
  const parentFolderId = parentFolderSearch.result.files[0].id;

  if (!parentFolderId) {
    throw new Error("Could not get parent 'wedding' folder ID.");
  }

  // 2. Find or create the guest-specific subfolder.
  let guestFolderId: string | undefined;
  const guestFolderQuery = `mimeType='application/vnd.google-apps.folder' and name='${guestName}' and '${parentFolderId}' in parents and trashed=false`;
  const guestFolderSearch = await gapi.client.drive.files.list({
    q: guestFolderQuery,
    fields: 'files(id)',
    spaces: 'drive',
  });

  if (guestFolderSearch.result.files && guestFolderSearch.result.files.length > 0) {
    guestFolderId = guestFolderSearch.result.files[0].id;
  } else {
    const folderMetadata = {
      name: guestName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };
    const folderCreationRes = await gapi.client.drive.files.create({
      resource: folderMetadata,
      fields: 'id',
    });
    guestFolderId = folderCreationRes.result.id;
  }

  if (!guestFolderId) {
    throw new Error(`Could not create or find folder for guest: ${guestName}`);
  }

  // 3. Upload files to the new subfolder and report progress.
  const totalFiles = files.length;
  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];
    await uploadFile(file, guestFolderId);
    const progress = Math.round(((i + 1) / totalFiles) * 100);
    if (onProgress) {
      onProgress(progress);
    }
  }
}