import { auth, db } from '@/api/firebase'
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Esto sirve para obtener los datos del usuario de Firebase (revisar)
    const userDoc = await getDoc(doc(db, 'users', user.uid))

    if (!userDoc.exists()) {
      throw { code: 'auth/user-not-found' }
    }

    const userData = userDoc.data()

    if (userData.status === 'restricted') {
      await signOut(auth)
      throw { code: 'auth/access-restricted' }
    }

    return {
      uid: user.uid,
      email: user.email,
      role: userData.role,
      status: userData.status,
      username: userData.username
    }

  } catch (error) {
    throw error
  }
}

export async function logoutUser() {
  await signOut(auth)
}