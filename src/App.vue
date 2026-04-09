<template>
  <h1>Data Visualizer</h1>

  <div class="main-box">
    <div class="chart-box">
      <div class="chart-types-menu">
        <div
          :class="['chart-type', { active: selectedChartType === 'line' }]"
          @click="selectedChartType = 'line'"
        />
        <div
          :class="['chart-type', { active: selectedChartType === 'pie' }]"
          @click="selectedChartType = 'pie'"
        />
        <div
          :class="['chart-type', { active: selectedChartType === 'bar' }]"
          @click="selectedChartType = 'bar'"
        />
      </div>
      <LineChart
        :data="data"
        :params="params"
      />
    </div>

    <ChartParams v-model="params" />

    <div class="data-box">
      <div class="data-box-types">
        <span
          :class="{ active: selectedDataPanel === 'file' }"
          @click="selectedDataPanel = 'file'"
          >File</span
        >
        <span
          :class="{ active: selectedDataPanel === 'text' }"
          @click="selectedDataPanel = 'text'"
          >Text</span
        >
      </div>
      <template v-if="selectedDataPanel === 'file'">
        <FileInput v-model="file"></FileInput>
        <FileView
          v-model="data"
          :file="file"
        ></FileView>
      </template>
      <TextData
        v-else-if="selectedDataPanel === 'text'"
        v-model="data"
        class="text-data-box"
      ></TextData>
    </div>
  </div>

  <LoggerView />
</template>

<script setup>
import { ref } from 'vue'
import FileInput from './components/FileInput.vue'
import FileView from './components/FileView.vue'
import ChartParams from './components/ChartParams.vue'
import LineChart from './components/LineChart.vue'
import LoggerView from './components/LoggerView.vue'
import TextData from './components/TextData.vue'

const file = ref(null)
const data = ref([])
const params = ref({})

const selectedChartType = ref('line')
const selectedDataPanel = ref('text')
</script>

<style>
#app {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  padding: 16px;
}

.main-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 100%;
  overflow: hidden;
}

.chart-box {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 50px minmax(0, 100%);
  height: 100%;
  max-height: 100%;
  width: 100%;
  overflow: hidden;
}

.chart-types-menu {
  display: flex;
  flex-direction: row;
  height: 50px;
  width: fit-content;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  gap: 1px;
}

.chart-type {
  cursor: pointer;
  background-color: var(--panels-color);
  width: 50px;
  height: 100%;
  border-radius: 5px 5px 0 0;
  opacity: 0.5;
}

.data-box {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 450px;
  gap: 16px;
  border-radius: 5px;
  height: 100%;
}

.data-box-types {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.data-box-types > span:hover {
  cursor: pointer;
  color: var(--accent-color);
}

.active {
  color: var(--accent-color);
  opacity: 1;
}
</style>
