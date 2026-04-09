<template>
  <div
    class="custom-file-input"
    @click="$refs.input.click()"
  >
    <input
      type="file"
      hidden
      ref="input"
      accept=".json,.scv"
      @change="onChange"
    />
    <div class="input-button">+</div>
    <span class="file-name">
      {{ model ? `File Name: ${model.name}` : 'Click or drop file here' }}
      <br /><small>Supported files: .json, .scv</small>
    </span>
  </div>
</template>

<script setup>
let model = defineModel()

function onChange(event) {
  model.value = event.target.files[0]
}
</script>

<style scoped>
.custom-file-input {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  border: var(--border-color) solid 1px;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.input-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 30px;
  border-radius: 5px;
  border: var(--border-color) 1px solid;
  height: 40px;
  aspect-ratio: 1 / 1;
}
</style>
