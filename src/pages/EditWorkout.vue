<template>
    <q-page class="app row" padding>
        <div class="col-12 col-md-5">
            <div class="row items-center">
                <q-btn color="secondary" :to="{ name: 'exercise', params: { id: workoutId } }">Voltar</q-btn>
                <h5 class="q-ml-md">Editar treino</h5>
            </div>
            <div>
                <div class="q-ma-md workout-info">
                    <q-input class="q-my-md" name="workoutName" v-model="workoutName" label="Nome do treino"/>
                    <q-select class="q-my-md" name="weekday" v-model="workoutDay" :options="options" label="Dia da semana" />
                    <q-btn color="secondary" @click="saveWorkout(workoutName, workoutDay)" class="q-my-md button">Salvar treino</q-btn>
                </div>
            </div>
        </div>
        <div class="ex-list">
            <div class="q-ma-sm title-list">
                <h5 class="q-ml-md">Lista de exercícios</h5>
            </div>
            <div style="display: flex; overflow-x: auto; overflow-y: hidden; gap: 16px;">
    
                <div v-for="(exercise, index) in exercises" :key="exercise.id || index" class="item-list column q-ma-md edit-exercise-card">
                    <div>
                        <h6 class="q-my-sm q-ml-md" >Exercício: {{ exercise.name }}</h6>
                    </div>
                    <div class="column justify-between">
                        <q-input class="q-ml-md q-my-xs" square outlined name="sets" v-model.number="exercise.sets" label="Sets"/>
                        <q-input class="q-ml-md q-my-xs" square outlined name="repMin" v-model.number="exercise.rep_min" label="Repetições mínimas"/>
                        <q-input class="q-ml-md q-my-xs" square outlined name="repMax" v-model.number="exercise.rep_max" label="Repetições máximas"/>
                    </div>
                    <div>
                        <q-btn class="q-ma-md" color="negative" @click="delExercise(exercise, index)" >Excluir exercício</q-btn>
                    </div>
                </div>
            </div>
            <div v-show="newExercise" class="item-list column q-ma-md">
                <div>
                    <q-input name="exerciseName" v-model="exerciseName" class="q-mx-md" label="Exercício"></q-input>
                </div>
                <div class="column q-ma-md">
                    
                    <q-input square outlined label="Sets" type="number" name="exerciseSets" v-model="exerciseSets" class="q-my-sm"></q-input>
                    <q-input square outlined label="Repetições mínimas" type="number" name="exerciseRepsMin" v-model="exerciseRepsMin" class="q-my-sm"></q-input>
                    <q-input square outlined label="Repetições máximas" type="number" name="exerciseRepsMax" v-model="exerciseRepsMax" class="q-my-sm"></q-input>
                    <q-btn @click="addExercise(exerciseName, exerciseSets, exerciseRepsMin, exerciseRepsMax)" class="button q-my-sm" style="background-color: white; color: #26a69a;">Criar</q-btn>
                </div>
            </div>
            <div v-if="newExercise">
                <q-btn @click="newExercise=!newExercise" color="negative" class="q-ml-md button">Cancelar</q-btn>
            </div>
            <div v-else>
                <q-btn @click="newExercise=!newExercise" color="secondary" class="q-ml-md button">Criar Exercício</q-btn>
            </div>
            
        </div>
    </q-page>
</template>

<script>
import { getWorkoutById, updateWorkout } from '../scripts/workout.ts';
import { getExercisesById, createExercise, updateExercises, deleteExercise } from 'src/scripts/exercise.ts';

export default {
    data(){
        return{
            exercises : [],
            exerciseName : "",
            exerciseRepsMin: "",
            exerciseRepsMax : "",
            exerciseSets : "",
            workoutDay : "",
            workoutName : "",
            options : ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            newExercise : false,
            workout : "",
            deletedExercises : []
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
            this.workoutDay = this.workout.day;
        }

    },
    methods: {
        async saveWorkout(){
            await updateWorkout(this.workoutName, this.workoutDay, this.workoutId);
            
            for (const exercise of this.exercises) {
                if (exercise.id) {
                    await updateExercises(
                        exercise.name, 
                        Number(exercise.sets), 
                        Number(exercise.rep_min), 
                        Number(exercise.rep_max), 
                        exercise.id_workout, 
                        exercise.id);
                } else {
                    await createExercise(exercise.name, exercise.sets, exercise.rep_min, exercise.rep_max, this.workoutId);
                }
            }
            for(const delExercise of this.deletedExercises){
                deleteExercise(delExercise.id);
            }

            this.$router.push('/exercisepage/'+this.workoutId);
        },
        addExercise(name, sets, repsMin, repsMax) {
            this.exercises.push({name : name, sets : Number(sets), rep_min: Number(repsMin), rep_max: Number(repsMax)}); 
            this.exerciseName=''; 
            this.exerciseRepsMin=''; 
            this.exerciseRepsMax=''; 
            this.exerciseSets=''; 
            this.newExercise=false;
        },
        async delExercise(exercise, index){
            this.deletedExercises.push(exercise);
            this.exercises.splice(index, 1);
        }
    }
};
</script>

<style>
.btn{
    border-radius: 5px;
    margin: 10px;
    font-size: medium;
}
.edit-exercise-card {
    min-width: 300px;
    flex-shrink: 0;
}

.ex-description{
    border: black solid 1px;
    border-radius: 4px;
    text-align: left;
}
.ex-list {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}
</style>