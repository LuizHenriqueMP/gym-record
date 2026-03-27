<template>
    <q-page padding>
        <div v-for="workout in workouts" :key="workout.id" class=" q-pa-xs col workout-item">
            <div class="row justify-between">
                <h6 class="q-mx-xs q-my-sm q-px-sm workout-name">{{ workout.name }}</h6>
                <q-btn color="secondary" class="q-mx-xs q-my-sm" :to="{ name: 'exercise', params: { id: workout.id } }">Acessar Treino</q-btn>
            </div>
            <div class="q-mx-xs q-my-sm workout-description">
                <p class="q-ma-sm q-pa-sm" >Dia da semana: {{workout.day}}</p>
            </div>
        </div>
        <div class="q-mt-md">
            <q-btn to="/createworkoutpage" color="secondary">Criar Treino</q-btn>
        </div>
    </q-page>
</template>

<script>
import { getAllWorkouts } from '../scripts/workout.ts';

export default{
    data(){
        return{
            workouts : []
        }
    },
    async mounted(){
        this.workouts = await getAllWorkouts();
    }
}

</script>

<style>

.workout-item{
    color: white;
    background: #f5f5f5;
    border-radius: 4px;
}

.workout-name{
    background-color: #26a69981;
    border-radius: 4px;
    width: fit-content;
    text-align: center;
}

.workout-description{
    background-color: #26a69981;
    border-radius: 4px;
    text-align: left;
}
</style>