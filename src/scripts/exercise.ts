export async function createExercise(name, sets, rep_min, rep_max, id_workout) {
  await fetch("http://localhost:3000/exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      sets,
      rep_min,
      rep_max,
      id_workout
    })
  });
}

export async function getExercisesById(id){
    const response = await fetch("http://localhost:3000/exercise/" + id);

    const data = await response.json();

    return data;
}

export async function updateExercises(name, sets, rep_min, rep_max, id_workout, id){
  const response = await fetch("http://localhost:3000/exercise/"+ id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, 
      sets, 
      rep_min, 
      rep_max, 
      id_workout
    })
  });

  return response.json();
}

export async function deleteExercise(id) {
  await fetch("http://localhost:3000/exercise/" + id, {
    method: "DELETE"
  }).then(res => console.log(res));
}