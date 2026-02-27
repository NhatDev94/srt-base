import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    isDarkMode: boolean;
}

// Kiểm tra trạng thái đã lưu hoặc ưu tiên hệ thống
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
};

const initialState: ThemeState = {
    isDarkMode: getInitialTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            if (state.isDarkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        },
        // Dùng để đồng bộ khi vừa load trang
        initTheme: (state) => {
            if (state.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    },
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;