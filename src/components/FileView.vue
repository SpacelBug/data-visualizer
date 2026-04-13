<template>
  <div class="file-view">
    <div class="csv-options">
      <input
        type="checkbox"
        name="hasHeader"
        v-model="hasHeader"
      />
      <label for="hasHeader">csv header</label>
    </div>
    <div class="keys-view">
      <div class="caption">Data keys</div>
      <div
        class="keys"
        v-if="keys"
      >
        <div
          class="key-plate"
          v-for="key in keys"
          :key="key"
          draggable="true"
          @dragstart="onKeyDragStart(key)"
        >
          {{ key }}
        </div>
      </div>
    </div>
    <div class="full-data">
      <div class="caption">Full data view</div>
      <pre class="data-object">
        {{ data }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { findAllKeys } from '@/helpers/dataParser'

import { useLogger } from '@/stores/logger'

const logger = useLogger()

const emit = defineEmits(['keyDragStart'])

const props = defineProps({
  file: { type: [File, null] },
})

const data = defineModel()
const keys = ref(null)

const hasHeader = ref(true)

watch(
  () => props.file,
  async (newFile) => {
    const reader = new FileReader()
    console.log(newFile)
    reader.readAsText(newFile)
    reader.onload = () => {
      logger.log('INFO', 'get keys from object')
      if (newFile.type === 'application/json') {
        data.value = JSON.parse(reader.result)
        keys.value = findAllKeys(JSON.parse(reader.result))
      } else if (newFile.type === 'text/csv') {
        logger.log('INFO', 'parse csv data')
        let CSVData = []

        let rowIndex = 0
        for (const row of reader.result.split('\n')) {
          if (hasHeader.value && rowIndex === 0) {
            keys.value = row.split(',')
            rowIndex++
            continue
          }

          let object = {}
          let valueIndex = 0

          for (const value of row.split(',')) {
            object[keys.value ? keys.value[valueIndex] : valueIndex] = value
            valueIndex++
          }

          CSVData.push(object)
          rowIndex++
        }

        data.value = CSVData
        keys.value ? null : (keys.value = findAllKeys(CSVData))
      }
    }
  },
)

function onKeyDragStart(key) {
  console.log(event, key)
  event.dataTransfer.setData('text', key)
  emit('keyDragStart', key)
}
</script>

<style scoped>
.file-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border: var(--border-color) 1px solid;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
}

.keys-view {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.keys {
  user-select: none;
  cursor: grab;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.key-plate {
  background-color: var(--panels-color);
  padding: 4px 8px;
  border-radius: 10px;
}

.full-data {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  overflow: hidden;
}

.data-object {
  padding: 8px;
  background-color: var(--panels-color);
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
