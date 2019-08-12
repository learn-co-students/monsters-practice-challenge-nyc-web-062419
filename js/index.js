const monsterContainer = document.querySelector("#monster-container")
const backButton = document.getElementById("back")
const forwardButton = document.getElementById("forward")
const monsterForm = document.getElementById('monster-form')
let page = 1

monsterForm.addEventListener('submit', e =>
{
    e.preventDefault()
    makeMonster(e.target)
})

forwardButton.addEventListener('click', function(e) {
    page++
    loadMonsters(page)
})

backButton.addEventListener('click', function(e) {
    if (page <= 1) {
        alert("Nothing to see back here")
        page = 1
    } else {
        page--
        loadMonsters(page)
    }
})

function loadMonsters(pageNumber) {
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(response => response.forEach(renderMonsters))
}

function makeMonster(monster) {
    fetch(`http://localhost:3000/monsters/`, 
    {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ 
            "name": monster.name.value,
            "age": monster.age.value,
            "description": monster.description.value
        })
    })
        .then(response => response.json())  
        .then(response => console.log(response))
        monster.reset()
}


function renderMonsters(monster) {
monsterContainer.insertAdjacentHTML("beforeend", `
<div>
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>
    <p>${monster.id}</p>
</div>
`)
}

document.addEventListener("DOMContentLoaded", function(event){
    loadMonsters(1)
})


