export default {
  namespaced: true,

  state: () => ({
    homeCounter: 100,
    myName: '我是moduleA'
  }),

  mutations: {
    increment() {
      console.log('调用了moduleA 的increment方法');
    },
  },

  actions: {
    useRootMutation(ctx) {
      const { commit } = ctx;

      commit('resetCounter', 0, { root: true})
    }
  },

  getters: {
    getName(state) {
        return state.myName
    },
  }
}