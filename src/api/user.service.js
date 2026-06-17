import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase.js'

export async function createUserProfile(uid, email, username) {
    const userRef = doc(db, 'users', uid)
    const userData = { uid, email, username, role: 'customer', fav: [], profileImg: 'default.png' }

    await setDoc(userRef, userData)
}

export async function getUserProfile(uid) {
    const userRef = doc(db, 'users', uid)

    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
        return null
    }
return snapshot.data()

}

export async function updateUserFavorites(uid, favorites) {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, { fav: favorites })
}

