import { urls } from '@/constans/url';
import { ILoginUserDto, IRegisterUserDto, IUser } from '@/model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserInfo } from '../slice/authSlice';



export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<IUserInfo, ILoginUserDto>({
      query: (data) => ({
        url: `${urls.AUTH}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<IUserInfo, IRegisterUserDto>({
      query: (data) => ({
        url: `${urls.USER}/registration`,
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query<IUser, void>({
      query: () => ({
        url: `${urls.USER}/me`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
} = userApi;

