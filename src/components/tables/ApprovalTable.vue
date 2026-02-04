<template>
  <div class="approval-table-container font-inter">
    <table class="approval-table">
      <thead>
        <tr>
          <th class="col-document">Document</th>
          <th class="col-step">Approval Step</th>
          <th class="col-approver">Backup Approver</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="doc in modelValue" :key="doc.id">
          <tr v-for="(step, index) in doc.steps" :key="step.stepId">
            <td v-if="index === 0" :rowspan="doc.steps.length" class="cell-document">
              {{ doc.name }}
            </td>

            <td class="cell-step">
              <div class="step-wrapper">
                <span class="step-badge">{{ step.stepNumber }}</span>
                <span class="step-role">{{ step.role }}</span>
              </div>
            </td>

            <td class="cell-approver">
              <TableSelect
                :initial-value="step.selectedBackup"
                @update:backup="(user: User) => handleUpdateBackup(doc.id, step.stepId, user)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { DocumentGroup } from "@/App.vue";
import type { ApprovalStep, User } from "../../types/app-types";
import TableSelect from "./TableSelect.vue";

const props = defineProps<{
  modelValue: DocumentGroup[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: DocumentGroup[]): void;
}>();

const handleUpdateBackup = (docId: number, stepId: number, user: User) => {
  const updatedDocuments = JSON.parse(JSON.stringify(props.modelValue));
  const doc = updatedDocuments.find((d: DocumentGroup) => d.id === docId);

  if (doc) {
    const step = doc.steps.find((s: ApprovalStep) => s.stepId === stepId);
    if (step) {
      step.selectedBackup = user;
      emit("update:modelValue", updatedDocuments);
    }
  }
};
</script>

<style scoped lang="scss">
$header-bg: #1d24520d;
$border-color: #e2e8f0;
$text-main: #1d2452;
$text-muted: #555b7d;
$accent-blue: #3855d6;

.approval-table-container {
  width: 100%;
  background-color: #fff;
  border: 1px solid $border-color;
  border-radius: 8px;
}

.approval-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  thead {
    background-color: $header-bg;
    th {
      padding: 14px 20px;
      font-weight: 600;
      color: $text-muted;
      font-size: 12px;
      text-align: left;
      border-bottom: 1px solid $border-color;
    }
  }

  .col-document {
    width: 25%;
  }
  .col-step {
    width: 45%;
  }
  .col-approver {
    width: 30%;
  }

  td {
    padding: 12px 20px;
    border-bottom: 1px solid $border-color;
  }

  .cell-document {
    vertical-align: top;
    padding-top: 20px;
    font-weight: 600;
    color: $text-main;
    border-right: 1px solid $border-color;
    background-color: #fafbfc;
  }

  .cell-step {
    border-right: 1px solid $border-color;
    vertical-align: middle;
  }

  .cell-approver {
    padding: 8px 12px;
    vertical-align: middle;
    position: relative;
  }
}

.step-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-badge {
  width: 22px;
  height: 22px;
  background-color: $accent-blue;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-role {
  color: $text-main;
  font-size: 14px;
}
</style>
