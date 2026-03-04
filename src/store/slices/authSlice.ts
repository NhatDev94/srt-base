import { User } from '@/features/auth/types/auth.type'
import { StateCreator } from 'zustand'

// Demo thôi nha, ko quản lý token + user bằng global state, quản lý bằng cookie

export type AuthSlice = {
    user: User | null,
    accessToken: string | null,
    login: (userData: User, accessToken: string) => void,
    logout: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    user: null,
    accessToken: null,
    login: (userData, accessToken) => set({ user: userData, accessToken }),
    logout: () => set({ user: null, accessToken: null })
})