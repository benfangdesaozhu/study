const LOGIN_DATA = 'LOGIN_DATA'

const mutations = {
    [LOGIN_DATA](state, data) {
        console.log('mutation', state, data)
        state.loginData = {
            ...state.loginData,
            ...data
        }
    }
}

export {
    mutations,
    LOGIN_DATA
}