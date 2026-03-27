export async function createSet(reps, weight, id_done_exercise) {
  const response = await fetch("http://localhost:3000/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        reps, 
        weight, 
        id_done_exercise
    })
  });
  return response.json();
}

export async function getSets(id){
  const response = await fetch("http://localhost:3000/set/"+ id)

  const data = response.json()

  return data
}