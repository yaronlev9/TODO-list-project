// get info from local storage
let data = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')):{
    openTasks: [],
    completedTasks: []
  };
// create all events of buttons
let addBtn = document.getElementById('addButton');
addBtn.addEventListener('click',addTask);
let sortBtn = document.getElementById('sortButton');
sortBtn.addEventListener('click',sortByPriority);
sortBtn = document.getElementById('sortByDate');
sortBtn.addEventListener('click',sortByDueDate);
let clearBtn = document.getElementById('clearList');
clearBtn.addEventListener('click',deleteLst);
showTasks();


// start the counter of the tasks
let counter = document.getElementById('counter');
counter.innerHTML = data.openTasks.length;

// shows all the tasks that were already assigned before
function showTasks(){
    for (let i = 0; i < data.openTasks.length; i++){
        addToList(data.openTasks[i], i, "view-section");
    }
    for (let i = 0; i < data.completedTasks.length; i++){
        addToList(data.completedTasks[i], i, "completed-section");
    }
}

// adds the text with the input given to the list
function addTask(event){
    if (document.getElementById('textInput').value != "" && document.getElementById('prioritySelector').value != ""){
        let dateObj = new Date();
        date = formatDate(dateObj);
        let task = {text:document.getElementById('textInput').value, date:date, dueDate:document.getElementById('dueDate').value, priority:document.getElementById('prioritySelector').value};
        addToList(task, data.openTasks.length, "view-section");
        data.openTasks.push(task);
        localStorage.setItem('todoList', JSON.stringify(data));
        counter.innerText = data.openTasks.length;
        // makes all the inputs default
        document.getElementById('textInput').value = "";
        document.getElementById('dueDate').value = "";
        document.getElementById('prioritySelector').value = "";
    }
    else{
        console.error("missing input");
    }
}

// formats the date and time when the task was given to the correct format
function formatDate(date){
    let newDate = `${date.getFullYear()}-`;
    let month = date.getMonth();
    if (month < 10){
        newDate += `0${date.getMonth() + 1}-`;
    }
    else{
        newDate += `${date.getMonth() + 1}-`;
    }
    let day = date.getDate();
    console.log(day);
    if (day < 10){
        newDate += `0${date.getDate()} `;
    }
    else{
        newDate += `${date.getDate()} `;
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

// creates html code in the correct format with the properties of the task
function addToList(toAdd, i, sectionStr){
    let section_child = document.getElementById(sectionStr).firstElementChild;
    let item = document.createElement("li");
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("todoContainer"); 
    mainDiv.setAttribute("name", i);
    section_child.appendChild(item);
    item.appendChild(mainDiv);
    mainDiv.setAttribute("id", "taskProperties");
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
        checkDueDateClose(item, toAdd);
        let myDiv = document.createElement("div");
        createButton(myDiv, "removeButton", "fa fa-trash");
        createButton(myDiv, "completeButton", "fa fa-check");
        mainDiv.appendChild(myDiv);
    }
}

// gets the property and creates a div with the property
function createPropDiv(toAdd, lst, string){
    let myDiv = document.createElement("div");
    myDiv.setAttribute("class", string);
    myDiv.innerText = toAdd;
    lst.appendChild(myDiv);
}

// creates the trash and check buttons
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

// removes the task from list
function removeFromList(event){
    let index = this.parentElement.parentElement.getAttribute("name");
    let el = this.parentElement.parentElement.parentElement;
    el.remove();
    data.openTasks.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(data));
    counter.innerText = data.openTasks.length;
    updateIndexes();
}

// adds the task to the completed tasks list
function addToCompleteList(event){
    let index = this.parentElement.parentElement.getAttribute("name");
    let el = this.parentElement.parentElement.parentElement;
    el.remove();
    let task = data.openTasks[index];
    data.completedTasks.push(task);
    addToList(task, data.completedTasks.length, "completed-section"); 
    data.openTasks.splice(index, 1);
    counter.innerText = data.openTasks.length;
    updateIndexes();
    localStorage.setItem('todoList', JSON.stringify(data));
}

// updates the indexes of the tasks by their order in the list
function updateIndexes(){
    let section = document.getElementById("view-section");
    let arr = section.firstElementChild.childNodes;
    for (let i = 0; i < arr.length; i++){
        arr[i].childNodes[0].setAttribute("name", i);
    }
}

// sorts the tasks by priority
function sortByPriority(event){
    data.openTasks.sort((a, b) => (a.priority > b.priority) ? -1 : 1);
    reArrangeLst();
}

// sorts the tasks by the due date
function sortByDueDate(){
    let counter = data.openTasks.length - 1;
    let i = 0;
    while (i < counter){
        if (data.openTasks[i].dueDate === ""){
            if (data.openTasks[counter].dueDate === ""){
                counter --;
            }
            else{
                temp = data.openTasks[i];
                data.openTasks[i] = data.openTasks[counter];
                data.openTasks[counter] = temp;
                counter--;
                i++;
            }
        }
        else {
            i++;
        }
    }
    data.openTasks.sort((a, b) => (a.dueDate.split('-')[1] < b.dueDate.split('-')[1]) ? -1 : (a.dueDate.split('-')[1] === b.dueDate.split('-')[1]) ? 
    ((a.dueDate.split('-')[2] < b.dueDate.split('-')[2]) ? -1 : 1) : 1);
    reArrangeLst();
}

// re arranges the list by the new sorted order
function reArrangeLst(){
    let myLst = document.getElementById('view-section').children[0];
    myLst.remove();
    let newLst = document.createElement("ul");
    let section =  document.getElementById('view-section');
    section.appendChild(newLst);
    for (let i = 0; i < data.openTasks.length; i++){
        addToList(data.openTasks[i], i, "view-section");
    }
}

// deletes the entire list
function deleteLst(){
    data.openTasks = [];
    counter.innerText = data.openTasks.length;
    reArrangeLst();
    localStorage.setItem('todoList', JSON.stringify(data));
}

// if the due date is within 3 days colors the task red
function checkDueDateClose(li, task){
    let taskDate = task.dueDate.split('-');
    if (task.dueDate === ""){
        return;
    }
    let month = parseInt(taskDate[1]);
    let date1 = new Date();
    var date2 = new Date();
    date2.setFullYear(taskDate[0], month - 1, taskDate[2]);
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    let numDays = Math.round(differenceMs / ONE_DAY);
    if (numDays <= 3){
        li.style.backgroundColor = "hsl(22, 100%, 63%)";
    }
    }