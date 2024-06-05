<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue'
import { Task } from '../services/tasks'

const name = ref<string>("")
const description = ref<string>("")
const temporality = ref<string>("")
const temporalityTypes = ref([
    {
        id: 1,
        name: "Court terme",
        value: "short-term"
    },
    {
        id: 2,
        name: "Moyen terme",
        value: "medium-term"
    },
    {
        id: 3,
        name: "Long terme",
        value: "long-term"
    }
])
let txtName = ref<string>("")

const emits = defineEmits(['createtask'])

const createTask = () => {
    const task: Task = {
        id: Date.now(),
        name: name.value,
        description: description.value,
        temporality: temporality.value
    }
    console.log("Task created : ", task)
    emits('createtask', task)
    resetForm()
}

const resetForm = () => {
    name.value = ""
    description.value = ""
    temporality.value = ""
}

onMounted(() => {
    console.log('onMounted | txtName : ', txtName.value)

})

</script>

<template>
    <div>
        <h3>Créer une tâche</h3>
        <form @submit.prevent="createTask">
            <input type="text" placeholder="Nom de la tâche" v-model="name" ref="txtName"><br>
            <textarea cols="30" rows="10" v-model="description" placeholder="Description de la tâche"></textarea><br>
            <select v-model="temporality">
                <option value="">---</option>
                <option v-for="type in temporalityTypes" v-bind:key="type.id" :value="type.value">{{ type.name }}
                </option>
            </select><br>
            <button type="submit">Créer</button>

        </form>
    </div>
</template>


<style scoped>
input,
textarea,
select,
button {
    width: 90%;
    margin: 5px 10px;
}
</style>