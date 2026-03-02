'use client';

import { setUserLocale } from '@/i18n/locale-storage';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Languages, Loader2 } from 'lucide-react'; // Thêm Loader2 để làm icon quay

export default function LanguageToggle() {
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    function onChange(value: string) {
        startTransition(async () => {
            await setUserLocale(value);
            // Có thể thêm window.location.reload() nếu nội dung không tự cập nhật 
            // nhưng thường next-intl + startTransition sẽ tự nhận diện.
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="gap-2 min-w-30 justify-start"
                    disabled={isPending} // Khóa nút khi đang xử lý
                >
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Languages className="h-4 w-4 text-blue-600" />
                    )}
                    <span className="uppercase">
                        {isPending ? 'Loading...' : locale === 'vi' ? 'VI' : 'EN'}
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>Ngôn ngữ / Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={locale} onValueChange={onChange}>
                    <DropdownMenuRadioItem value="en" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🇺🇸</span>
                            <span>English</span>
                        </div>
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="vi" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🇻🇳</span>
                            <span>Tiếng Việt</span>
                        </div>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}