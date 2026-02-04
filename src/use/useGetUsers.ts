import appService from "@/api/app-service";
import type { User, UsersQueryParams } from "@/types/app-types";
import { ref, watch } from "vue";

export const useGetUsers = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const hasMore = ref(true);
  const data = ref<User[]>([]);

  const queryParams = ref<UsersQueryParams>({
    page: 1,
    search: "",
  });

  const getUsers = async (isNextPage = false) => {
    isLoading.value = true;

    try {
      const response = await appService.getUsers(queryParams.value.page, queryParams.value.search);

      hasMore.value = response.meta.pagination.totalPages > queryParams.value.page;
      data.value = isNextPage ? [...data.value, ...response.data] : response.data;
    } catch (err: any) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  const handleNextPage = () => {
    if (hasMore.value && !isLoading.value) {
      queryParams.value.page += 1;
    }
  };

  const handleSearch = (search: string) => {
    queryParams.value = {
      page: 1,
      search,
    };
  };

  watch(
    () => [queryParams.value.page, queryParams.value.search],
    () => {
      const isNextPage = queryParams.value.page > 1;
      getUsers(isNextPage);
    },
    { immediate: true },
  );

  return {
    data,
    isLoading,
    error,
    hasMore,
    queryParams,

    handleNextPage,
    handleSearch,
  };
};
