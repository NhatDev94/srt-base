"use client";

import React, { forwardRef } from "react";
import { Input } from "./input";

type InputFileProps = {
    onChange?: (file: File | undefined) => void;
    accept?: string;
    disabled?: boolean;
    preview?: boolean;
    error?: boolean;
    maxFiles?: number;
    maxSizeMB?: number;
};

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
    ({ onChange, accept = "image/*", disabled, preview = false, error, maxFiles = 1, maxSizeMB = 20 }, ref) => {
        const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            // handle max files, max size
            // remove preview
            if (!file) {
                setPreviewUrl(null);
            }

            if (preview && file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }

            onChange?.(file);
        };

        return (
            <div className="space-y-2">
                <Input
                    ref={ref}
                    type="file"
                    accept={accept}
                    disabled={disabled}
                    aria-invalid={error}
                    autoComplete="off"
                    onChange={handleChange}
                    className="cursor-pointer"
                />

                {preview && previewUrl && (
                    <img
                        src={previewUrl}
                        alt="preview"
                        className="h-12 object-cover rounded border border-border"
                    />
                )}
            </div>
        );
    }
);

InputFile.displayName = "InputFile";

export default InputFile;