import { createStore } from 'vuex';


const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});


const storeConfig = {
    state() {
        return {
            myName: '我是root',
            counter: 3,
            name: 'cqc',

            books: [{
                    name: '或普希金',
                    price: 22,
                    counter: 3
                },

                {
                    name: '莱恩开发',
                    price: 67,
                    counter: 2
                }
            ]
        }
    },

    mutations: {
        increment(state, payload) {
            payload;
            state.counter++;
        },

        decrement(state) {
            state.counter--;
        },

        incrementN(state, payload) {
            const { n } = payload;
            state.counter += n;
        },

        resetCounter(state, n) {
          state.counter = n;
        }
    },

    actions: {
        incrementAsync(ctx, { n, db }) {
            const { commit, dispatch } = ctx;

            return new Promise(r => {
                setTimeout(() => {
                    commit('incrementN', { n });
                    if (db) {
                        dispatch('incrementDbAsync', { n })
                    }

                    r({ name: 'cqc', ctx });
                }, 200);
            })
        },

        incrementDbAsync(ctx, { n }) {
            setTimeout(() => {
                ctx.commit('incrementN', { n })
            }, 1000);
        },

    },

    getters: {
        discounter() {
            return .1
        },

        getName(state) {
          return state.myName
        },

        totalBooksPrice(state, getters) {
            const { discounter } = getters;
            return state.books.reduce((p, c) => {
                const { price, counter } = c;
                p = p + price * counter
                return p
            }, 0) * discounter
        }
    }
}


const store = createStore({
  ...storeConfig,

  modules
});

export default store;