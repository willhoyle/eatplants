<template lang="pug">
.slider-container(ref='sliderContainerRef', :class='{ "slider-tight": tight }')
  .success-zone(
    ref='successRef',
    :class='{ "slider-tight": tight }',
    :style='successZoneStyles'
  )
  .slider(
    v-if='animate',
    ref='sliderRef',
    :class='{ "slider-tight": tight }',
    :style='sliderStyles'
  )
  .slider(
    v-else,
    ref='sliderRef',
    :class='{ "slider-tight": tight }',
    :style='sliderStyles'
  )
</template>

<script>
import interact from 'interactjs'
export default {
  props: ['item', 'tight', 'animate'],
  data() {
    return {
      sliderPosX: 0,

      min: 0,
      max: 0,
      val: 0,
      sliderRef: null,
      successRef: null,
      styles: {
        successZone: {
          width: 33,
          'margin-left': 33,
        },
        slider: {
          'margin-left': 33,
        },
      },
    }
  },
  watch: {
    animate(val) {
      if (val) {
        // this.animateSlider(50)
        window.setTimeout(() => {
          this.$emit('update:animate', false)
        }, 2000)
      }
    },
  },
  mounted() {
    this.sliderRef = this.$refs.sliderRef
    this.successRef = this.$refs.successRef
    this.sliderContainerRef = this.$refs.sliderContainerRef

    let rect = this.successRef.getBoundingClientRect()
    this.sliderPosX = this.sliderRef.getBoundingClientRect().x
    let draggable = interact(this.sliderRef).draggable({
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'parent',
        }),
      ],
    })
    //   containment: {
    //     left: rect.x - 10,
    //     height: 0,
    //     top: 0,
    //     right: rect.x + rect.width + 10
    //   },
    //   onDragEnd: newPosition => {
    //     let containerWidth = this.$refs.sliderContainerRef.getBoundingClientRect()
    //       .width

    //     let percentageMoved =
    //       (newPosition.left - this.sliderPosX) / containerWidth
    //     this.sliderPosX = newPosition.left
    //     this.$emit('slider-moved', { id: 1, percentageMoved })
    //   }
    // })
    // console.log(getOffset(this.sliderContainerRef))
  },
  computed: {
    successZoneStyles() {
      let styles = this.styles.successZone
      return {
        width: styles.width + '%',
        'margin-left': styles['margin-left'] + '%',
      }
    },
    sliderStyles() {
      let styles = this.styles.slider
      return {
        'margin-left': styles['margin-left'] + '%',
      }
    },
  },
  methods: {},
}
</script>

<style lang="css">
</style>