<!-- Vista gestión de destacados: juego del mes y lista de destacados -->
<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref, computed, onMounted } from 'vue'
import { useFeaturedStore } from '@/stores/featured-store.js' 
// ── Juego del mes ──
const featuredStore = useFeaturedStore()
const monthlyQuery = ref('')
const monthlyGame = computed(() => featuredStore.gameOfTheMonth)
const showMonthlySuggestions = ref(false)
onMounted(async () => await featuredStore.fetchAll())
const featuredFull = computed(() => featuredStore.featuredList.length >= 6)



const monthlySuggestions = computed(() =>
  monthlyQuery.value.length < 1
    ? []
    : featuredStore.catalog.filter(g => g.title.toLowerCase().includes(monthlyQuery.value.toLowerCase())).slice(0, 6)
)

async function selectMonthly(game) {
  await featuredStore.selectMonthly(game)
  monthlyQuery.value = game?.title ?? ''
  showMonthlySuggestions.value = false
}

// ── Juegos activos ──
const activeQuery = ref('')
const activeGames = computed(() => featuredStore.featuredList)

const showActiveSuggestions = ref(false)

const activeSuggestions = computed(() =>
  activeQuery.value.length < 1
    ? []
    : featuredStore.catalog
        .filter(g =>
          g.title.toLowerCase().includes(activeQuery.value.toLowerCase()) &&
          !activeGames.value?.find(a => a.id === g.id)
        )
        .slice(0, 6)
)

async function addActive(game) {
  await featuredStore.addFeatured(game)
  activeQuery.value = ''
  showActiveSuggestions.value = false
}

function hideMonthly() { setTimeout(() => showMonthlySuggestions.value = false, 150) }
function hideActive() { setTimeout(() => showActiveSuggestions.value = false, 150) }

async function removeActive(game) {
  await featuredStore.removeFeatured(game)
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

        <div class="admin-featured__search-wrap" @focusout="hideMonthly">
          <input
            v-model="monthlyQuery"
            type="search"
            placeholder="Buscar juego..."
            class="admin-featured__search"
            @focus="showMonthlySuggestions = true"
          />
          <ul v-if="showMonthlySuggestions && monthlySuggestions.length" class="admin-featured__suggestions">
            <li
              v-for="g in monthlySuggestions"
              :key="g.id"
              class="admin-featured__suggestion"
              @click="selectMonthly(g)"
            >{{ g.title }}</li>
          </ul>
        </div>

        <div v-if="monthlyGame" class="admin-featured__active-list">
          <div class="admin-featured__active-card">
            <img :src="monthlyGame.thumbnail" :alt="monthlyGame.title" class ="admin-featured__active-thumb"/>
            <p class="admin-featured__active-title">{{ monthlyGame.title }}</p>
            <button class="admin-featured__remove" @click="featuredStore.selectMonthly(null); monthlyQuery = ''">QUITAR</button>
          </div>
        </div>
      </div>

      <!-- Juegos activos -->
      <div class="admin-featured__section">
        <span class="section-label">Juegos activos destacados</span>
        <p class="admin-featured__hint">Busca y añade juegos visibles en la sección de destacados.</p>

        <div class="admin-featured__search-wrap" @focusout="hideActive">
          <input
            v-model="activeQuery"
            type="search"
            placeholder="Buscar juego para añadir..."
            class="admin-featured__search"
            @focus="showActiveSuggestions = true"
            :disabled="featuredFull"
          />
          <ul v-if="showActiveSuggestions && activeSuggestions.length" class="admin-featured__suggestions">
            <li
              v-for="g in activeSuggestions"
              :key="g.id"
              class="admin-featured__suggestion"
              @click="addActive(g)"
            >{{ g.title }}</li>
          </ul>
        </div>
        <p v-if="featuredFull">Máx. 6 juegos destacados</p>
        <div class="admin-featured__active-list">
          <div
            v-for="game in activeGames"
            :key="game.id"
            class="admin-featured__active-card"
          >
            <img :src="game.thumbnail" :alt="game.title" class ="admin-featured__active-thumb"/>
            <p class="admin-featured__active-title">{{ game.title }}</p>
            <button class="admin-featured__remove" @click="removeActive(game)">QUITAR</button>
          </div>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>
<style lang="css" scoped>

.admin-featured__section {
  position: relative;
  z-index: 1;
}

.admin-featured__section:first-of-type {
  z-index: 2;
}

</style>