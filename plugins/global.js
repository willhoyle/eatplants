import Vue from 'vue'
import CleanBox from '~/components/Clean/CleanBox.vue'

Vue.component('CleanBox', CleanBox)


// Apollo stuff
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)


// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: process.server ? 'http://localhost:5000/graphql' : 'http://localhost:5000/graphql',
    fetch
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export default (ctx, inject) => {
    const { app } = ctx
    app.apolloProvider = apolloProvider
}