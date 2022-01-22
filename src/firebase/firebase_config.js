import admin from 'firebase-admin'
import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const {
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_APP_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env

const config = {
    projectId: FIREBASE_PROJECT_ID,
    credential: admin.credential.applicationDefault(),
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
}

const firebaseStore = initializeApp(config)
const firebaseApp = admin.initializeApp(config)

const auth = firebaseApp.auth()
const storage = getStorage(firebaseStore)

const firebaseConfig = {
    auth,
    storage,
}

export default firebaseConfig
