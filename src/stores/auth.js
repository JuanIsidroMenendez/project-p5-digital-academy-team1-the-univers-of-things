import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebase'
import { logoutUser } from '@/services/auth-service'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loading = ref(true)
})