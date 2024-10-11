import { create } from "zustand";

interface AuthState {
  token: string | null;
  auth: boolean;
  isAdmin: boolean;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  auth: localStorage.getItem("token") ? true : false,
  isAdmin: false,
  role: null,
  login: (token, role) => {
    set({ token, auth: true, role });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (role == "admin") {
      set({ isAdmin: true });
    }
  },
  logout: () => {
    set({ token: null, auth: false, role: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },
}));
