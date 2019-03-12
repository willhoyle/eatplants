<template lang="pug">
    g(                
                ref="group"
                )
        text(:x="`${parseFloat(target.cx) - 2}%`" :y="target.cy - 20") {{value}}
        circle(ref="circle" :cx="target.cx" :cy="target.cy" :r="target.r + radius" class="circle")
</template>

<script>
import '@svgdotjs/svg.js'
import { SVG } from '@svgdotjs/svg.js'
if (process.client) {
  require('@svgdotjs/svg.draggable.js')
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
    value: Number,
    bounds: Function
  },
  mounted() {
    let vm = this
    let group = SVG(this.$refs.group)
    console.log(group)
    group.draggable()
    group.on('dragstart', function(event) {
      // event.detail.event hold the given data explained below
      // this == rect
    })
    let constraints = { x: 100, y: 0, x1: 400, y1: 0 }
    group.on('dragmove', function(e) {
      const { handler, box } = e.detail
      e.preventDefault()

      let { x, y } = box

      // In case your dragged element is a nested element,
      // you are better off using the rbox() instead of bbox()

      if (x < constraints.x) {
        x = constraints.x
      }

      if (y < constraints.y) {
        y = constraints.y
      }

      if (box.x2 > constraints.x2) {
        x = constraints.x2
      }

      if (box.y2 > constraints.y2) {
        y = constraints.y2
      }

      handler.move(x, y)
    })
    group.on('dragend', function(event) {
      // event.detail.event hold the given data explained below
      // this == rect
    })
    // Draggable.create(this.$refs.group, {
    //   bounds: this.bounds().middle,
    //   type: 'x',
    //   onPress() {
    //     vm.toggleSelected(true)
    //   },
    //   onDrag() {
    //     vm.deltaX += this.deltaX
    //   },
    //   onRelease() {
    //     if (vm.selecting) {
    //       console.log(this)
    //       console.log({ x: this.x, deltaX: this.deltaX, vmDeltaX: vm.deltaX })
    //       this.update(true)
    //       vm.$emit('move', vm.deltaX)
    //     }
    //     vm.toggleSelected(false)
    //     vm.deltaX = 0
    //   },
    //   onClick: function() {},
    //   onDragStart: function() {
    //     vm.toggleSelected(true)
    //     vm.deltaX = this.deltaX
    //   },
    //   onDragEnd: function() {}
    // })
  },
  computed: {
    circle() {
      return this.$refs.circle
    }
  },
  data() {
    return {
      radius: 0,
      selecting: false,
      deltaX: 0,

      transform: null,
      offset: {},

      drag: null
    }
  },
  methods: {
    toggleSelected(toggleOn) {
      let animationDuration = 100
      let slices = 100
      let finalSize = 5
      if (toggleOn) {
        if (!this.selecting) {
          this.selecting = true
          // let sizeIncrement = finalSize / slices
          // let interval = animationDuration / slices
          // for (let index = 0; index < slices; index++) {
          //   setTimeout(() => {
          //     if (this.selecting) {
          //       this.radius += sizeIncrement
          //     }
          //   }, index * interval)
          // }
        }
      } else {
        this.selecting = false
        let sizeIncrement = this.radius / slices
        let interval = animationDuration / slices
        // for (let index = slices; index > 0; index--) {
        //   setTimeout(() => {
        //     if (!this.selecting) {
        //       this.radius -= sizeIncrement
        //     }
        //   }, index * interval)
        // }
      }
    }
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