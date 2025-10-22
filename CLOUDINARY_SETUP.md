# HƯỚNG DẪN SỬ DỤNG CLOUDINARY

## Bước 1: Tạo tài khoản Cloudinary

1. Truy cập: https://cloudinary.com/
2. Đăng ký tài khoản miễn phí (Free Plan)
3. Xác nhận email

## Bước 2: Lấy thông tin cấu hình

1. Đăng nhập vào Cloudinary
2. Vào Dashboard, bạn sẽ thấy:
   - **Cloud Name**: dqqtiwfnw (của bạn sẽ khác)
   - **API Key**
   - **API Secret**

## Bước 3: Tạo Upload Preset

1. Vào **Settings** (góc trên bên phải)
2. Chọn tab **Upload**
3. Kéo xuống phần **Upload presets**
4. Click **Add upload preset**
5. Cấu hình:
   - **Preset name**: đặt tên (ví dụ: `vue_posts`)
   - **Signing mode**: chọn **Unsigned**
   - **Folder**: để trống hoặc đặt tên folder (ví dụ: `posts`)
6. Click **Save**

## Bước 4: Cập nhật code

Mở file `src/views/AddPost.vue` và cập nhật 2 hằng số:

```javascript
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name' // Thay bằng Cloud Name của bạn
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset' // Thay bằng Upload Preset vừa tạo
```

## Ví dụ:

```javascript
const CLOUDINARY_CLOUD_NAME = 'dqqtiwfnw'
const CLOUDINARY_UPLOAD_PRESET = 'vue_posts'
```

## Test upload

1. Vào trang Thêm bài viết
2. Chọn một ảnh từ máy tính
3. Ảnh sẽ tự động upload lên Cloudinary
4. URL ảnh sẽ được lưu vào database

## Xem ảnh đã upload

1. Vào Cloudinary Dashboard
2. Click vào **Media Library**
3. Bạn sẽ thấy tất cả ảnh đã upload
