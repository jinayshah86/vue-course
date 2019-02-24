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
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      pageLimit: 3
    }
  },
  created() {
    // Get list of Events from Vuex action
    this.$store.dispatch('event/fetchEvents', {
      pageLimit: this.pageLimit,
      page: this.page
    })
  },

  // mapState acts as a getter for Vuex State objects
  // It requires an array of Vuex State objects to get
  // Example: mapState(['events'])
  // Or Alternate Key value mapping for each required Vuex State objects
  // Example: mapState({event: state => state.event.event})
  computed: {
    page() {
      // Get page number from URL query VREyeParameter
      // https://localhost:8080/?page=2
      return parseInt(this.$route.query.page) || 1
    },
    isFirstPage() {
      return this.page != 1 || false
    },
    isLastPage() {
      return this.event.totalEvents > this.pageLimit * this.page
    },
    ...mapState(['event', 'user'])
  }
}
</script>
