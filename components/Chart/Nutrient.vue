<template lang="pug">
    .nutrient-bar
        .success-bar(:style="styles" :class="classes")

</template>
<script>
export default {
  props: ['percentage', 'maxPercentage', 'color'],
  data() {
    return {}
  },
  computed: {
    styles() {
      let percentage =
        !isNaN(this.percentage) && this.percentage !== undefined
          ? this.percentage
          : 0
      percentage = percentage > 100 ? 100 : percentage
      let width = `${percentage}%`
      return {
        width
      }
    },
    classes() {
      if (this.percentage < 0.25) return 'has-background-danger-gradient'
      if (this.percentage < 0.5) return 'has-background-warning-gradient'
      return 'has-background-success-gradient'
    }
  }
}
</script>

<style>
.has-background-danger-gradient {
  background-color: rgba(209, 97, 97, 0.651);
}
.has-background-warning-gradient {
  background-color: rgba(194, 194, 110, 0.582);
}
.has-background-success-gradient {
  background-color: rgba(110, 202, 73, 0.466);
}
</style>