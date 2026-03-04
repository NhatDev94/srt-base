import { create } from 'zustand'
import { createAuthSlice, AuthSlice } from '@/store/slices/authSlice'

// Gộp kiểu dữ liệu (Type):  AuthSlice & ProductSlice
type StoreState = AuthSlice

export const useStore = create<StoreState>()((...a) => ({
    ...createAuthSlice(...a),
}))