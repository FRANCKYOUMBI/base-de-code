import BaseService from "@/services/BaseService";
import { ServerMessage } from "@/services/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/[lang]/api/auth/[...nextauth]/auth-options.ts";
import {Storage} from "@/services/types/storage.ts";

export default class StorageService extends BaseService {
  constructor() {
    super({ path_api: "/storages" });

    this.upload = this.upload.bind(this);
  }

  async upload(
    file_name: string,
    base_64: string,
  ): Promise<{ storage: Storage } | ServerMessage> {
    // @ts-ignore
    const { user } = await getServerSession(authOptions);
    const response = await fetch(
      `${this.BASE_API_URL}/file/upload`,
      {
          ...super.buildHeader({ token: user.accessToken }),
          method: "POST",
          body: JSON.stringify({ file_name, base_64 }),
      }
    );

    if ([200, 201].includes(response.status)) {
      return (await response.json()) as {
        storage: Storage;
      };
    }
    return (await response.json()) as ServerMessage;
  }
}
