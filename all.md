# Mô tả chi tiết cách hoạt động của project

---

## 1. Cấu trúc dữ liệu (db.json)

- **users**: Danh sách người dùng (id, name, email, password, isAdmin, avatar)
- **apps**: Danh sách ứng dụng (id, name, description, image)
- **comments**: Đánh giá/bình luận của người dùng cho từng ứng dụng (id, appId, userId, userName, text, date, likes)
- **commentLikes**: Lưu trạng thái like/dislike của từng user cho từng comment (id, commentId, userId, type)

## 2. Luồng hoạt động chính

### 2.1. Đăng nhập/Đăng xuất

- Người dùng đăng nhập qua modal, xác thực qua API `/users?email=...&password=...`
- Sau khi đăng nhập, thông tin user được lưu vào localStorage
- Đăng xuất sẽ xóa localStorage và cập nhật lại UI

### 2.2. Quản lý người dùng

- Thêm user: Form nhập thông tin, upload avatar lên Cloudinary, lưu vào `/users`
- Danh sách user: Hiển thị bảng, avatar, email, quyền admin, cho phép chỉnh sửa/xóa
- Chỉnh sửa user: Modal cho phép cập nhật thông tin, avatar, quyền admin
- Xóa user: Gọi API xóa user khỏi db.json

### 2.3. Quản lý ứng dụng

- Thêm app: Form nhập thông tin, upload ảnh lên Cloudinary, lưu vào `/apps`
- Danh sách app: Hiển thị bảng, cho phép chỉnh sửa/xóa

### 2.4. Quản lý comment/đánh giá

- Hiển thị comment: Lấy từ `/comments`, hiển thị avatar user, nội dung, số lượt like
- Thêm comment: Form nhập nội dung, lưu vào `/comments`
- Xóa comment: Chỉ admin mới có quyền xóa, gọi API xóa khỏi db.json

### 2.5. Like/Dislike comment

- Mỗi user chỉ được like hoặc dislike 1 lần cho mỗi comment
- Trạng thái like/dislike lưu vào `/commentLikes`
- Khi like/dislike, số lượt like của comment được cập nhật
- UI hiển thị trạng thái đã like/dislike (nút màu, dấu ✓)

### 2.6. Dashboard

- Hiển thị tổng số user, app, comment (fetch từ API)
- Các số liệu được cập nhật realtime khi có thay đổi

## 3. Luồng dữ liệu

- Frontend: Vue 3, sử dụng Composition API, axios để gọi API
- Backend: json-server, cung cấp các endpoint RESTful cho CRUD
- Upload ảnh: Sử dụng Cloudinary, nhận về URL và lưu vào db.json

## 4. Bảo mật & Phân quyền

- Trang admin chỉ cho phép user có `isAdmin: true` truy cập
- Nếu không phải admin, sẽ bị chuyển về trang chủ và thông báo

## 5. Giao diện

- Sử dụng Bootstrap cho layout, responsive
- Sidebar cho admin, navbar cho user
- Modal cho login, edit user
- Avatar hiển thị hình tròn, có placeholder nếu chưa có ảnh

## 6. Cách chạy project

1. Chạy json-server:
   ```powershell
   json-server --watch db.json --port 3000
   ```
2. Chạy frontend với Vite:
   ```powershell
   npm run dev
   ```
3. Truy cập các chức năng qua giao diện web.

## 7. Các điểm nổi bật

- Quản lý user, app, comment hoàn chỉnh
- Upload ảnh lên Cloudinary
- Like/dislike comment chỉ 1 lần/user/comment
- Phân quyền admin rõ ràng
- UI hiện đại, dễ sử dụng

---

# 🟢 Trang Thêm Sản Phẩm (Ứng Dụng) - AddApp.vue

## 1. Vị trí

- Đường dẫn: `/admin/apps/add`
- Component: `src/views/admin/Appmanager/AddApp.vue`
- Được truy cập qua sidebar admin

## 2. Luồng hoạt động

### Bước 1: Hiển thị Form

- Form gồm các trường:
  - Tên ứng dụng (`name`)
  - Mô tả (`description`)
  - Ảnh đại diện (`image`)

