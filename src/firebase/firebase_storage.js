import { ref, uploadBytes } from 'firebase/storage'
import firebaseConfig from './firebase_config.js'

const { storage } = firebaseConfig

const uploadFile = async (file, filename) => {
    const storageRef = ref(storage, filename)
    const res = await uploadBytes(storageRef, file)
    return res
}

const fireStorage = {
    uploadFile,
}

export default fireStorage
