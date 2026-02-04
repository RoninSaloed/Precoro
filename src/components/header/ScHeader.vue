<template>
  <div class="flex w-full justify-between bg-top-bar-gradient py-2 pl-6 pr-4 font-medium">
    <div class="flex items-center">
      <div class="mr-[17px] font-inter text-white-color">Dashboard</div>
      <div class="mr-[17px]"><ArrowIcon /></div>
      <div class="mr-[17px] font-inter text-white-color">User Management</div>
    </div>
    <div class="flex items-center gap-x-7">
      <div v-for="item in headerItems" class="flex items-center">
        <span class="mr-[10px]">
          <component :is="item.icon" />
        </span>

        <span class="mr-[17px] font-inter text-white-color">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowIcon from "../shared/icons/ArrowIcon.vue";
import BillIcon from "../shared/icons/BillIcon.vue";
import BuoyIcon from "../shared/icons/BuoyIcon.vue";
import OnboardIcon from "../shared/icons/OnboardIcon.vue";

const headerItems = [
  { title: "Buy now", icon: BillIcon },
  { title: "Onboarding", icon: OnboardIcon },
  { title: "Help center", icon: BuoyIcon },
  { title: "user@email.com", icon: ArrowIcon },
];
</script>
