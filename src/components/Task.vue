<template>
  <div class="col-md-3 flex-container" v-for="(task,index) in taskName" :key="index">
    <ul class="list-group">
      <li :id="task" class="list-group-item text-center">{{ task }}</li>
      <TaskComponent :kanban="kanban" :task="task"></TaskComponent>
      <div v-for="(one, index) in kanban" :key="index">
        <div v-if="one.status == task">
          <li class="list-group-item">
            <h6>Title:</h6>
            <p>{{ one.title }}</p>
            <h6>Assigned To: {{ one.assignedTo }}</h6>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#detailTask">Detail</button>
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
                        <p>{{ one.title }}</p>
                      </div>
                      <div class="form-group">
                        <label for="inputDescription">Description</label>
                        <p>{{ one.desc }}</p>
                      </div>
                      <div class="form-group">
                        <label for="assignedTo">Assigned To</label>
                        <p>{{ one.assignedTo }}</p>
                      </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
              </div>
            </div>
          </li>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'task',
  data () {

  }
  props: ['kanban']
}
</script>

<style lang="css">
</style>
