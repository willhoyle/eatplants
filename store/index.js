import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '../src/vuex-orm/database.js'


export const plugins = [VuexORM.install(database)]

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    commit('user/setUserDoc', {
      roles: ['dev', 'mod']
    })
    return Promise.resolve()
  }
}


