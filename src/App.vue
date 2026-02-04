<template>
  <div>
    <div class="mb-[14px]"><ScHeader /></div>
    <div class="mb-[15px] w-full px-6">
      <div class="flex items-center justify-between">
        <span class="text-inter text-xl font-bold text-blue-color">Vacation Mode Settings</span>

        <ScTooltip>
          <div>
            <ScButton
              :disabled="!isReadyToUpdate"
              :loading="isLoading"
              title="Update"
              @click="handleSaveAll"
            />
          </div>
          <template #content>
            Choose Date, Substitute User and Backup <br />
            Approver to enable Vacation Mode
          </template>
        </ScTooltip>
      </div>
    </div>
    <div class="mb-6"><Line /></div>
    <div class="w-full px-6">
      <div class="mb-5 flex flex-wrap justify-between">
        <div class="flex-col">
          <div class="flex items-center">
            <div class="mb-1 mr-[6px] font-inter font-semibold text-blue-color">Vacation mode</div>
            <div><ActionItem :disabled="!isReadyToUpdate" /></div>
          </div>

          <div class="font-inter text-sm font-medium text-blue-color text-secondary-text-color">
            Select Date, Substitute User and Backup Approver to Enable Vacation Mode.
          </div>
        </div>
        <div><DatePicker v-model="selectedDates" @change="handleDateRangeChange" /></div>
      </div>

      <div class="mb-5"><Line /></div>

      <div class="mb-5 flex flex-wrap justify-between">
        <div class="flex-col">
          <div class="mb-1 mr-[6px] font-inter font-semibold text-blue-color">Substitute User</div>

          <div class="font-inter text-sm font-medium text-blue-color text-secondary-text-color">
            Performs approval actions while you are away.
          </div>
        </div>
        <div class="mb-5 w-[336px]">
          <div class="font-inter text-[13px] font-semibold text-secondary-text-color">
            Substitute User <span class="text-error-color">*</span>
          </div>

          <ScSelect
            :with-border="true"
            :items="approversData"
            :search="substituteSearch"
            :isOpen="substituteListIsOpen"
            :loading="isLoadingUsers"
            :loadingMore="hasMore"
            :itemKey="(u) => u.id"
            :itemLabel="(u) => u.email"
            @open="substituteListIsOpen = true"
            @close="substituteListIsOpen = false"
            @update:search="handleSearchSubstituteQuery"
            @loadMore="handleNextPage"
            @select="handleSelectUser"
          />
        </div>
      </div>
      <div class="mb-5"><Line /></div>

      <div>
        <div class="mb-4 flex-col">
          <div class="mb-1 mr-[6px] font-inter font-semibold text-blue-color">Backup Approver</div>

          <div class="font-inter text-sm font-medium text-blue-color text-secondary-text-color">
            Performs approval actions while you are away. Below, you can select the necessary
            Approvers.
          </div>
        </div>

        <ApprovalTable v-model="documents" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watchEffect } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ScHeader from "./components/header/ScHeader.vue";
import ActionItem from "./components/shared/buttons/ActionItem.vue";
import ScButton from "./components/shared/buttons/ScButton.vue";
import DatePicker from "./components/shared/datePicker/DatePicker.vue";
import Line from "./components/shared/lines/Line.vue";
import ScTooltip from "./components/shared/tooltip/ScTooltip.vue";
import ScSelect from "./components/shared/select/ScSelect.vue";
import { useGetUsers } from "./use/useGetUsers";
import type { User, UpdateFormPayload } from "./types/app-types";
import { useGetApprovers } from "./use/useGetApprover";
import ApprovalTable from "./components/tables/ApprovalTable.vue";
import { useUpdateDocumentMutation } from "./use/useUpdateFormMutation";

interface ApprovalStep {
  stepId: number;
  stepNumber: number;
  role: string;
  selectedBackup: User | null;
}

export interface DocumentGroup {
  id: number;
  name: string;
  steps: ApprovalStep[];
}

