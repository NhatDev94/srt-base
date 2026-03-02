export type BaseFilterRequest = {
    keyword?: string;    // Từ khóa tìm kiếm
    pageIndex: number;   // Trang hiện tại (1, 2, 3...)
    pageSize: number;    // Số lượng item trên 1 trang (10, 20, 50...)
    sortBy?: string;     // Sắp xếp theo cột nào
    isDescending?: boolean; // Sắp xếp giảm dần hay tăng dần
}

export type BaseResponse<T> = {
    data: T;             // Dữ liệu thực tế (Dùng Generic <T> để linh hoạt)
    success: boolean;    // Trạng thái (true/false)
    message: string;     // Thông báo từ server (ví dụ: "Cập nhật thành công")
    errors?: string[];   // Chi tiết các lỗi nếu có
}

export type PagedResponse<T> = {
    items: T[];          // Mảng chứa dữ liệu (ví dụ: danh sách 10 sản phẩm)
    totalRecords: number; // Tổng số lượng bản ghi có trong database (ví dụ: 100)
    pageIndex: number;    // Trang hiện tại
    pageSize: number;     // Số lượng item mỗi trang
    totalPages: number;   // Tổng số trang tính được (ví dụ: 10 trang)
}