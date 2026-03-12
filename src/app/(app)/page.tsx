'use client'

import { Employee } from "./columns";
import { Table } from "./table";
import { useState } from "react";
import { BaseFilterRequest } from "@nhatdev94/util";


const ALL_EMPLOYEES = [
  // ... Paste toàn bộ 10 bản ghi bạn gửi ở trên vào đây
  // Bạn có thể nhân bản chúng lên để đủ 25 bản ghi cho giống totalElements
  ...Array(252).fill(null).map((_, index) => ({
    id: `uuid-${index}`,
    employeeCode: `orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips EMP2024 ${String(index + 1).padStart(5, '0')}`,
    fullName: `orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips4viên số ${index + 1}`,
    position: index % 2 === 0 ? "Manager" : "Developer",
    phone: "0901234567",
    email: `staff${index}@srt.com`,
    workStatus: "OFFICIAL",
    classification: "COT_LOI",
    realStartDate: "2020-01-20"
  }))
];


export const fetchEmployeesFake = async ({
  pageIndex = 1,
  pageSize = 10,
  keyword = '',
  sortBy,
  isDescending
}: {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  isDescending?: boolean;
}) => {
  // 1. Giả lập delay mạng (để thấy Skeleton)
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 2. LOGIC SEARCH: Lọc dữ liệu theo từ khóa (Không phân biệt hoa thường)
  let filteredData = [...ALL_EMPLOYEES];

  if (keyword && keyword.trim() !== "") {
    const searchLower = keyword.trim().toLowerCase();
    filteredData = ALL_EMPLOYEES.filter(
      (emp) =>
        emp.fullName.toLowerCase().includes(searchLower) ||
        emp.employeeCode.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower)
    );
  }

  // 3. LOGIC SORT: Sắp xếp dữ liệu dựa trên field và order
  if (sortBy) {
    filteredData.sort((a: any, b: any) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Xử lý so sánh (hỗ trợ cả string và number)
      if (aValue < bValue) return isDescending ? 1 : -1;
      if (aValue > bValue) return isDescending ? -1 : 1;
      return 0;
    });
  }

  // 4. LOGIC PAGINATION: Phân trang trên tập dữ liệu đã Search và Sort
  const totalElements = filteredData.length;
  const totalPages = Math.ceil(totalElements / pageSize);

  // Tính toán vị trí cắt mảng
  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;
  const slicedData = filteredData.slice(start, end);

  // 5. Trả về đúng cấu trúc mà Component DataTable đang mong đợi
  return {
    status: 200,
    message: "Success",
    data: {
      data: slicedData,
      currentPage: pageIndex,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: totalPages,
      hasNextPage: pageIndex < totalPages,
      hasPreviousPage: pageIndex > 1
    },
    timestamp: new Date().toISOString()
  };
};
const DashBoardPage = () => {
  const [data, setDtata] = useState<Employee[]>([])
  const [totalElements, setTotalElemnt] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async (value: BaseFilterRequest) => {
    setIsLoading(true)
    const data = await fetchEmployeesFake(value)
    setDtata(data?.data?.data)
    setTotalElemnt(data?.data?.totalElements)
    setIsLoading(false)
  }

  return (
    <div className="mb-10">
      <Table data={data} rowCount={totalElements} api={getData} isLoading={isLoading} isSearch={true} />
    </div>
  )
}

export default DashBoardPage;

