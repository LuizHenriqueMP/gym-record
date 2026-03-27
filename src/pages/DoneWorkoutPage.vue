<template>
    <q-page class="app row" padding>
        <div class="col">
            <div class="row no-wrap items-center q-mb-md q-ml-md">
                <div>
                    <q-btn class="q-mr-xl" color="negative" :to="{ name: 'exercise', params: { id: workoutId } }">Cancelar</q-btn>    
                </div>
                <div>
                    <h4 class="text-weight-bold text-secondary">Treino concluído</h4>
                </div>
            </div>
            <div>
                <q-scroll-area v-if="!$q.screen.lt.md" style="height: 420px; width: 100%; overflow-y: hidden;">
                    <div class="row no-wrap">
                        <div v-for="exercise in doneExercises" :key="exercise.id" class="done-exercise-card q-pa-md q-mx-sm">
                            <div>
                                <h6 class="q-px-xs q-my-sm q-ml-sm done-workout-name">{{ exercise.name }}</h6>
                            </div>
                            <div v-for="(set, index) in sets[exercise.id]" :key="set.id || index" class="done-set q-pa-sm q-mb-sm">
                                <div class="q-mb-sm column">
                                    <h6>{{index + 1}}° Set</h6>
                                    <div class="row justify-between">
                                        <span class="q-ma-xs" >Reps: <strong>{{ set.reps }}</strong></span>
                                        <span class="q-ma-xs" >Peso: {{ set.weight }} kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-scroll-area>
                <div v-else class="column items-center q-gutter-md">
                    <div v-for="exercise in doneExercises" :key="exercise.id" class="done-exercise-card q-pa-md q-mx-sm">
                        <div>
                            <h6 class="q-px-xs q-my-sm q-ml-sm done-workout-name">{{ exercise.name }}</h6>
                        </div>
                        <div v-for="(set, index) in sets[exercise.id]" :key="set.id || index" class="done-set q-pa-sm q-mb-sm">
                            <div class="q-mb-sm column">
                                <h6>{{index + 1}}° Set</h6>
                                <div class="row justify-between">
                                    <span class="q-ma-xs" >Reps: <strong>{{ set.reps }}</strong></span>
                                    <span class="q-ma-xs" >Peso: {{ set.weight }} kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { getSets } from 'src/scripts/set.ts';
import { getDoneExercises } from 'src/scripts/doneExercise.ts';
import { getDoneWorkoutsById } from 'src/scripts/doneWorkout.ts';

export default {
    data(){
        return{
            sets : {},
            doneExercises : [],
            workoutId : ""
        }
        
    },
    computed: {
        doneWorkoutId() {
            return Number(this.$route.params.id);
        }
    },
    async mounted(){
        const doneWorkout = await getDoneWorkoutsById(this.doneWorkoutId);
        const doneWorkoutId = doneWorkout.id;
        this.workoutId = doneWorkout.id_workout;
        this.doneExercises = await getDoneExercises(doneWorkoutId)
        for (const exercise of this.doneExercises) {
            const sets = await getSets(exercise.id);
            this.sets[exercise.id] = sets;
        }

        console.log(this.sets)
    }
};
</script>

<style>
.done-exercise-card {
    background: white;
    min-width: 260px;
    max-width: 300px;
    border-radius: 12px;
    text-align: left;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    flex-shrink: 0;
}

.done-workout-name {
    font-weight: bold;
    margin-bottom: 10px;
}

.done-set {
    background: #f5f5f5;
    border-radius: 8px;
    width: 100%;
}

h6 {
    margin: 0;
    font-weight: 500;
}
</style>