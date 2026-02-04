<template>
  <div class="relative w-fit">
    <VueDatePicker
      v-model="dateRange"
      range
      :enable-time-picker="false"
      :format="formatDateDisplay"
      :dark="false"
      :auto-apply="true"
      :close-on-auto-apply="true"
      :clearable="false"
      @update:model-value="handleDateUpdate"
      @open="isFocused = true"
      @close="isFocused = false"
    >
      <template #trigger>
        <div
          :class="[
            'inline-flex w-fit cursor-pointer items-center rounded-lg border px-3 py-[10px] transition-all',
            isFocused
              ? 'border-blue-color ring-1 ring-blue-color'
              : 'border-secondary-text-color hover:border-secondary-text-color',
          ]"
        >
          <div class="mr-2"><CalendarIcon /></div>

          <div class="flex items-center gap-x-1 font-inter text-sm font-medium">
            <span class="text-blue-color">From</span>

            <span
              :class="displayStartDate ? 'font-bold text-blue-color' : 'text-secondary-text-color'"
            >
              {{ displayStartDate || "yyyy-mm-dd" }}
            </span>

            <span class="text-blue-color">to</span>

            <span
              :class="displayEndDate ? 'font-bold text-blue-color' : 'text-secondary-text-color'"
            >
              {{ displayEndDate || "yyyy-mm-dd" }}
            </span>
          </div>

          <button
            v-if="displayStartDate || displayEndDate"
            type="button"
            @click.stop="clearDates"
            class="ml-[10px]"
          >
            <CrossBorderIcon />
          </button>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import CalendarIcon from "../icons/CalendarIcon.vue";
import CrossBorderIcon from "../icons/CrossBorderIcon.vue";

interface Props {
  modelValue: Date[] | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Date[] | null): void;
  (e: "change", value: Date[] | null): void;
}>();

const dateRange = ref<Date[] | null>(props.modelValue);
const isFocused = ref(false);

const formatDate = (date: Date | undefined): string | null => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const displayStartDate = computed(() => formatDate(dateRange.value?.[0]));
const displayEndDate = computed(() => formatDate(dateRange.value?.[1]));

const formatDateDisplay = (dates: Date[] | null): string => {
  if (!dates || dates.length === 0 || !dates[0]) return "Выберите даты";
  const start = formatDate(dates[0]);
  const end = dates[1] ? formatDate(dates[1]) : "";
  return end ? `${start} - ${end}` : `${start}`;
};

const handleDateUpdate = (newDates: Date[] | null) => {
  dateRange.value = newDates;
  emit("update:modelValue", newDates);
  emit("change", newDates);
};

const clearDates = () => {
  dateRange.value = null;
  emit("update:modelValue", null);
  emit("change", null);
};

watch(
  () => props.modelValue,
  (newVal) => {
    dateRange.value = newVal;
  },
);

onMounted(() => {
  dateRange.value = props.modelValue;
});
</script>

<style scoped></style>
