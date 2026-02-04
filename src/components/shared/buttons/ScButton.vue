<template>
  <button
    @click="handleClick()"
    :class="[
      'rounded-[20px] px-4 py-[5px] font-inter text-white-color',
      disabled ? 'bg-disabled-color' : 'bg-blue-color',
    ]"
  >
    {{ title }}
  </button>
</template>

<script lang="ts" setup>
export type ButtonProps = {
  title: string;
  disabled: boolean;
  type?: "button" | "submit" | "reset";
};
const props = withDefaults(defineProps<ButtonProps>(), {
  title: "submit",
  disabled: false,
  type: "button",
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>
