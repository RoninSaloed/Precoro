<template>
  <div
    class="flex h-[80px] min-w-[350px] items-stretch overflow-hidden rounded-md border border-gray-100 bg-white font-inter shadow-lg"
  >
    <div class="w-1.5 bg-green-color"></div>

    <div class="flex flex-1 items-center px-4 py-2">
      <div
        class="mr-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-color"
      >
        <svg class="h-6 w-6 text-green-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div class="flex flex-col">
        <span class="text-[13px] font-black uppercase tracking-widest text-[#172b4d]">Success</span>
        <span class="text-[15px] text-secondary-text-color">{{ text }}</span>
      </div>
    </div>

    <button
      @click="$emit('close-toast')"
      class="border-l border-gray-100 px-6 text-[12px] font-bold uppercase tracking-widest text-secondary-text-color transition-colors hover:bg-gray-50"
    >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
defineEmits(["close-toast"]);
</script>

<style>
.Vue-Toastification__toast--default.custom-toast-container {
  background-color: transparent !important;
  padding: 0 !important;
  box-shadow: none !important;
  min-height: auto !important;
}

.Vue-Toastification__container.top-right {
  top: 20px !important;
  right: 20px !important;
  width: auto !important;
}
</style>
