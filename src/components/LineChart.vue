<template>
  <div class="chart-box">
    <svg
      ref="chart"
      class="chart"
    ></svg>

    <div
      v-if="params.yKeys && params.showLegend"
      class="legend"
    >
      <div class="y-values">
        <div
          class="value"
          v-for="value in params.yKeys"
          @mouseenter="hoveredLegendKey = value"
          @mouseleave="hoveredLegendKey = null"
          :key="value"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useLogger } from '@/stores/logger'

const logger = useLogger()

const svg = useTemplateRef('chart')
const svgWidth = ref(0)
const svgHeight = ref(0)
const axisSize = 30

const hoveredLegendKey = ref(null)

const props = defineProps({
  data: { type: Array },
  params: {
    type: Object,
    required: true,
  },
})

const xScale = computed(() => {
  if (props.params.xScaleTypes === 'linear' && svg.value) {
    const xDataLength = props.data.length

    logger.log('INFO', 'init xScale')
    return d3
      .scaleLinear()
      .domain([0, xDataLength])
      .range([0, svgWidth.value - axisSize])
  } else if (props.params.xScaleTypes === 'time') {
    // TODO
  } else {
    console.debug('Missing or wrong y scale type')
    // throw new Error('Missing or wrong x scale type')
  }
  return null
})

const yScale = computed(() => {
  if (props.params.yScaleTypes === 'linear' && svg.value) {
    if (props.params.yKeys) {
      logger.log('INFO', 'init yScale')
      const keys = Array.from(props.params.yKeys)
      // Собираем все значения по всем ключам
      const allValues = props.data.flatMap((d) =>
        keys.map((key) => d[key]).filter((v) => v != null),
      )

      let domain = [
        Number.isFinite(props.params.yDomainMin) ? props.params.yDomainMin : d3.min(allValues),
        Number.isFinite(props.params.yDomainMax) ? props.params.yDomainMax : d3.max(allValues),
      ]

      return d3
        .scaleLinear()
        .domain(domain)
        .range([svgHeight.value - axisSize, 0])
    }
  } else {
    console.debug('Missing or wrong y scale type')
    // throw new Error('Missing or wrong y scale type')
  }
  return null
})

onMounted(() => {
  plot()
})

watch(props.params, () => {
  plot()
})

watch(
  () => props.data,
  () => {
    plot()
  },
  { deep: true },
)

watch(hoveredLegendKey, () => {
  if (hoveredLegendKey.value) {
    d3.select(svg.value)
      .select('.lines-group')
      .selectAll('path')
      .attr('opacity', (d, i) => {
        const key = Array.from(props.params.yKeys)[i]
        return key === hoveredLegendKey.value ? 1 : 0.2
      })
  } else {
    d3.select(svg.value).selectAll('path').attr('opacity', 1)
  }
})

function clearSvg() {
  d3.select(svg.value).selectAll('*').remove()
}

function plot() {
  if (props.data && yScale.value && xScale.value) {
    svgWidth.value = svg.value.clientWidth
    svgHeight.value = svg.value.clientHeight

    clearSvg()

    if (!props.params.hideAxises) {
      const xAxis = d3.axisBottom(xScale.value).ticks(props.params.xTicks)

      d3.select(svg.value)
        .append('g')
        .attr('transform', `translate(0, ${yScale.value(0)})`)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('color', 'white')
        .attr('height', axisSize)
        .call(xAxis)

      const yAxis = d3.axisLeft(yScale.value).ticks(props.params.yTicks)

      console.log('height: ', yScale.value(0))

      d3.select(svg.value)
        .append('g')
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('color', 'white')
        .attr('height', 30)
        .call(yAxis)
    }

    const linesGroup = d3.select(svg.value).append('g').attr('class', 'lines-group')

    for (const key of props.params.yKeys) {
      const line = d3
        .line()
        .x((d, i) => xScale.value(i))
        .y((d) => yScale.value(d[key]))

      linesGroup
        .append('path')
        .attr('fill', 'none')
        .attr(
          'stroke',
          d3.schemeCategory10[
            Array.from(props.params.yKeys).indexOf(key) % d3.schemeCategory10.length
          ],
        )
        .attr('stroke-width', 1.5)
        .attr('d', line(props.data))
    }

    logger.log('INFO', 'Line chart plotted')
  }
}
</script>

<style scoped>
.chart-box {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
  max-height: 100%;
  background-color: var(--panels-color);
}

.chart {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: visible;
  padding: 0 0 30px 30px;
}

/*Legend Styles*/

.legend {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: var(--second-accent-color);
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  right: 16px;
  top: 16px;
}

.y-values {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>
