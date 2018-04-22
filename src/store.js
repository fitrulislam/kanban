import Vue from 'vue'
import Vuex from 'vuex'
import { kanbanRef } from '@/assets/js/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    removeTask (state, payload) {
      kanbanRef.child(payload).remove()
    },
    editStatusToDoing (state, payload) {
      let key = payload['.key']
      kanbanRef.child(key).update({
        status: 'doing'
      })
    },
    editStatusToDone (state, payload) {
      let key = payload['.key']
      kanbanRef.child(key).update({
        status: 'done'
      })
    },
    editStatusToToDo (state, payload) {
      let key = payload['.key']
      kanbanRef.child(key).update({
        status: 'todo'
      })
    },
    editStatusToBackLog (state, payload) {
      let key = payload['.key']
      kanbanRef.child(key).update({
        status: 'backlog'
      })
    }
  },
  actions: {
    removeTask ({ commit }, payload) {
      commit('removeTask', payload)
    },
    editStatusToDoing ({ commit }, payload) {
      commit('editStatusToDoing', payload)
    },
    editStatusToDone ({ commit }, payload) {
      commit('editStatusToDone', payload)
    },
    editStatusToToDo ({ commit }, payload) {
      commit('editStatusToToDo', payload)
    },
    editStatusToBackLog ({ commit }, payload) {
      commit('editStatusToBackLog', payload)
    }
  }
})
