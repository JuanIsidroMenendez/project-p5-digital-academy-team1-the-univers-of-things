import { defineStore } from 'pinia'
import { ref, computed } from 'vue'  //Nieves: añado computed, que hace falta para const isAdmin e isUser.
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { auth } from '@/api/firebase'
import { logoutUser } from '@/services/auth-service'
import { createUserProfile, getUserProfile } from '@/api/user.service'
// NIEVES: import para cargar los favoritos del usuario al iniciar sesión
import { useFavoritesStore } from '@/stores/favorites-store'

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
            profile.value = await getUserProfile(firebaseUser.uid)
            role.value = profile.value?.role
            // NIEVES: cargamos los favoritos del usuario en el store de favoritos
            const favoritesStore = useFavoritesStore()
            favoritesStore.loadFavorites(profile.value?.fav)
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

    async function updateAvatar(avatarUrl) {
        const { updateUserAvatar } = await import('@/api/user.service')
        await updateUserAvatar(user.value.uid, avatarUrl)
        profile.value = { ...profile.value, profileImg: avatarUrl }
    }

    async function updateBg(bg) {
        const { updateUserBg } = await import('@/api/user.service')
        await updateUserBg(user.value.uid, bg)
        profile.value = { ...profile.value, profileBg: bg }
    }

    async function changePassword(currentPassword, newPassword) {
        const credential = EmailAuthProvider.credential(user.value.email, currentPassword)
        await reauthenticateWithCredential(user.value, credential)
        await updatePassword(user.value, newPassword)
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
        logout,
        updateAvatar,
        updateBg,
        changePassword
    }
})