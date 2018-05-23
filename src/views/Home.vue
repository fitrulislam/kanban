<template>
<div class="container">
  <div class="input">
    <div class="d-flex justify-content-between">
      <h3>Our Kanban</h3>
      <button type="button" class="btn btn-md btn-primary" data-toggle="modal" data-target="#taskModal">
        Add Task
      </button>
    </div>
    <div class="modal fade" id="taskModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="inputTitle">Title</label>
              <input type="text" class="form-control" placeholder="Task Title" v-model="title">
            </div>
            <div class="form-group">
              <label for="inputDescription">Description</label>
              <textarea type="textarea" class="form-control" placeholder="Task Description" v-model="desc"></textarea>
            </div>
            <div class="form-group">
              <label for="assignedTo">Point</label>
              <input type="text" class="form-control" placeholder="Point" v-model="point">
            </div>
            <div class="form-group">
              <label for="assignedTo">Assigned To</label>
              <input type="text" class="form-control" placeholder="Assigned To" v-model="assignedTo">
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="submitTask()" data-dismiss="modal">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="content" class="row">
    <div class="modal fade" id="detailTask">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detail Task</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="inputTitle">Title</label>
              <p>{{ detailTitle }}</p>
            </div>
            <div class="form-group">
              <label for="inputDescription">Description</label>
              <p>{{ detailDesc }}</p>
            </div>
            <div class="form-group">
              <label for="assignedTo">Point</label>
              <p>{{ detailPoint }}</p>
            </div>
            <div class="form-group">
              <label for="assignedTo">Assigned To</label>
              <p>{{ detailAssigned }}</p>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-sm btn-danger" @click="removeTask" data-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 flex-container" v-for="(task,index) in taskName" :key="index">
      <ul class="list-group">
        <li :id="task" class="list-group-item text-center">{{ task }}</li>
        <div v-for="(one, index) in kanban" :key="index">
          <div v-if="one.status == task">
            <li class="list-group-item">
              <div>
                <h6>Title:</h6>
                <p>{{ one.title }}</p>
                <h6>Point: {{ one.point }}</h6>
                <h6>Assigned To: {{ one.assignedTo }}</h6>
                <button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#detailTask" @click="addData(one['.key'])">Detail</button>
                <!-- <a href="#" style="color: red !important;" @click="removeTask(one['.key'])">Delete</a> -->
              </div>
              <div v-if="one.status == 'Back-Log'">
                <div class="d-flex justify-content-between align-items-center">
                  <button type="button" class="btn btn-sm btn-warning" @click="editStatusToToDo(one)">To Do</button>
                </div>
              </div>
              <div v-if="one.status == 'To-Do'">
                <div class="d-flex justify-content-between align-items-center">
                  <button type="button" class="btn btn-sm btn-danger" name="button" @click="editStatusToBackLog(one)">Back Log</button>
                  <button type="button" class="btn btn-sm btn-success" name="button" @click="editStatusToDoing(one)">Doing</button>
                </div>
              </div>
              <div v-if="one.status == 'Doing'">
                <div class="d-flex justify-content-between align-items-center">
                  <button type="button" class="btn btn-sm btn-warning" name="button" @click="editStatusToToDo(one)">To Do</button>
                  <button type="button" class="btn btn-sm btn-primary" name="button" @click="editStatusToDone(one)">Done</button>
                </div>
              </div>
              <div v-if="one.status == 'Done'">
                <div class="d-flex justify-content-between align-items-center">
                  <button type="button" class="btn btn-sm btn-success" name="button" @click="editStatusToDoing(one)">Doing</button>
                </div>
              </div>
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {
  kanbanRef,
  db
} from '@/assets/js/firebase.js'

export default {
  name: 'home',
  data () {
    return {
      taskName: ['Back-Log', 'To-Do', 'Doing', 'Done'],
      title: '',
      desc: '',
      assignedTo: '',
      point: '',
      detailTitle: '',
      detailDesc: '',
      detailAssigned: '',
      detailPoint: '',
      detailKey: ''
    }
  },
  firebase: {
    kanban: kanbanRef
  },
  methods: {
    addData (key) {
      db.ref(`/kanban/${key}`).on('value', (snapshot) => {
        let task = snapshot.val()
        this.detailKey = key
        this.detailTitle = task.title
        this.detailDesc = task.desc
        this.detailAssigned = task.assignedTo
        this.detailPoint = task.point
      })
    },
    submitTask () {
      kanbanRef.push({
        title: this.title,
        desc: this.desc,
        assignedTo: this.assignedTo,
        point: this.point,
        status: 'Back-Log'
      })
      this.title = ''
      this.desc = ''
      this.assignedTo = ''
    },
    removeTask () {
      kanbanRef.child(this.detailKey).remove()
    },
    editStatusToToDo (task) {
      let key = task['.key']
      kanbanRef.child(key).update({
        status: 'To-Do'
      })
    },
    editStatusToDoing (task) {
      let key = task['.key']
      kanbanRef.child(key).update({
        status: 'Doing'
      })
    },
    editStatusToDone (task) {
      let key = task['.key']
      kanbanRef.child(key).update({
        status: 'Done'
      })
    },
    editStatusToBackLog (task) {
      let key = task['.key']
      kanbanRef.child(key).update({
        status: 'Back-Log'
      })
    }
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
  #Back-Log {
    background-color: #DC143C;
    color: white;
  }
  #To-Do {
    background-color: #FFD700;
    color: black;
  }
  #Doing {
    background-color: #228B22;
    color: white;
  }
  #Done {
    background-color: blue;
    color: white;
  }
</style>
