let size;
fetch("http://localhost:3000/monsters")
.then(response => response.json())
.then(data => {
    size = Math.ceil((data.length / 50))
})


let monsterForm = document.querySelector('form')
let pageNum = 1
////////////////////////
///////DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {



//////////////////////
////Render invocation
turnPage()
fetchMonsters(pageNum)

//////////////////////
///////turn page
function turnPage(){
    let body = document.querySelector("body")
    let pageFwdBtn = document.getElementById("forward")
    let pageBackBtn = document.getElementById("back")
    body.addEventListener("click", function (e){
    if(e.target === pageFwdBtn){
        pageNum++ 
        if (pageNum === size){
            pageFwdBtn.disabled = true;
        }
    } else if (e.target === pageBackBtn){
        pageNum--
        if (pageNum === 1){
            pageBackBtn.disabled = true;
        }
    }
    fetchMonsters(pageNum)
})
}



//////////////////////////
/////////GET fetch Monsters
function fetchMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(response => response.json())
    .then(data => {
        let monsterContainer = document.getElementById("monster-container")
        monsterContainer.innerHTML = ""
        data.forEach(renderMonsters)
    })
}

/////////////////////////
//////////Render Monsters
function renderMonsters(monster){
    let monsterContainer = document.getElementById("monster-container")
    monsterContainer.insertAdjacentHTML("beforeend",`
    <div class="monster-card">
        <h1>Name: ${monster.name}</h1>
        <h4>Monster age: ${monster.age}</h4>
        <div class="monster-description">
        <p><strong>Description:</strong> ${monster.description}</p>
        </div>
    </div>
    `)
}


///////////////////
////form event listener 
monsterForm.addEventListener("submit", function(e){
    e.preventDefault()
    sendMonsterData(e.target)
})


////////////////////////////
//////new Monster POST fetch
function sendMonsterData(form){
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({name: form.name.value, age: form.age.value, description: form.description.value})
    })
    .then(response => response.json())
    .then(monster =>{
    let monsterContainer = document.getElementById("monster-container")
    monsterContainer.insertAdjacentHTML("beforebegin",`
    <div class="monster-card">
        <h1>Name: ${monster.name}</h1>
        <h4>Monster age: ${monster.age}</h4>
        <div class="monster-description">
        <p><strong>Description:</strong> ${monster.description}</p>
        </div>
    </div>
    `)
    form.reset()
})
}


/////////////////////////////////
////////// close DOM Content Load
})