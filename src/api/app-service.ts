import type { UpdateFormPayload, UsersResponse } from "@/types/app-types";
import { AppResources } from "./app-resources";
import { axiosInstance } from "./axios-instances";

class AppService {
  transport;
  constructor() {
    this.transport = axiosInstance;
  }

  async getUsers(page: number, search: string): Promise<UsersResponse> {
    const { data } = await this.transport.get(AppResources.getUsers(), {
      params: {
        page,
        search,
      },
    });

    return data;
  }

  async getApprovers(page: number, search: string): Promise<UsersResponse> {
    const { data } = await this.transport.get(AppResources.getApprovers(), {
      params: {
        page,
        search,
      },
    });

    return data;
  }

  async updateDocument(payload: UpdateFormPayload): Promise<void> {
    const { data } = await this.transport.patch(AppResources.updateDocument(), { ...payload });

    return data;
  }
}

export default new AppService();
