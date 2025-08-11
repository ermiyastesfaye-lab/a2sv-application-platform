
import { fetchBaseQuery,FetchArgs,FetchBaseQueryError ,BaseQueryFn} from "@reduxjs/toolkit/query/react";


const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const Reauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refresh");

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: "auth/token/refresh",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data && (refreshResult.data as any).access) {
        const newAccessToken = (refreshResult.data as any).access;
        localStorage.setItem("token", newAccessToken);

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    } else {
      localStorage.clear();
      window.location.href = "/auth/login";
    }
  }

  return result;
};
