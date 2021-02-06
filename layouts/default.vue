<template lang="pug">
  .container-fluid
    .container.p-3
      .columns.is-mobile
        .column
          router-link(to='/').is-inline-block
            .title
              span.is-hidden-mobile.is-size-1.logo-font 
                span eat
                span.plants-text &nbsp;plants
              span.is-hidden-tablet.is-size-3.logo-font 
                span eat
                span.plants-text &nbsp;plants
          .is-inline-block.ml-4
            router-link(to="/app/recipes").is-size-5.has-text-grey Recipes
          .is-inline-block.ml-4
            router-link(to="/app/guides").is-size-5.has-text-grey Guide
          
        
          .is-inline-block.is-pulled-right
            span.has-text-right
              b-dropdown(v-if='!loggedIn', position='is-bottom-left' )
                  span.pointer.is-size-5(slot='trigger') 
                    span Login or Signup
                  b-dropdown-item(custom='', paddingless='')
                    signup-login(@login='', @register='')
              span(v-else @click="logout")
                span.pointer.is-size-5.has-text-grey
                  | Logout
    nuxt

    footer.footer
      .container
        .columns.is-multiline.has-text-centered 
          .column.is-4
            | Project by 
            a(href="https://williamhoyle.ca") William Hoyle
          .column.is-4
            | Built with Buefy
          .column.is-4
            | food optimizer 
  //- div#app
  //-   div.container
  //-     nav.navbar.is-transparent
  //-       div.navbar-brand
  //-         router-link.navbar-item(to='/')
  //-           img(src='~static/PurePlantGainsFlat.svg')
  //-         div(@click="showNav = !showNav" :class="[showNav && 'is-active']").navbar-burger.burger
  //-           span
  //-             span
  //-               span
  //-       div(:class="[showNav && 'is-active']").navbar-menu
  //-         div.tabs.navbar-start.pt-4.pl-4
  //-           ul(v-for='route in routes')
  //-             li(:key='route.path', :class="{'is-active': routeIsActive(route)}")
  //-               nuxt-link(:to='route.path', active='') {{ route.label }}
  //-         div.navbar-end
  //-           div.navbar-item
  //-             b-dropdown(v-if='!loggedIn', position='is-bottom-left')
  //-               button.button.is-primary(slot='trigger', type='button')
  //-                 span Sign in/Register
  //-               b-dropdown-item(custom='', paddingless='')
  //-                 signup-login(:logged-in='loggedIn', @login='', @register='')
  //-           div.navbar-item(v-if='loggedIn')
  //-             router-link(to='/profile')
  //-               b-icon(pack='fas', icon='cog', size='is-small')
  //-                 span.px-1 Settings
  //- div.columns
  //-   div.column.m-2
  //-     nuxt
</template>

<script>
import { mapGetters } from 'vuex'
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
    }
  },
  watch: {},
  methods: {
    login() {},
    logout() {
      this.$store.commit('entities/User/setLoginStatus', false)
    }
  }
}
</script>


<style>
.logo-font {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.plants-text {
  color: rgba(88, 122, 84, 0.88);
}
</style>