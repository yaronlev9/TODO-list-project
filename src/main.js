let openTasks = [];
let completedTasks = [];
function loadTasks(openTasks) {
    section = document.getElementById("view-section");
}
addBtn = document.getElementById('addButton');
addBtn.addEventListener('click',addTask);
let counter = document.getElementById('counter');
counter.innerHTML = openTasks.length;


function addTask(event){
    if (document.getElementById('textInput').value != "" && document.getElementById('prioritySelector').value != ""){
        let dateObj = new Date();
        date = formatDate(dateObj);
        let task = {text:document.getElementById('textInput').value, date:date, dueDate:document.getElementById('dueDate').value, priority:document.getElementById('prioritySelector').value, addedDate: dateObj};
        addToList(task, openTasks.length, "view-section");
        openTasks.push(task);
        counter.innerText = openTasks.length;
        document.getElementById('textInput').value = "";
        document.getElementById('dueDate').value = "";
        document.getElementById('prioritySelector').value = "";
        console.log(openTasks);
    }
    else{
        console.error("missing input");
    }
}

function formatDate(date){
    let newDate = `${date.getFullYear()}-`;
    let month = date.getMonth();
    if (month < 10){
        newDate += `0${date.getMonth()}-`;
    }
    else{
        newDate += `${date.getMonth()}-`;
    }
    let day = date.getDay();
    if (month < 10){
        newDate += `0${date.getDay()} `;
    }
    else{
        newDate += `${date.getDay()} `;
    }
    let hours = date.getHours();
    if (hours < 10){
        newDate += `0${date.getHours()}:`;
    }
    else{
        newDate += `${date.getHours()}:`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        newDate += `0${date.getMinutes()}:`;
    }
    else{
        newDate += `${date.getMinutes()}:`;
    }
    let seconds = date.getSeconds();
    if (seconds < 10){
        newDate += `0${date.getSeconds()}`;
    }
    else{
        newDate += `${date.getSeconds()}`;
    }
    return newDate;
}

function addToList(toAdd, i, sectionStr){
    let section = document.getElementById(sectionStr);
    let section_child = section.firstElementChild;
    let item = document.createElement("li");
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("todoContainer"); 
    mainDiv.setAttribute("name", i);
    section_child.appendChild(item);
    item.appendChild(mainDiv);
    // let lst = document.createElement("ul");
    mainDiv.setAttribute("id", "taskProperties");
    // mainDiv.appendChild(lst);
    createPropDiv(toAdd.priority, mainDiv, "todoPriority");
    createPropDiv(toAdd.date, mainDiv, "todoCreatedAt");
    if (toAdd.dueDate ===  ''){
        createPropDiv("NA", mainDiv, "todoDueDate");
    }
    else{
        createPropDiv(toAdd.dueDate, mainDiv, "todoDueDate");
    }
    createPropDiv(toAdd.text, mainDiv, "todoText");
    if (sectionStr === "view-section"){
        let myDiv = document.createElement("div");
        createButton(myDiv, "removeButton", "fa fa-trash");
        createButton(myDiv, "completeButton", "fa fa-check");
        mainDiv.appendChild(myDiv);
    }
}

function createPropDiv(toAdd, lst, string){
    let myDiv = document.createElement("div");
    myDiv.setAttribute("class", string);
    myDiv.innerText = toAdd;
    lst.appendChild(myDiv);
}

function createButton(myDiv, string1, string2){
    let button = document.createElement("button");
    myDiv.appendChild(button);
    button.setAttribute("id", string1);
    button.setAttribute("class", "btn");
    let el = document.createElement("i");
    button.appendChild(el);
    el.setAttribute("class", string2);
    el.setAttribute("type", "button");
    if (string1 === "removeButton"){
        button.addEventListener('click',removeFromList);
    }
    else{
        button.addEventListener('click',addToCompleteList);
    }
}

function removeFromList(event){
    let index = this.parentElement.parentElement.getAttribute("name");
    let el = this.parentElement.parentElement.parentElement;
    console.log(el);
    el.remove();
    openTasks.splice(index, 1);
    counter.innerText = openTasks.length;
    updateIndexes();
}

function addToCompleteList(event){
    let index = this.parentElement.parentElement.getAttribute("name");
    let el = this.parentElement.parentElement.parentElement;
    el.remove();
    let task = openTasks[index];
    console.log(index);
    addToList(task, completedTasks.length, "completed-section"); 
    openTasks.splice(index, 1);
    counter.innerText = openTasks.length;
    updateIndexes();
}

function updateIndexes(){
    let section = document.getElementById("view-section");
    let arr = section.firstElementChild.childNodes;
    console.log(arr);
    for (let i = 0; i < arr.length; i++){
        arr[i].childNodes[0].setAttribute("name", i);
        console.log(arr[i].childNodes[0]);
    }
    console.log(arr);
}