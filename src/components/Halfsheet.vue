<template>
  <div>
    <Transition name="halfsheet-foreground">
      <div
        v-if="show"
        class="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
        @click="emit('close')"
      ></div>
    </Transition>

    <div class="fixed bottom-0 left-0 w-full z-20">
      <Transition name="halfsheet-container">
        <div
          v-if="show"
          class="flex flex-col gap-3 halfsheet-container p-2 bg-black"
        >
          <header class="p-2">
            <slot name="header"></slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
            <slot name="footer"></slot>
          </footer>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);
</script>

<style scoped>
* {
  --border-color: #474747;
}
.halfsheet-container {
  border-radius: 25px;
  border-top: solid 1px var(--border-color);
}
.halfsheet-container > header {
  border-bottom: 1px solid var(--border-color);
}

/* slide up transition */
.halfsheet-container-enter-active {
  transition: transform 0.3s ease-in-out;
}

.halfsheet-container-enter-from {
  transform: translateY(100%);
}

.halfsheet-container-enter-to {
  transform: translateY(0);
}

.halfsheet-container-leave-active {
  transition: transform 0.3s ease-in-out;
}

.halfsheet-container-leave-from {
  transform: translateY(0);
}

.halfsheet-container-leave-to {
  transform: translateY(100%);
}

/* Foreground */

.halfsheet-foreground-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.halfsheet-foreground-enter-from {
  opacity: 0;
}

.halfsheet-foreground-enter-to {
  opacity: 1;
}

.halfsheet-foreground-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.halfsheet-foreground-leave-from {
  opacity: 1;
}

.halfsheet-foreground-leave-to {
  opacity: 0;
}
</style>
