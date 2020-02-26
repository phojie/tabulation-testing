import vue from 'vue'
export function contestantActionMutation (state, payload) {
  vue.set(state.listofContestants, payload.keyIndex, payload)
}
