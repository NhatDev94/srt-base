// lib/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import layoutReducer from "@/lib/redux/slices/layoutSlice"
import themeReducer from "@/lib/redux/slices/themeSlice"

// 1. Kết hợp các reducers lại thành một Root Reducer
// Việc này giúp bạn định nghĩa RootState mà không bị lỗi vòng lặp với makeStore
const rootReducer = combineReducers({
    layout: layoutReducer,
    theme: themeReducer
    // Thêm các reducer khác ở đây
});

// 2. Định nghĩa các Type dựa trên Root Reducer
export type RootState = ReturnType<typeof rootReducer>;

// 3. Hàm khởi tạo store (Sẽ được gọi ở StoreProvider phía Client)
export const makeStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState, // Nạp dữ liệu ban đầu từ Server vào đây
        devTools: process.env.NODE_ENV !== "production",
    });
};

// 4. Các Type bổ trợ cho Dispatch và Store
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];