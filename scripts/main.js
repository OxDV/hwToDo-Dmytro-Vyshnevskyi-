let addMessage = document.querySelector('.message'),
addButton = document.querySelector('.add'),
todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function() {

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});


function removeListItem (event) {
    console.log(event.target.id.split('_')[1]);
    document.getElementById(`list_${event.target.id.split('_')[1]}`).remove();
    todoList.splice(event.target.id.split('_')[1], 1);
    console.log(todoList);
    localStorage.setItem('todo', JSON.stringify(todoList));
    };


function displayMessages(){
    let displayMessage = '';
    let class_arrea = [];
    todoList.forEach(function(item, i){
        displayMessage += `
        <li id='list_${i}'>
            <div><input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}'>${item.todo}</label></div>
            <div><i id='edit_${i}' class="fa-regular fa-pen-to-square"></i>
            <i id='delete_${i}' onclick='removeListItem(event)' class="fa-regular fa-trash-can delete"></i>
        </li>`;
        todo.innerHTML = displayMessage;
        console.log(document.getElementById(`list_${i}`));
        class_arrea.push(i);
    });
}

    // let item_delete = document.querySelector('#delete_0');
    // let list = document.querySelector('#list_0');
    // [].forEach.call(document.querySelectorAll('.delete'), (elem) => {
    // elem.addEventListener('click', (event) => {
    //     document.getElementById(`list_${i}`).addEventListener('click', (event) => removeListItem(event));
    //     })
    // });;

todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;
    
    todoList.forEach(function(item){
        if (item.todo == valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });


})

