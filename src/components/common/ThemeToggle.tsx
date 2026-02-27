"use client";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store"; // Đường dẫn tới store của bạn
import { toggleTheme } from "@/lib/redux/slices/themeSlice";
import { Button } from "../ui/button";

export const ThemeToggle = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full w-9 h-9"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-yellow-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};