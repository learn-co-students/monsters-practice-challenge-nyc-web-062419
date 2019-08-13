console.log('hi')

const URL_PREFIX='http://localhost:3000/';
'use strict';
let page = 1;
const getMonsters = (a) => {
  console.log("get monsters function");
  fetch(URL_PREFIX + `monsters/?_limit=50&_page=${a}`).then((FieldOperation) => {
    return FieldOperation.json();
  }).then((b) => {
    /** @type {string} */
    document.querySelector("#monster-container").innerHTML = "";
    for (let i = 0; i < b.length; i++) {
      console.log("monster", b[i]);
      createMonsterCard(b[i]);
    }
  });
};
const createMonsterCard = (a) => {
  let b = document.createElement("div");
  let c = document.createElement("h2");
  let d = document.createElement("h4");
  let e = document.createElement("p");
  c.innerHTML = `${a.name}`;
  d.innerHTML = `Age: ${a.age}`;
  e.innerHTML = `Bio: ${a.description}`;
  b.appendChild(c);
  b.appendChild(d);
  b.appendChild(e);
  document.querySelector("#monster-container").appendChild(b);
};
const createMonsterForm = () => {
  const a = document.createElement("form");
  const b = document.createElement("input");
  const obj = document.createElement("input");
  const d = document.createElement("input");
  const modal = document.createElement("button");
  /** @type {string} */
  a.id = "monster-form";
  /** @type {string} */
  b.id = "name";
  /** @type {string} */
  obj.id = "age";
  /** @type {string} */
  d.id = "description";
  /** @type {string} */
  b.placeholder = "name...";
  /** @type {string} */
  obj.placeholder = "age...";
  /** @type {string} */
  d.placeholder = "description...";
  /** @type {string} */
  modal.innerHTML = "Create";
  a.appendChild(b);
  a.appendChild(obj);
  a.appendChild(d);
  a.appendChild(modal);
  document.getElementById("create-monster").appendChild(a);
  addSubmitEventListener();
};
const addSubmitEventListener = () => {
  document.querySelector("#monster-form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submitted", getFormData());
    postNewMonster(getFormData());
    clearForm();
  });
};
const getFormData = () => {
  let a = document.querySelector("#name");
  let durationBox = document.querySelector("#age");
  let c = document.querySelector("#description");
  return {
    name : a.value,
    age : parseFloat(durationBox.value),
    description : c.value
  };
};
const postNewMonster = (event_patch) => {
  let b = URL_PREFIX + `monsters`;
  let repo = {
    method : "POST",
    headers : {
      "Content-type" : "application/json",
      Accept : "application/json"
    },
    body : JSON.stringify(event_patch)
  };
  fetch(b, repo).then((FieldOperation) => {
    return FieldOperation.json();
  }).then((contextReference) => {
    return console.log("new monster", contextReference);
  });
};
const clearForm = () => {
  document.querySelector("#monster-form").reset();
};
const addNavListeners = () => {
  let openLoginScreenBtn = document.querySelector("#back");
  let ajaxButton = document.querySelector("#forward");
  openLoginScreenBtn.addEventListener("click", () => {
    pageDown();
  });
  ajaxButton.addEventListener("click", () => {
    pageUp();
  });
};
const pageUp = () => {
  page++;
  getMonsters(page);
};
const pageDown = () => {
  if (1 < page) {
    page--;
    getMonsters(page);
  } else {
    alert("Aint no monsters here");
  }
};
const init = () => {
  getMonsters();
  createMonsterForm();
  addNavListeners();
};
document.addEventListener("DOMContentLoaded", init);
