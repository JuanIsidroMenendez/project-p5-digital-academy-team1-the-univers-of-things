<script setup>
import { reactive } from 'vue'

const props = defineProps({
  favorite: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

// Copia local editable, para no modificar el favorito original hasta confirmar
const form = reactive({
  customTitle: props.favorite.customTitle || props.favorite.title,
  customContent: props.favorite.customContent || ''
})

function handleSave() {
  emit('save', {
    customTitle: form.customTitle,
    customContent: form.customContent
  })
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <form class="edit-favorite-form" @submit.prevent="handleSave">
    <div class="edit-favorite-form__field">
      <label :for="`edit-title-${favorite.id}`" class="edit-favorite-form__label">
        Título
      </label>
      <input
        :id="`edit-title-${favorite.id}`"
        v-model="form.customTitle"
        type="text"
        class="edit-favorite-form__input"
      />
    </div>

    <div class="edit-favorite-form__field">
      <label :for="`edit-content-${favorite.id}`" class="edit-favorite-form__label">
        Notas
      </label>
      <textarea
        :id="`edit-content-${favorite.id}`"
        v-model="form.customContent"
        class="edit-favorite-form__textarea"
        rows="3"
      ></textarea>
    </div>

    <div class="edit-favorite-form__actions">
      <button type="submit" class="edit-favorite-form__save-btn">
        Guardar
      </button>
      <button type="button" class="edit-favorite-form__cancel-btn" @click="handleCancel">
        Cancelar
      </button>
    </div>
  </form>
</template>