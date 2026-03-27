export async function createDoneWorkout(id_workout) {
  const response = await fetch("http://localhost:3000/doneworkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_workout
    })
  });
  return response.json();
}

export async function getDoneWorkoutsByWorkoutId(id){
    const response = await fetch("http://localhost:3000/doneworkout/workout/" + id);

    const data = await response.json();

    return data;
}

export async function getDoneWorkoutsById(id){
    const response = await fetch("http://localhost:3000/doneworkout/" + id);

    const data = await response.json();

    return data;
}