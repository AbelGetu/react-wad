export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface Token {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
}

export interface UpdateUserRequest {
    name?: string
    email?: string
    password?: string
}

export interface UserInfo {
    id: string
    name: string
    email: string
    email_verified_at: string | null
    phone: string
    phone_verified_at: string | null
    school_id: string | null
    roleNames: [string]
    refresh_token: string
    refresh_token_expiry: string
}

export interface AuthResponse {
    user: UserInfo
    token: Token
}

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
};