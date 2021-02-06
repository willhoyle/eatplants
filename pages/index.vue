<template lang="pug">
.container-fluid
  .container.p-3
    .columns.is-centered.is-multiline
      .column.is-6.has-text-centered
        h3.is-size-3-tablet.is-size-4-mobile.is-title
          | Plant-based meal planning
        h5.is-size-5-tablet.is-size-6-mobile.has-text-grey
          ul
            li Track calories
            li Optimize macronutrients and micronutrients
            li Meal-prep Sunday tool
            li Grocery list output
            li Family plans available to collaborate
            li and much more
      //- .column.is-6
      //-   //- clean-box
      //-   //- img(src="~/static/oats.jpg" style="cover: object-fit;")
      //-   text-items(:foods="getFoods" :hide="{closeButton: true}" :styles='{tight: true}')
      //- .column.is-6
      //-     .columns.is-multiline
      //-       template(v-for="section in frontpageNutrients")
      //-         .column.is-6
      //-           .has-text-grey {{section.name}}
      //-           template(v-for="nutrient in section.nutrients")
      //-             span.has-text-grey {{nutrient.label}}
      //-             nutrient-box()
    .columns.py-5
      .column.is-centered.has-text-centered
        nuxt-link(to='/app/optimizer')
          button.button.has-background-primary 
            | Get Started
          //- b-icon(icon="arrow-right").ml-2
  div
    .browse-recipe-section.columns.is-multiline
      .column.is-12.has-text-centered
        .is-size-4 Hundreds of recipes
    .columns.is-multiline.py-5
      //- .column.is-4.my-5
      //-   .has-text-centered
      //-     b-icon(icon="book-plus mdi-64px" size="is-xlarge")
      //-     .is-size-4.has-text-grey Log your food.
      .column.is-4.my-5
        feature-box(:src='vegansvg', text='100% Vegan')

      .column.is-4.my-5
        feature-box(icon='calculator', text='Optimize your nutrients')

      .column.is-4.my-5
        feature-box(icon='file-multiple', text='Create nutrient profiles')

      //- .column.is-4.my-5
      //-   feature-box(icon="leaf" text="Track micronutrients")

      //- .column.is-4.my-5
      //-   feature-box(icon="clock" text="Food logging and sharing recipes")

      //- .column.is-4.my-5
      //-   .has-text-centered
      //-     b-icon(icon="calendar mdi-64px" size="is-xlarge")
      //-     .is-size-4.has-text-grey Schedule your meals.
      //- .column.is-4.my-5
      //-   .has-text-centered
      //-     b-icon(icon="share mdi-64px" size="is-xlarge")
      //-     .is-size-4.has-text-grey Save and share recipes. 

      //- .column.is-4.my-5
      //-   .has-text-centered
      //-     b-icon(icon="account-multiple mdi-64px" size="is-xlarge")
      //-     .is-size-4.has-text-grey Plan meals for the whole family.

      //- .column.is-4.my-5
      //-   .has-text-centered
      //-     b-icon(icon="arrow-right mdi-64px" size="is-xlarge")
      //-     .is-size-4.has-text-grey Reach your goals by following a plan.
</template>

<script>
import TextItems from '~/components/Chart/TextItems.vue'
import FeatureBox from '~/components/FeatureBox.vue'
import NutrientBox from '~/components/Chart/Nutrient.vue'

import vegansvg from '~/assets/vegetarian-mark.svg'

import Food from '~models/Food'

import { frontpageFoods, frontpageNutrients } from '../src/data/frontpage'

export default {
  components: {
    TextItems,
    FeatureBox,
    NutrientBox,
  },
  name: 'HomePage',
  data() {
    return {
      vegansvg,
      frontpageNutrients,

      foods: [],
      a: false,
    }
  },
  computed: {
    getFoods() {
      if (!this.a) {
        return this.foods.slice(0, 3)
      } else {
        return this.foods.slice(0, 4)
      }
    },
  },
  async asyncData({ $axios }) {
    let foods = frontpageFoods.map((f) => {
      return Food.query()
        .where((record) => f == record.longDescription)
        .first()
    })
    return { foods }
  },
  async fetch({ $axios }) {},
}
</script>

<style scoped>
.space-top {
  min-height: 100px;
  padding-top: 150px;
}
.browse-recipe-section {
  background-color: white;
}
</style>
