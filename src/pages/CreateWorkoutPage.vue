<template>
    <q-page class="row q-col-gutter-md" padding>
        <div class="col-12 col-md-4">
            <q-card class="q-pa-md">
                <q-btn color="secondary" to="/">Voltar</q-btn>
                <h5 class="text-weight-bold q-mt-sm">Novo Treino</h5>
                <q-input class="q-my-md" v-model="workoutName" label="Nome do treino" outlined/>
                <q-select class="q-my-md" v-model="workoutDay" :options="options" label="Dia da semana" outlined/>
                <q-btn color="secondary" @click="saveWorkout" class="full-width q-mt-md">Salvar treino</q-btn>
            </q-card>
        </div>
        <div class="col-12 col-md">
            <q-card class="q-pa-md">
                <div class="q-ma-sm title-list">
                    <h5 class="text-weight-bold q-mb-md">Exercícios</h5>
                </div>
                <div 
                    v-for="(exercise, index) in exercises" 
                    :key="index" 
                    class="exercise-card q-pa-sm q-mb-sm"
                    >
                    <div class="row justify-between items-center">
                        <strong>{{ exercise.name }}</strong>

                        <q-btn 
                            flat 
                            dense 
                            color="negative" 
                            icon="delete"
                            @click="delExercise(exercise, index)"
                        />
                    </div>

                    <div class="row text-caption text-grey-7 q-mt-xs">
                        <span class="q-mr-md">Sets: {{ exercise.sets }}</span>
                        <span class="q-mr-md">Min: {{ exercise.repsMin }}</span>
                        <span>Max: {{ exercise.repsMax }}</span>
                    </div>
                </div>
                <div v-if="newExercise" class="q-mt-md">
                    <q-input v-model="exerciseName" label="Exercício" outlined />

                    <div class="row q-col-gutter-sm q-mt-sm">
                        <q-input v-model.number="exerciseSets" label="Sets" type="number" outlined />
                        <q-input v-model.number="exerciseRepsMin" label="Reps min" type="number" outlined />
                        <q-input v-model.number="exerciseRepsMax" label="Reps max" type="number" outlined />
                    </div>

                    <div class="row q-mt-md">
                        <q-btn 
                            color="primary" 
                            @click="addExercise(exerciseName, exerciseSets, exerciseRepsMin, exerciseRepsMax)" 
                            class="q-mr-sm"
                        >
                            Criar
                        </q-btn>

                        <q-btn flat color="negative" @click="newExercise=false">
                            Cancelar
                        </q-btn>
                    </div>
                </div>

                <div v-else>
                    <q-btn 
                        color="secondary" 
                        @click="newExercise=true" 
                        class="q-mt-md"
                    >
                        + Adicionar Exercício
                    </q-btn>
                </div>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { createWorkout } from '../scripts/workout.ts';
import { createExercise } from '../scripts/exercise.ts';

export default{
    data(){
        return{
            // newWorkout : createWorkout(this.workoutName, this.workoutDay),
            exerciseName : "",
            exerciseRepsMin: null,
            exerciseRepsMax : null,
            exerciseSets : null,
            workoutDay : "",
            workoutName : "",
            options : ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            exercises : [],
            newExercise : false
        }
    },
    methods: {
        async saveWorkout(){
            if(this.workoutDay !== "" && this.workoutName !== ""){
                const workout = await createWorkout(this.workoutName, this.workoutDay);
                const workoutId = workout?.id;

                if (!workoutId) {
                console.error('Failed to create workout');
                return;
                }

                for (const exercise of this.exercises) {    
                    await createExercise(
                        exercise.name,
                        exercise.sets,
                        exercise.repsMin,
                        exercise.repsMax,
                        workoutId
                    );
                }

                this.$router.push('/');
            }
            
        },
        addExercise(name, sets, repsMin, repsMax) {
            if(name !== "" && Number.isInteger(sets) && Number.isInteger(repsMin) && Number.isInteger(repsMax)){
                this.exercises.push({name : name, sets : Number(sets), repsMin: Number(repsMin), repsMax: Number(repsMax)}); 
                this.exerciseName=''; 
                this.exerciseRepsMin=''; 
                this.exerciseRepsMax=''; 
                this.exerciseSets=''; 
                this.newExercise=false;
            }
        },
        async delExercise(exercise, index){
            this.exercises.splice(index, 1);
        }
    }
}

</script>

<style>

.exercise-card {
    background: #f5f5f5;
    border-radius: 10px;
    transition: 0.2s;
}

.exercise-card:hover {
    background: #e0f2f1;
    transform: translateY(-2px);
}

h5 {
    margin: 0;
}

h6 {
    margin: 0;
}
</style>