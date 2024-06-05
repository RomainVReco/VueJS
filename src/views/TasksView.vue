<script setup lang="ts">
import tasksService, { Task } from '../services/tasks'
import { ref } from 'vue';

const letters = ref<string>("")
const tasks = ref<Task[]>([])
tasks.value = tasksService.read()
let tasksFiltered = ref<Task[]>([])
filter()
function filter() {
    console.log(letters.value)
    if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value
    } else {
        tasksFiltered.value = tasks.value.filter(task =>
            task.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase()))
    }
}

</script>

<template>
    <div v-if="tasks.length > 0">
        <input type="text" placeholder="filtrer" v-model="letters" @keyup="filter">
        <div class="task" v-for="task in tasksFiltered" :key="task.id">
            <h3>{{ task.name }}</h3>
            <p>{{ task.description }}</p>
            <p>Echéance : {{ tasksService.convertCase(task.temporality) }}</p>
        </div>
    </div>
    <div v-else>
        <h3>Aucune tâche n'a été trouvée</h3>
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