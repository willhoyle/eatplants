import User from './index'

export default {

    state: () => {
        return {
            userId: null,
            loggedIn: false
        }
    },
    getters: {
        user: (state) => {
            return User.find(state.userId)
        },
        loggedIn: state => {
            return state.loggedIn
        }
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id
        },
        setLoginStatus(state, loggedIn) {
            state.loggedIn = loggedIn
        }
    }
}