import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebase'
import { logoutUser } from '@/services/auth-service'

export const useAuthStore = defineStore('auth', () => {

    // Se corrigen las rutas en import (línea 4 y 5) y se mantienen const user y const loading
    const user = ref(null)
    const loading = ref(true)

    // A partir de aquí, es código nuevo añadido en la feat/login.
    const isAuthenticated = ref(false)
    const role = ref(null)

    const isAdmin = computed(() => role.value === 'admin')
    const isCustomer = computed(() => role.value === 'customer')

    onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser
        loading.value = false
    })

    function setUser(userData) {
        user.value = userData
        isAuthenticated.value = true
        role.value = userData.role
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

    return {
        user,
        loading,
        isAuthenticated,
        role,
        isAdmin,
        isCustomer,
        setUser,
        clearUser,
        logout
    }
})