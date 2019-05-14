import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '../src/vuex-orm/database.js'

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

    commit('entities/User/setLoginStatus', true)
    commit('entities/User/setUserId', 1)
    return Promise.resolve()
  }
}


