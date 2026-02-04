<template>
  <div class="group relative inline-block">
    <slot />

    <div
      class="pointer-events-none absolute -right-4 top-full z-50 mt-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <div class="relative rounded-[6px] bg-[#31395b] px-4 py-2 shadow-lg">
        <div
          class="absolute -top-[6px] right-12 border-b-[6px] border-l-[6px] border-r-[6px] border-b-[#31395b] border-l-transparent border-r-transparent"
        ></div>

        <div class="whitespace-nowrap font-inter text-[14px] leading-[1.4] text-white">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
