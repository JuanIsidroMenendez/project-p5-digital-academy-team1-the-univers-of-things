import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase.js'

export async function createUserProfile(uid, email, username) {
    const userRef = doc(db, 'users', uid)
    const userData = { uid, email, username, role: 'customer', fav: [], profileImg: 'default.png' }
    await setDoc(userRef, userData)
}

export async function getUserProfile(uid) {
    const userRef = doc(db, 'users', uid)
    const snapshot = await getDoc(userRef)
    if (!snapshot.exists()) return null
    return snapshot.data()
}

export async function updateUserFavorites(uid, favorites) {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, { fav: favorites })
}

export async function updateUserAvatar(uid, avatarUrl) {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, { profileImg: avatarUrl })
}

export async function uploadAvatarToStorage(uid, file) {
    const storageRef = ref(storage, `avatars/${uid}/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
}