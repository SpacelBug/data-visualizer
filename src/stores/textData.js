import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextData = defineStore('textData', () => {
  const data = ref({})

  function setData(newTextData) {
    data.value = newTextData
  }

  function updateData(key, values, divider) {
    data.value[key] = { values: values, divider: divider }
  }

  function clearData() {
    data.value = {}
  }

  return { data, setData, updateData, clearData }
})
