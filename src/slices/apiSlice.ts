import type { RootState } from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000',
    // credentials: 'include'
      prepareHeaders: (headers, { getState }) => {
        // Get the token from the state
        const token = (getState() as RootState).auth.token
     
        if (token) {
            headers.set('Authorization', `Bearer ${token.access_token}`)
        }

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery, 
    tagTypes: ['User'],
    endpoints: () => ({})
})