const selectedDates = ref<Date[] | null>(null);
const selectedUserId = ref<number | null>(null);
const substituteSearch = ref("");
const substituteListIsOpen = ref(false);

const {
  data: usersData,
  handleNextPage,
  handleSearch,
  hasMore,
  isLoading: isLoadingUsers,
} = useGetUsers();
const { data: approversData } = useGetApprovers();
const { updateDocument, isLoading, error: apiError } = useUpdateDocumentMutation();

const initialData = [
  {
    id: 1,
    name: "Purchase Order",
    steps: [
      { stepId: 1, stepNumber: 1, role: "Senior Manager", selectedBackup: null },
      { stepId: 2, stepNumber: 2, role: "Finance Department", selectedBackup: null },
      { stepId: 3, stepNumber: 3, role: "CEO Manager", selectedBackup: null },
    ],
  },
  {
    id: 2,
    name: "Invoice",
    steps: [
      { stepId: 4, stepNumber: 1, role: "Senior Manager", selectedBackup: null },
      { stepId: 5, stepNumber: 2, role: "Finance Department", selectedBackup: null },
      { stepId: 6, stepNumber: 3, role: "CEO Manager", selectedBackup: null },
    ],
  },
  {
    id: 3,
    name: "Request for Proposals",
    steps: [{ stepId: 7, stepNumber: 1, role: "Manager", selectedBackup: null }],
  },
  {
    id: 4,
    name: "Supplier Approval",
    steps: [{ stepId: 8, stepNumber: 1, role: "Supplier Manager", selectedBackup: null }],
  },
];

const documents = ref<DocumentGroup[]>(JSON.parse(JSON.stringify(initialData)));
const initialDocumentsState = JSON.stringify(initialData);

const hasUnsavedChanges = computed(() => {
  const isDocsChanged = JSON.stringify(documents.value) !== initialDocumentsState;
  const isHeaderChanged = !!selectedDates.value || !!selectedUserId.value;
  return isDocsChanged || isHeaderChanged;
});

onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges.value) {
    if (window.confirm("You have unsaved changes. Do you really want to leave?")) next();
    else next(false);
  } else next();
});

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (hasUnsavedChanges.value) {
    e.preventDefault();
    e.returnValue = "";
  }
};

onMounted(() => window.addEventListener("beforeunload", handleBeforeUnload));
onUnmounted(() => window.removeEventListener("beforeunload", handleBeforeUnload));

const handleSearchSubstituteQuery = (text: string) => {
  substituteSearch.value = text;
  handleSearch(text);
};

const handleSelectUser = (user: User) => {
  selectedUserId.value = user.id;
  substituteSearch.value = user.email;
  substituteListIsOpen.value = false;
};

const isReadyToUpdate = computed(() => {
  const hasDates = !!selectedDates.value && selectedDates.value.length >= 2;
  const hasSubstitute = !!selectedUserId.value;
  const hasAllBackups = documents.value.every((doc) =>
    doc.steps.every((step) => !!step.selectedBackup),
  );
  return hasDates && hasSubstitute && hasAllBackups;
});

const handleSaveAll = async () => {
  if (
    !isReadyToUpdate.value ||
    !selectedDates.value ||
    !selectedDates.value[0] ||
    !selectedDates.value[1] ||
    selectedUserId.value === null
  )
    return;

  const stepApproves = documents.value.flatMap((doc) =>
    doc.steps.map((step) => ({
      id: step.stepId,
      backupApproverId: step.selectedBackup!.id as number,
    })),
  );

  const startTimestamp = Math.floor(selectedDates.value[0].getTime() / 1000);
  const endTimestamp = Math.floor(selectedDates.value[1].getTime() / 1000);

  const payload: UpdateFormPayload = {
    vacationMode: {
      enable: true,
      startDate: startTimestamp,
      endDate: endTimestamp,
    },
    substituteUser: selectedUserId.value,
    backupApprovers: stepApproves,
  };

  await updateDocument(payload);

  if (!apiError.value) {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.location.reload();
  }
};

const handleDateRangeChange = (dates: Date[] | null) => {};
</script>
