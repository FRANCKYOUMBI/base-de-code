export type METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type BasePath = {
    path_api?: string;
};


export interface ServerMessage {
    message: string;
    statusCode: number;
}
export interface SuccessMessage {
    statusCode: number;
    message: string;
}

export const isServerMessage = (obj: any) => {
    return obj?.message !== undefined && obj?.statusCode !== undefined;
}

export type APIListResponse<T> = {
    data: T[];
    totalCount: number
}