<template>
  <q-card style="width: 750px; max-width: 750px;" class="scrollbar-secondary q-pa-sm">
    <q-card-section class>
      <div class="row q-px-none">
        <div class="col-md-6 col-xs-12">
          <q-toolbar-title class="text-h5 text-capitalize text-weight-medium">
            <slot name="dialogTitle" />contestant
          </q-toolbar-title>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            no-caps
            active-color="primary"
            active-bg-color="white"
            align="right"
            narrow-indicator
          >
            <q-tab name="male" label="Male" />
            <q-tab name="female" label="Female" />
            <slot name="closeBtn"></slot>
          </q-tabs>
        </div>
        <q-linear-progress :indeterminate="loading" class="q-mt-md" color="indigo-4" :value="100" />
        <div class="col-md-12 col-xs-12">
          <q-input
            @input="setCandidatesRepresent($event)"
            autofocus
            :value="candidatesData.candidatesRepresent"
            label="Candidates representing name"
            :error="validations.candidatesRepresent.$error"
          >
            <template
              v-slot:error
              v-if="!validations.candidatesRepresent.required"
            >Reprensenting name is required</template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-tab-panels animated keep-alive v-model="tab">
        <!-- MALE FOORRRRRRRRRRMMMMMMMMMMMMMMM -->

        <q-tab-panel name="male">
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <q-uploader
                label="Male Contestant image"
                flat
                hide-upload-btn
                bordered
                class="full-width fit"
                accept="image/*"
                v-on:added="$emit('addMalePicture', $event)"
              >
                <template v-slot:list>
                  <img
                    style="height:100%; width:100%"
                    :src="candidatesData.male.profileimg.__img['src']"
                    alt
                  />
                </template>
              </q-uploader>
            </div>
            <div class="col-md-6 col-xs-12 q-col-gutter-y-md">
              <div class="col-md-12">
                <label class="text-grey">Full name</label>
                <q-input
                  autofocus
                  @input="setMaleFullname($event)"
                  :value="candidatesData.male.fullname"
                  class="q-mt-sm"
                  outlined
                  dense
                  :error="validations.male.fullname.$error"
                >
                  <template
                    v-slot:error
                    v-if="!validations.male.fullname.required"
                  >Fullname of the candidate is required</template>
                </q-input>
              </div>
              <div class="col-md-12">
                <label class="text-grey">Year level</label>
                <q-input
                  class="q-mt-sm"
                  @input="setMaleYearlevel($event)"
                  :value="candidatesData.male.yearlevel"
                  outlined
                  dense
                  :error="validations.male.yearlevel.$error"
                >
                  <template
                    v-slot:error
                    v-if="!validations.male.yearlevel.required"
                  >Year level of the candidate is required</template>
                </q-input>
              </div>
              <div class="col-md-12">
                <label class="text-grey">Age</label>
                <q-input
                  class="q-mt-sm"
                  @input="setMaleAge($event)"
                  :value="candidatesData.male.age"
                  outlined
                  dense
                  :error="validations.male.age.$error"
                >
                  <template
                    v-slot:error
                    v-if="!validations.male.age.required"
                  >Age of the candidate is required</template>
                  <template
                    v-slot:error
                    v-else-if="!validations.male.age.numeric"
                  >Invalid age! Tarunga na dra</template>
                </q-input>
              </div>
              <div class="col-md-12">
                <label class="text-grey">Quotes</label>
                <q-input
                  autogrow
                  class="q-mt-sm"
                  @input="setMaleQuotes($event)"
                  :value="candidatesData.male.quotes"
                  outlined
                  dense
                ></q-input>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <!-- FEMALEEEEEEEEEEEEE FORM -->
        <q-tab-panel name="female">
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <q-uploader
                label="Female Contestant image"
                flat
                hide-upload-btn
                bordered
                class="full-width fit"
                v-on:added="$emit('addFemalePicture', $event)"
              >
                <template v-slot:list>
                  <img
                    style="height:100%; width:100%"
                    :src="candidatesData.female.profileimg.__img['src']"
                    alt
                  />
                </template>
              </q-uploader>
            </div>
            <div class="col-md-6 col-xs-12 q-col-gutter-y-md">
              <div class="col-md-12">
                <label class="text-grey">Full name</label>
                <q-input
                  autofocus
                  @input="setFemaleFullname($event)"
                  :value="candidatesData.female.fullname"
                  class="q-mt-sm"
                  outlined
                  dense
                  :error="validations.female.fullname.$error"
                >
                  <template
                    v-slot:error
                    v-if="!validations.female.fullname.required"
                  >Fullname of the candidate is required</template>
                </q-input>
              </div>
              <div class="col-md-12">
                <label class="text-grey">Year level</label>
                <q-input
                  class="q-mt-sm"
                  @input="setFemaleYearlevel($event)"
                  :value="candidatesData.female.yearlevel"
                  outlined
                  dense
                  :error="validations.female.yearlevel.$error"
                >
                  <template
                    v-slot:error
                    v-if="!validations.female.yearlevel.required"
                  >Yearlevel of the candidate is required</template>
                </q-input>
              </div>
              <div class="col-md-12">
                <label class="text-grey">Age</label>
                <q-input
                  class="q-mt-sm"
                  @input="setFemaleAge($event)"
                  :value="candidatesData.female.age"
                  outlined
                  dense
                  :error="validations.female.age.$error"
                >
                  <template
                    v-slot:error
                    v-if="!validations.female.age.required"
                  >Age of the candidate is required</template>
                  <template
                    v-slot:error
                    v-else-if="!validations.female.age.numeric"
                  >Invalid age! Tarunga na dra</template>
                </q-input>
              </div>
              <div class="col-md-12">
                <label class="text-grey">Quotes</label>
                <q-input
                  autogrow
                  class="q-mt-sm"
                  @input="setFemaleQuotes($event)"
                  :value="candidatesData.female.quotes"
                  outlined
                  dense
                ></q-input>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <q-card-actions class="q-pa-md" align="right">
      <slot name="createBtn"></slot>
    </q-card-actions>

    <q-inner-loading :showing="loading">
      <q-spinner-pie size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
export default {
  props: ["candidatesData", "validations"],
  computed: {
    loading() {
      return this.$store.state.contestant.loading;
    }
  },
  data() {
    return {
      tab: "female"
    };
  },
  methods: {
    setFemaleFullname(data) {
      this.$emit("update:femaleFullname", data);
      this.validations.female.fullname.$touch();
    },
    setFemaleYearlevel(data) {
      this.$emit("update:femaleYearlevel", data);
      this.validations.female.yearlevel.$touch();
    },
    setFemaleAge(data) {
      this.$emit("update:femaleAge", data);
      this.validations.female.age.$touch();
    },
    setFemaleQuotes(data) {
      this.$emit("update:femaleQuotes", data);
    },
    setMaleFullname(data) {
      this.$emit("update:maleFullname", data);
      this.validations.male.fullname.$touch();
    },
    setMaleYearlevel(data) {
      this.$emit("update:maleYearlevel", data);
      this.validations.male.yearlevel.$touch();
    },
    setMaleAge(data) {
      this.$emit("update:maleAge", data);
      this.validations.male.age.$touch();
    },
    setMaleQuotes(data) {
      this.$emit("update:maleQuotes", data);
    },
    setCandidatesRepresent(data) {
      this.$emit("update:candidatesRepresent", data);
      this.validations.candidatesRepresent.$touch();
    }
  }
};
</script>
