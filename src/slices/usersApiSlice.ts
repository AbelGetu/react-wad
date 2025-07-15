
import { apiSlice } from "./apiSlice"
import type { AuthResponse, LoginRequest, RegisterRequest, UpdateUserRequest, UserInfo } from "@/types"

const URL = '/api/'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (data) => ({
                url: `${URL}login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (data) => ({
                url: `${URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${URL}logout`,
                method: 'POST'
            })
        }),
        updateUser: builder.mutation<UserInfo, UpdateUserRequest>({
            query: (data) => ({
                url: `${URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUpdateUserMutation 
} = usersApiSlice