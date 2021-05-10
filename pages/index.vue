<template lang="pug">
.container-fluid.p-3
  .container.p-3
    .columns.is-centered.is-multiline
      .column.is-8.has-text-centered
        h3.is-size-3-tablet.is-size-5-mobile.is-title.has-text-grey.my-3
          | Plant-based meal planning and nutrient optimizer
        .message.is-primary.my-3
          .message-body
            span.has-text-grey
              | eatplants.app is in beta. Report any bugs
              span &nbsp;
              a.has-text-primary(
                href='https://github.com/willhoyle/eatplants/issues'
              ) here
              span &nbsp;or
              span &nbsp;
              a.has-text-primary(href='mailto:will.hoyle@gmail.com') email me
    .columns
      .column.is-narrow
        .menu-label.mb-0 Macronutrients
        .has-background-silver.p-5
          div 2000 kcal
          div 120g Protein
          div 75g &nbsp;&nbsp;Fat
          div 250g Carb
      .column.is-narrow
        b-icon(icon='plus', size='is-large')
      .column.is-narrow
        .menu-label.mb-0 Food
        .has-background-silver.p-5
          div Peas
          div Sweet Potatoes
          div Tofu
          div Lentils
      .column.is-narrow
        b-icon(icon='equal', size='is-large')
      .column.is-7
        .menu-label.mb-0 Eat this
        text-items(
          :foods='foods',
          :hide='{ lock: true, amount: true, closeButton: true }',
          :styles='{ tight: true }'
        )
    .columns.py-5
      .column.is-centered.has-text-centered
        .py-3.is-size-5 A tool to calculate how much of each food I need to eat to reach my daily nutrient requirements.
        nuxt-link(to='/app/optimizer')
          button.button.has-background-primary 
            | Get Started
    .columns.is-multiline
      .column.is-12
        .is-size-3 What?
        .is-size-5
          .content
            ul 
              li Given a nutrient requirement profile (calories, macros, micros) and a list of food, this tool will spit out how much of each food to eat to reach that given nutrient requirement profile.
      .column.is-12
        .is-size-3 Why?
        .is-size-5
          .content
            ul
              li Help beginner vegans develop intuition-based eating
              li Help athletes track adequate protein and calorie intake without the burden of logging food
              li Can be used to develop nutritious recipes
              li Can spit out a grocery list spanning multiple days
      .column.is-12
        .is-size-3 More info
        .is-size-5
          .content
            ul
              li This tool came about from asking myself silly questions. I wanted to answer questions like:
                ul
                  li What is the smallest list of ingredients I can eat to satisfy my nutrient goals?
                  li Can I reach my protein requirement (120g) by just eating peas and stay under my caloric requirement? (2200 kcal)
                  li How much does each meal cost me? (I don't have pricing implemented yet but an interesting question)
                  li What is the weirdest combination of food I can eat to satisfy my nutrient goals?

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
        //- b-icon(icon="arrow-right").ml-2
//-   div
//-     //- .browse-recipe-section.columns.is-multiline
//-     //-   .column.is-12.has-text-centered.has-text-grey
//-     //-     .is-size-4 One-click from recipe to grocery list
//-     .columns.is-multiline.py-5
//-       //- .column.is-4.my-5
//-       //-   .has-text-centered
//-       //-     b-icon(icon="book-plus mdi-64px" size="is-xlarge")
//-       //-     .is-size-4.has-text-grey Log your food.
//-       .column.is-4.my-5
//-         feature-box(
//-           icon='format-list-bulleted',
//-           text='One-click grocery lists from recipes'
//-         )
//-       .column.is-4.my-5
//-         feature-box(:src='vegansvg', text='100% Vegan')

//-       .column.is-4.my-5
//-         feature-box(icon='calculator', text='Optimize your nutrients')

//-       .column.is-4.my-5
//-         feature-box(
//-           icon='file-multiple',
//-           text='Create nutrient profiles for different days of the week'
//-         )

//-       .column.is-4.my-5
//-         feature-box(icon='leaf', text='Track macro/micronutrients')

//-       .column.is-4.my-5
//-         feature-box(icon='close', text='Intuitive eating, no food logging')

//-       .column.is-4.my-5
//-         feature-box(
//-           icon='share',
//-           text='Save and share recipes and collections of foods'
//-         )

//-       .column.is-4.my-5
//-         feature-box(
//-           icon='account-multiple',
//-           text='Plan meals for the whole family or roommates'
//-         )

//-       .column.is-4.my-5
//-         feature-box(
//-           icon='check',
//-           text='Don\'t know how to start? Follow a plan'
//-         )
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

      foods: [
        {
          longDescription: 'Peas',
          successZone: {
            width: 30,
            'margin-left': 25,
          },
          slider: {
            'margin-left': 50,
          },
        },
        {
          longDescription: 'Sweet Potatoes',
          successZone: {
            width: 54,
            'margin-left': 30,
          },
          slider: {
            'margin-left': 40,
          },
        },
        {
          longDescription: 'Tofu',
          successZone: {
            width: 20,
            'margin-left': 60,
          },
          slider: {
            'margin-left': 70,
          },
        },
        {
          longDescription: 'Lentils',
          successZone: {
            width: 30,
            'margin-left': 25,
          },
          slider: {
            'margin-left': 50,
          },
        },
      ],
    }
  },
}
</script>

<style>
.space-top {
  min-height: 100px;
  padding-top: 150px;
}
.browse-recipe-section {
  background-color: white;
}
.break-all {
  word-break: break-all;
}
</style>
