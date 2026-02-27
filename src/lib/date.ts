import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale'; // Import tiếng Việt

/**
 * Định dạng ngày tháng cơ bản (Ví dụ: 27/02/2026)
 */
export function formatDate(date: string | Date | number, formatStr = 'dd/MM/yyyy') {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return 'Ngày không hợp lệ';
    return format(d, formatStr, { locale: vi });
}

/**
 * Định dạng đầy đủ cả ngày và giờ (Ví dụ: 10:30 - 27/02/2026)
 */
export function formatDateTime(date: string | Date) {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return 'Ngày không hợp lệ';
    return format(d, 'HH:mm - dd/MM/yyyy', { locale: vi });
}

/**
 * Hiển thị thời gian tương đối (Ví dụ: 5 phút trước, 2 ngày trước)
 */
export function formatRelativeTime(date: string | Date) {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return 'Vừa xong';
    return formatDistanceToNow(d, {
        addSuffix: true, // Thêm chữ "trước" hoặc "sau"
        locale: vi
    });
}

/**
 * Trả về lời chào theo buổi (Sáng, Chiều, Tối)
 */
export function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
}