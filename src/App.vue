<script setup lang="ts">
import { computed, ref } from "vue";
import ScHeader from "./components/header/ScHeader.vue";
import ActionItem from "./components/shared/buttons/ActionItem.vue";
import ScButton from "./components/shared/buttons/ScButton.vue";
import DatePicker from "./components/shared/datePicker/DatePicker.vue";
import Line from "./components/shared/lines/Line.vue";
import ScTooltip from "./components/shared/tooltip/ScTooltip.vue";

const selectedDates = ref<Date[] | null>(null);

const handleDateRangeChange = (dates: Date[] | null) => {};
</script>

<template>
  <div>
    <div class="mb-[14px]"><ScHeader /></div>
    <div class="mb-[15px] w-full px-6">
      <div class="flex items-center justify-between">
        <span class="text-inter text-xl text-blue-color">Vacation Mode Settings</span>

        <ScTooltip>
          <div><ScButton :disabled="true" title="Update" /></div>
          <template #content>
            Choose Date, Substitute User and Backup <br />
            Approver to enable Vacation Mode
          </template>
        </ScTooltip>
      </div>
    </div>
    <div class="mb-6"><Line /></div>
    <div class="w-full px-6">
      <div class="flex flex-wrap justify-between">
        <div class="flex-col">
          <div class="flex items-center">
            <div class="mb-1 mr-[6px] font-inter text-blue-color">Substitute User</div>
            <div><ActionItem :disabled="false" /></div>
          </div>

          <div class="text-secondary-text-color font-inter text-sm text-blue-color">
            Select Date, Substitute User and Backup Approver to Enable Vacation Mode.
          </div>
        </div>
        <div><DatePicker v-model="selectedDates" @change="handleDateRangeChange" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
