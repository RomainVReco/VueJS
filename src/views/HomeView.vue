<script setup lang="ts">
import Form from '../components/Form.vue'
import tasksService, { Task } from '../services/tasks'


const addTask = (data: Task) => {
  let task: Task = {
    id: data.id,
    name: data.name,
    description: data.description,
    temporality: data.temporality
  }
  tasksService.create(task)
  console.log('Home view', data)
}
</script>

<template>
  <main>
    <Form @createtask="addTask" />
  </main>
</template>