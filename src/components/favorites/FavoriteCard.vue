<script setup>
defineProps({
  favorite: {
    type: Object,
    required: true
  }
})

defineEmits(['remove', 'edit'])
</script>

<template>
  <article class="favorite-card">
    <img
      :src="favorite.thumbnail"
      :alt="favorite.customTitle || favorite.title"
      class="favorite-card__thumbnail"
      loading="lazy"
    />

    <div class="favorite-card__body">
      <h3 class="favorite-card__title">
        {{ favorite.customTitle || favorite.title }}
      </h3>
      <p v-if="favorite.customContent" class="favorite-card__content">
        {{ favorite.customContent }}
      </p>
    </div>

    <footer class="favorite-card__actions">
      <button
        class="favorite-card__edit-btn"
        type="button"
        :aria-label="`Editar ${favorite.customTitle || favorite.title}`"
        @click="$emit('edit', favorite)"
      >
        ✏️ Editar
      </button>
      <button
        class="favorite-card__delete-btn"
        type="button"
        :aria-label="`Eliminar ${favorite.customTitle || favorite.title} de favoritos`"
        @click="$emit('remove', favorite.id)"
      >
        🗑️ Eliminar
      </button>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.favorite-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;

  &__thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__body {
    padding: var(--space-4);
    flex: 1;
  }

  &__title {
    color: var(--color-text);
    font-size: 1rem;
    margin: 0 0 var(--space-2);
  }

  &__content {
    color: var(--color-text-muted);
    font-size: 0.85rem;
    margin: 0;
  }

  &__actions {
    display: flex;
    gap: var(--space-2);
    padding: 0 var(--space-4) var(--space-4);
  }

  &__edit-btn,
  &__delete-btn {
    flex: 1;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: background var(--transition);

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__edit-btn {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);

    &:hover {
      background: var(--color-primary-dim);
    }
  }

  &__delete-btn {
    background: transparent;
    border: 1px solid var(--color-danger);
    color: var(--color-danger);

    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
}
</style>