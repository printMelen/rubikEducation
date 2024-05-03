import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: null,
//   userId: "",
//   role: "",
//   setTokenAsync: () => set((newToken) => ({ token: newToken })),
  setToken: () => set((newToken) => ({ token: newToken })),
//   setuserId: () => set((newUserId) => ({ userId: newUserId })),
//   setToken: () => set((newRole) => ({ role: newRole })),
}))