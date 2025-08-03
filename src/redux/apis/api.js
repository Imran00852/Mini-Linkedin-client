import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
  }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts/new",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    allPosts: builder.query({
      query: () => ({
        url: "/posts/all",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    myPosts: builder.query({
      query: () => ({
        url: "/posts/me",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    myProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useAllPostsQuery,
  useDeletePostMutation,
  useMyPostsQuery,
  useMyProfileQuery,
} = api;
export default api;
