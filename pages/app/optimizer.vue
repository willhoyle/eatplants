<template lang="pug">
.container-fluid
  .columns.is-multiline
    .column.is-12
      .columns.is-multiline.is-centered.my-3
        .column.is-6
          b-autocomplete(
            v-model='searchTerm',
            :data='results',
            @select='addFood',
            rounded,
            placeholder='Add food, recipe, or collection...',
            size='is-medium',
            icon='magnify'
          )
            template(slot-scope='props')
              .media-content {{ props.option.longDescription }}

            template(slot='empty') No results found
    .column.is-12
      .columns.is-multiline
        .column.is-narrow
          .menu-label.mb-0 Optimize
          .button.is-primary(@click='optimize')
            b-icon.mr-1(
              :icon='isOptimizing ? "calculator-variant mdi-spin" : "calculator-variant"'
            )
            | Run
        //- .column.is-narrow
        //-   div(v-if='feasible') Feasible
        //-   div(v-else) Not feasible
        .column.is-narrow
          .menu-label.mb-0 Macronutrients
          b-dropdown(@trigger='macroRequirements')
            template(#trigger='{active}')
              b-button(
                type='is-silver',
                :icon-right='active ? "menu-up" : "menu-down"'
              )
                span.mr-3 {{ kcalRequirements }} kcal
                span.mr-3 {{ macroRequirements.protein }} Protein
                span.mr-3 {{ macroRequirements.fat }} Fat
                span {{ macroRequirements.carb }} Carb

            b-dropdown-item(custom)
              section
                b-field(label='Calories (kcal)')
                  | {{ kcalRequirements }} kcal
                b-field(label='Protein (g)')
                  b-input(v-model='macroRequirements.protein')
                b-field(label='Fat (g)')
                  b-input(v-model='macroRequirements.fat')
                b-field(label='Carb (g)')
                  b-input(v-model='macroRequirements.carb')
        .column.is-narrow
          .menu-label.mb-0 Micronutrients
          b-dropdown
            template(#trigger='{active}')
              b-button(
                type='is-silver',
                :icon-right='active ? "menu-up" : "menu-down"'
              )
                | Complete Profile (Level 1)

            b-dropdown-item(custom)
              b-dropdown
                template(#trigger='{active}')
                  b-button(
                    type='is-silver',
                    :icon-right='active ? "menu-up" : "menu-down"'
                  )
                    span.mr-3 100g Protein
                    span.mr-3 50g Fat
                    span 235g Carb

                b-dropdown-item(custom)
                  | hello
    .column.is-12
      .columns.is-multiline
        .column.is-12
          text-items(:foods='list', @remove='removeFood')
</template>

<script>
import FluidChart from '~/components/Chart/Chart.vue'
import FoodSliders from '~/components/Chart/FoodSliders.vue'
import TextItems from '~/components/Chart/TextItems.vue'

import foodSearch from '../../graphql/foodSearch.graphql'
import foodWithNutrients from '../../graphql/foodWithNutrients.graphql'

import { optimize } from '../../src/index.js'

export default {
  components: { FluidChart, FoodSliders, TextItems },
  apollo: {
    foods: {
      query: foodSearch,
      variables() {
        return {
          searchTerm: this.searchTerm,
        }
      },
      skip() {
        return !this.searchTerm
      },
    },
  },
  data() {
    return {
      microProfiles: [
        {
          name: 'Complete Profile (Level 1)',
        },
      ],

      microProfile: 0,

      forms: {
        macroRequirements: {
          protein: 0,
          fat: 0,
          carb: 0,
        },
      },

      macroRequirements: {
        protein: 120,
        fat: 75,
        carb: 260,
      },

      feasible: false,
      result: {},
      isOptimizing: false,

      searchTerm: '',
      fuse: null,

      foods: [],

      list: [],
    }
  },
  created() {},
  computed: {
    kcalRequirements() {
      return Math.round(
        this.macroRequirements.protein * 4 +
          this.macroRequirements.fat * 9 +
          this.macroRequirements.carb * 4
      )
    },
    results() {
      return this.foods
    },
  },
  methods: {
    async optimize() {
      this.isOptimizing = true

      let {
        data: { foodWithNutrients: foods },
      } = await this.$apollo.query({
        query: foodWithNutrients,
        variables: {
          ids: this.list.map((l) => l.id),
        },
      })

      let result = await optimize({
        foods,
        nutrientRequirements: {
          Protein: { min: 100, max: 120 },
          'Energy (kcal)': { min: 1000, max: 3000 },
          'Total lipid (fat)': { min: 50, max: 80 },
        },
      })
      this.result = result
      this.feasible = result.midpoint.feasible

      for (let i = 0; i < this.list.length; i++) {
        let food = this.list[i]
        let energyKcal = foods[i].nutrients.find((nutrient) => {
          return nutrient.nutrient.unit == 'kcal'
        })
        let maxKcal = 3000
        let range = this.result.ranges[i]
        let successZone = {
          width:
            (((range.max - range.min) * energyKcal.valuePerG) / maxKcal) * 100,
          'margin-left': (range.min / maxKcal) * 100,
        }
        let slider = {
          'margin-left': (range.min / maxKcal) * 100 + successZone.width / 2,
        }
        this.$set(this.list, i, {
          ...food,
          successZone,
          slider,
        })
      }

      this.isOptimizing = false
    },
    async addFood(item) {
      let listItem = {
        ...item,
        isPinned: false,

        successZone: {
          width: 0,
          'margin-left': 0,
        },
        slider: {
          'margin-left': 0,
        },
        onSliderMoved: ({ idx, percentageMoved }) => {
          this.list[idx].isPinned = true
        },
        toggleLock: (idx) => {
          this.list[idx].isPinned = !this.list[idx].isPinned
        },
      }
      this.list.push(listItem)
    },
    removeFood({ item, index }) {
      this.$delete(this.list, index)
    },
  },
}
</script>
