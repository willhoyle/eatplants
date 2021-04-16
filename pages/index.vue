<template lang="pug">
.container-fluid.p-3
  .container.p-3
    .columns.is-centered.is-multiline
      .column.is-8.has-text-centered
        h3.is-size-3-tablet.is-size-5-mobile.is-title.has-text-grey
          | Plant-based meal planning and nutrient optimizer
        .message.is-primary
          .message-body
            span.has-text-grey
              | Note: App is not functional yet. Check back soon!
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
    //- .browse-recipe-section.columns.is-multiline
    //-   .column.is-12.has-text-centered.has-text-grey
    //-     .is-size-4 One-click from recipe to grocery list
    .columns.is-multiline.py-5
      //- .column.is-4.my-5
      //-   .has-text-centered
      //-     b-icon(icon="book-plus mdi-64px" size="is-xlarge")
      //-     .is-size-4.has-text-grey Log your food.
      .column.is-4.my-5
        feature-box(
          icon='format-list-bulleted',
          text='One-click grocery lists from recipes'
        )
      .column.is-4.my-5
        feature-box(:src='vegansvg', text='100% Vegan')

      .column.is-4.my-5
        feature-box(icon='calculator', text='Optimize your nutrients')

      .column.is-4.my-5
        feature-box(
          icon='file-multiple',
          text='Create nutrient profiles for different days of the week'
        )

      .column.is-4.my-5
        feature-box(icon='leaf', text='Track macro/micronutrients')

      .column.is-4.my-5
        feature-box(icon='close', text='Intuitive eating, no food logging')

      .column.is-4.my-5
        feature-box(
          icon='share',
          text='Save and share recipes and collections of foods'
        )

      .column.is-4.my-5
        feature-box(
          icon='account-multiple',
          text='Plan meals for the whole family or roommates'
        )

      .column.is-4.my-5
        feature-box(
          icon='check',
          text='Don\'t know how to start? Follow a plan'
        )
    .columns.py-5
      .column.is-centered.has-text-centered
        nuxt-link(to='/app/optimizer')
          button.button.has-background-primary 
            | Get Started now
</template>

<script>
import TextItems from '~/components/Chart/TextItems.vue'
import FeatureBox from '~/components/FeatureBox.vue'
import NutrientBox from '~/components/Chart/Nutrient.vue'

import vegansvg from '~/assets/vegetarian-mark.svg'

import Food from '~models/Food'

import { frontpageFoods, frontpageNutrients } from '../data/frontpage'

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
