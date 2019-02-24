<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <!-- Only show previous page link if not on the first page -->
    <template v-if="isFirstPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev</router-link
      >
    </template>
    <template v-if="isFirstPage && isLastPage"
      >&nbsp;|&nbsp;</template
    >
    <template v-if="isLastPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/store'

// Moved the current page & action call outside the component
function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      // current page gets passed in as a prop
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // Before we enter the route
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    // Before we update the route
    getPageEvents(routeTo, next)
  },

  // mapState acts as a getter for Vuex State objects
  // It requires an array of Vuex State objects to get
  // Example: mapState(['events'])
  // Or Alternate Key value mapping for each required Vuex State objects
  // Example: mapState({event: state => state.event.event})
  computed: {
    isFirstPage() {
      return this.page != 1 || false
    },
    isLastPage() {
      return this.event.totalEvents > this.event.pageLimit * this.page
    },
    ...mapState(['event', 'user'])
  }
}
</script>
