export default function ({ app }) {
  return {
    lang: {
      t: (key, ...params) => {
        app.il18n.t(key, params)
      },
    },
  }
}
