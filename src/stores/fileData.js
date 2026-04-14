import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFileData = defineStore('fileData', () => {
  const file = ref(File)
  const data = ref([])

  function setFile(newFile) {
    file.value = newFile
    getFileData()
  }

  function clearFile() {
    file.value = []
    data.value = []
  }

  function getFileData() {
    const reader = new FileReader()
    reader.readAsText(file.value)
    reader.onload = function () {
      if (file.value.type === 'application/json') {
        data.value = JSON.parse(reader.result)
      } else if (file.value.type === 'text/csv') {
        const csvData = reader.result
      }
    }
  }

  return { file, data, setFile, clearFile, getFileData }
})
