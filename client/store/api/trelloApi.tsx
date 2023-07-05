import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory, ICreateCategoryDto, ICreateTaskDto, ITask, IUpdateCategoryDto, IUpdateTaskDto } from '@/model';
import { parseCookies } from 'nookies';
import { BASE_URL, urls } from '@/constans/url';


const cookies = parseCookies();
const storedUserInfo = cookies.userInfo;
const token = storedUserInfo ? JSON.parse(storedUserInfo).token : '';


export const trelloApi = createApi({
  reducerPath: 'trelloApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Simple'],
  endpoints: (builder) => ({
    createCategory: builder.mutation<ICategory, ICreateCategoryDto>({
      query: (dto) => ({
        url: urls.CATEGORIES,
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Simple'],
    }),
    getAllCategories: builder.query<ICategory[], null>({
      query: () => ({
        url: urls.CATEGORIES,
        method: 'GET',
      }),
      providesTags: ['Simple'],
    }),
    getCategoriesPagination: builder.query<ICategory[], { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `${urls.CATEGORIES}/pagination?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Simple'],
    }),
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => ({
        url: `${urls.CATEGORIES}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Simple'],
    }),
    updateCategoryById: builder.mutation<ICategory, { id: number; dto: IUpdateCategoryDto }>({
      query: ({ id, dto }) => ({
        url: `${urls.CATEGORIES}/${id}`,
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: ['Simple'],
    }),
    deleteCategoryById: builder.mutation<ICategory, number>({
      query: (id) => ({
        url: `${urls.CATEGORIES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Simple'],
    }),
    createTask: builder.mutation<ITask, ICreateTaskDto>({
      query: (dto) => ({
        url: urls.TASKS,
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Simple'],
    }),
    getTaskById: builder.query<ITask, number>({
      query: (id) => ({
        url: `${urls.TASKS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Simple'],
    }),
    updateTaskById: builder.mutation<ITask, { id: number; dto: IUpdateTaskDto }>({
      query: ({ id, dto }) => ({
        url: `${urls.TASKS}/${id}`,
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: ['Simple'],
    }),
    deleteTaskById: builder.mutation<ITask, number>({
      query: (id) => ({
        url: `${urls.TASKS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Simple'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetCategoriesPaginationQuery,
  useLazyGetCategoryByIdQuery,
  useLazyGetTaskByIdQuery,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
} = trelloApi;
