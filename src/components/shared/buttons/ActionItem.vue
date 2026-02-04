<template>
  <div
    :class="[
      'flex w-fit items-center rounded-[22px] px-2 py-[5px] text-xs',
      disabled ? 'text-grey-color bg-blur-gray' : 'text-green-color bg-blur-green',
    ]"
  >
    <div class="mr-1"><component :is="currentIcon" /></div>
    <div class="font-inter text-xs">
      {{ currentText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import CrossIcon from "../icons/CrossIcon.vue";
import ReadyIcon from "../icons/ReadyIcon.vue";

type ActionItemsProps = {
  disabled: boolean;
};

const props = withDefaults(defineProps<ActionItemsProps>(), {
  disabled: true,
});

const currentIcon = computed(() => {
  return props.disabled ? CrossIcon : ReadyIcon;
});
const currentText = computed(() => {
  return props.disabled ? "Disabled" : "Enabled";
});
</script>
