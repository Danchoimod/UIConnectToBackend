# Admin Panel - Quản lý Bài viết

Hệ thống quản lý bài viết với Vue.js 3, JSON Server và Cloudinary.

## 🚀 Công nghệ sử dụng

- **Vue.js 3** - Composition API
- **Vue Router 4** - Điều hướng
- **Axios** - HTTP Client
- **JSON Server** - Fake REST API
- **Cloudinary** - Upload và lưu trữ hình ảnh

## 📋 Tính năng

### ✅ Trang chủ Dashboard

- Thống kê tổng quan (Bài viết, Sản phẩm, Người dùng)
- Các nút chức năng nhanh

### ✅ Quản lý Bài viết

- ✔️ Xem danh sách bài viết
- ✔️ Tìm kiếm bài viết
- ✔️ Thêm bài viết mới
- ✔️ Chỉnh sửa bài viết
- ✔️ Xóa bài viết (có xác nhận)
- ✔️ Upload hình ảnh lên Cloudinary
- ✔️ Xem trước hình ảnh
- ✔️ Validation form đầy vào

### 🎨 Giao diện

- Sidebar navigation
- Header với tìm kiếm
- Responsive design
- Modern UI/UX

## 🛠️ Cài đặt

### 1. Clone project

\`\`\`bash
git clone <repo-url>
cd lab678
\`\`\`

### 2. Cài đặt dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Cấu hình Cloudinary

Xem file [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) để biết cách cấu hình.

Sau đó cập nhật file \`src/views/AddPost.vue\`:
\`\`\`javascript
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name'
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset'
\`\`\`

### 4. Khởi chạy JSON Server

\`\`\`bash
npm run start
\`\`\`
JSON Server sẽ chạy tại: http://localhost:3001

### 5. Khởi chạy Vue Dev Server

Mở terminal mới:
\`\`\`bash
npm run dev
\`\`\`
Ứng dụng sẽ chạy tại: http://localhost:5173

## 📁 Cấu trúc thư mục

\`\`\`
src/
├── components/
│ ├── Navbar.vue # Header với tìm kiếm
│ └── Sidebar.vue # Menu điều hướng
├── views/
│ ├── HomeView.vue # Trang chủ dashboard
│ ├── PostList.vue # Danh sách bài viết
│ ├── AddPost.vue # Thêm/Sửa bài viết
│ ├── ProductList.vue # Quản lý sản phẩm (placeholder)
│ └── UserList.vue # Quản lý người dùng (placeholder)
├── router/
│ └── index.js # Cấu hình routes
├── App.vue # Component chính
└── main.js # Entry point
\`\`\`

## 🔌 API Endpoints (JSON Server)

- \`GET /posts\` - Lấy danh sách bài viết
- \`GET /posts/:id\` - Lấy chi tiết bài viết
- \`POST /posts\` - Tạo bài viết mới
- \`PUT /posts/:id\` - Cập nhật bài viết
- \`DELETE /posts/:id\` - Xóa bài viết

## 📝 Cấu trúc dữ liệu

### Post Object

\`\`\`json
{
"id": 1,
"title": "Tiêu đề bài viết",
"content": "Nội dung bài viết...",
"image": "https://res.cloudinary.com/...",
"author": "Tên tác giả"
}
\`\`\`

## ✨ Các tính năng nổi bật

### Upload hình ảnh

- Upload trực tiếp lên Cloudinary
- Hiển thị preview ngay lập tức
- Lưu URL vào database

### Validation

- Kiểm tra các trường không được để trống
- Bắt buộc phải có hình ảnh
- Hiển thị lỗi rõ ràng

### UX/UI

- Xác nhận trước khi xóa
- Loading states
- Responsive design
- Hover effects

## 🎯 Sử dụng

### Thêm bài viết mới

1. Click "Bài viết" trên sidebar
2. Click "Thêm bài viết"
3. Điền thông tin:
   - Tiêu đề
   - Chọn hình ảnh (sẽ auto upload)
   - Tác giả
   - Nội dung
4. Click "Lưu"

### Sửa bài viết

1. Vào danh sách bài viết
2. Click nút "Sửa" ở bài viết muốn chỉnh sửa
3. Cập nhật thông tin
4. Click "Cập nhật"

### Xóa bài viết

1. Vào danh sách bài viết
2. Click nút "Xóa"
3. Xác nhận trong popup

## 🔍 Tìm kiếm

- Tìm theo tiêu đề
- Tìm theo tác giả
- Tìm theo nội dung
- Kết quả realtime

## 📱 Screenshots

Xem các ảnh mô tả trong folder docs (nếu có)

## 🐛 Troubleshooting

### JSON Server không chạy?

\`\`\`bash

# Kiểm tra port 3001 có đang được sử dụng không

npx kill-port 3001

# Chạy lại

npm run start
\`\`\`

### Upload ảnh không thành công?

- Kiểm tra lại CLOUDINARY_CLOUD_NAME
- Kiểm tra lại CLOUDINARY_UPLOAD_PRESET
- Đảm bảo Upload Preset là "Unsigned"

### Cannot fetch posts?

- Đảm bảo JSON Server đang chạy
- Kiểm tra API_URL trong code: \`http://localhost:3001\`

## 📚 Tài liệu tham khảo

- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [Cloudinary](https://cloudinary.com/documentation)

## 👨‍💻 Tác giả

Lab Exercise - Vue.js Admin Panel

## 📄 License

MIT
