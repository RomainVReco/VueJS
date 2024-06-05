<script setup lang="ts">
import tasksService, { Task } from '../services/tasks'
import { ref } from 'vue';

const tasks = ref<Task[]>([])
tasks.value = tasksService.read()

</script>

<template>
    <div v-if="tasks.length > 0">
        <div class="task" v-for="task in tasks" :key="task.id">
            <h3>{{ task.name }}</h3>
            <p>{{ task.description }}</p>
            <p>Echéance : {{ tasksService.convertCase(task.temporality) }}</p>
        </div>
    </div>
</template>



<style scoped>
.task {
    margin: 10px 15px;
    border: 3px solid #42b983;
    border-radius: 0.5rem;
    padding-left: 2rem;
}
</style>