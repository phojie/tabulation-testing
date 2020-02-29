<template>
  <q-card class="q-pa-md shadow-2" bordered>
    <q-toolbar>
      <q-toolbar-title class="text-body1 text-weight-bold text-indigo">Judge 1</q-toolbar-title>
      <div>
        <q-input :type="isPwd ? 'password' : 'text'" value="P6F88GRT6N">
          <template v-slot:prepend>
            <q-icon
              :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
          <template v-slot:append>
            <q-icon class="cursor-pointer" @click="copThis" name="las la-copy" />
          </template>
        </q-input>
      </div>
    </q-toolbar>
    <q-card-section class="q-pt-none">
      <div class="text-caption text-indigo-4">Mr. Renyl Phojie Briones Rengel</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true
    };
  },
  methods: {
    copThis() {
      alert("copied");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>