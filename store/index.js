import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '../vuex-orm/database.js'
import Recipe from '../vuex-orm/models/Recipe'
import Food from '../vuex-orm/models/Food'


export const plugins = [VuexORM.install(database)]

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        // console.log(context);
        await dispatch('entities/User/insertOrUpdate', {
            data: [
                {
                    _id: 1,
                    firstName: "William",
                    lastName: "Hoyle",
                    roles: ['dev', 'mod'],
                    email: 'will.hoyle@gmail.com'
                }
            ]
        })

        await dispatch('entities/Recipe/insertOrUpdate', {
            data: [
                {
                    _id: 1,
                    name: 'My new recipe'
                }
            ]
        })

        commit('entities/User/setLoginStatus', true)
        commit('entities/User/setUserId', 1)

        // let foods = await this.$axios.get("/api/v1/frontpage")
        // Food.insertOrUpdate({ data: foods.data.food })

        return Promise.resolve()
    },


}

export const getters = {
    getCurrentRecipe(state) {
        return Recipe.find(state.editor.currentRecipeId)
    }
}

export const state = () => {
    return {
        editor: {
            currentRecipeId: 1
        }

    }
}

