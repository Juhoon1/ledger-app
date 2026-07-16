import { ref, watch } from 'vue'

export function useStorage(key, defaultValue) {
  const local = localStorage.getItem(key)
  let data = local ? JSON.parse(local) : defaultValue
  const value = ref(data)

  watch(value, (v) => {
    localStorage.setItem(key, JSON.stringify(v))
  }, { deep: true })

  return value
}