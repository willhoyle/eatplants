<template lang="pug">
    .container-fluid
        .columns.is-multiline
            .column.is-12
                .columns.is-multiline
                    .column.is-12.is-6-fullhd.is-6-widescreen.is-6-desktop.is-12
                        template(v-for="(food, index) in foods")
                            .columns.is-gapless
                                .column.is-12
                                    div.is-centered 
                                        button(@click="remove({food, index})").button.is-small.is-primary.mr-2
                                            b-icon(icon="close")
                                        | {{food.longDescription}}
                                        svg-slider(:value="values[index]" @input="values[index] = $event" :limitMin="0" :min="100" :max="400" :limitMax="500")
            .column.is-4
</template>

<script>
import SvgSlider from './SvgSlider.vue'
export default {
  components: { SvgSlider },
  props: ['foods'],
  watch: {},
  methods: {
    remove(payload) {
      this.$emit('remove', payload)
    }
  },
  data() {
    return {
      value: { value: 300 },
      values: [{ value: 400 }, { value: 330 }]
    }
  }
}
</script>