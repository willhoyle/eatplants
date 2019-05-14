<template lang="pug">
    div.slider-container
      div(:style="successZoneStyles").success-zone
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      min: 0,
      max: 0,
      val: 0,
      successZone: {
        styles: {
          width: 33,
          'margin-left': 33
        }
      }
    }
  },

  computed: {
    successZoneStyles() {
      let styles = this.successZone.styles
      return {
        width: styles.width + '%',
        'margin-left': styles['margin-left'] + '%'
      }
    }
  }
}
</script>

<style lang="css">
</style>