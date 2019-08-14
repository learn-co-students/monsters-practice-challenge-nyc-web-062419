document.addEventListener("DOMContentLoaded", function () {
  let limit = 50
  let page = 1
  const monsterContainer = document.querySelector("#monster-container")
  const createMonsters = document.querySelector("#create-monster")
  const pageForward = document.querySelector("#forward")
  const pageBack = document.querySelector("#back")
  getMonsters()

  function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
      .then(resp => resp.json())
      .then(monsters => {
        console.log(monsters)
        renderMonsters(monsters)
      })
  }

  function renderMonsters(monsters) {
    monsters.forEach(monster => {
      monsterContainer.insertAdjacentHTML("beforeend", `
      <li>Name: ${monster.name}</li>
      <li>Age: ${monster.age}</li>
      <li>Description: ${monster.description}</li>
      `)
    });
  }

  createMonsters.insertAdjacentHTML("beforeend", `
      <form action="">
        <input type="text" name="name" placeholder="Roar What's my Name?">
        <input type="text" name="age" placeholder="Arrrgh What's my Age?">
        <input type="text" name="description" placeholder="Grrr what's my deal Yo?">
        <input type="submit" class="button" value="Create Me!">
      </form>`)

  createMonsters.addEventListener("submit", function (event) {
    event.preventDefault()
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: event.target.name.value,
          age: event.target.age.value,
          description: event.target.description.value
        })
      })
      .then(resp => resp.json())
      .then(monster => {
        console.log(monster)
        monsterContainer.insertAdjacentHTML("beforebegin", `
        <li>Name: ${monster.name}</li>
        <li>Age: ${monster.age}</li>
        <li>Description: ${monster.description}</li>
        `)
      })
  })

  pageForward.addEventListener("click", function (event) {
    console.log("forward hoe!")
    if (monsterContainer.childElementCount <= 19) {
      alert("No More Monsters to Show!")
    } else {
      monsterContainer.innerHTML = ''
        ++page
      getMonsters()
    }
  })

  pageBack.addEventListener("click", function (event) {
    console.log("backward hoe!")
    if (page === 1) {
      alert("Can't go back.")
    } else {
      monsterContainer.innerHTML = ''
        --page
      getMonsters()
    }
  })
})