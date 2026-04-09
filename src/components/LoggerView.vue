<template>
  <div class="logger-box">
    <div
      class="logger-caption"
      @click="showLogger = !showLogger"
    >
      logs:
    </div>
    <div
      v-if="showLogger"
      class="logger-output"
    >
      <div
        class="logger-output-line"
        v-for="(loggerLine, index) in logger.loggerData.reverse()"
        :key="index"
      >
        {{ loggerLine.time.toLocaleTimeString() }} - {{ loggerLine.level }}:
        {{ loggerLine.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useLogger } from '@/stores/logger'

const logger = useLogger()

const showLogger = ref(false)
</script>

<style>
.logger-box {
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: fit-content;
  max-height: 200px;
  align-self: flex-end;
  overflow: hidden;
}

.logger-caption {
  cursor: pointer;
  background-color: var(--panels-color);
  padding: 8px 16px;
  width: fit-content;
  border: var(--border-color) solid 1px;
  border-radius: 5px;
  opacity: 0.5;
}

.logger-caption:hover {
  opacity: 1;
}

.logger-output {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 200px;
  background-color: var(--second-accent-color);
  padding: 8px;
  border-radius: 5px;
  overflow: auto;
}
</style>
