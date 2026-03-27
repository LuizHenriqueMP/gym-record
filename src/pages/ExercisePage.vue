<template>
    <q-page class="app row" padding>
        <div class="col-12 col-md">
            <div class="row items-center q-mb-md">
                <q-btn class="q-mr-xl" color="secondary" to="/">Voltar</q-btn>
                <h4 class="text-weight-bold text-secondary">{{ workoutName }}</h4>
            </div>
            <div class="row">
                <div class="col-12 col">
                    <h5 class="q-pl-md">Exercícios</h5>
                    <div v-for="exercise in exercises" :key="exercise.id" class="exercise-item q-pa-md q-mb-md">
                        <h5 class="exercise-title">{{ exercise.name }}</h5>
                        <div class="row text-grey-7 q-mt-sm">
                            <p class="q-mr-md">Sets: <strong>{{ exercise.sets }}</strong></p>
                            <p class="q-mr-md">Min: {{ exercise.rep_min }}</p>
                            <p>Max: {{ exercise.rep_max }}</p>
                        </div>
                    </div>
                </div>
                <div class="q-mx-xl col col-md-4">
                    <h5>Treinos concluídos</h5>
                    <div v-for="(doneWorkout, index) in doneWorkouts" :key="doneWorkout.id || index" class="done-card q-pa-sm q-mb-sm">
                        <div class="row items-center justify-between">
                            <span class="text-weight-medium">{{ index + 1 }}° treino</span>
                            <q-btn flat dense color="primary" :to="{ name: 'doneworkout', params: { id: doneWorkout.id } }">Ver</q-btn>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="col col-md-3 column q-pa-md actions">
            <q-btn color="primary" class="btn full-widht" :to="{ name: 'registerworkout', params: { id: workoutId } }">Registrar treino</q-btn>
            <q-btn color="secondary" :to="{ name: 'editworkout', params: { id: workoutId } }" class="btn full-widht">Editar treino</q-btn>
            <q-btn class="btn full-widht" color="negative" @click="deleteWorkoutById">Excluir treino</q-btn>
        </div>
    </q-page>
</template>

<script>
import { deleteWorkout, getWorkoutById } from '../scripts/workout.ts';
import { getExercisesById } from 'src/scripts/exercise.ts';
import { getDoneWorkoutsByWorkoutId } from 'src/scripts/doneWorkout.ts';

export default {
    data(){
        return{
            exercises : [],
            workoutName : "",
            doneWorkouts : []
        }
        
    },
    computed: {
        workoutId() {
            return Number(this.$route.params.id);
        }
    },
    async mounted(){
        this.exercises = await getExercisesById(this.workoutId);
        const workouts = await getWorkoutById(this.workoutId);
        this.doneWorkouts = await getDoneWorkoutsByWorkoutId(this.workoutId);
        this.workout = workouts[0];
        if (this.workout) {
            this.workoutName = this.workout.name;
        }
    },
    methods: {
        async deleteWorkoutById() {
            if (!this.workoutId) {
                return;
            }

            await deleteWorkout(this.workoutId);
            this.$router.push('/');
        }
        
    }
};
</script>

<style>
.btn{
    border-radius: 8px;
    margin: 8px 0;
    font-size: 14px;
}

.exercise-item{
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.exercise-title{
    font-weight: bold;
    color: #26a69a;
}

.done-card{
    background: #f5f5f5;
    border-radius: 8px;
    transition: 0.2s;
}

.done-card:hover{
    background: #e0f2f1;
    transform: translateY(-2px);
}

.actions{
    gap: 10px;
}
</style>