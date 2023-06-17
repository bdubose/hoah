import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Property} from "./models/Property.ts";
import {Lien} from "./models/Lien.ts";
import { Homeowner, HomeownerDetails } from "./models/Homeowner.ts";
import { Payment } from "./models/Payment.ts";

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
        getHomeownerDetails: builder.query<HomeownerDetails, number>({
            query: id => `/Homeowners/Details/${id}`,
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
        
        addPayment: builder.mutation<void, Payment>({
            query: payment => ({
                url: '/Payments',
                method: 'post',
                body: payment,
            }),
            invalidatesTags: [ Tags.Homeowner ]
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
    useGetHomeownerDetailsQuery,
    useUpdateHomeownerMutation,
    
    useGetAllLiensQuery,
    
    useAddPaymentMutation,
    
    useGetAllPropertiesQuery,
    useGetPropertyQuery,
    useUpdatePropertyMutation,
} = api;