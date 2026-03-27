<template>
    <q-page class="app row" padding>
        <div class="col">
            <div class="q-ml-sm row items-center">
                <div class="q-mr-md">
                    <q-btn color="negative" :to="{ name: 'exercise', params: { id: workoutId } }">Cancelar</q-btn>
                </div>
                <div>
                    <h4>Registrar treino</h4>
                </div>
            </div>
            <q-scroll-area v-if="!$q.screen.lt.md" style="height: 500px; width: 100%;">
                <div class="row no-wrap q-gutter-md">
                    <div v-for="exercise in exercises" :key="exercise.id" class="q-ma-md register-exercise-card">
                        <div>
                            <h6 class="q-px-xs q-my-sm q-ml-sm ex-name">{{ exercise.name }}</h6>
                        </div>
                        <div class="q-ma-md column set" v-for="set in sets[exercise.id]" :key="set.set">
                            <h6 class="q-ma-md text-white" >{{set.set}}° Set</h6>
                            <div class="row">
                                <div class="q-ma-sm col">
                                    <q-input square outlined placeholder="Repetições" v-model.number="set.reps"/>
                                </div>
                                <div class="q-ma-sm col">
                                    <q-input square outlined placeholder="Peso" v-model.number="set.peso" suffix="Kg"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-scroll-area>
            <div v-else class="column items-center q-gutter-md">
                <div v-for="exercise in exercises" :key="exercise.id" class="q-ma-md register-exercise-card">
                    <div>
                        <h6 class="q-px-xs q-my-sm q-ml-sm ex-name">{{ exercise.name }}</h6>
                    </div>
                    <div class="q-ma-md column set" v-for="set in sets[exercise.id]" :key="set.set">
                        <h6 class="q-ma-md text-white" >{{set.set}}° Set</h6>
                        <div class="row">
                            <div class="q-ma-sm col">
                                <q-input square outlined placeholder="Repetições" v-model.number="set.reps"/>
                            </div>
                            <div class="q-ma-sm col">
                                <q-input square outlined placeholder="Peso" v-model.number="set.peso" suffix="Kg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <q-btn color="primary" @click="registerWorkout">Salvar</q-btn>
        </div>
    </q-page>
</template>

<script>
import { getWorkoutById } from '../scripts/workout.ts';
import { getExercisesById } from 'src/scripts/exercise.ts';
import { createDoneWorkout } from 'src/scripts/doneWorkout.ts';
import { createDoneExercise } from 'src/scripts/doneExercise.ts';
import { createSet } from 'src/scripts/set.ts';

export default {
    data(){
        return{
            exercises : [],
            workoutName : "",
            sets : {}
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
        this.workout = workouts[0];
        if (this.workout) {
            this.workoutName = this.workout.name;
        }

        this.exercises.forEach(exercise => {
            let x = 0 

            this.sets[exercise.id] = []

            while(x < exercise.sets){
                this.sets[exercise.id].push({
                    set : x+1,
                    reps : "",
                    peso : ""
                });
                x += 1;
            }
        });
    },
    methods: {
        async registerWorkout(){
            if(!this.dontHasBlankInputs()){
                const doneWorkout = await createDoneWorkout(this.workoutId);
                for (const exercise of this.exercises) {
                
                const doneExercise = await createDoneExercise(
                    exercise.id,
                    doneWorkout.id,
                    exercise.name
                );

                for(const set of this.sets[exercise.id]){
                        await createSet(Number(set.reps), Number(set.peso), doneExercise.id);
                        
                    }
                }

                this.$router.push('/');
            }
        },
        dontHasBlankInputs(){
            for (const exercise of this.exercises) {
                for (const set of this.sets[exercise.id]) {
                    if (Number.isInteger(set.reps) && Number.isInteger(set.peso)) {
                        return false;
                    }
                }
            }
            return true; 
        }
    }
};
</script>

<style>
.btn{
    border-radius: 5px;
    font-size: medium;
}

.ex-name{
    background-color: #26a69981;
    color: white;
    border-radius: 4px;
    width: fit-content;
    text-align: center;
}

.register-exercise-card {
    background: #f5f5f5;
    width: 100%;
    max-width: 300px;
    flex-shrink: 0;
    border-radius: 4px;
    text-align: left;
}

.set{
    width: fit-content;
    border-radius: 4px;
    background-color: #26a69981;
}

</style>