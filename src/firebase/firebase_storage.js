import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import firebaseConfig from './firebase_config.js'

const { storage } = firebaseConfig

const uploadFile = async (file, filename) => {
    const storageRef = ref(storage, filename)
    await uploadBytes(storageRef, file)

    const uploadURL = await getDownloadURL(storageRef)
    return uploadURL
}

const fireStorage = {
    uploadFile,
}

export default fireStorage
