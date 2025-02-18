const dateEl = document.getElementById("date-el");
const input = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");


const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];



submitBtn.addEventListener("click", () => {
  if (input.value == "") {
    alert("No empty notes allowed!")
    return;
  }
  
    const item = document.querySelector("#input");
    createItem(item);
})


function createItem(item) {
    itemsArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}

function displayItems(){
    let items = ""
    for(let i = 0; i < itemsArray.length; i++){
      items += `<div class="item">
                  <div class="input-controller">
                    <textarea disabled>${itemsArray[i]}</textarea>
                  </div>
                  <div class="controller-container">
                    <div class="edit-controller">
                      <i class="fa-regular fa-trash-can deleteBtn"></i>
                      <i class="fa-solid fa-pen-to-square editBtn"></i>
                    </div>
                    <div class="update-controller">
                      <button class="saveBtn">Save</button>
                      <button class="cancelBtn">Cancel</button>
                    </div>
                  </div>
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
  }

  function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
      dB.addEventListener("click", () => { deleteItem(i) })
    })
  }

  function activateEditListeners(){
    let editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        })
    })
  }

  function activateSaveListeners() {
    let saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        })
    })
  }

  function activateCancelListeners() {
    let cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            cancel(inputs, updateController, i);
        })
    })
  }

function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload();
}

function updateItem(text, i) {
  if (text == "") {
    alert("No empty notes allowed!")
    return
  }
    itemsArray[i] = text;
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}

function cancel(inputs, updateController, i) {
  if (inputs[i].value == "") {
    alert("No empty notes allowed!")
    return
  }
  updateController[i].style.display = "none";
            inputs[i].disabled = true;
}


function displayDate() {
    let date = new Date();
    let dd = String(date.getDate());
    let mm = String(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    
    dateEl.textContent = mm + '/' +  dd + '/' + yyyy
}


function addNote() {
    const key = title.value().trim().replace(" ", "");
    const text = input.value();
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", key)
    newDiv.classList.add("note")
    newDiv.innerHTML += `<p>${title.value()}</p>
                        <p>${text}</p>
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>`
}



window.onload = function() {
    displayDate();
    displayItems();
}

