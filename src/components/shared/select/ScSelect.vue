А
<template>
  <div ref="dropdown" class="relative w-full">
    <input
      :value="search"
      @input="onInput"
      @focus="emit('open')"
      type="text"
      placeholder="Select Substitute"
      :class="{
        'font-inter w-full rounded-lg text-sm focus:outline-none': true,
        'focus:ring-secondary-text-color border-borders-color border px-3 py-2 focus:ring-2':
          withBorder,
      }"
    />
    <div
      :class="{
        'absolute bottom-1/2 right-2 top-1/2 -translate-y-1/2 transition-all': true,
        'rotate-180': isOpen,
        'rotate-0': !isOpen,
      }"
    >
      <SelectArrow />
    </div>
    <div
      v-if="isOpen"
      class="bg-white-color absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border"
      @scroll="onScroll"
    >
      <div v-if="loading" class="text-secondary-text-color p-3 text-center text-sm">Loading...</div>

      <div v-else-if="!items.length" class="text-secondary-text-color p-3 text-center text-sm">
        No results
      </div>

      <div
        v-for="item in items"
        :key="itemKey(item)"
        @click="select(item)"
        class="hover:bg-secondary-text-color cursor-pointer px-3 py-2"
      >
        {{ itemLabel(item) }}
      </div>

      <div v-if="loadingMore" class="p-2 text-center text-xs text-gray-400">Loading more...</div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import SelectArrow from "../icons/SelectArrow.vue";

const props = defineProps<{
  items: T[];
  search: string;
  isOpen: boolean;
  loading: boolean;
  loadingMore?: boolean;
  itemKey: (item: T) => string | number;
  itemLabel: (item: T) => string;
  withBorder: boolean;
}>();

const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "select", item: T): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "loadMore"): void;
}>();

const dropdown = ref<HTMLElement | null>(null);

const onInput = (e: Event) => {
  emit("update:search", (e.target as HTMLInputElement).value);
};

const select = (item: T) => {
  emit("select", item);
};

const onScroll = (e: Event) => {
  const el = e.target as HTMLElement;
  const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

  if (isBottom) {
    emit("loadMore");
  }
};

onClickOutside(dropdown, () => {
  if (props.isOpen) {
    emit("close");
  }
});
</script>
