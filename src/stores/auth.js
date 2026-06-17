import { defineStore } from 'pinia'
import { ref, computed } from 'vue'  //Aquí, añado computed, que hace falta para const isAdmin e isUser.
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/api/firebase'
import { logoutUser } from '@/services/auth-service'
import { createUserProfile, getUserProfile } from '@/api/user.service'

export const useAuthStore = defineStore('auth', () => {

    const user = ref(null)
    const profile = ref(null)
    const loading = ref(true)

    const isAuthenticated = ref(false)
    const role = ref(null)

    const isAdmin = computed(() => role.value === 'admin')
    const isCustomer = computed(() => role.value === 'customer')

    onAuthStateChanged(auth, async (firebaseUser) => {

        user.value = firebaseUser
        if (firebaseUser) {
            profile.value = await getUserProfile(firebaseUser.uid)  // ← leemos Firestore
        } else {
            profile.value = null
        }

        loading.value = false
    })

    async function register(email, password, username) {

        const result = await createUserWithEmailAndPassword(auth, email, password)
        await createUserProfile(result.user.uid, email, username)
    }

    async function login(email, password) {

        await signInWithEmailAndPassword(auth, email, password)
    }

    function clearUser() {
        user.value = null
        isAuthenticated.value = false
        role.value = null
    }

    async function logout() {
        await logoutUser()
        clearUser()
    }

    function setUser(userData) {
        user.value = userData
        isAuthenticated.value = true
        role.value = userData.role
    }

    return {
        user,
        profile,
        loading,
        isAuthenticated,
        role,
        isAdmin,
        isCustomer,
        register,
        login,
        setUser,
        clearUser,
        logout
    }
})



