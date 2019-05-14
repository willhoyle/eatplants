import Vue from 'vue'
import User from '../src/vuex-orm/models/User'


Vue.mixin({
  computed: {
    user() {
      let user = this.$store.getters['entities/User/user']
      console.log(user);
      return user
    },
    loggedIn() {
      return this.$store.getters['entities/User/loggedIn']
    },
    hasRoles() {
      return rolesToCheck => {
        let userRoles = this.user.roles
        return rolesToCheck.reduce((hasRole, role) => {
          return (
            hasRole ||
            userRoles.reduce((foundMatch, userRole) => {
              return foundMatch || userRole == role
            }, false)
          )
        }, false)
      }
    }
  }
})
