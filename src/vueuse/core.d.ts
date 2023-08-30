import { onMounted, onUnMounted, ref } from 'vue'
const width = ref(0)
const setWidth = () => (width.value = window.innerWidth)
onMounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})
onUnMounted(() => {
  window.removeEventListener('resize', setWidth)
})