### Bước 2: Upload Ảnh

- Người dùng chọn file ảnh từ máy tính
- Khi chọn file, hàm `onFileChange` được gọi:
  - Ảnh được upload lên Cloudinary qua API
  - Nhận về URL ảnh và gán vào trường `form.image`
  - Hiển thị preview ảnh ngay trên form

### Bước 3: Nhập thông tin và submit

- Người dùng nhập tên, mô tả, chọn ảnh
- Nhấn nút **Thêm ứng dụng**
- Hàm `addApp` được gọi:
  - Gửi dữ liệu lên API `POST http://localhost:3000/apps`
  - Dữ liệu gồm: `{ name, description, image }`
  - Nếu thành công: Hiển thị thông báo, reset form, chuyển hướng về trang danh sách ứng dụng (`/admin/apps/list`)
  - Nếu thất bại: Hiển thị thông báo lỗi

### Bước 4: Lưu dữ liệu

- Ứng dụng mới được lưu vào mảng `apps` trong `db.json`
- Ảnh là link Cloudinary, không lưu file trên server

---

# 🟢 Trang Danh Sách Sản Phẩm (Ứng Dụng) - AppList.vue

## 1. Vị trí

- Đường dẫn: `/admin/apps/list`
- Component: `src/views/admin/Appmanager/AppList.vue`

## 2. Luồng hoạt động

### Bước 1: Hiển thị danh sách

- Fetch dữ liệu từ API `/apps`
- Hiển thị bảng gồm: tên, mô tả, ảnh, nút sửa/xóa

### Bước 2: Xóa sản phẩm

- Nhấn nút **Xóa** → gọi API `DELETE /apps/:id`
- Xóa khỏi db.json và cập nhật lại danh sách

### Bước 3: Sửa sản phẩm

- Nhấn nút **Sửa** → mở modal hoặc chuyển sang trang chỉnh sửa
- Cho phép cập nhật thông tin, upload lại ảnh nếu muốn

---

# 🟢 Trang Chi Tiết Sản Phẩm (Ứng Dụng) - AppDetail.vue

## 1. Vị trí

- Đường dẫn: `/app/:id`
- Component: `src/views/AppDetail.vue`

## 2. Luồng hoạt động

### Bước 1: Hiển thị thông tin chi tiết

- Fetch dữ liệu từ API `/apps/:id`
- Hiển thị tên, mô tả, ảnh, số lượt tải, tuổi, đánh giá

### Bước 2: Hiển thị đánh giá/bình luận

- Fetch comment từ `/comments?appId=:id`
- Hiển thị avatar, tên người dùng, nội dung, số lượt like

### Bước 3: Thêm bình luận

- Form nhập nội dung bình luận
- Gửi lên API `POST /comments`
- Bình luận mới được hiển thị ngay

---

# 🔄 Logic bất đồng bộ & cách hoạt động chính xác khi thêm sản phẩm

## 1. Bất đồng bộ (Async/Await)

- Tất cả các thao tác gọi API (thêm, lấy, xóa, sửa sản phẩm) đều sử dụng bất đồng bộ với `async/await` và thư viện `axios`.
- Khi người dùng nhấn nút Thêm ứng dụng, hàm `addApp` sẽ:
  1. Chờ upload ảnh lên Cloudinary (bất đồng bộ)
  2. Chờ nhận URL ảnh trả về
  3. Gửi request POST lên API json-server để thêm sản phẩm mới
  4. Chờ phản hồi từ server
  5. Nếu thành công, reset form và chuyển hướng
  6. Nếu thất bại, hiển thị thông báo lỗi

## 2. Luồng dữ liệu

- Khi upload ảnh, sử dụng `await axios.post(...)` để đảm bảo nhận được URL trước khi gửi dữ liệu sản phẩm lên server.
- Khi thêm sản phẩm, sử dụng `await axios.post(...)` để đảm bảo sản phẩm được lưu thành công trước khi chuyển hướng hoặc cập nhật UI.
- Khi lấy danh sách sản phẩm, sử dụng `await axios.get(...)` để đảm bảo dữ liệu được fetch đầy đủ trước khi render bảng.

