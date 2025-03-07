import { deleteCookie, getCookie } from "cookies-next";
import type { BasePath, METHOD } from "./types";
import { signOut } from "next-auth/react";
import { env } from "@/env.mjs";
// Copy the actual fetch function
const originalFetch = global.fetch;

// Create a new function that listing to all fetch request and response
const fetchWithInterceptor = async (
  url: RequestInfo | URL,
  options?: RequestInit
) => {
  const response = await originalFetch(url, options);
  // If the response is a 403, we redirect to the login page
  // if ([401, 403].includes(response.status)) {
  //     deleteCookie("next-auth.session-token");
  //     deleteCookie("next-auth.session-token");
  //     await signOut({
  //         redirect: true,
  //         callbackUrl: "/auth/login",
  //     });
  //
  // }
  return response;
};
// Override the fetch function with the interceptor
global.fetch = fetchWithInterceptor;

export default abstract class BaseService {
  public BASE_API_URL = "http://192.168.1.200:5001";

  protected constructor({ path_api }: BasePath) {
    this.BASE_API_URL = env.BASE_API_URL + `${path_api ?? ""}`;
    console.log(this.BASE_API_URL);
  }

  buildHeader(param: {
    method?: METHOD;
    body?: Object;
    token?: string;
    requiredAccessToken?: boolean;
  }): any {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("mode", "no-cors");
    headers.append("accept-language", getCookie("locale") as string);

    const token_cookie = getCookie("access_token");

    if (param.requiredAccessToken) {
      headers.append("Authorization", `Bearer ${token_cookie}`);
    }

    if (param.token) {
      headers.append("Authorization", `Bearer ${param.token}`);
    }

    const json = param.body ? { body: JSON.stringify(param.body) } : {};

    return {
      ...json,
      headers,
      method: param?.method ?? "GET",
    };
  }
}
