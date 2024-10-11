import { create } from "zustand";

interface AuthState {
  token: string | null;
  auth: boolean;
  isAdmin: boolean;
  role: string | null;
  userId: string | null;
  login: (token: string, role: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  auth: localStorage.getItem("token") ? true : false,
  isAdmin: localStorage.getItem("role") == "admin" ? true : false,
  role: null,
  userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : null,
  login: (token, role, userId) => {
    set({ token, auth: true, role, userId });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    if (role == "admin") {
      set({ isAdmin: true });
    }
  },
  logout: () => {
    set({ token: null, auth: false, role: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  },
}));
