import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cookies, headers } from 'next/headers';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    headers: {
      'Content-Type': 'application/json',
      // ...headers(),
    },
  }),
  endpoints: () => ({}),
});
