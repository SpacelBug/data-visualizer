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
        {{ model }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

import { findAllKeys } from '@/helpers/dataParser'

import { useFileData } from '@/stores/fileData'

const fileData = useFileData()

const emit = defineEmits(['keyDragStart'])

const model = defineModel([])
const keys = ref(null)

const hasHeader = ref(true)

onMounted(() => {
  if (fileData.data) {
    model.value = fileData.data
    keys.value = findAllKeys(fileData.data)
  }
})

watch(
  () => fileData.data,
  async () => {
    model.value = fileData.data
    keys.value = findAllKeys(fileData.data)
  },
)

function onKeyDragStart(key) {
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
