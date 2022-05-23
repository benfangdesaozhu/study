<template>
  <div>
    <div>多语言测试</div>
    <div
      v-for="locale in availableLocales"
      :key="locale.name"
      @click="changeLang(locale)">
      {{ locale.name }}
    </div>
    <span>{{ $t('name') }}</span>
  </div>
</template>

<script>
export default {
  components: {
    // SBrand
  },
  layout: 'mobile',
  data() {
    return {}
  },
  // head () {
  //   return {
  //     title: ''
  //   }
  // },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code)
    },
  },

  methods: {
    // 切换语言
    changeLang(locale) {
      console.log(this.$i18n.locales.filter((i) => i.code))
      console.log(locale, this.$i18n, 'this.$i18nthis.$i18n')
      this.$i18n.setLocale(locale.code)
    },
  },
}
</script>
