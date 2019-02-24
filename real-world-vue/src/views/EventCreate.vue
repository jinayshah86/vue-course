<template>
  <div>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        class="field"
        type="text"
        placeholder="Add an event title"
      />
      <BaseInput
        label="Description"
        v-model="event.description"
        class="field"
        type="text"
        placeholder="Add a description"
      />
      <BaseInput
        label="Location"
        v-model="event.location"
        class="field"
        type="text"
        placeholder="Add a location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from '@codeanker/vuejs-datepicker'
import NProgress from 'nprogress' // <--- Include NProgress

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      // Call vuex store action
      NProgress.start() // <-- Start the progress bar
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          // Dispatchment Area
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          // Reset the Form here
          NProgress.done() // <-- if errors out stop the progress bar
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        descrpition: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
