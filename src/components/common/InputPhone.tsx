'use client';

import { forwardRef, useState } from "react";
import { Input } from "../ui/input";
import { PatternFormat, PatternFormatProps } from "react-number-format"
import { cn } from "@/lib/utils"

// Định nghĩa Props: kế thừa tất cả props của PatternFormat nhưng bỏ onChange mặc định
// để tránh xung đột với React Hook Form
type PhoneInputProps = Omit<PatternFormatProps, 'format' | 'onChange'> & {
    className?: string
}
const InputPhone = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ className, value, ...props }, ref) => {
        // Định dạng số điện thoại US với 10 số: (123) 456-7890
        // const phoneFormat = phone.length >= 4 ? "# (###) ### ###" : "# ###"

        return (
            <PatternFormat
                {...props}
                format="#### ### ###" // Định dạng 4-3-3 cho 10 số
                getInputRef={ref} // Chuyển ref vào input thật của shadcn
                mask="" // Hiển thị gạch chân khi chưa nhập (tùy chọn)
                value={value}
                customInput={Input} // Tích hợp Style của shadcn/ui
                // Logic chặn nhập chữ và giới hạn số
                allowEmptyFormatting={false}
                type="tel"
                placeholder="0000-000-000"
                // Các class Semantic Tokens từ shadcn/ui vẫn hoạt động
                className={cn("focus-visible:ring-ring focus-visible:ring-2 border-input", className)}
            />
        )
    }
)

InputPhone.displayName = "InputPhone"

export { InputPhone }