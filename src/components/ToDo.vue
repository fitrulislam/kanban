<template>
  <ul class="list-group">
    <li class="list-group-item active text-center">To Do</li>
    <div v-for="task in todo" v-bind:key="task['.key']">
      <div v-if="task.status == 'todo'">
          <li class="list-group-item">
            <h6>Title:</h6>
            <p>{{ task.title }}</p>
            <h6>Description:</h6>
            <p>{{ task.desc }}</p>
            <h6>Assigned To: {{ task.assignedTo }}</h6>
            <button class="btn btn-sm" @click="editStatusToBackLog(task)"><< Back Log</button><br><br>
            <button class="btn btn-sm" @click="editStatusToDoing(task)">Doing >></button><br><br>
            <button class="btn btn-sm btn-danger" @click="removeTask(task['.key'])">Remove</button>
          </li>
      </div>
    </div>
  </ul>
</template>

<script>

export default {
  name: 'todo',
  props: ['todo', 'value'],
  methods: {
    editStatusToBackLog (task) {
      this.$store.dispatch('editStatusToBackLog', task)
    },
    editStatusToDoing (task) {
      this.$store.dispatch('editStatusToDoing', task)
    },
    removeTask (key) {
      this.$store.dispatch('removeTask', key)
    }
  }
}

</script>
