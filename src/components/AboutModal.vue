<script setup lang="ts">
defineProps({
	show: Boolean
})
</script>

<template>
<Transition name="modal">
	<div v-if="show" class="z-20 w-full h-full fixed top-0 left-0 text-white transition-opacity">
    <div
      @click="$emit('close')"
      class="w-full h-full bg-black opacity-60"
    ></div>
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div class="rounded-xl p-4 bg-gray-900 flex flex-col gap-2">
				<h1 class="text-xl w-full text-center">About</h1>
				<p>
					Habits is a simple PWA habits tracking app,
					built with Vue 3, TailwindCSS and Vite. 
				</p>
			</div>
		</div>
	</div>
	
</Transition>	
</template>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
