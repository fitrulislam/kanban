<template>
  <ul class="list-group">
    <li class="list-group-item active text-center">Back Log</li>
    <div v-for="task in backlog" v-bind:key="task['.key']">
      <div v-if="task.status == 'backlog'">
          <li class="list-group-item">
            <h6>Title:</h6>
            <p>{{ task.title }}</p>
            <h6>Description:</h6>
            <p>{{ task.desc }}</p>
            <h6>Assigned To: {{ task.assignedTo }}</h6>
            <button class="btn btn-sm" @click="editStatusToToDo(task)">ToDo >></button><br><br>
            <button class="btn btn-sm btn-danger" @click="removeTask(task['.key'])">Remove</button>
          </li>
      </div>
    </div>
  </ul>
</template>

<script>

export default {
  name: 'backlog',
  props: ['backlog', 'value'],
  methods: {
    editStatusToToDo (task) {
      this.$store.dispatch('editStatusToToDo', task)
    },
    removeTask (key) {
      this.$store.dispatch('removeTask', key)
    }
  }
}

</script>
