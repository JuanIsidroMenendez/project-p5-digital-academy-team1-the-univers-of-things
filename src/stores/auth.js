import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebase.js'
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loading = ref(true)
})