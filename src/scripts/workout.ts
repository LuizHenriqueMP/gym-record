export async function createWorkout(name, day) {
  const response = await fetch("http://localhost:3000/workout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      day
    })
  });

  return response.json();
}

export async function updateWorkout(name, day, id){
  const response = await fetch("http://localhost:3000/workout/"+ id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      day
    })
  });

  return response.json();
}

export async function getAllWorkouts(){
    const response = await fetch("http://localhost:3000/workout");

    const data = await response.json();

    return data;
}

export async function getWorkoutById(id){
    const response = await fetch("http://localhost:3000/workout/" + id);

    const data = await response.json();

    return data;
}

export async function deleteWorkout(id) {
  await fetch("http://localhost:3000/workout/" + id, {
    method: "DELETE"
  }).then(res => console.log(res));
}