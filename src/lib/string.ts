/**
 * 1. Rút gọn chuỗi nếu quá dài
 */
export const truncate = (str: string, length: number) => {
    if (!str) return "";
    return str.length > length ? str.substring(0, length) + "..." : str;
};

/**
 * 2. Tạo Slug từ tiếng Việt (Ví dụ: "Học React" -> "hoc-react")
 */
export const toSlug = (str: string) => {
    if (!str) return "";
    return str
        .toLowerCase()
        .normalize("NFD")              // Chuẩn hóa Unicode để tách dấu
        .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu
        .replace(/[đĐ]/g, "d")          // Xử lý riêng chữ đ
        .replace(/([^0-9a-z-\s])/g, "") // Xóa ký tự đặc biệt
        .replace(/(\s+)/g, "-")         // Thay khoảng trắng bằng dấu gạch ngang
        .replace(/-+/g, "-")            // Xóa nhiều dấu gạch ngang liên tiếp
        .replace(/^-+|-+$/g, "");       // Xóa dấu gạch ngang ở đầu và cuối
};

/**
 * 3. Viết hoa chữ cái đầu
 */
export const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};