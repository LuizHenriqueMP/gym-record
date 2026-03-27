import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/workout", async (req, res) => {
  const { name, day } = req.body;

  const workout = await prisma.workout.create({
    data: {
      name,
      day
    }
  });

  res.json(workout);
});



app.get("/workout", async (req, res) => {
  const workouts = await prisma.workout.findMany();
  res.json(workouts);
});

app.get("/workout/:id", async (req, res) => {
  const id = Number(req.params.id);
  const workout = await prisma.workout.findMany({
    where : {id : id}
  });
  res.json(workout);
});

app.delete('/workout/:id', async (req, res) => {
  try{
    const id = Number(req.params.id);

    await prisma.workout.delete({
      where:{
        id: id
      }
    });

    res.json({message : "Treino deletado com sucesso"});
  }
  catch (error){ 
    res.status(500).json({error: "Erro ao deletar o treino"});
  }
});

app.listen(3000, () => {
  console.log("Server running");
});

app.post("/exercise", async (req, res) => {
  const { name, sets, rep_min, rep_max, id_workout } = req.body;

  const exercise = await prisma.exercise.create({
    data: {
      name,
      sets,
      rep_min,
      rep_max,
      id_workout
    }
  });

  res.json(exercise);
});

app.get("/exercise/:id_workout", async (req, res) => {
  const id_workout = Number(req.params.id_workout);
  const exercises = await prisma.exercise.findMany({
    where : {id_workout : id_workout}
  });
  res.json(exercises);
});

app.put('/workout/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, day } = req.body;

    const updatedWorkout = await prisma.workout.update({
      where: { id: id },
      data: { name, day }
    });

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o treino" });
  }
});

app.put('/exercise/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, sets, rep_min, rep_max, id_workout } = req.body;

    const updatedExercise = await prisma.exercise.update({
      where: { id: id },
      data: { name, sets, rep_min, rep_max, id_workout }
    });

    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o exercício" });
  }
});

app.delete('/exercise/:id', async (req, res) => {
  try{
    const id = Number(req.params.id);

    await prisma.exercise.delete({
      where:{
        id: id
      }
    });

    res.json({message : "Exercício deletado com sucesso"});
  }
  catch (error){ 
    res.status(500).json({error: "Erro ao deletar o treino"});
  }
});

app.post("/doneworkout", async (req, res) => {
  const { id_workout} = req.body;

  const doneWorkout = await prisma.doneWorkout.create({
    data: {
      id_workout
    }
  });

  res.json(doneWorkout);
});

app.get("/doneworkout/workout/:id_workout", async (req, res) => {
  const id_workout = Number(req.params.id_workout);
  const doneWorkouts = await prisma.doneWorkout.findMany({
    where : {id_workout : id_workout}
  });
  res.json(doneWorkouts);
});

app.get("/doneworkout/:id", async (req, res) => {
  const id = Number(req.params.id);
  const doneWorkouts = await prisma.doneWorkout.findUnique({
    where : {id : id}
  });
  res.json(doneWorkouts);
});

app.post('/doneexercise', async (req, res) => {
  const {id_exercise, id_done_workout, name} = req.body;

  const doneExercise = await prisma.doneExercise.create({
    data : {
      id_exercise,
      id_done_workout,
      name
    }
  });
  res.json(doneExercise);
})

app.get("/doneexercise/:id_done_workout", async (req, res) => {
  const id_done_workout = Number(req.params.id_done_workout);
  const doneExercise = await prisma.doneExercise.findMany({
    where : {id_done_workout : id_done_workout}
  });
  res.json(doneExercise);
});

app.get("/set/:id_done_exercise", async (req, res) => {
  const id_done_exercise = Number(req.params.id_done_exercise);
  const sets = await prisma.set.findMany({
    where : {id_done_exercise : id_done_exercise}
  });
  res.json(sets);
});

app.post('/set', async (req, res) => {
  const {reps, weight, id_done_exercise} = req.body;

  const set = await prisma.set.create({
    data : {
      reps,
      weight,
      id_done_exercise
    }
  });
  res.json(set);
})