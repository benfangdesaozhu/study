// https://nuxtjs.org/docs/directory-structure/store/ 参考：每个js文件文件store都转换为命名空间模块
export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text: text,
      done: false,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
