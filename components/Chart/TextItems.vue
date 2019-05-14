<template lang="pug">
    .container-fluid
        .columns.is-multiline
            .column.is-12
                .columns.is-multiline
                    .column.is-12.is-6-fullhd.is-6-widescreen.is-6-desktop
                        template(v-for="(food, index) in foods")
                            .columns.is-gapless.is-multiline
                                .column.is-12
                                  .columns.is-gapless.is-multiline
                                    .column
                                      | {{food.longDescription}}
                                    div(style="width: 40px;").column.is-narrow.has-text-right
                                      button(@click="remove({food, index})").button.is-small.is-primary
                                        b-icon(icon="close")
                                .column.is-12
                                    text-item(:item="food")

            .column.is-4
</template>

<script>
import TextItem from '~/components/Chart/TextItem.vue'
export default {
  components: {
    TextItem
  },
  methods: {
    remove(payload) {
      this.$emit('remove', payload)
    }
  },
  props: {
    foods: {
      type: Array
    }
  }
}
</script>

