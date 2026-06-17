import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/api/firebase'
import { getNextStatus } from '@/utils/user-access'


export const useAdminStore = defineStore('admin', () => {
    const usersList = ref([])

    async function fetchAllUsers() {
        const snapshot = await getDocs(collection(db, 'users'))
        usersList.value = snapshot.docs.map(doc => doc.data())
    }

    async function toggleUserAccess(userId, currentStatus) {
        const newStatus = getNextStatus(currentStatus)
        await updateDoc(doc(db, 'users', userId), { status: newStatus })
        const user = usersList.value.find(u => u.uid === userId)
        if (user) user.status = newStatus
    }

    return { usersList, fetchAllUsers, toggleUserAccess }
})