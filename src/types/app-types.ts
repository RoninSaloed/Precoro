export type UsersResponse = {
  data: User[];
  meta: { pagination: Meta };
};
export type User = {
  id: number;
  email: string;
  fullName: string;
};
export type Meta = {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
};
export interface UsersQueryParams {
  page: number;
  search: string;
}

export type UpdateFormPayload = {
  vacationMode: {
    enable: boolean;
    startDate: number;
    endDate: number;
  };
  substituteUser: number;
  backupApprovers: BackupApproverType[];
};
export type BackupApproverType = {
  id: number;
  backupApproverId: number;
};
export interface ApprovalStep {
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
