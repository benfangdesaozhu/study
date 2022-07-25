import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://b639f2c75ce74848a06363992c8efe14@devops-sentry.zeekrlife.com/24',
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],
})

export default (_, inject) => {
  inject('sentry', Sentry)
}