import type { Token, UserInfo } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    userInfo: UserInfo | null,
    token: Token | null
}

const initialState: AuthState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : null,
    token: localStorage.getItem('token')
        ? JSON.parse(localStorage.getItem('token')!)
        : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: UserInfo, token: Token }>) => {
            state.userInfo = action.payload.user
           
            localStorage.setItem('userInfo', JSON.stringify(action.payload.user))
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        },
        clearCredentials: (state) => {
            state.userInfo = null
            state.token = null
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        } 
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer