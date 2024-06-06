<script setup lang="ts">
import Modal from '../components/Modal.vue';
import tasksService, { Task } from '../services/tasks'
import { ref, watch } from 'vue';

const letters = ref<string>("")
const tasks = ref<Task[]>([])
tasks.value = tasksService.read()
let tasksFiltered = ref<Task[]>([])
const selectedTemporality = ref<string>("")
filter()
function filter() {
    console.log(letters.value)
    if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value
    } else {
        tasksFiltered.value = tasks.value.filter(task =>
            task.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase()))
    }
    console.log(selectedTemporality)
    if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(task =>
            task.temporality === selectedTemporality.value
        )
    }
}

watch(selectedTemporality, (newValue, oldValue) => {
    console.log("newValue : ", newValue, " | ", "oldValue : ", oldValue)
    filter()
})

function toggle(task: Task) {
    taskToEdit.value = task
    console.log('taskToEdit.value : ', taskToEdit.value)
    isInEditMode.value = true
}

function updatedTask(task: Task) {
    console.log("updatedTask", task)
    isInEditMode.value = false
}

function deleteTask(id: number) {
    tasksService.deleteTask(id)
    tasks.value = tasksService.read()
    filter()
}

function cancelEdit() {
    isInEditMode.value = false
    taskToEdit.value = null
}

let taskToEdit = ref<Task>(null)
let isInEditMode = ref<boolean>(false)

</script>

<template>
    <Modal v-if="isInEditMode" :task="taskToEdit" @updatedtask="updatedTask($event)" @cancel="cancelEdit" />
    <div v-if="tasks.length > 0">
        <input type="text" placeholder="filtrer" v-model="letters" @keyup="filter">
        <div class="radio-filters">
            <label for="all">
                <input type="radio" id="all" value="" v-model="selectedTemporality" /> Toutes
            </label>
            <label for="short-term">
                <input type="radio" id="short-term" value="short-term" v-model="selectedTemporality" /> Court terme
            </label>
            <label for="medium-term">
                <input type="radio" id="medium-term" value="medium-term" v-model="selectedTemporality" /> Moyen terme
            </label>
            <label for="long-term">
                <input type="radio" id="long-term" value="long-term" v-model="selectedTemporality" /> Long terme
            </label>
        </div>
        <div class="task" v-for="task in tasksFiltered" :key="task.id">
            <h3>{{ task.name }}</h3>
            <p>{{ task.description }}</p>
            <p>Echéance : {{ tasksService.convertCase(task.temporality) }}</p>
            <div>
                <button class="small" @click="() => deleteTask(task.id)">Suppr</button>
                <button class="small" @click="() => toggle(task)">Edit</button>
            </div>
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

.radio-filters {
    display: flex;
    justify-content: space-evenly;
}

.small {
    width: 45px;
}
</style>