<template>
  <div class="flex w-full flex-col gap-1.5 font-inter">
    <label v-if="label" class="text-[14px] font-medium text-[#7a829a]">
      {{ label }}
      <span v-if="required" class="ml-0.5 text-red-500">*</span>
    </label>

    <div class="relative" ref="containerRef">
      <div
        @click="toggleDropdown"
        :class="[
          'flex cursor-pointer items-center justify-between rounded-lg border bg-white px-4 py-2.5 transition-all',
          isOpen
            ? 'border-[#4f46e5] ring-1 ring-[#4f46e5]'
            : 'border-[#d1d5db] hover:border-[#9ca3af]',
          { 'border-red-500': error },
        ]"
      >
        <span :class="modelValue ? 'text-[#111827]' : 'text-[#9ca3af]'">
          {{ selectedLabel || placeholder }}
        </span>

        <svg
          class="h-4 w-4 text-[#31395b] transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div
        v-if="isOpen"
        class="absolute z-[100] mt-1 max-h-[220px] w-full overflow-y-auto rounded-lg border border-[#d1d5db] bg-white shadow-xl"
        ref="listRef"
        @scroll="handleScroll"
      >
        <div
          v-for="option in options"
          :key="option.id"
          @click="selectOption(option)"
          class="cursor-pointer px-4 py-2.5 text-[14px] text-[#31395b] transition-colors hover:bg-[#f3f4f6]"
          :class="{ 'bg-[#f9fafb] font-semibold text-[#4f46e5]': modelValue === option.id }"
        >
          {{ option.name }}
        </div>

        <div v-if="loading" class="p-3 text-center text-xs text-gray-400">Loading more...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Option {
  id: string | number;
  name: string;
}

interface Props {
  modelValue: string | number | null;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  loading?: boolean;
  hasMore?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
  (e: "load-more"): void;
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  return props.options.find((o) => o.id === props.modelValue)?.name || "";
});

const toggleDropdown = () => (isOpen.value = !isOpen.value);

const selectOption = (option: Option) => {
  emit("update:modelValue", option.id);
  isOpen.value = false;
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (
    target.scrollTop + target.clientHeight >= target.scrollHeight - 10 &&
    props.hasMore &&
    !props.loading
  ) {
    emit("load-more");
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>
