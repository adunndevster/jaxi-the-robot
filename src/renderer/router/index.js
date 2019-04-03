import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/intro',
      name: 'intro',
      component: require('@/components/Intro').default
    },
    {
      path: '/end',
      name: 'end',
      component: require('@/components/End').default
    },
    {
      path: '/level-select',
      name: 'level-select',
      component: require('@/components/LevelSelect').default
    },
    {
      path: '/Game/:level/:playAnim',
      name: 'Game',
      component: require('@/components/Game').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
