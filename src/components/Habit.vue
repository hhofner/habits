<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import dayjs from "dayjs";
import CloseButton from "./CloseButton.vue";

const dayMap: { [index: number]: string } = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    color?: string;
    frequency?: string;
    days: number[];
  }>(),
  {
    color: "gray",
    frequency: "Everyday",
  },
);

defineEmits(["update", "delete"]);

const timeOut = ref<number | undefined>(undefined);
const isShaking = ref(false);
function onDown() {
  if (!isShaking.value) {
    timeOut.value = window.setTimeout(() => {
      isShaking.value = true;
    }, 1000);
  }
}

function onUp() {
  clearTimeout(timeOut.value);
}

function onOutsideClicked() {
  isShaking.value = false;
}

watch(isShaking, () => {
  // attach eventlistener on body to detect outside click
  if (isShaking.value) {
    document.body.addEventListener("pointerdown", onOutsideClicked);
  } else {
    document.body.removeEventListener("pointerdown", onOutsideClicked);
  }
});


function getColorChosen (color: string) {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "blue":
      return "bg-sky-500";
    case "indigo":
      return "bg-indigo-500";
    case "rose":
      return "bg-rose-500";
    case "emerald":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
}

const habitRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (habitRef.value) {
    habitRef.value.addEventListener("dragstart", (e) => {
      e.dataTransfer?.setData("text/plain", props.id);
    });
  }
});
</script>

<template>
  <div
    class="relative rounded-xl p-4 bg-gray-900"
    :class="{ shaking: isShaking }"
    @pointerdown="onDown"
    @pointerup="onUp"
    :draggable="isShaking"
    ref="habitRef"
  >
    <div class="absolute w-full h-5 left-0 -top-5 flex justify-center">
      <div class="w-11/12 h-full shadow-lg shadow-slate-700"></div>
    </div>
    <div class="flex justify-between mb-2 select-none">
      <span class="text-lg">{{ name }}</span>
      <span class="text-gray-400">{{ frequency }}</span>
    </div>
    <div class="flex justify-between px-2">
      <div
        v-for="idx in Array.from(Array(7).keys()).reverse()"
        class="flex flex-col items-center gap-1 button"
        @click="$emit('update', idx)"
        :key="name + idx"
      >
        <span class="text-sm text-gray-400 select-none">
          {{
          dayMap[dayjs().subtract(idx, "d").day()]
        }}</span>
        <div
          class="rounded-full bg-gray-800 w-8 h-8 flex justify-center p-1"
          :class="days.includes(idx) ? getColorChosen(props.color) : ''"
        >
          {{ dayjs().subtract(idx, "d").date().toString() }}
        </div>
      </div>
    </div>
    <Transition>
      <div
        v-if="isShaking"
        class="absolute top-0 right-0 -translate-y-2 translate-x-2"
      >
        <CloseButton @click="$emit('delete')" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.button:active {
  transform: scale(0.95);
}

.button {
  transition: transform 0.1s ease-in-out;
}

.shaking {
  animation: tilt-shaking 0.3s ease-in-out infinite;
}

@keyframes tilt-shaking {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(1deg);
  }

  50% {
    transform: rotate(0eg);
  }

  75% {
    transform: rotate(-1deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
