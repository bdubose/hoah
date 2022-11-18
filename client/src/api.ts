import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Test } from '../../common/models/test';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/',
    }),
    endpoints: builder => ({
        getTest: builder.query<Test, void>({
            query: () => 'test'
        })
    })
});

export const {
    useGetTestQuery,
} = api;