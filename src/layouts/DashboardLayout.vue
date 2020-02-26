<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar class="q-px-md-lg ">
        <q-toolbar-title class="text-weight-bolder">
          <q-avatar size="35px">
            <img src="/statics/jieIcons/apple-touch-icon-180x180.png">
          </q-avatar>
          Tabulation System
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn
          round
          flat
          size="md"
          class="q-mr-md-sm"
        >
          <q-badge
            class="q-mt-sm"
            color="red"
            floating
          >1</q-badge>

          <q-icon name="notifications"></q-icon>
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            content-style="background-color:#000000ab"
            :offset="[8,8]"
          >
            <strong>Notifications</strong>
          </q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          size="md"
          color="deep-purple-10"
        >
          <q-avatar
            class="text-bold"
            size="md"
            color="deep-purple-7"
            text-color="white"
          >
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>

          <q-menu
            transition-show="jump-down"
            transition-hide="flip-up"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <!-- <q-toggle
                  value="false"
                  label="Use Mobile Data"
                />
                <q-toggle
                  value="true"
                  label="Bluetooth"
                /> -->
              </div>

              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">System Administrator</div>
                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  @click="signOut"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>
