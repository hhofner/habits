<script setup lang="ts">
import { ref } from "vue";
import Halfsheet from "./Halfsheet.vue";
import { HABIT_FREQUENCY } from "../types";

const name = ref("");
const color = ref("");
const frequency = ref("");

const emits = defineEmits(["close", "create"]);
defineProps({
  show: Boolean,
});
function createHabit() {
  if (!name.value || !color.value || !frequency.value) {
    return;
  }
  emits("create", {
    name: name.value,
    color: color.value,
    frequency: frequency.value,
  });
}
</script>

<template>
  <Halfsheet :show="show" @close="emits('close')">
    <template #header>
      <h1 class="text-xl w-full text-center">New Habit</h1>
    </template>
    <div>
      <div class="p-4 flex flex-col gap-2">
        <label>
          <span class="text-lg">Name</span>
          <input
            type="text"
            class="rounded w-full text-black text-[16px]"
            v-model="name"
          />
        </label>
        <label>
          <span class="text-lg">Frequency</span>
          <select
            class="rounded w-full bg-slate-300 text-black text-[16px]"
            v-model="frequency"
          >
            <option :value="HABIT_FREQUENCY.EVERYDAY">Everyday</option>
            <option :value="HABIT_FREQUENCY.EVERY_OTHER_DAY">
              Every other day
            </option>
          </select>
        </label>
        <div>
          <span class="text-lg">Color</span>
          <div class="flex justify-between">
            <div
              class="rounded-full bg-red-400 text-black w-5 h-5"
              :class="{ border: color === 'red' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="red"
                v-model="color"
              />
            </div>
            <div
              class="rounded-full bg-green-600 text-black w-5 h-5"
              :class="{ border: color === 'green' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="green"
                v-model="color"
              />
            </div>
            <div
              class="rounded-full bg-yellow-600 text-black w-5 h-5"
              :class="{ border: color === 'yellow' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="yellow"
                v-model="color"
              />
            </div>
            <div
              class="rounded-full bg-blue-600 text-black w-5 h-5"
              :class="{ border: color === 'blue' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="blue"
                v-model="color"
              />
            </div>
            <div
              class="rounded-full bg-indigo-600 text-black w-5 h-5"
              :class="{ border: color === 'indigo' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="indigo"
                v-model="color"
              />
            </div>
            <div
              class="rounded-full bg-rose-600 text-black w-5 h-5"
              :class="{ border: color === 'rose' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="rose"
                v-model="color"
              />
            </div>
            <div
              class="rounded-full bg-emerald-600 text-black w-5 h-5"
              :class="{ border: color === 'emerald' }"
            >
              <input
                type="radio"
                class="w-full h-full opacity-0"
                value="emerald"
                v-model="color"
              />
            </div>
          </div>
        </div>
        <button
          class="w-full rounded-lg bg-slate-400 mt-2 text-black"
          @click="createHabit"
        >
          Create Habit
        </button>
      </div>
    </div>
  </Halfsheet>
</template>
