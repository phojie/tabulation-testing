<template>
  <div class="col-12">
    <q-card class="q-pa-md shadow-1" bordered>
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-weight-bold">
          Judge {{myindex + 1}}
          <q-btn
            style="margin-top:-8px"
            icon="las la-exclamation-triangle"
            flat
            no-caps
            class="text-caption text-indigo-4"
            label="Regenerate"
          ></q-btn>
        </q-toolbar-title>
        <div>
          <div class="row q-col-gutter-md">
            <div style="margin-top:-1px">
              <q-btn
                dense
                class="text-indigo"
                flat
                :icon="isPwd ? 'las la-lock' : 'las la-unlock'"
                @click="isPwd = !isPwd"
                size="12px"
              />
            </div>

            <div class="q-mt-xs">
              <span style="font-size:14px;letter-spacing:2px" v-if="!isPwd">{{judgeInfo.passCode}}</span>
              <q-icon
                style="margin-top:-5px"
                v-else
                v-for="(n,index) in 6"
                :key="index"
                size="10px"
                name="fiber_manual_record"
              ></q-icon>
            </div>
            <div>
              <q-btn
                style="border-radius:2px !important"
                outline
                round
                color="primary"
                icon="las la-copy"
                @click="copThis"
                size="8px"
              />
            </div>
          </div>
        </div>
      </q-toolbar>
      <q-card-section class="q-pt-none row">
        <div class="text-capitalize">
          <q-chip
            class="q-py-md q-px-lg q-mx-none"
            size="15px"
            icon="person"
            square
            color="indigo-5"
            text-color="white"
          >{{judgeInfo.fullname}}</q-chip>
        </div>
        <q-space></q-space>
        <div class="text-caption">This key is used to access the judges application</div>
      </q-card-section>

      <q-card-actions align="right" class="q-py-none text-grey-9">
        <q-btn
          @click="$emit('deleteBtn',judgeInfo)"
          outline
          no-caps
          dense
          class="text-caption"
        >Delete</q-btn>
        <q-btn outline no-caps dense class="text-caption">Edit judge {{myindex+1}}</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["judgeInfo", "myindex"],
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