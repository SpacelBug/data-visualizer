<template>
  <div class="file-view">
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

watch(
  () => props.file,
  async (newFile) => {
    const reader = new FileReader()
    reader.readAsText(newFile)
    reader.onload = () => {
      logger.log('INFO', 'get keys from object')
      data.value = JSON.parse(reader.result)
      keys.value = findAllKeys(JSON.parse(reader.result))
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
