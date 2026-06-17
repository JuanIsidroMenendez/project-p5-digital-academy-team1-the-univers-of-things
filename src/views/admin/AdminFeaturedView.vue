<!-- Vista gestión de destacados: juego del mes y lista de destacados -->
<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref, computed, onMounted } from 'vue'
import { getFeaturedConfig, setMonthlyGame, addFeaturedGame, removeFeaturedGame } from '@/api/featured.service.js'

// Mock de catálogo (en producción vendrá de Firestore/API)
const catalog = [
  { id: 'quantum-strike', title: 'Quantum Strike' },
  { id: 'neon-odyssey', title: 'Neon Odyssey' },
  { id: 'void-protocol', title: 'Void Protocol' },
  { id: 'inferno-rush', title: 'Inferno Rush' },
  { id: 'cyber-siege', title: 'Cyber Siege' },
  { id: 'stellar-drift', title: 'Stellar Drift' },
  { id: 'pulse-arena', title: 'Pulse Arena' },
  { id: 'dark-circuit', title: 'Dark Circuit' },
]

// ── Juego del mes ──
const monthlyQuery = ref('')
const monthlyGame = ref(null)
const showMonthlySuggestions = ref(false)

const monthlySuggestions = computed(() =>
  monthlyQuery.value.length < 1
    ? []
    : catalog.filter(g => g.title.toLowerCase().includes(monthlyQuery.value.toLowerCase())).slice(0, 6)
)

function selectMonthly(game) {
  monthlyGame.value = game
  monthlyQuery.value = game.title
  showMonthlySuggestions.value = false
}

// ── Juegos activos ──
const activeQuery = ref('')
const activeGames = ref([
  { id: 'quantum-strike', title: 'Quantum Strike' },
  { id: 'neon-odyssey', title: 'Neon Odyssey' },
])
const showActiveSuggestions = ref(false)

const activeSuggestions = computed(() =>
  activeQuery.value.length < 1
    ? []
    : catalog
        .filter(g =>
          g.title.toLowerCase().includes(activeQuery.value.toLowerCase()) &&
          !activeGames.value.find(a => a.id === g.id)
        )
        .slice(0, 6)
)

function addActive(game) {
  activeGames.value.push(game)
  activeQuery.value = ''
  showActiveSuggestions.value = false
}

function removeActive(id) {
  activeGames.value = activeGames.value.filter(g => g.id !== id)
}
</script>

<template>
  <AdminLayout>
    <section class="admin-featured">
      <h1 class="admin-featured__title">Destacados</h1>

      <!-- Juego del mes -->
      <div class="admin-featured__section">
        <span class="section-label">Juego del mes</span>
        <p class="admin-featured__hint">Busca el juego que aparecerá destacado en portada.</p>

        <div class="admin-featured__search-wrap">
          <input
            v-model="monthlyQuery"
            type="search"
            placeholder="Buscar juego..."
            class="admin-featured__search"
            @focus="showMonthlySuggestions = true"
            @blur="setTimeout(() => showMonthlySuggestions = false, 150)"
          />
          <ul v-if="showMonthlySuggestions && monthlySuggestions.length" class="admin-featured__suggestions">
            <li
              v-for="g in monthlySuggestions"
              :key="g.id"
              class="admin-featured__suggestion"
              @mousedown="selectMonthly(g)"
            >{{ g.title }}</li>
          </ul>
        </div>

        <div v-if="monthlyGame" class="admin-featured__active-list">
          <div class="admin-featured__active-card">
            <div class="admin-featured__active-thumb"></div>
            <p class="admin-featured__active-title">{{ monthlyGame.title }}</p>
            <button class="admin-featured__remove" @click="monthlyGame = null; monthlyQuery = ''">QUITAR</button>
          </div>
        </div>
      </div>

      <!-- Juegos activos -->
      <div class="admin-featured__section">
        <span class="section-label">Juegos activos destacados</span>
        <p class="admin-featured__hint">Busca y añade juegos visibles en la sección de destacados.</p>

        <div class="admin-featured__search-wrap">
          <input
            v-model="activeQuery"
            type="search"
            placeholder="Buscar juego para añadir..."
            class="admin-featured__search"
            @focus="showActiveSuggestions = true"
            @blur="setTimeout(() => showActiveSuggestions = false, 150)"
          />
          <ul v-if="showActiveSuggestions && activeSuggestions.length" class="admin-featured__suggestions">
            <li
              v-for="g in activeSuggestions"
              :key="g.id"
              class="admin-featured__suggestion"
              @mousedown="addActive(g)"
            >{{ g.title }}</li>
          </ul>
        </div>

        <div class="admin-featured__active-list">
          <div
            v-for="game in activeGames"
            :key="game.id"
            class="admin-featured__active-card"
          >
            <div class="admin-featured__active-thumb"></div>
            <p class="admin-featured__active-title">{{ game.title }}</p>
            <button class="admin-featured__remove" @click="removeActive(game.id)">QUITAR</button>
          </div>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>