"use client";
import { Sun, Moon } from "lucide-react";
import { Button } from "@nhatdev94/common-ui";
import { useTheme } from "next-themes";


export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-9 h-9"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-yellow-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button >
    );
};