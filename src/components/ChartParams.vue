<template>
  <div class="chart-params">
    <h1>Chart params</h1>

    <h2>Values</h2>
    <div
      class="param-box"
      @drop="
        (event) => {
          yKeys.add(event.dataTransfer.getData('text'))
        }
      "
      @dragover.prevent
    >
      <h3>
        Y<select v-model="params.yScaleTypes">
          <option>linear</option>
          <option>time</option>
        </select>
      </h3>
      <div class="values-box">
        <div
          class="value"
          v-for="value in yKeys"
          :key="value"
          @click="yKeys.delete(value)"
        >
          <span>{{ value }}</span>
          <div class="cross-icon" />
        </div>
      </div>
    </div>

    <div
      class="param-box"
      @drop="
        (event) => {
          xKey = event.dataTransfer.getData('text')
        }
      "
      @dragover.prevent
    >
      <h3>
        X
        <select v-model="params.xScaleTypes">
          <option>linear</option>
          <option>time</option>
        </select>
      </h3>
      <div class="values-box">
        <div
          class="value"
          v-if="xKey"
          @click="xKey = null"
        >
          <span>{{ xKey }}</span>
          <div class="cross-icon" />
        </div>
      </div>
    </div>

    <h2>View</h2>
    <div class="param-box">
      <span>Force Y domain</span>
      <div class="domain-inputs">
        <input
          type="number"
          v-model="params.yDomainMin"
        />
        <input
          type="number"
          v-model="params.yDomainMax"
        />
      </div>
    </div>

    <div class="param-box">
      <span>Force X domain</span>
      <div class="domain-inputs">
        <input
          type="number"
          v-model="params.xDomainMin"
        />
        <input
          type="number"
          v-model="params.xDomainMax"
        />
      </div>
    </div>

    <div class="checkboxes">
      <div class="checkbox-wrapper">
        <span>Show grid</span>
        <input
          type="checkbox"
          v-model="params.showGrid"
        />
      </div>
      <div class="checkbox-wrapper">
        <span>Show legend</span>
        <input
          type="checkbox"
          v-model="params.showLegend"
        />
      </div>
      <div class="checkbox-wrapper">
        <span>Hide axises</span>
        <input
          type="checkbox"
          v-model="params.hideAxises"
        />
      </div>
    </div>

    <div class="param-box">
      <span>Ticks Y</span>
      <input
        min="2"
        max="10"
        value="5"
        type="range"
        v-model="params.yTicks"
      />
    </div>

    <div class="param-box">
      <span>Ticks X</span>
      <input
        min="2"
        max="10"
        value="5"
        type="range"
        v-model="params.xTicks"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const params = defineModel()

const yKeys = reactive(new Set())
const xKey = ref('')

onMounted(() => {
  params.value.xScaleTypes = 'linear'
  params.value.yScaleTypes = 'linear'
})

watch(yKeys, (newValue) => {
  params.value['yKeys'] = newValue
})

watch(xKey, async (newValue) => {
  params.value['xKey'] = newValue
})
</script>

<style>
.chart-params {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: var(--border-color) 1px solid;
  border-radius: 5px;
  padding: 8px;
  gap: 8px;
  white-space: nowrap;
  width: 400px;
  height: 100%;
}

.param-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkboxes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.checkbox-wrapper {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.domain-inputs {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.values-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 10px;
}

.value {
  display: flex;
  flex-direction: row;
  background-color: var(--panels-color);
  border-radius: 10px;
  padding: 4px 8px;
}

.value:hover {
  cursor: pointer;
  opacity: 0.7;
}

input[type='number'] {
  box-sizing: border-box;
  height: 20px;
  width: 50px;
}
</style>
