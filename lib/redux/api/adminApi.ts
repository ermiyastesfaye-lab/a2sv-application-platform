// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   CreateCycleRequest,
//   CycleResponse,
// } from "@/lib/types/applicationCycles";
// import type { RootState } from "@/lib/redux/store";

// export const adminApi = createApi({
//   reducerPath: "adminApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://a2sv-application-platform-backend-team1.onrender.com/",
//     prepareHeaders: (headers) => {
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ2MDU0ODEsInR5cGUiOiJhY2Nlc3MifQ.eo01oYSHAwntSG_Ao_ghkN3Tia2-B7WzehSrn4hk_hI";
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     createCycle: builder.mutation<
//       { success: boolean; data: CycleResponse },
//       CreateCycleRequest
//     >({
//       query: (newCycle) => ({
//         url: "/admin/cycles",
//         method: "POST",
//         body: newCycle,
//       }),
//     }),
//   }),
// });

// export const { useCreateCycleMutation } = adminApi;
