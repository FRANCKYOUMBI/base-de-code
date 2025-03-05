'use server'

import StorageService from "@/services/StorageService.ts";


export const uploadFile = async (file_name: string, base_64: string) => {
    const storageService = new StorageService();

    const result = await storageService.upload(file_name, base_64);
    return result;
};

