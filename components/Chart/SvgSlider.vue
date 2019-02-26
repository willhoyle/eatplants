<template lang="pug">
    div(ref="outer")
        svg(ref="svg" id="drawing").svg-container
            defs
                linearGradient#outOfRangeLeft(x1='0%', y1='0%', x2='100%', y2='0%')
                    stop(class="oor-zero" offset='0%')
                    stop(class="oor-half" offset='50%')
                    stop(class="oor-hundo" offset='100%')
                linearGradient#inRange(x1='0%', y1='0%', x2='100%', y2='0%')
                    stop(class="ir-zero" offset='0%')
                    stop(class="ir-quarter" offset='25%')
                    stop(class="ir-half" offset='50%')
                    stop(class="ir-threequarters" offset='75%')
                    stop(class="ir-hundo" offset='100%')
                linearGradient#outOfRangeRight(x1='0%', y1='0%', x2='100%', y2='0%')
                    stop(class="oor-hundo" offset='0%')
                    stop(class="oor-half" offset='50%')
                    stop(class="oor-zero" offset='100%')
            template(v-for="layout in layouts")
                rect(:width="layout.width" height="20" :x="layout.x" y="25" :fill="layout.fill")
                rect(:ref="layout.ref" :width="`${parseFloat(layout.width) + 3}%`" height="0" :x="`${parseFloat(layout.x) - 1.5}%`" y="25" fill="transparent")

            
            svg-circle(ref="target" :target="target" :svg="svg" :value="value.value" :max="getMaxWidth" :bounds="getRefs")
</template>

<script>
import debounce from 'debounce'
import SvgCircle from './CircleTarget.vue'

export default {
  components: {
    SvgCircle
  },
  mounted() {
    // window.onresize = debounce(this.updateChartDimensions, 200)
    // let { width, height } = this.getChartDimensions()
    // this.draw = SVG('drawing')
    //   .toggleClass('svg-container')
    //   .width(width)
    //   .height(height)
    // console.log(draw.height())
    // console.log(draw.width())
    // var linear = draw.gradient('linear', function(stop) {
    //   stop.at(0, '#d2ffd8')
    //   stop.at(0.25, '#caffd1')
    //   stop.at(0.5, '#c1ffca')
    //   stop.at(0.75, '#b8ffc3')
    //   stop.at(1, '#afffbc')
    // })
    // // console.log(draw.width())
    // // console.log(draw.height())
    // this.rect = draw.rect(300, 10).fill(linear)
    //   .animate({ ease: '>', duration: '1.5s' })
    //   .plot([[100, 0], [50, 500], [100, 800], [300, 800], [150, 500], [700, 0]])
    //   .animate({ ease: '>', duration: '1.5s' })
    //   .plot([[0, 0], [50, 500], [0, 800], [200, 800], [250, 500], [800, 0]])
  },
  props: {
    min: Object,
    max: Object,
    value: Object
  },
  computed: {
    target() {
      return {
        cx: `${parseFloat(this.layouts[0].width) +
          parseFloat(this.layouts[1].x) / 2}%`,
        cy: 35,
        r: 15
      }
    },
    layouts() {
      return [
        {
          ref: 'left',
          width: '33%',
          x: 0,
          fill: 'url(#outOfRangeLeft)'
        },
        {
          ref: 'middle',
          width: '27%',
          x: '33%',
          fill: 'url(#inRange)'
        },
        {
          ref: 'right',
          width: '40%',
          x: '60%',
          fill: 'url(#outOfRangeRight)'
        }
      ]
    }
  },
  data() {
    return {
      draw: null
    }
  },
  methods: {
    getRefs() {
      return this.$refs
    },
    getMaxWidth() {
      return this.$refs.outer.offsetWidth
    },
    svg() {
      return this.$refs.svg
    }
  },
  beforeDestroy() {
    // window.onresize.clear()
  }
}
</script>

<style lang="scss">
svg {
  height: 100px;
  width: 100%;
}
.svg-container {
  margin-top: 10px;
  margin-bottom: 10px;
  /* display: block; */
  /* height: 10px; */

  /* position: relative; */
  /* width: 100%; */
  /* padding-bottom: 50%; */
  /* vertical-align: top;
  overflow: hidden; */
}
.svg-content {
  display: block;
  /* position: absolute; */
  top: 0;
  left: 0;
}
.ir {
  &-zero {
    stop-color: #023d07;
  }
  &-quarter {
    stop-color: #026b0b;
  }
  &-half {
    stop-color: #01830c;
  }
  &-threequarters {
    stop-color: #026b0b;
  }
  &-hundo {
    stop-color: #023d07;
  }
}
// .ir {
//   &-zero {
//     stop-color: #7cfa87;
//   }
//   &-quarter {
//     stop-color: #adfab4;
//   }
//   &-half {
//     stop-color: #99f8a1;
//   }
//   &-threequarters {
//     stop-color: #7af184;
//   }
//   &-hundo {
//     stop-color: #55fa63;
//   }
// }
.oor {
  &-zero {
    stop-color: #ececec;
  }
  &-half {
    stop-color: #dddddd;
  }
  &-hundo {
    stop-color: #b1b1b1;
  }
}
</style>
