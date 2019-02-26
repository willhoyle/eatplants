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

function startDrag(evt) {
  let svg = this.svg()
  this.selected = evt.target.parentNode
  this.offset = getMousePosition(evt, svg)

  // Get all the transforms currently on this element
  let transforms = this.selected.transform.baseVal
  // Ensure the first transform is a translate transform
  if (
    transforms.length === 0 ||
    transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
  ) {
    // Create an transform that translates by (0, 0)
    let translate = svg.createSVGTransform()
    translate.setTranslate(0, 0)
    // Add the translation to the front of the transforms list
    this.selected.transform.baseVal.insertItemBefore(translate, 0)
  }
  // Get initial translation amount
  this.transform = transforms.getItem(0)
  this.offset.x -= this.transform.matrix.e
  this.offset.y -= this.transform.matrix.f
}
function drag(evt) {
  if (this.selected) {
    evt.preventDefault()

    var coord = getMousePosition(evt, this.svg())
    this.transform.setTranslate(
      coord.x - this.offset.x,
      0
      //   coord.y - this.offset.y
    )
  }
}

function getMousePosition(evt, svg) {
  var CTM = svg.getScreenCTM()
  if (evt.touches) {
    evt = evt.touches[0]
  }
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  }
}

function endDrag(evt) {
  this.selected = null
}
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
    bounds: Function
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
  methods: {
    mousedown: startDrag,
    mousemove: drag,
    mouseup: endDrag,
    mouseleave: endDrag
  }
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