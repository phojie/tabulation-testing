import Vuelidate from "vuelidate";
import randomize from "randomatic";
import Vue from "vue";

Vue.prototype.$randomize = randomize;

export default ({ Vue }) => {
  Vue.use(Vuelidate);
};
