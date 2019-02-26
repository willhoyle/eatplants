import Vue from 'vue'

Vue.mixin({
  computed: {
    hasRoles() {
      return rolesToCheck => {
        let userRoles = this.$store.getters['user/getUserRoles']
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
