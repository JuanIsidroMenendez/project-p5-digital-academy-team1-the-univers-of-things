import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/api/firebase'

export const useAdminStore = defineStore('admin', () => {
    const usersList = ref([])

    async function fetchAllUsers() {
        const snapshot = await getDocs(collection(db, 'users'))
        usersList.value = snapshot.docs.map(doc => doc.data())
    }

    return { usersList, fetchAllUsers }
})