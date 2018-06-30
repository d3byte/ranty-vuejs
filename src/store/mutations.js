export default {
    login(state, { user, token }) {
        state.user = user
        state.token = token
    },
}