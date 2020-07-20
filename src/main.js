let openTasks = [];
let completedTasks = [];
function loadTasks(openTasks) {
    section = document.getElementById("view-section");
}
addBtn = document.getElementById('addButton');
if(addBtn){
    addBtn.addEventListener('click',addTask);
  }

function addTask(event){
    if (document.getElementById('textInput').value != "" && document.getElementById('dueDate').value != "" && document.getElementById('prioritySelector').value != ""){
        let dateObj = new Date();
        date = formatDate(date);
        let task = {text:document.getElementById('textInput').value, date:date, dueDate:document.getElementById('dueDate').value, priority:document.getElementById('prioritySelector').value, addedDate: dateObj};
        openTasks.push(task);
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