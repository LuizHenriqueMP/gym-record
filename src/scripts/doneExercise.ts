export async function createDoneExercise(id_exercise, id_done_workout, name) {
  const response = await fetch("http://localhost:3000/doneexercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_exercise,
      id_done_workout,
      name
    })
  });
  return response.json();
}

export async function getDoneExercises(id){
  const response = await fetch("http://localhost:3000/doneexercise/"+ id)

  const data = response.json()

  return data
}