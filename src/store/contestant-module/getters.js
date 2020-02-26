import forEach from 'lodash/forEach'
import find from 'lodash/find'
import vue from 'vue'
export function listofAllCandidates (state) {
  const list = []
  forEach(state.listofContestants, function (value, key) {
    const id = find(list, 'representKeyIndex', value.representKeyIndex)
    if (!id) {
      vue.set(list, key, { representKeyIndex: value.representKeyIndex })
    }
  })
  console.log(list)
  return list
}
