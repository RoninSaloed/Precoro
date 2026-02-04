<template>
  <ScSelect
    :with-border="false"
    :items="data"
    :search="searchQuery"
    :is-open="isOpen"
    :loading="isLoading"
    :loading-more="hasMore"
    :item-key="(u: User) => u.id"
    :item-label="(u: User) => u.email"
    @open="handleOpen"
    @close="isOpen = false"
    @update:search="handleSearchInternal"
    @load-more="handleNextPage"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ScSelect from "../shared/select/ScSelect.vue";
import { useGetUsers } from "../../use/useGetUsers";
import type { User } from "../../types/app-types";

const props = defineProps<{
  initialValue: User | null;
}>();

const emit = defineEmits<{
  (e: "update:backup", user: User): void;
}>();

const { data, handleNextPage, handleSearch, hasMore, isLoading } = useGetUsers();

const searchQuery = ref(props.initialValue?.email || "");
const isOpen = ref(false);

const handleOpen = () => {
  isOpen.value = true;
  if (data.value.length === 0) {
    handleSearch("");
  }
};

const handleSearchInternal = (query: string) => {
  searchQuery.value = query;
  handleSearch(query);
};

const handleSelect = (user: User) => {
  searchQuery.value = user.email;
  isOpen.value = false;
  emit("update:backup", user);
};
</script>
