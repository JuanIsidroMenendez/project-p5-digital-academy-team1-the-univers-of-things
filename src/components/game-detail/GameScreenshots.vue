<script setup>
import { ref, nextTick } from 'vue'

defineProps({
  screenshots: {
    type: Array,
    required: true
  },
  gameTitle: {
    type: String,
    required: true
  }
})

const activeIndex = ref(null)
const closeButtonRef = ref(null)
const lightboxRef = ref(null)

async function openLightbox(index) {
  activeIndex.value = index
  // nextTick espera a que Vue actualice el DOM antes de mover el foco
  await nextTick()
  closeButtonRef.value?.focus()
}

function closeLightbox() {
  activeIndex.value = null
}

function trapFocus(event) {
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  const focusableElements = Array.from(lightboxRef.value?.querySelectorAll(focusableSelectors) ?? [])

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey) {
    // Tab + Shift: si estamos en el primero, saltamos al último
    if (document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }
  } else {
    // Tab: si estamos en el último, saltamos al primero
    if (document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }
}

// Cierra el lightbox al pulsar Escape
function handleKeydown(event) {
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'Tab') trapFocus(event)
}
</script>

<template>
  <section class="game-screenshots" aria-labelledby="screenshots-heading">
    <h2 id="screenshots-heading" class="game-screenshots__title">
      Capturas de pantalla
    </h2>

    <ul class="game-screenshots__grid">
      <li
        v-for="(shot, index) in screenshots"
        :key="shot.id"
        class="game-screenshots__item"
      >
        <button
          class="game-screenshots__thumb-btn"
          type="button"
          :aria-label="`Ver captura ${index + 1} de ${screenshots.length} de ${gameTitle}`"
          @click="openLightbox(index)"
        >
          <img
            :src="shot.image"
            :alt="`Captura ${index + 1} de ${gameTitle}`"
            class="game-screenshots__thumb"
            loading="lazy"
          />
        </button>
      </li>
    </ul>

    <!-- Lightbox -->
    <div
      v-if="activeIndex !== null"
      ref="lightboxRef"
      class="game-screenshots__lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      @click.self="closeLightbox"
      @keydown="handleKeydown"
    >
      <h2 id="lightbox-title" class="visually-hidden">
        Captura {{ activeIndex + 1 }} de {{ gameTitle }}
      </h2>

      <img
        :src="screenshots[activeIndex].image"
        :alt="`Captura ${activeIndex + 1} de ${gameTitle}`"
        class="game-screenshots__lightbox-img"
      />

      <button
        ref="closeButtonRef"
        class="game-screenshots__lightbox-close"
        type="button"
        aria-label="Cerrar vista de captura"
        @click="closeLightbox"
      >
        ✕
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;
@use '@/assets/styles/base/mixins' as *;

.game-screenshots {
  margin-bottom: var(--space-8);

  &__title {
    color: var(--color-secondary);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-4);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
    list-style: none;
    padding: 0;
    margin: 0;

    @include respond-to(tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__thumb-btn {
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: var(--radius-sm);
    overflow: hidden;
    display: block;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    transition: opacity var(--transition);

    &:hover {
      opacity: 0.75;
    }
  }

  &__lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    @include flex-center;
  }

  &__lightbox-img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: var(--radius-md);
    display: block;
  }

  &__lightbox-close {
    position: absolute;
    top: var(--space-6);
    right: var(--space-6);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    font-size: 1.2rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-full);
    cursor: pointer;
    @include flex-center;
    transition: background var(--transition);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>