# Kareer Project Setup Guide

Chào mừng bạn đến với dự án Kareer - Nền tảng định hướng nghề nghiệp thông minh dành cho Gen Z.

## 1. Cấu trúc dự án (Đã rút gọn - Flat Structure)

Dự án hiện đã được tối ưu hóa vào một thư mục duy nhất để dễ dàng quản lý và triển khai:

- `/`: Toàn bộ các tệp HTML, CSS, JS và cấu hình backend.
- `index.html`: Trang chủ và onboarding.
- `step2.html`: Kết quả phân tích (sau khi làm trắc nghiệm).
- `step3.html`: Ma trận nghề nghiệp (Career Matrix).
- `roadmap.html` & `timeline.html`: Lộ trình thăng tiến và kế hoạch học tập.
- `server.js`: Server API (Node.js/Express).
- `migrate.js` & `migration.sql`: Scripts quản lý database (Supabase).
- `api-client.js`: Thư viện kết nối frontend với backend.
- `config.js`: Quản lý URL API tập trung.

## 2. Hướng dẫn cài đặt Backend

Dự án sử dụng **Node.js** và **Supabase** (PostgreSQL).

### Bước 1: Cài đặt dependencies
Mở terminal tại thư mục gốc và chạy:
```bash
npm install
```

### Bước 2: Cấu hình môi trường
Tạo file `.env` tại thư mục gốc với nội dung:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

### Bước 3: Khởi tạo Database
Chạy script migration để tạo các bảng cần thiết:
```bash
node migrate.js
```
*Lưu ý: Nếu script gặp lỗi quyền RPC, hãy copy nội dung file `migration.sql` và chạy trực tiếp trong SQL Editor của Supabase Dashboard.*

### Bước 4: Chạy Server
```bash
npm start
```

## 3. Hướng dẫn cài đặt Frontend

### Bước 1: Cập nhật config
Mở file `config.js` và đảm bảo URL trỏ đúng về server của bạn (mặc định là localhost:3000).

### Bước 2: Chạy local
Bạn có thể mở trực tiếp `index.html` hoặc dùng `Live Server`.

## 4. Deploy

- **Frontend**: Deploy lên GitHub Pages, Vercel hoặc Netlify.
- **Backend**: Deploy lên Render, Railway hoặc Vercel (chuyển đổi sang Serverless).
- **Database**: Sử dụng Supabase.

## 5. Liên hệ
Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ đội ngũ phát triển.
