import { auth, db } from '@/api/firebase'
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  const userDoc = await getDoc(doc(db, 'users', user.uid))

  // Si no tiene perfil en Firestore, permitimos el acceso con rol por defecto
  if (!userDoc.exists()) {
    return { uid: user.uid, email: user.email, role: 'customer', status: 'active', username: '' }
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
}

export async function logoutUser() {
  await signOut(auth)
}