<template lang="pug">
    div
        div
            | {{item.min}} {{ item.max}}
        b-field(grouped)
                
            b-field(label="Min")
                b-input(v-model="min")
            b-field(label="Max")
                b-input(v-model="max")
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      min: 0,
      max: 0,
      val: 0
    }
  }
}
</script>
