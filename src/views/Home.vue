<template>
<div class="container">
  <div class="input">
    <div class="d-flex justify-content-between">
      <h3>Kanban Cupu</h3>
      <button type="button" class="btn btn-md btn-primary" data-toggle="modal" data-target="#taskModal">
        Add Task
      </button>
    </div>
    <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body">
              <div class="form-group">
                <label for="inputTitle">Title</label>
                <input type="text" class="form-control" id="inputTitle" placeholder="Task Title" v-model="title">
              </div>
              <div class="form-group">
                <label for="inputDescription">Description</label>
                <textarea type="textarea" class="form-control" id="inputDescription" placeholder="Task Description" v-model="desc"></textarea>
              </div>
              <div class="form-group">
                <label for="assignedTo">Assigned To</label>
                <input type="text" class="form-control" id="assignedTo" placeholder="Assigned To" v-model="assignedTo">
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" @click="submitTask()" data-dismiss="modal">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div id="content" class="row">
    <div class="col-md-3 flex-container order-0">
      <BackLog :backlog="kanban"></BackLog>
    </div>
    <div class="col-md-3 flex-container order-1">
      <ToDo :todo="kanban"></ToDo>
    </div>
    <div class="col-md-3 flex-container order-2">
      <Doing :doing="kanban"></Doing>
    </div>
    <div class="col-md-3 flex-container order-3">
      <Done :done="kanban"></Done>
    </div>
  </div>
</div>
</template>

<script>
import {
  kanbanRef
} from '@/assets/js/firebase.js'
import BackLog from '@/components/BackLog.vue'
import ToDo from '@/components/ToDo.vue'
import Doing from '@/components/Doing.vue'
import Done from '@/components/Done.vue'

export default {
  name: 'home',
  data() {
    return {
      title: '',
      desc: '',
      assignedTo: ''
    }
  },
  firebase: {
    kanban: kanbanRef
  },
  components: {
    BackLog,
    ToDo,
    Doing,
    Done
  },
  methods: {
    submitTask() {
      kanbanRef.push({
        title: this.title,
        desc: this.desc,
        assignedTo: this.assignedTo,
        edit: false,
        status: 'backlog'
      })
      this.title = ''
      this.desc = ''
      this.assignedTo = ''
    }
    // removeTask(key) {
    //   kanbanRef.child(key).remove()
    // },
    // editStatusToDoing(task) {
    //   let key = task['.key']
    //   kanbanRef.child(key).update({
    //     status: 'doing'
    //   })
    // },
    // editStatusToDone(task) {
    //   let key = task['.key']
    //   kanbanRef.child(key).update({
    //     status: 'done'
    //   })
    // },
    // editStatusToToDo(task) {
    //   let key = task['.key']
    //   kanbanRef.child(key).update({
    //     status: 'todo'
    //   })
    // },
    // editStatusToBackLog(task) {
    //   let key = task['.key']
    //   kanbanRef.child(key).update({
    //     status: 'backlog'
    //   })
    // }
  }
}
</script>

<style scoped>
  h3 {
    font-family: roboto;
    font-weight: bold;
  }
  .d-flex {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
