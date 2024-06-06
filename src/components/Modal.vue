<template>
    <div>
        <div class="modal-background">
            <div class="modal">
                <h3>Modifier une tâche</h3>
                <form @submit.prevent="updateTask">
                    <input type="text" v-model="taskEdit.name" placeholder="Nom de la tâche" /><br>
                    <textarea cols="30" rows="10" v-model="taskEdit.description"></textarea>
                    <select v-model="taskEdit.temporality">
                        <option v-for="tempo in temporalityTypes" :value="tempo.value" :key="tempo.id"
                            :selected="tempo.value === taskEdit.temporality">{{ tempo.name }}
                        </option>
                    </select><br>
                    <button :disabled="!isFormValid">Sauvegarder</button>
                    <button @click="cancel">Annuler</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';
import { Task } from '../services/tasks'

const props = defineProps<Task>()
const emits = defineEmits(['updatedTask', 'cancel'])

let taskEdit = ref<Task>({ ...props })

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

let temporality = ref<string>("")

function updateTask() {
    const taskUpdated = {
        id: taskEdit.value.id,
        name: taskEdit.value.name,
        description: taskEdit.value.description,
        temporality: taskEdit.value.temporality
    }
    console.log('taskUpdated', taskUpdated)
    emits('updatedTask', taskUpdated)
}

function cancel() {
    emits('cancel')
}

const isFormValid = computed(() => {
    if (taskEdit.value.name !== "" && taskEdit.value.description !== "" && taskEdit.value.temporality !== "") return true;
    else false
})

</script>

<style scoped>
.modal-background {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    display: table;
    transition: opacity 0.3s ease;
}

.modal {
    border: 4px solid #42b983;
    background-color: #fff;
    padding-bottom: 22px;
    margin: 30px;

}
</style>