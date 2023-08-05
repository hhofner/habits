<script setup lang="ts">
import { ref } from 'vue';
import Habit from './components/Habit.vue'
import Settings from './components/Settings.vue'
import Hamburger from './components/Hamburger.vue'
import CreateHabitModal from './components/CreateHabitModal.vue';

const openModal = ref(false)
const meditationDays = ref([2])
function updateMeditationDay(idx: number) {
  const i = meditationDays.value.indexOf(idx)
  if (i > -1) {
    meditationDays.value.splice(i, 1)
  } else {
    meditationDays.value.push(idx)
  }
}

function deleteHabit() {
  console.log('delete')
}


// Database "Section"
const habits = ref([
  {
    id: 0,
    name: 'Meditation',
    frequency: 'Everyday',
  },
  {
    id: 1,
    name: 'Kanji',
    frequency: 'Everyday',
  },
])

const days = ref<{[index: number]: number[]}>({
  0: [],
  1: [2, 5],
})

function onCreate(habit: { name: string; color: string; frequency: string }) {
  habits.value.push({
    id: habits.value.length + 1,
    ...habit,
  })
  openModal.value = false
}

function onUpdate(id: number, idx: number) {
  const i = days.value[id].indexOf(idx)
  if (i > -1) {
    days.value[id].splice(i, 1)
  } else {
    days.value[id].push(idx)
  }
}
</script>

<template>
  <div class="container max-w-sm mx-auto p-2 pt-6 text-white relative overflow-x-clip">
    <header class="flex justify-between mb-4 items-center">
      <Hamburger />
      <h1 class="text-2xl">Habits</h1>
      <Settings />
    </header>
    <section class="flex flex-col gap-4">
      <Habit v-for="habit in habits" :key="habit.id" :name="habit.name" :frequency="habit.frequency" :days="days[habit.id] ? days[habit.id] : []"/>
      <button @click="openModal = true"
        class="flex justify-center text-gray-400 hover:bg-slate-800 transition-colors p-2 rounded-xl">+ New
        Habit</button>
    </section>
    <CreateHabitModal v-if="openModal" @close="openModal = false" @create="onCreate" />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