## 3. Xử lý lỗi

- Tất cả các thao tác bất đồng bộ đều có khối `try/catch` để bắt lỗi và hiển thị thông báo cho người dùng nếu có sự cố mạng hoặc server.

## 4. Trạng thái UI

- Khi đang upload hoặc submit, có thể hiển thị loading spinner hoặc disable nút để tránh submit nhiều lần.
- Sau khi thao tác thành công, UI sẽ được cập nhật lại bằng cách fetch lại dữ liệu từ server.

## 5. Tính nhất quán dữ liệu

- Dữ liệu luôn được lấy mới từ server sau mỗi thao tác thêm/xóa/sửa để đảm bảo UI luôn đồng bộ với backend.
- Không lưu dữ liệu tạm trên client, mọi thay đổi đều qua API và cập nhật lại từ server.

## 6. Ví dụ code (AddApp.vue)

```js
async function addApp() {
  try {
    // Upload ảnh lên Cloudinary
    const imageUrl = await uploadImageToCloudinary(file)
    // Gửi dữ liệu sản phẩm lên server
    await axios.post('http://localhost:3000/apps', {
      name: form.name,
      description: form.description,
      image: imageUrl,
    })
    // Thành công: reset form, chuyển hướng
    ...
  } catch (e) {
    // Hiển thị lỗi
    alert('Thêm ứng dụng thất bại!')
  }
}
```

## 7. Tổng kết

- Toàn bộ project sử dụng bất đồng bộ (async/await) cho mọi thao tác với server
- Đảm bảo dữ liệu luôn nhất quán giữa client và server
- UI luôn cập nhật trạng thái mới nhất sau mỗi thao tác

---

# 🔗 Binding dữ liệu trong project Vue

## 1. v-model

- Binding hai chiều giữa input và biến trong script.
- Ví dụ: `<input v-model="form.name" type="text" />`
- Khi người dùng nhập, giá trị `form.name` sẽ tự động cập nhật.

## 2. Hiển thị dữ liệu

- Sử dụng dấu ngoặc kép `{{ ... }}` để binding dữ liệu ra giao diện.
- Ví dụ: `<h3>{{ (apps && apps.length) || 'Apps not found' }}</h3>`
- Khi biến `apps` thay đổi, giao diện sẽ tự động cập nhật.

## 3. Binding thuộc tính

- Sử dụng dấu `:` để binding thuộc tính HTML với biến.
- Ví dụ: `<img :src="form.image" alt="Preview" />`
- Khi `form.image` thay đổi, ảnh preview sẽ tự động đổi.

## 4. Binding sự kiện

- Sử dụng `@event` để binding sự kiện với hàm trong script.
- Ví dụ: `<button @click="addApp">Thêm ứng dụng</button>`
- Khi click, hàm `addApp` sẽ được gọi.

## 5. Binding class, style

- Sử dụng `:class`, `:style` để binding động class/style.
- Ví dụ: `<button :class="isActive ? 'btn-success' : 'btn-secondary'">Like</button>`

## 6. Binding bất đồng bộ

- Khi gọi API (axios), dữ liệu trả về sẽ được binding tự động ra giao diện nhờ các biến reactive (`ref`, `reactive`).
- Ví dụ:

```js
const apps = ref([])
async function getApps() {
  const response = await axios.get('/apps')
  apps.value = response.data
}
```

- Khi `apps.value` thay đổi, mọi nơi dùng `apps` trong template sẽ tự động cập nhật.

## 7. Binding trong form thêm sản phẩm

- Tất cả trường nhập liệu đều dùng `v-model` để binding với biến `form`.
- Khi submit, dữ liệu trong `form` sẽ được gửi lên server.

## 8. Binding trạng thái UI

- Loading, error, success đều được binding với biến trạng thái (`uploading`, `error`, ...)
- Khi biến thay đổi, UI sẽ tự động phản ánh trạng thái mới.

---

**Tóm lại:**
Project này sử dụng binding của Vue (v-model, {{ }}, :attr, @event) để đồng bộ dữ liệu giữa giao diện và logic, đảm bảo mọi thay đổi đều được cập nhật tự động và chính xác.
