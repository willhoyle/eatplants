<template lang="pug">
    g(                
                ref="group"
                )
        text(:x="`${parseFloat(target.cx) - 2}%`" :y="target.cy - 20") {{value}}
        circle(ref="circle" :cx="target.cx" :cy="target.cy" :r="target.r + (selected ? 5 : 0)" class="circle")
</template>

<script>
// import { SVG } from '@svgdotjs/svg.js'
// import '@svgdotjs/svg.draggable.js'

import Draggable from 'gsap/Draggable'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    target: {
      cx: 0,
      cy: 0,
      r: 0
    },
    svg: Function,
    value: Number,
    max: Function,
    bounds: Function,
    al: Date
  },
  watch: {
    al() {}
  },
  mounted() {
    let vm = this
    Draggable.create(this.$refs.group, {
      bounds: this.bounds().middle,
      type: 'x',
      onPress() {
        vm.selected = true
      },
      onRelease() {
        vm.selected = false
      },
      onClick: function() {},
      onDragStart: function() {
        vm.selected = true
      },
      onDragEnd: function() {
        console.log(this)
      }
    })
  },
  computed: {
    circle() {
      return this.$refs.circle
    }
  },
  data() {
    return {
      selected: null,
      transform: null,
      offset: {}
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.circle {
  fill: #ffffff;
  stroke-width: 0.5;
  stroke: rgb(190, 189, 189);
  cursor: move;
}
</style>