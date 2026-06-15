<!-- Vista login: formulario de acceso con validacion -->


<!-- poner despues del login-->
await authStore.login(email, password)

if (authStore.profile?.role === 'admin') {
  router.push('/admin')
} else {
  router.push('/dashboard')
}