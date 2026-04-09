<template>
  <div class="main-box">
    <b>Data inputs</b>
    <div
      v-for="(dataObject, key) in data"
      class="data"
      :key="key"
    >
      <div
        class="data-key"
        draggable="true"
        @dragstart="onDragStart(key)"
      >
        {{ key }}
        <template v-if="dataObject.values && dataObject.divider">
          {{ dataObject.values.split(dataObject.divider).length }}
        </template>
      </div>
      <textarea
        name="data"
        v-model="dataObject.values"
        @input="parseData"
      ></textarea>
      <input
        v-model="dataObject.divider"
        class="divider"
        placeholder="Input data divider"
        type="text"
        @input="parseData"
      />
    </div>
    <div class="add-new-key-button">+</div>
    <b>Parsed data view</b>
    <pre class="data-object">
      {{ model }}
    </pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref({
  key1: { values: '12,34,12,34,1,234,1,2', divider: ',' },
  key2: { values: null, divider: null },
})

const model = defineModel()

function onDragStart(key) {
  console.log('dragstart: ', event, key)
  event.dataTransfer.setData('text', key)
}
function parseData() {
  let arrayOfObjects = []

  for (const key in data.value) {
    if (data.value[key].divider !== null) {
      const values = data.value[key].values.split(data.value[key].divider)
      for (const index in values) {
        arrayOfObjects[index]
          ? (arrayOfObjects[index][key] = Number(values[index]))
          : (arrayOfObjects[index] = { [key]: Number(values[index]) })
      }
    }
  }

  model.value = arrayOfObjects
}
</script>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  padding: 8px;
  height: 100%;
  width: 100%;
  border: solid 1px var(--border-color);
  border-radius: 5px;
  gap: 8px;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-object {
  padding: 8px;
  background-color: var(--panels-color);
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0;
}
</style>
