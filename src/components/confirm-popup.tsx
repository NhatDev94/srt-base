import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type ConfirmPopupType = {
    open: boolean;
    title?: string;
    description?: string;
    labelConfirm?: string;
    labelCancel?: string;
    variant?: "default" | "destructive"; // Để đổi màu nút Confirm
    onCancel: () => void;
    onConfirm: () => void;
    isLoading?: boolean; // Thêm loading để chặn click khi đang xử lý
}

export function ConfirmPopup({
    open,
    title = "Xác nhận hành động",
    description = "Bạn có chắc chắn muốn thực hiện hành động này không?",
    labelConfirm = "Xác nhận",
    labelCancel = "Hủy",
    variant = "default",
    isLoading = false,
    onCancel,
    onConfirm
}: ConfirmPopupType) {
    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && !isLoading && onCancel()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
                        {labelCancel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault(); // Ngăn đóng popup tự động nếu muốn xử lý async
                            onConfirm();
                        }}
                        disabled={isLoading}
                        className={variant === "destructive" ? "bg-destructive! text-destructive-foreground!" : ""}
                    >
                        {isLoading ? "Đang xử lý..." : labelConfirm}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}