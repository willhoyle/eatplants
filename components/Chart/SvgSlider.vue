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
            text(:x="`${parseFloat(layouts[1].x) - 2}%`" y="65") 
              tspan {{min}} 
              tspan g
            text(:x="`${parseFloat(layouts[2].x) - 2}%`" y="65")
              tspan {{max}} 
              tspan g
            
            svg-circle(ref="target" :target="target" :value="value.value" :bounds="getRefs" @move="targetMoved")
</template>

<script>
import debounce from 'debounce'
import SvgCircle from './CircleTarget.vue'

export default {
  components: {
    SvgCircle
  },
  mounted() {},
  props: {
    min: Number,
    max: Number,
    limitMin: Number,
    limitMax: Number,
    value: Object
  },
  computed: {
    layouts() {
      let leftWidth = ((this.min - this.limitMin) / this.limitMax) * 100
      let middleWidth = ((this.max - this.min) / this.limitMax) * 100
      let rightWidth = ((this.limitMax - this.max) / this.limitMax) * 100

      return [
        {
          ref: 'left',
          width: `${leftWidth}%`,
          x: 0,
          fill: 'url(#outOfRangeLeft)'
        },
        {
          ref: 'middle',
          width: `${middleWidth}%`,
          x: `${leftWidth}%`,
          fill: 'url(#inRange)'
        },
        {
          ref: 'right',
          width: `${rightWidth}%`,
          x: `${leftWidth + middleWidth}%`,
          fill: 'url(#outOfRangeRight)'
        }
      ]
    }
  },
  created() {
    this.target.cx = `${this.valueToPercentage() * 100}%`
  },
  data() {
    return {
      target: {
        cx: 0,
        cy: 35,
        r: 15
      }
    }
  },
  methods: {
    valueToPercentage() {
      console.log(this)
      return this.value.value / (this.limitMax - this.limitMin)
    },
    percentageToValue() {
      return (
        (parseFloat(this.target.cx) * (this.limitMax - this.limitMin)) / 100
      )
    },
    targetMoved(deltaX) {
      let bounds = {
        left: {
          left: this.$refs.left[0].getBoundingClientRect().left,
          right: this.$refs.left[0].getBoundingClientRect().right
        },
        middle: {
          left: this.$refs.middle[0].getBoundingClientRect().left,
          right: this.$refs.middle[0].getBoundingClientRect().right
        },
        right: {
          left: this.$refs.right[0].getBoundingClientRect().left,
          right: this.$refs.right[0].getBoundingClientRect().right
        },
        outer: {
          left: this.$refs.outer.getBoundingClientRect().left,
          right: this.$refs.outer.getBoundingClientRect().right
        }
      }
      let oldCx = parseFloat(this.target.cx) / 100
      console.log(oldCx)
      let widthInPx = bounds.outer.right - bounds.outer.left
      console.log({ deltaX })
      console.log({ widthInPx })

      let deltaCx = deltaX / widthInPx
      console.log(deltaCx)
      let cx = oldCx + deltaCx

      this.target.cx = `${cx * 100}%`

      console.log(cx)

      this.$emit('input', { value: this.percentageToValue() })
    },
    getRefs() {
      return this.$refs
    },
    getMaxWidth() {
      return this.$refs.outer.offsetWidth
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
.cals {
  font-family: 'Material Design Icons';
  fill: red;
  font-size: 20px;
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
