const host = "http:localhost:3000";
let page = 1;
let monster = `${host}/monsters/?_limit=50&_page=${page}`;
let size;
const monsterContainer = document.getElementById("monster-container");
const backBtn = document.getElementById("back");
const fwdBtn = document.getElementById("forward");
const monsterForm = document.getElementById("monster-form");

fetch(`${host}/monsters`).then(resp =>
  resp.json().then(data => (size = data.length))
);

fetch(monster).then(resp => resp.json().then(data => renderMonsters(data)));

function renderMonsters(monsters) {
  monsterContainer.innerHTML = "";
  monsters.forEach(monster => {
    monsterContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div data-id=${monster.id} >
    <h2>${monster.name}<h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
    </div>
    `
    );
  });
}

fwdBtn.addEventListener("click", function(e) {
  let totalPages = Math.round(size / 50) + 1;
  if (page < totalPages) {
    page++;
    monster = `${host}/monsters/?_limit=50&_page=${page}`;
    fetch(monster).then(resp => resp.json().then(data => renderMonsters(data)));
  } else {
    alert("Stop dat shit");
  }
});

backBtn.addEventListener("click", function(e) {
  if (page > 1) {
    page--;
    monster = `${host}/monsters/?_limit=50&_page=${page}`;
    fetch(monster).then(resp => resp.json().then(data => renderMonsters(data)));
  } else {
    alert("Stop dat shit");
  }
});

monsterForm.addEventListener("submit", function(e) {
  e.preventDefault();
  fetch(`${host}/monsters`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: e.target.name.value,
      age: parseFloat(e.target.age.value),
      description: e.target.description.value
    })
  })
    .then(resp => resp.json())
    .then(data => {
      alert(`${data.name} has been created`);
      size++;
    });
});
