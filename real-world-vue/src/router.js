import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true // We'll set the page parameter, so we want to send it in as a prop
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true, // Set params to props
      // Calling Order #2
      // Per-Route Guard
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
          routeTo.params.event = event // <--- Set the event we retrieved
          next()
        })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    }
  ]
})

// Calling Order #1
// Global Routing Guard
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

// Calling Order #4
// Global Routing Guard
router.afterEach(() => {
  NProgress.done()
})

export default router
