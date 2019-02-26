export const state = () => {
    return {
        loggedIn: false,
        userDoc: {
            roles: []
        }
    }
}
export const getters = {
    getUserRoles: state => {
        return state.userDoc.roles
    }
}
export const mutations = {
    setUserDoc: (state, payload) => {
        // simple for now. will prob need more complex logic when we add more fields
        state.userDoc = {
            ...state.userDoc,
            ...payload
        }
    }
}