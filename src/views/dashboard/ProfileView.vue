<!-- Vista perfil de usuario: cambio de avatar y contraseña -->
<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth.js'

import avatar1 from '@/assets/avatars/avatar-1.svg'
import avatar2 from '@/assets/avatars/avatar-2.svg'
import avatar3 from '@/assets/avatars/avatar-3.svg'
import avatar4 from '@/assets/avatars/avatar-4.svg'
import avatar5 from '@/assets/avatars/avatar-5.svg'
import avatar6 from '@/assets/avatars/avatar-6.svg'
import avatar7 from '@/assets/avatars/avatar-7.svg'
import avatar8 from '@/assets/avatars/avatar-8.svg'

const auth = useAuthStore()

const avatars = [
    { id: 1, src: avatar1, alt: 'Avatar 1' },
    { id: 2, src: avatar2, alt: 'Avatar 2' },
    { id: 3, src: avatar3, alt: 'Avatar 3' },
    { id: 4, src: avatar4, alt: 'Avatar 4' },
    { id: 5, src: avatar5, alt: 'Avatar 5' },
    { id: 6, src: avatar6, alt: 'Avatar 6' },
    { id: 7, src: avatar7, alt: 'Avatar 7' },
    { id: 8, src: avatar8, alt: 'Avatar 8' },
]

const selectedAvatar = ref(null)
const avatarFeedback = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordFeedback = ref('')
const passwordError = ref('')

async function handleSelectAvatar(avatar) {
    selectedAvatar.value = avatar.id
    try {
        await auth.updateAvatar(avatar.src)
        avatarFeedback.value = '✓ Avatar actualizado'
        setTimeout(() => { avatarFeedback.value = '' }, 2500)
    } catch {
        avatarFeedback.value = 'Error al actualizar el avatar'
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
        avatarFeedback.value = 'Solo se permiten imágenes (JPG, PNG)'
        return
    }
    avatarFeedback.value = 'Subida a Firebase Storage próximamente'
}

async function handleChangePassword() {
    passwordError.value = ''
    passwordFeedback.value = ''

    if (newPassword.value !== confirmPassword.value) {
        passwordError.value = 'Las contraseñas no coinciden'
        return
    }
    if (newPassword.value.length < 6) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres'
        return
    }

    try {
        await auth.changePassword(currentPassword.value, newPassword.value)
        passwordFeedback.value = '✓ Contraseña actualizada correctamente'
        currentPassword.value = ''
        newPassword.value = ''
        confirmPassword.value = ''
        setTimeout(() => { passwordFeedback.value = '' }, 2500)
    } catch {
        passwordError.value = 'Contraseña actual incorrecta'
    }
}
</script>

