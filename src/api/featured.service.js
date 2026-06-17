import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from './firebase.js'

const REF = doc(db, 'featured', 'config')

export async function getFeaturedConfig() {
  const snap = await getDoc(REF)
  if (!snap.exists()) return { monthlyGame: '', featuredGames: [] }
  return snap.data()
}

export async function setMonthlyGame(gameID){
  await setDoc(REF, { monthlyGame:gameID }, { merge: true})
}

export async function addFeaturedGame(gameID) {
  await setDoc(REF, { featuredGames: arrayUnion(gameID) }, { merge: true })
}

export async function removeFeaturedGame(gameID) {
  await updateDoc(REF, { featuredGames: arrayRemove(gameID) })
}