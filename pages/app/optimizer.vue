<template lang="pug">
  div.container-fluid
    div.columns.is-multiline.is-centered
        div.column.is-6
            b-autocomplete(v-model="searchKey" :data="results" @select="addFood" rounded placeholder="Search food" size="is-medium" icon="magnify")
              template(slot-scope="props")
                  div.media-content {{props.option.longDescription}}

              template(slot="empty") No results found
    div.columns
      div(v-if="chartType == 'fluid-chart' ").column.is-12
        fluid-chart
      div(v-else-if="chartType == 'sliders' ").column.is-12
        food-sliders(:foods="foods" @remove="removeFood")
      div(v-else-if="chartType == 'text' ").column.is-12
        text-items(:foods="foods" @remove="removeFood")
</template>

<script>
import FluidChart from '~/components/Chart/Chart.vue'
import FoodSliders from '~/components/Chart/FoodSliders.vue'
import TextItems from '~/components/Chart/TextItems.vue'

import Food from '~/src/vuex-orm/models/Food'
import Nutrient from '~/src/vuex-orm/models/Nutrient'

import Fuse from 'fuse.js'

export default {
  components: { FluidChart, FoodSliders, TextItems },
  data() {
    return {
      // which chart type should we show to the user
      chartType: 'text',

      searchKey: '',
      fuse: null,

      results: [],

      foods: []
    }
  },
  watch: {
    searchKey(s) {
      if (s == '') {
        this.results = []
      } else {
        this.fetchItems()
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    fetchItems() {
      return this.$axios
        .get('/api/v1/search', { params: { t: this.searchKey } })
        .then(({ data }) => {
          Food.insertOrUpdate({ data: data.results })
          this.results = data.results
        })
    },
    addFood(item) {
      this.foods.push(item)
    },
    removeFood({ item, index }) {
      this.$delete(this.foods, index)
    }
  },
  async asyncData({ $axios }) {
    let searchKey = 'q'
    let { data } = await $axios.get('/api/v1/search', {
      params: { t: searchKey }
    })
    return { foods: [data.results[0], data.results[1], data.results[2]] }
    // return Promise.all([
    //   $axios
    //     .get('/api/v1/Food', {
    //       params: {
    //         query: {},
    //         select: ['longDescription', 'shortDescription']
    //       }
    //     })
    //     .then(({ data }) => {
    //       Food.insertOrUpdate({ data })
    //     }),
    //   $axios
    //     .get('/api/v1/Nutrient', {
    //       params: {
    //         query: {},
    //         select: ['_id']
    //       }
    //     })
    //     .then(({ data }) => {
    //       Nutrient.insertOrUpdate({ data })
    //     })
    // ])
  }
}
</script>
