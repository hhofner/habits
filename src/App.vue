<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import Habit from './components/Habit.vue'
import Settings from './components/Settings.vue'
import Hamburger from './components/Hamburger.vue'
import CreateHabitModal from './components/CreateHabitModal.vue';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const habitsDb = useLocalStorage<{ id: string, name: string, frequency: string, color: string }[]>('habits', [])
const daysDb = useLocalStorage<{ id: string, timestamp: number, habitsId: string }[]>('days', [])

const openModal = ref(false)
const outsideClicked = ref(false)
function onOutsideClicked() {
  outsideClicked.value = true
  setTimeout(() => {
    outsideClicked.value = false
  }, 100)
}

// Database "Section"

const days = ref<{ [index: string]: number[] }>({})

function onDelete(id: string) {
  habitsDb.value = habitsDb.value.filter((habit) => habit.id !== id)
}

function onCreate(habit: { name: string; color: string; frequency: string }) {
  const newId = nanoid()
  habitsDb.value.push({
    id: newId,
    ...habit,
  })
  days.value[newId] = []
  openModal.value = false
}

function onUpdate(habitId: string, day: number) {
  if (!days.value[habitId]) {
    days.value[habitId] = []
  }
  if (days.value[habitId].includes(day)) {
    days.value[habitId] = days.value[habitId].filter((d) => d !== day)
    // sync with db
    daysDb.value = daysDb.value.filter(
      (d) =>
        !(d.habitsId === habitId
          && dayjs(d.timestamp).day() === dayjs().subtract(day, 'day').day()))
  } else {
    days.value[habitId] = [...days.value[habitId], day]
    // sync with db
    daysDb.value = [...daysDb.value, { id: nanoid(), timestamp: dayjs().subtract(day, 'day').valueOf(), habitsId: habitId }]
  }
}

onMounted(() => {
  // find all entries in daysDb for today and 6 days before
  const today = dayjs().valueOf()
  const sixDaysBefore = dayjs().subtract(6, 'day').valueOf()
  const daysInRange = daysDb.value.filter((day) => day.timestamp >= sixDaysBefore && day.timestamp <= today)
  // for each entry, add the day to the days object
  daysInRange.forEach((day) => {
    if (days.value[day.habitsId]) {
      days.value[day.habitsId] = [...days.value[day.habitsId], dayjs(day.timestamp).day()]
    } else {
      days.value[day.habitsId] = [dayjs(day.timestamp).day()]
    }
  })
})
</script>

<template>
  <div class="container max-w-sm mx-auto p-2 pt-6 text-white relative overflow-x-clip">
    <div class="w-screen h-screen absolute top-0 left-0" @click="onOutsideClicked"></div>
    <header class="flex justify-between py-4 mb-2 items-center sticky top-0 z-10 bg-black ">
      <Hamburger />
      <h1 class="text-2xl">Habits</h1>
      <Settings />
    </header>
    <section class="flex flex-col relative">
      <TransitionGroup name="list" tag="div">
        <Habit class="mb-4 w-full" v-for="habit in habitsDb" :key="habit.id" :name="habit.name" :frequency="habit.frequency"
          :days="days[habit.id] ? days[habit.id] : []" :outside-clicked="outsideClicked" @delete="onDelete(habit.id)"
          @update="$event => onUpdate(habit.id, $event)" :color="habit.color" />
      </TransitionGroup>
      <button @click="openModal = true"
        class="z-10 flex justify-center text-gray-400 hover:bg-slate-800 transition-colors p-2 rounded-xl">+ New
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

.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.list-leave-active {
  position: absolute;
}
</style>
