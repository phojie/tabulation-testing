<template>
  <q-page>
    <section
      class="bg-primary"
      style="height:350px"
    >
      <div class="q-mx-md-xl q-mx-xs-none q-pa-md-xl q-pa-xs-md">
        <div class="q-mt-xl text-h5 text-white text-weight-bold ellipsis">
          Ckcm Events
          <q-badge
            outline
            align="top"
            color="blue-grey-1"
          >Beta Mode</q-badge>
        </div>
        <listofEvents />
        <q-inner-loading :showing="showing">
          <q-spinner-pie
            size="50px"
            color="primary"
          />
        </q-inner-loading>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  components: {
    listofEvents: require('components/listofEvents.vue').default
  },
  computed: {
    showing () {
      return this.$store.state.auth.loading
    }
  },
  created () {
    this.$store.commit('auth/loading', true)
    this.$store.dispatch('event/getEventAction').then(() => {
      this.$store.commit('auth/loading', false)
    })
  }

}
</script>

<style lang="scss" scoped>
</style>
