<template lang="pug">
    .container-fluid
        .columns.is-multiline.is-gapless
            .column.is-12
                .columns.is-multiline.is-gapless
                    .column.is-12
                        template(v-for="(food, index) in foods")
                          .columns.is-gapless.is-multiline()
                              .column.is-12
                                .columns.is-gapless.is-multiline
                                  .column.is-12
                                    .columns.is-gapless.is-multiline
                                      .column.is-9(@click="animate=true")
                                        span().is-size-4
                                        span.has-text-grey
                                          | {{food.longDescription}}
                                      .column.has-text-right.is-3(v-if="!hide.amount")
                                        b-dropdown(position="is-bottom-left").mr-3.pt-2
                                          template(slot="trigger")
                                            div.pointer
                                              | 2 cup
                                              b-icon(icon="chevron-down" size="is-small")
                                          b-dropdown-item 33g
                                          b-dropdown-item 2tbsp
                                        button(v-if="!hide.closeButton" @click="remove({food, index})").button.is-small.is-silver
                                          b-icon(icon="close" size="is-small")
                                  .column.is-12 
                                    .columns.is-gapless
                                      .column.is-12.is-multiline
                                        text-item(:item="food" @slider-moved="onSliderMoved" :tight="styles.tight" :animate.sync="animate")
                                
            
</template>

<script>
import TextItem from '~/components/Chart/TextItem.vue'
export default {
  components: {
    TextItem
  },
  props: {
    foods: {
      type: Array
    },
    hide: {
      type: Object,
      default: function() {
        return {
          amount: false,
          closeButton: false
        }
      }
    },
    styles: {
      type: Object,
      default: function() {
        return {
          tight: false
        }
      }
    }
  },
  data() {
    return {
      animate: false
    }
  },
  methods: {
    remove(payload) {
      this.$emit('remove', payload)
    },
    onSliderMoved(payload) {
      let itemId = payload.id
      console.log(payload)
    }
  }
}
</script>