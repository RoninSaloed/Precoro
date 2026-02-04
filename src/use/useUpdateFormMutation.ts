import appService from "@/api/app-service";
import ScToast from "@/components/toast/ScToast.vue";
import type { UpdateFormPayload } from "@/types/app-types";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export const useUpdateDocumentMutation = () => {
  const isLoading = ref(false);
  const error = ref<any>(null);
  const toast = useToast();

  const updateDocument = async (payload: UpdateFormPayload) => {
    try {
      const response = await appService.updateDocument(payload);

      isLoading.value = true;
      error.value = null;
      toast(
        {
          component: ScToast,
          props: { text: "Updated successfully." },
        },
        {
          toastClassName: "custom-toast-container",
          bodyClassName: "custom-toast-body",
        },
      );

      return response;
    } catch (err: any) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    updateDocument,
    isLoading,
    error,
  };
};
