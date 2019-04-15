<template lang="pug">
    g(                
                ref="group"
                )
        text(:x="`${parseFloat(target.cx) - 2}%`" :y="target.cy - 20") {{value}}
        circle(ref="circle" :cx="target.cx" :cy="target.cy" :r="target.r + radius" class="circle")
</template>

<script>
// import '@svgdotjs/svg.js'
// import { SVG } from '@svgdotjs/svg.js'
// if (process.client) {
//   require('@svgdotjs/svg.draggable.js')
// }
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
    let thumb = this.$refs.group

    thumb.onmousedown = function(event) {
      event.preventDefault() // prevent selection start (browser action)

      let shiftX = event.clientX - thumb.getBoundingClientRect().left
      // shiftY not needed, the thumb moves only horizontally

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      function onMouseMove(event) {
        let newLeft =
          event.clientX - shiftX - slider.getBoundingClientRect().left

        // the pointer is out of slider => lock the thumb within the bounaries
        if (newLeft < 0) {
          newLeft = 0
        }
        let rightEdge = slider.offsetWidth - thumb.offsetWidth
        if (newLeft > rightEdge) {
          newLeft = rightEdge
        }

        thumb.style.left = newLeft + 'px'
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('mousemove', onMouseMove)
      }
    }

    thumb.ondragstart = function() {
      return false
    }
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

      drag: null,

      isEntered: false,
      isDown: false
    }
  },
  watch: {
    isDown(isDown) {
      if (isDown) {
        console.log('sup')
      }
    }
  },
  methods: {
    //   toggleSelected(toggleOn) {
    //     let animationDuration = 100
    //     let slices = 100
    //     let finalSize = 5
    //     if (toggleOn) {
    //       if (!this.selecting) {
    //         this.selecting = true
    //         // let sizeIncrement = finalSize / slices
    //         // let interval = animationDuration / slices
    //         // for (let index = 0; index < slices; index++) {
    //         //   setTimeout(() => {
    //         //     if (this.selecting) {
    //         //       this.radius += sizeIncrement
    //         //     }
    //         //   }, index * interval)
    //         // }
    //       }
    //     } else {
    //       this.selecting = false
    //       let sizeIncrement = this.radius / slices
    //       let interval = animationDuration / slices
    //       // for (let index = slices; index > 0; index--) {
    //       //   setTimeout(() => {
    //       //     if (!this.selecting) {
    //       //       this.radius -= sizeIncrement
    //       //     }
    //       //   }, index * interval)
    //       // }
    //     }
    //   }
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