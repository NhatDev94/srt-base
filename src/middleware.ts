// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Lấy token từ Cookie (Ưu tiên dùng Cookie cho Middleware vì dễ đọc hơn localStorage)
  const token = request.cookies.get('access_token')?.value;

  const { pathname } = request.nextUrl;

  // 2. Nếu người dùng CHƯA login và đang cố truy cập các trang nội bộ
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Nếu người dùng ĐÃ login mà cố truy cập lại trang /login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 4. Cấu hình các đường dẫn sẽ chạy qua Middleware này
export const config = {
  matcher: [
    /*
     * Áp dụng cho tất cả các đường dẫn trừ:
     * - api (các đường dẫn gọi API)
     * - _next/static (file tĩnh của Next.js)
     * - _next/image (tối ưu ảnh)
     * - favicon.ico (icon web)
     * - public (các file trong thư mục public như logo, banner)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};