import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLogger = defineStore('logger', () => {
  const loggerData = ref([])

  function log(level, content) {
    loggerData.value.push({
      level: level,
      content: content,
      time: new Date(),
    })
  }

  return { loggerData, log }
})
