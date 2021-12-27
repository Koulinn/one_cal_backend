import admin from 'firebase-admin'

const { FIREBASE_PROJECT_ID } = process.env

const config = {
    projectId: FIREBASE_PROJECT_ID,
    credential: admin.credential.applicationDefault(),
}

const firebaseApp = admin.initializeApp(config)

const auth = firebaseApp.auth()

const firebaseConfig = {
    auth,
}

export default firebaseConfig
