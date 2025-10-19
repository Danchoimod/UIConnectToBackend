import App from '@/App.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:3000/users/'
const user = ref([]) // container chứa người dùng
const newUser = ref({ name: '', email: '', password: '' })

export const getUsers = async () => {
  //trả về danh sách người dùng
  try {
    const res = await axios.get(API_URL) // gửi yêu cầu GET đến API
    return res.data
  } catch (err) {
    console.error('Lỗi khi fetch users:', err)
    return []
  }
}
