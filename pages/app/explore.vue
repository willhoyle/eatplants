<template>
  <div>
    <ul v-if="!$apollo.loading">
      <li :key="food.id" v-for="food in foods">{{ food.longDescription }}</li>
    </ul>
  </div>
</template>

<script>
import collection from '../../graphql/collection.graphql'

export default {
  apollo: {
    collection: {
      query: collection,
      variables() {
        return {
          id: 1,
        }
      },
    },
  },
  data() {
    return {
      collection: null,
    }
  },
  computed: {
    foods() {
      return this.collection.collectionFoodItems.edges.map(
        ({ node: { food } }) => food
      )
    },
  },
  beforeMount() {
    let result = solver.Solve(model)
    console.log(result)
  },
}
</script>
