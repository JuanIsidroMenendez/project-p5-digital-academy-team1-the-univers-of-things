<!-- Vista perfil de admin: cambio de avatar y contraseña -->
<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { uploadAvatarToStorage } from "@/api/user.service.js";
import { passwordsMatch, isValidPassword } from "@/utils/form-validators";

import avatar1 from "@/assets/avatars/avatar-1.svg";
import avatar2 from "@/assets/avatars/avatar-2.svg";
import avatar3 from "@/assets/avatars/avatar-3.svg";
import avatar4 from "@/assets/avatars/avatar-4.svg";
import avatar5 from "@/assets/avatars/avatar-5.svg";
import avatar6 from "@/assets/avatars/avatar-6.svg";
import avatar7 from "@/assets/avatars/avatar-7.svg";
import avatar8 from "@/assets/avatars/avatar-8.svg";

const avatars = [
  { id: 1, src: avatar1, alt: "Avatar 1" },
  { id: 2, src: avatar2, alt: "Avatar 2" },
  { id: 3, src: avatar3, alt: "Avatar 3" },
  { id: 4, src: avatar4, alt: "Avatar 4" },
  { id: 5, src: avatar5, alt: "Avatar 5" },
  { id: 6, src: avatar6, alt: "Avatar 6" },
  { id: 7, src: avatar7, alt: "Avatar 7" },
  { id: 8, src: avatar8, alt: "Avatar 8" },
];

const backgrounds = [
  { id: 1, value: "linear-gradient(135deg, #7c3aed, #22d3ee)" },
  { id: 2, value: "linear-gradient(135deg, #c2410c, #f97316)" },
  { id: 3, value: "linear-gradient(135deg, #0e7490, #2563eb)" },
  { id: 4, value: "linear-gradient(135deg, #166534, #22d3ee)" },
  { id: 5, value: "linear-gradient(135deg, #9d174d, #7c3aed)" },
  { id: 6, value: "linear-gradient(135deg, #92400e, #dc2626)" },
  { id: 7, value: "linear-gradient(135deg, #164e63, #a855f7)" },
  { id: 8, value: "linear-gradient(135deg, #1e1b4b, #4c1d95)" },
];
const auth = useAuthStore();
const selectedAvatar = ref(null);
const selectedBg = ref(null);
const previewImg = ref(auth.profile?.profileImg || null);
const previewBg = ref(
  auth.profile?.profileBg || "linear-gradient(135deg, #7c3aed, #22d3ee)",
);

const avatarFeedback = ref("");
const bgFeedback = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const passwordFeedback = ref("");
const passwordError = ref("");

const avatarOptions = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));

function handleClickAvatar(avatar) {
  selectedAvatar.value = avatar.id;
  previewImg.value = avatar.src;
}

function handleClickBg(bg) {
  selectedBg.value = bg.id;
  previewBg.value = bg.value;
}

async function handleSaveAvatar() {
  if (!selectedAvatar.value) return;
  const avatar = avatars.find((a) => a.id === selectedAvatar.value);
  try {
    await auth.updateAvatar(avatar.src);
    avatarFeedback.value = "✓ Avatar guardado";
    setTimeout(() => {
      avatarFeedback.value = "";
    }, 2500);
  } catch {
    avatarFeedback.value = "Error al guardar el avatar";
  }
}

async function handleSaveBg() {
  if (!selectedBg.value) return;
  const bg = backgrounds.find((b) => b.id === selectedBg.value);
  try {
    await auth.updateBg(bg.value);
    bgFeedback.value = "✓ Fondo guardado";
    setTimeout(() => {
      bgFeedback.value = "";
    }, 2500);
  } catch {
    bgFeedback.value = "Error al guardar el fondo";
  }
}

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    avatarFeedback.value = "Solo se permiten imágenes (JPG, PNG)";
    return;
  }

  avatarFeedback.value = "Subiendo imagen...";

  try {
    const uid = auth.user.uid;
    const downloadURL = await uploadAvatarToStorage(uid, file);
    await auth.updateAvatar(downloadURL);
    previewImg.value = downloadURL;
    avatarFeedback.value = "✓ Avatar guardado";
    setTimeout(() => {
      avatarFeedback.value = "";
    }, 2500);
  } catch {
    avatarFeedback.value = "Error al subir la imagen";
  }
}

async function handleChangePassword() {
  passwordError.value = "";
  passwordFeedback.value = "";

  if (!passwordsMatch(newPassword.value, confirmPassword.value)) {
    passwordError.value = "Las contraseñas no coinciden";
    return;
  }

  if (!isValidPassword(newPassword.value)) {
    passwordError.value =
      "La contraseña debe tener al menos 8 caracteres y un número";
    return;
  }

  try {
    await auth.changePassword(currentPassword.value, newPassword.value);
    passwordFeedback.value = "✓ Contraseña actualizada correctamente";
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    setTimeout(() => {
      passwordFeedback.value = "";
    }, 2500);
  } catch {
    passwordError.value = "Contraseña actual incorrecta";
  }
}
</script>

<template>
  <AdminLayout>
    <section class="admin-profile">
      <h1 class="admin-profile__title">Perfil de Admin</h1>

      <div class="admin-profile__content">
        <!-- Columna izquierda: avatar -->
        <div class="admin-profile__left">
          <div class="admin-profile__avatar"><img :src="previewImg" /></div>
          <p class="admin-profile__name">{{ auth.profile?.username }}</p>
          <p class="admin-profile__email">{{ auth.user?.email }}</p>

          <div class="admin-profile__avatars">
            <div
              v-for="avatar in avatars"
              :key="avatar.id"
              class="admin-profile__avatar-option"
              :class="{
                'admin-profile__avatar-option--active':
                  selectedAvatar === avatar.id,
              }"
              @click="handleClickAvatar(avatar)"
            >
              <img :src="avatar.src" :alt="avatar.alt" />
            </div>
          </div>

          <button
            class="btn btn--primary admin-profile__btn-sm"
            @click="handleSaveAvatar"
          >
            Subir avatar
          </button>
        </div>
        <!-- Columna derecha: contraseña -->
        <div class="admin-profile__right">
          <span class="admin-profile__label">Cambiar contraseña</span>
          <label for="new-password" class="visually-hidden"
            >Nueva contraseña</label
          >
          <input
            v-model="currentPassword"
            type="password"
            placeholder="Contraseña actual"
            class="admin-profile__input"
          />
          <input
            id="new-password"
            v-model="newPassword"
            type="password"
            placeholder="Nueva contraseña"
            class="admin-profile__input"
            aria-describedby="new-password-hint"
          />
          <span id="new-password-hint" class="visually-hidden"
            >Introduce tu nueva contraseña</span
          >

          <label for="confirm-password" class="visually-hidden"
            >Confirmar contraseña</label
          >
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            class="admin-profile__input"
            aria-describedby="confirm-password-hint"
          />
          <span id="confirm-password-hint" class="visually-hidden"
            >Repite tu nueva contraseña para confirmarla</span
          >
          <button
            class="admin-profile__btn-update"
            @click="handleChangePassword"
          >
            Actualizar contraseña
          </button>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>
