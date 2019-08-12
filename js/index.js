const monsterContainer = document.getElementById("monster-container")
const submitMonster = document.getElementById("monster-form")
let maxPage;
fetch(`http://localhost:3000/monsters`)
    .then(response => response.json())
    .then(json => {
        maxPage = Math.ceil(json.length / 50)
    })
const forwardButton = document.getElementById("forward")
const backButton = document.getElementById("back")

let page = 1

forwardButton.addEventListener("click", function (e) {
    e.preventDefault()
    monsterContainer.innerHTML = "";

    if (page < maxPage) {
        page += 1
        fetchMonsters(page)
    }
    else if (page >= maxPage) {
        alert("No more monsters!")
        fetchMonsters(page)
    }
})






backButton.addEventListener("click", function (e) {
    e.preventDefault()
    monsterContainer.innerHTML = "";
    if (page === 1) {
        alert("there ain't no monsters")
        fetchMonsters()
    }
    else {
        page -= 1
        fetchMonsters(page)
    }
})




document.addEventListener("DOMContentLoaded", function () {
    fetchMonsters()
})
//get all monsters from API
function fetchMonsters(page = 1) {
    return fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(json => renderMonsters(json))

}
//render first fifty monsters to page
function renderMonsters(json) {
    json.forEach(monster => {

        monsterContainer.insertAdjacentHTML("beforeend",
            `<div class= "monsters" data-id=${monster.id}>
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
        <p>-----------------------</p></div > `)
    })
}

//event listener on the submit button
submitMonster.addEventListener("submit", function (e) {
    e.preventDefault()
    addNewMonster(e.target)
})

function addNewMonster(form) {
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: form.name.value,
            age: form.age.value,
            description: form.description.value
        })
    }).then(response => response.json())
        .then(monster => {
            monsterContainer.insertAdjacentHTML("beforeend",
                `< div class= "monsters" data - id=${monster.id} >
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
        <p>-----------------------</p></div > `)
            form.reset()
        })
}




