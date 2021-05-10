<template lang="pug">
.container-fluid
  .columns.is-multiline
    .column.is-12
      .columns.is-multiline.is-centered.my-3
        .column.is-6
          b-autocomplete(
            v-model='searchKey',
            :data='results',
            @select='addFood',
            rounded,
            placeholder='Search collections...',
            size='is-medium',
            icon='magnify'
          )
            template(slot-scope='props')
              p 
                strong {{ props.option.name }}
                br
                | {{ props.option.description }}

            template(slot='empty') No results found
</template>

<script>
import collectionSearch from '../../graphql/collectionSearch.graphql'

export default {
  apollo: {
    collections: {
      query: collectionSearch,
      variables() {
        return {
          searchTerm: '',
        }
      },
    },
  },
  data() {
    return {
      collections: [],
    }
  },
  computed: {
    results() {
      console.log(this.collections)
      return this.collections
    },
  },
}
</script>
