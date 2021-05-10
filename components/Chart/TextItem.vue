<template lang="pug">
.slider-container(ref='sliderContainerRef', :class='{ "slider-tight": tight }')
  .success-zone(
    ref='successRef',
    :class='{ "slider-tight": tight }',
    :style='successZoneStyles'
  )
  .slider(
    ref='sliderRef',
    :class='{ "slider-tight": tight }',
    :style='sliderStyles'
  )
    b-icon.pointer.pin(v-if='item.isPinned', icon='lock', size='is-small')
</template>

<script>
let PlainDraggable
if (process.client) {
  PlainDraggable = require('../../src/plain-draggable/plain-draggable.esm.js')
    .default
}

import ResizeSensor from 'css-element-queries/src/ResizeSensor'

export default {
  props: ['item', 'tight', 'idx'],
  data() {
    return {
      sliderX: 0,
      sliderRef: null,
      successRef: null,
      draggable: null,
    }
  },
  watch: {
    item: {
      handler() {
        this.$nextTick(() => {
          this.setup()
        })
      },
      deep: true,
    },
  },
  mounted() {
    this.setup()
    new ResizeSensor(this.$refs.sliderContainerRef, () => {
      this.setup()
    })
  },
  computed: {
    successZoneStyles() {
      let styles = this.item.successZone
      return {
        width: styles.width + '%',
        'margin-left': styles['margin-left'] + '%',
      }
    },
    sliderStyles() {
      let styles = this.item.slider
      return {
        'margin-left': styles['margin-left'] + '%',
      }
    },
  },
  methods: {
    setup() {
      this.sliderRef = this.$refs.sliderRef
      this.successRef = this.$refs.successRef
      this.sliderContainerRef = this.$refs.sliderContainerRef
      let rect = this.successRef.getBoundingClientRect()
      this.sliderX = this.sliderRef.getBoundingClientRect().x
      if (!this.draggable) {
        this.draggable = new PlainDraggable(this.sliderRef, {
          containment: {
            left: rect.x - 10,
            height: 0,
            top: 0,
            right: rect.x + rect.width + 10,
          },
          onDragEnd: (newPosition) => {
            console.log(newPosition)
            let containerWidth = this.$refs.sliderContainerRef.getBoundingClientRect()
              .width
            let percentageMoved =
              (newPosition.left - this.sliderX) / containerWidth
            this.sliderX = newPosition.left
            console.log({ x: this.sliderX })
            this.item.onSliderMoved({ idx: this.idx, percentageMoved })
            console.log({ idx: this.idx, percentageMoved })
          },
        })
      } else {
        this.draggable.containment = {
          left: rect.x - 10,
          height: 0,
          top: 0,
          right: rect.x + rect.width + 10,
        }
      }
    },
  },
}
</script>

<style lang="css">
</style>