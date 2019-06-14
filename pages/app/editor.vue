<template lang="pug">
    .container-fluid
        .columns.is-multiline.mt-3
            .column.is-3
            .column.is-6.has-text-centered
                span(v-if="!isEditingRecipeName").title.is-size-4
                    | {{currentRecipe.name}}
                    span(@click="editRecipeName" ).pointer
                        b-icon(icon="pencil").ml-2
                .columns(v-else).is-centered
                  .column.is-6
                    b-field
                      b-input(ref="recipeNameInput" expanded v-model="recipeName" placeholder="Enter a name for this recipe..." icon="label")
                      p(@click="saveEditRecipeName").control
                          button.button.is-primary Save
                      p(@click="cancelEditRecipeName").control
                          button.button Cancel
            .column.is-3.has-text-right
                b-dropdown(position="is-bottom-left")
                    template(slot="trigger")
                        div.pointer
                        b-icon(icon="settings")
                    b-dropdown-item(has-link) 
                        nuxt-link(to="/app/recipes/my-recipes")
                            b-icon(icon="swap-horizontal").mr-2
                            | Switch to another recipe
</template>

<script>
import { mapGetters } from 'vuex'
import Recipe from '~models/Recipe'

export default {
  beforeMount() {},
  data() {
    return {
      isEditingRecipeName: false,
      recipeName: ''
    }
  },
  computed: {
    ...mapGetters({
      currentRecipe: 'getCurrentRecipe'
    })
  },
  methods: {
    saveEditRecipeName() {
      if (this.recipeName == '') {
        this.cancelEditRecipeName()
        return
      }

      Recipe.insertOrUpdate({
        data: [{ _id: this.currentRecipe._id, name: this.recipeName }]
      }).then(() => {
        this.cancelEditRecipeName()
      })
    },
    cancelEditRecipeName() {
      this.isEditingRecipeName = false
      this.recipeName = ''
    },
    editRecipeName() {
      this.recipeName = this.currentRecipe.name
      this.isEditingRecipeName = true
      this.$nextTick(() => {
        this.$refs.recipeNameInput.focus()
      })
    }
  }
}
</script>