<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-11">
        <h1 class="card-title text-center mb-3">Kiến thức sức khoẻ cộng đồng</h1>
        <div class="content d-flex justify-content-center gap-3">
          <div class="card mt-2 mb-2" style="width: 24rem">
            <img
              :src="items[0].image"
              class="card-img-top"
              alt="image1"
              style="height: 200px; object-fit: cover"
            />
            <div class="card-body">
              <h3 class="card-title">{{ items[0].title }}</h3>
              <p class="card-text">
                {{ items[0].content }}
              </p>
              <button class="btn btn-info">Xem chi tiết</button>
            </div>
          </div>

          <div class="card mt-2 mb-2" style="width: 24rem">
            <img
              :src="items[1].image"
              class="card-img-top"
              alt="image2"
              style="height: 200px; object-fit: cover"
            />
            <div class="card-body">
              <h3 class="card-title">{{ items[1].title }}</h3>
              <p class="card-text">
                {{ items[1].content }}
              </p>
              <button class="btn btn-info">Xem chi tiết</button>
            </div>
          </div>

          <div class="card mt-2 mb-2" style="width: 24rem">
            <img
              :src="items[2].image"
              class="card-img-top"
              alt="image3"
              style="height: 200px; object-fit: cover"
            />
            <div class="card-body">
              <h3 class="card-title">{{ items[2].title }}</h3>
              <p class="card-text">
                {{ items[2].content }}
              </p>
              <button class="btn btn-info">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from '/images/img.jpg'
import img2 from '/images/img.jpg'
import img3 from '/images/img.jpg'

const items = [
  { title: '8 loại rau củ quả giàu canxi', content: 'Canxi là...', image: img1 },
  {
    title: 'Các loại gia vị tốt cho sức khỏe',
    content: 'Một số loại...',
    image: img2,
  },
  {
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content: 'Đậu lăng...',
    image: img3,
  },
]
</script>

<style scoped>
.content-wrapper {
  font-size: 1.25em;
}
</style>
