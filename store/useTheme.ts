import { create } from "zustand";

interface ThemeState {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
  setKitTheme: (mode: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeMode: "light", // 默认主题模式
  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
  setKitTheme: (mode) => set({ themeMode: mode }),
}));