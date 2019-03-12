<template lang="pug">
  div(ref="chart" id="drawing" style="padding: 10px")
</template>

<script>
import debounce from 'debounce'

export default {
  mounted() {
    window.onresize = debounce(this.updateChartDimensions, 200)
    let { width, height } = this.getChartDimensions()
    var draw = SVG('drawing')
      .toggleClass('svg-container')
      .width(width)
      .height(height)
    var linear = draw.gradient('linear', function(stop) {
      stop.at(0, '#d2ffd8')
      stop.at(0.25, '#caffd1')
      stop.at(0.5, '#c1ffca')
      stop.at(0.75, '#b8ffc3')
      stop.at(1, '#afffbc')
    })

    var rect = draw
      .polygon([[0, 0], [50, 500], [0, 800], [200, 800], [250, 500], [800, 0]])
      .fill(linear)
      .toggleClass('svg-content')
      .animate({ ease: '>', duration: '1.5s' })
      .plot([[100, 0], [50, 500], [100, 800], [300, 800], [150, 500], [700, 0]])
      .animate({ ease: '>', duration: '1.5s' })
      .plot([[0, 0], [50, 500], [0, 800], [200, 800], [250, 500], [800, 0]])
  },
  data() {
    return {
      chartDimensions: {
        width: 300,
        height: 10
      }
    }
  },
  methods: {
    getChartDimensions() {
      return {
        width: this.$refs.chart.offsetWidth,
        height: this.$refs.chart.offsetHeight
      }
    },
    updateChartDimensions(e) {
      console.log(this.$refs.chart.offsetWidth)
      console.log(this.$refs.chart.offsetHeight)
      this.chartDimensions = this.getChartDimensions()
    }
  },
  beforeDestroy() {
    window.onresize.clear()
  }
}
</script>

<style scoped>
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  vertical-align: middle;
  overflow: hidden;
}
.svg-content {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
