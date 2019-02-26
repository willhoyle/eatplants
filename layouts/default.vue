<template lang="pug">
  div#app
    div.container
      nav.navbar.is-transparent
        div.navbar-brand
          router-link.navbar-item(to='/')
            img(src='~static/PurePlantGainsFlat.svg')
          div(@click="showNav = !showNav" :class="[showNav && 'is-active']").navbar-burger.burger
            span
              span
                span
        div(:class="[showNav && 'is-active']").navbar-menu
          div.tabs.navbar-start.pt-4.pl-4
            ul(v-for='route in routes')
              li(:key='route.path', :class="{'is-active': routeIsActive(route)}")
                nuxt-link(:to='route.path', active='') {{ route.label }}
          div.navbar-end
            div.navbar-item
              b-dropdown(v-if='!loggedIn', position='is-bottom-left')
                button.button.is-primary(slot='trigger', type='button')
                  span Sign in/Register
                b-dropdown-item(custom='', paddingless='')
                  signup-login(:logged-in='loggedIn', @login='', @register='')
            div.navbar-item(v-if='loggedIn')
              router-link(to='/profile')
                b-icon(pack='fas', icon='cog', size='is-small')
                  span.px-1 Settings
    div.columns
      div.column.m-2
        nuxt
</template>

<script>
import SignupLogin from '../components/SignupLogin.vue'

let findActiveTab = (fromBrowserRoute, routes) => {
  for (let i = 0; i < routes.length; i++) {
    let route = routes[i]
    if (route.path == fromBrowserRoute.path) {
      return i
    }
  }
  return -1
}

export default {
  components: {
    SignupLogin
  },
  data() {
    let routes = [
      // {label: "Home", route: "/"},
      { label: 'Home', path: '/' },
      { label: 'App', path: '/app' },
      { label: 'Guides', path: '/guides' },
      { label: 'Articles', path: '/blog' },
      { label: 'About', path: '/about' }
    ]
    return {
      routes,
      showNav: false
    }
  },
  computed: {
    routeIsActive() {
      return route => {
        return this.$route.path.split('/')[1] == route.path.split('/')[1]
      }
    },
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  watch: {},
  methods: {}
}
</script>
