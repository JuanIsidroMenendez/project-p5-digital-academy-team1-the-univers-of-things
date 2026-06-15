import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../api/firebase.js'
import { createUserProfile } from '../api/user.service.js'
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loading = ref(true)

    onAuthStateChanged(auth, (firebaseUser) => {

        user.value = firebaseUser
        loading.value = false
    })

    async function register(email, password, username) {

        const result = await createUserWithEmailAndPassword(auth, email, password)
        await createUserProfile(result.user.uid, email, username)
    }
    async function login(email, password){

        await signInWithEmailAndPassword(auth, email, password)
    }
    async function logout(){
        await signOut(auth)
    } 
    return { user, loading, register, login, logout }
})

