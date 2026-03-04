import { StateCreator } from 'zustand'

type User = {
    name: string,
    email: string
}

export type AuthSlice = {
    user: User | null,
    isAuthenticated: boolean,
    login: (userData: User) => void,
    logout: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    user: null,
    isAuthenticated: true,
    login: (userData) => set({ user: userData, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false })
})