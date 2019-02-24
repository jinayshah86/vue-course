import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import NotFound from './components/NotFound.vue'
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
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event // <--- Set the event we retrieved
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              // Overriding default route by routing to NotFound
              next({
                name: '404',
                params: {
                  resource: 'event'
                }
              })
            } else {
              // Overriding default route by routing to NetworkIssue
              next({
                name: 'network-issue'
              })
            }
          })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
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
