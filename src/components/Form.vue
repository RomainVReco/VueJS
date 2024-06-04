<template>
    <div>
        <h3>Créer une tâche</h3>
        <form>
            <input type="text" placeholder="Nom de la tâche"><br>
            <textarea cols="30" rows="10" placeholder="Description de la tâche"></textarea><br>
            <select v-model="temporality">
                <option value="">---</option>
                <option v-for="type in temporalityTypes" :key="type.id" :value="type.value">{{ type.name }}</option>
            </select><br>
            <button>Créer</button>

        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

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

    const createTask = () => {
        console.log("Task created : ", {
            name: name.value,
            description: description.value,
            temporality: temporality.value
        })
    }

</script>
<style scoped></style>