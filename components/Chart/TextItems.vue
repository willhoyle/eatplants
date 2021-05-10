<template lang="pug">
.container-fluid
  .columns.is-multiline.is-gapless
    .column.is-12
      .columns.is-multiline.is-gapless
        .column.is-12
          template(v-for='(food, index) in foods')
            .columns.is-gapless.is-multiline.mb-2
              .column.is-12
                .columns.is-gapless.is-multiline
                  .column.is-12
                    .columns.is-gapless.is-multiline
                      .column
                        span.is-size-4
                        span.has-text-grey
                          | {{ food.longDescription }}
                      .column.has-text-right(
                        v-if='!hide.amount',
                        style='flex-basis: auto'
                      )
                        .is-inline.mr-3.pt-2.pointer.has-text-primary(
                          v-if='!hide.lock'
                        )
                          span(
                            @click='food.toggleLock(index)',
                            v-if='food.isPinned'
                          ) 
                            b-icon(icon='lock-open')
                            | Unlock
                          template(v-else)
                            b-icon(icon='lock')
                            | Lock
                        .is-inline.mr-3.pt-2
                        b-dropdown.mr-3.pt-2(position='is-bottom-left')
                          template(slot='trigger')
                            .pointer
                              | 2 cup
                              b-icon(icon='chevron-down', size='is-small')
                          b-dropdown-item 33g
                          b-dropdown-item 2tbsp
                        button.button.is-small.is-silver(
                          v-if='!hide.closeButton',
                          @click='remove({ food, index })'
                        )
                          b-icon(icon='close', size='is-small')
                  .column.is-12 
                    .columns.is-gapless
                      .column.is-12.is-multiline
                        text-item(
                          :idx='index',
                          :item='food',
                          :tight='styles.tight'
                        )
</template>

<script>
import TextItem from '~/components/Chart/TextItem.vue'
export default {
  components: {
    TextItem,
  },
  props: {
    foods: {
      type: Array,
    },
    hide: {
      type: Object,
      default: function () {
        return {
          lock: false,
          amount: false,
          closeButton: false,
        }
      },
    },
    styles: {
      type: Object,
      default: function () {
        return {
          tight: false,
        }
      },
    },
  },
  methods: {
    remove(payload) {
      this.$emit('remove', payload)
    },
  },
}
</script>