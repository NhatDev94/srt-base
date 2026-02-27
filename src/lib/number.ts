/**
 * 1. Định dạng tiền tệ Việt Nam (VNĐ)
 * Ví dụ: 1000000 -> 1.000.000 ₫
 */
export const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return "0 ₫";

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(num);
};

/**
 * 2. Định dạng số có dấu phân cách hàng nghìn
 * Ví dụ: 1250.5 -> 1.250,5
 */
export const formatNumber = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return "0";

    return new Intl.NumberFormat('vi-VN').format(num);
};

/**
 * 3. Rút gọn số lớn (Dùng cho lượt xem, lượt thích)
 * Ví dụ: 1500 -> 1.5K, 1200000 -> 1.2M
 */
export const formatCompactNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);
};