<template>
    <DashboardLayout>
        <section class="profile-view">
            <h1 class="profile-view__title">Mi Perfil</h1>

            <div class="profile-view__grid">

                <!-- Columna izquierda: avatar -->
                <div class="profile-view__card">

                    <div class="profile-view__avatar-wrap">
                        <img :src="auth.profile?.profileImg || avatar1" :alt="`Avatar de ${auth.profile?.username}`"
                            class="profile-view__avatar" />
                        <p class="profile-view__name">{{ auth.profile?.username }}</p>
                        <p class="profile-view__email">{{ auth.user?.email }}</p>
                    </div>

                    <div class="profile-view__picker">
                        <p class="profile-view__picker-title">Elige tu avatar</p>
                        <ul class="profile-view__avatars" role="list" aria-label="Galería de avatares">
                            <li v-for="avatar in avatars" :key="avatar.id">
                                <button class="profile-view__avatar-option"
                                    :class="{ 'profile-view__avatar-option--selected': selectedAvatar === avatar.id }"
                                    :aria-label="`Seleccionar ${avatar.alt}`"
                                    :aria-pressed="selectedAvatar === avatar.id" type="button"
                                    @click="handleSelectAvatar(avatar)">
                                    <img :src="avatar.src" :alt="avatar.alt" width="40" height="40" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="profile-view__divider" aria-hidden="true">
                        <span>o</span>
                    </div>

                    <button class="profile-view__firebase-btn" type="button" @click="$refs.fileInput.click()">
                        Subir desde Firebase Storage
                    </button>
                    <input ref="fileInput" type="file" accept="image/*" class="profile-view__file-input"
                        aria-label="Subir imagen de avatar" @change="handleFileUpload" />

                    <p v-if="avatarFeedback" class="profile-view__feedback" role="status" aria-live="polite">
                        {{ avatarFeedback }}
                    </p>
                </div>

                <!-- Columna derecha: cambio de contraseña -->
                <div class="profile-view__card">
                    <h2 class="profile-view__card-title">Cambiar contraseña</h2>

                    <div class="profile-view__form">
                        <div class="profile-view__field">
                            <label for="current-password" class="profile-view__label">Contraseña actual</label>
                            <input id="current-password" v-model="currentPassword" type="password"
                                class="profile-view__input" placeholder="••••••••••" autocomplete="current-password" />
                        </div>

                        <div class="profile-view__field">
                            <label for="new-password" class="profile-view__label">Nueva contraseña</label>
                            <input id="new-password" v-model="newPassword" type="password" class="profile-view__input"
                                placeholder="••••••••••" autocomplete="new-password" />
                        </div>

                        <div class="profile-view__field">
                            <label for="confirm-password" class="profile-view__label">Confirmar nueva contraseña</label>
                            <input id="confirm-password" v-model="confirmPassword" type="password"
                                class="profile-view__input" placeholder="••••••••••" autocomplete="new-password" />
                        </div>

                        <p v-if="passwordError" class="profile-view__error" role="alert">
                            {{ passwordError }}
                        </p>
                        <p v-if="passwordFeedback" class="profile-view__feedback" role="status" aria-live="polite">
                            {{ passwordFeedback }}
                        </p>

                        <button class="profile-view__submit" type="button" @click="handleChangePassword">
                            Actualizar contraseña
                        </button>
                    </div>
                </div>

            </div>
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.profile-view {
    padding: 1.5rem 1.2rem;

    @media (min-width: $bp-tablet) {
        padding: 2rem 1.5rem;
    }

    @media (min-width: $bp-desktop) {
        padding: 2.5rem 2rem;
        max-width: 1100px;
    }

    &__title {
        font-family: $font-display;
        font-weight: 800;
        font-size: 1.8rem;
        color: var(--color-text);
        margin-bottom: 1.5rem;

        @media (min-width: $bp-tablet) {
            font-size: 2rem;
        }

        @media (min-width: $bp-desktop) {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.2rem;

        @media (min-width: $bp-tablet) {
            gap: 1.5rem;
        }

        @media (min-width: $bp-desktop) {
            grid-template-columns: 320px 1fr;
            gap: 1.5rem;
        }
    }

    &__card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: 1.5rem;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);

        @media (min-width: $bp-desktop) {
            padding: 2rem;
        }
    }

    &__avatar-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 1.5rem;
    }

    &__avatar {
        width: 90px;
        height: 90px;
        border-radius: var(--radius-full);
        border: 3px solid var(--color-border-purple);
        object-fit: cover;
        display: block;
        margin-bottom: 0.4rem;
    }

    &__name {
        font-family: $font-display;
        font-weight: 700;
        font-size: 1.05rem;
        color: var(--color-text);
        text-align: center;
    }

    &__email {
        font-size: 0.8rem;
        color: var(--color-text-muted);
        text-align: center;
    }

    &__picker {
        margin-bottom: 1.2rem;
    }

    &__picker-title {
        font-family: $font-mono;
        font-size: 0.625rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-secondary);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &::before {
            content: '';
            display: block;
            width: 14px;
            height: 2px;
            background: var(--color-secondary);
            border-radius: 2px;
            flex-shrink: 0;
        }
    }

    &__avatars {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.625rem;
        list-style: none;
        margin: 0 0 0.5rem;
        padding: 0;
    }

    &__avatar-option {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: var(--radius-full);
        border: 2px solid transparent;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        transition: border-color var(--transition), transform var(--transition);

        img {
            width: 100%;
            height: 100%;
            border-radius: var(--radius-full);
            object-fit: cover;
            pointer-events: none;
        }

        &:hover {
            transform: scale(1.08);
            border-color: var(--color-border-cyan);
        }

        &--selected {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px var(--color-primary-dim);
        }
    }

    &__divider {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        margin: 1rem 0;

        &::before,
        &::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--color-border);
        }

        span {
            font-family: $font-mono;
            font-size: 0.5625rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--color-text-dim);
        }
    }

    &__firebase-btn {
        width: 100%;
        font-family: $font-mono;
        font-size: 0.6875rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-secondary);
        border: 1px solid var(--color-border-cyan);
        background: transparent;
        padding: 0.6rem 1rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: background var(--transition);

        &:hover {
            background: var(--color-secondary-dim);
        }
    }

    &__file-input {
        display: none;
    }

    &__feedback {
        font-family: $font-mono;
        font-size: 0.6875rem;
        color: var(--color-success);
        margin-top: 0.75rem;
        text-align: center;
        letter-spacing: 0.04em;
    }

    &__card-title {
        font-family: $font-display;
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--color-text);
        margin-bottom: 1.5rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    &__label {
        font-family: $font-mono;
        font-size: 0.625rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    &__input {
        width: 100%;
        background: rgba(5, 5, 16, 0.8);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.6875rem 0.875rem;
        color: var(--color-text);
        font-family: $font-body;
        font-size: 0.875rem;
        outline: none;
        transition: border-color var(--transition), box-shadow var(--transition);

        &::placeholder {
            color: var(--color-text-dim);
        }

        &:focus {
            border-color: var(--color-border-cyan);
            box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.08);
        }
    }

    &__error {
        font-family: $font-mono;
        font-size: 0.6875rem;
        color: var(--color-danger);
        letter-spacing: 0.04em;
        margin-top: -0.5rem;
    }

    &__submit {
        width: 100%;
        padding: 0.8125rem;
        border-radius: var(--radius-md);
        font-family: $font-display;
        font-weight: 700;
        font-size: 0.9375rem;
        color: white;
        background: linear-gradient(135deg, #7c3aed, #6d28d9);
        border: none;
        cursor: pointer;
        margin-top: 0.25rem;
        transition: opacity var(--transition), transform var(--transition);

        &:hover {
            opacity: 0.88;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }
    }
}
</style>