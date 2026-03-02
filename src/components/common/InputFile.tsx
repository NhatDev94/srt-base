"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type InputFileProps = {
    onChange?: (file: File[] | []) => void;
    accept?: string;
    disabled?: boolean;
    preview?: boolean;
    error?: boolean;
    maxFiles?: number;
    maxSizeMB?: number;
};

type PreviewFile = {
    file: File;
    previewUrl: string;
};

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
    ({ onChange, accept = "image/*", disabled, preview = false, error, maxFiles = 1, maxSizeMB = 20 }, ref) => {
        const t = useTranslations('Common.upload')
        const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);

        const internalInputRef = useRef<HTMLInputElement | null>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files) return;

            // Chuyển đổi FileList thành mảng File[]
            const selectedFiles = Array.from(files).slice(0, maxFiles);

            if (preview) {
                const newPreviews = selectedFiles.map(file => ({
                    file,
                    previewUrl: URL.createObjectURL(file)
                }));
                setPreviewFiles(newPreviews);
            }

            // Gửi mảng File[] đi
            onChange?.(selectedFiles);
            e.target.value = ""; // Reset input để có thể chọn lại cùng file nếu muốn
        };

        const handleRemove = (file: PreviewFile) => {
            const newPreviewFiles = previewFiles.filter((f) => f !== file);
            setPreviewFiles(newPreviewFiles);

            URL.revokeObjectURL(file.previewUrl);

            // Gửi mảng File[] đã lọc về cho Form
            const updatedFiles = newPreviewFiles.map(f => f.file);
            onChange?.(updatedFiles);
        }

        // Dọn dẹp bộ nhớ khi component bị hủy hoặc khi chọn ảnh mới
        useEffect(() => {
            return () => {
                previewFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
            };
        }, []);

        return (
            <div className="space-y-2">
                <input
                    type="file"
                    ref={(e) => {
                        internalInputRef.current = e;
                        if (typeof ref === "function") ref(e);
                        else if (ref) ref.current = e;
                    }}
                    className="hidden"
                    multiple={maxFiles > 1}
                    accept={accept}
                    disabled={disabled}
                    onChange={handleChange}
                />
                <div
                    onClick={() => internalInputRef.current?.click()}
                    className={cn(
                        "flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        error ? "border-destructive text-destructive" : "border-input bg-background",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Upload size={16} />
                        <span className="text-sm font-medium">
                            {previewFiles.length > 0
                                ? t('success', { count: previewFiles.length })
                                : t('placeholder')}
                        </span>
                    </div>
                    {previewFiles.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                            {t('change')}
                        </span>
                    )}
                </div>



                {preview && previewFiles.length > 0 && (
                    <div className="w-full flex gap-1 flex-wrap">
                        {
                            previewFiles.map((file, index) => (
                                <div key={file.previewUrl} className="relative w-16 h-16 rounded border border-border shadow overflow-hidden select-none">
                                    <Image
                                        src={file.previewUrl}
                                        // width={64}
                                        // height={64}
                                        fill
                                        alt={`preview-${index}`}
                                        className="object-cover"
                                    />

                                    <div
                                        onClick={() => handleRemove(file)}
                                        className="w-3.5 h-3.5 absolute top-0.5 right-0.5 flex items-center justify-center bg-background/80 rounded-full cursor-pointer">
                                        <X size={10} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        );
    }
);

InputFile.displayName = "InputFile";

export default InputFile;