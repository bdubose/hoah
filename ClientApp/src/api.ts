import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Property} from "./models/Property.ts";
import {Lien} from "./models/Lien.ts";
import {Homeowner} from "./models/Homeowner.ts";

enum Tags {
    Homeowner = 'Homeowner',
    Lien = 'Lien',
    Property = 'Property',
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: Object.keys(Tags),
    endpoints: builder => ({
        getAllHomeowners: builder.query<Homeowner[], void>({
            query: () => '/Homeowners',
            providesTags: [ Tags.Homeowner ],
        }),
        getHomeowner: builder.query<Homeowner, number>({
            query: id => `/Homeowners/${id}`,
            providesTags: [ Tags.Homeowner ],
        }),
        updateHomeowner: builder.mutation<number, Homeowner>({
            query: homeowner => ({
                url: '/Homeowners',
                method: 'post',
                body: homeowner,
            }),
            invalidatesTags: [ Tags.Homeowner ]
        }),
        
        
        getAllLiens: builder.query<Lien[], void>({
            query: () => '/Liens'
        }),
        
        getAllProperties: builder.query<Property[], void>({
            query: () => '/Properties'
        }),
        getProperty: builder.query<Property, number>({
            query: propertyId => `/Properties/${propertyId}`,
            providesTags: [ Tags.Property ],
        }),
        updateProperty: builder.mutation<number, Property>({
            query: property => ({
                url: '/Properties',
                method: 'post',
                body: property,
            }),
            invalidatesTags: [ Tags.Property ],
        })
    })
});

export const {
    useGetAllHomeownersQuery,
    useGetHomeownerQuery,
    useUpdateHomeownerMutation,
    
    useGetAllLiensQuery,
    
    useGetAllPropertiesQuery,
    useGetPropertyQuery,
    useUpdatePropertyMutation,
} = api;