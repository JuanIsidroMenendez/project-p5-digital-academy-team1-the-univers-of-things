export function filterUsers(users, query) {
    return users.filter((user) =>
        user.username?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
    )
}