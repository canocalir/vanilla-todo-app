//Selectors
const todoInput = document.querySelector('#todo-input')
const addButton = document.querySelector('#add')
const todoList = document.querySelector('#todo-list')
const liContainer = document.querySelector('.list-container-dnone')
const planCount = document.querySelector('#count')

//Element Creations
const todoItem = document.createElement('li')
todoItem.setAttribute('id', 'todo-item')

const todoRemove = document.createElement('button')
todoRemove.innerText = 'X'
todoRemove.setAttribute('id', 'del')

const todoEdit = document.createElement('button')
todoEdit.innerText = 'E'
todoEdit.setAttribute('id', 'edit')

const todoSave = document.createElement('button')
todoSave.innerText = 'S'
todoSave.setAttribute('id', 'save-none')

const todoText = document.createElement('span')
todoText.setAttribute('class', 'todo-item-text')
planCount.innerText = 'Plans For Today: 0'

//!Handler Functions

const createTodoItem = () => {
    liContainer.setAttribute('class', 'list-container')
    console.log(todoList.parentNode)
    todoList.appendChild(todoItem)
    todoItem.appendChild(todoText)
    todoItem.appendChild(todoSave)
    todoItem.appendChild(todoEdit)
    todoItem.appendChild(todoRemove)
    todoText.innerText = todoInput.value.toUpperCase()
    setPlanCount()
    todoList.innerHTML += ''
    todoInput.value = ''
    bindHandler()
}

const bindHandler = () => {
    const rmButton = document.querySelectorAll('#del')
    rmButton.forEach((del) => {
        del.addEventListener('click', removeButtonHandler)
    })
    const editButton = document.querySelectorAll('#edit')
    editButton.forEach((edit) => {
        edit.addEventListener('click', editButtonHandler)
    })
    const saveButton = document.querySelectorAll('#save-none')
    saveButton.forEach((save) => {
        save.addEventListener('click', saveButtonHandler)
    })
}

const addButtonHandler = (e) => {
    todoInput.value || e.key === 'Enter'
    ? createTodoItem()
    : errorThrowHandler()
}

const editButtonHandler = (e) => {
    e.target.previousSibling.setAttribute('id', 'save')
    e.target.setAttribute('id', 'edit-none')
}

const saveButtonHandler = (e) => {
    e.target.setAttribute('id', 'save-none')
    e.target.nextSibling.setAttribute('id', 'edit')
}

const enterButtonHandler = (e) => {
    e.key ==='Enter' 
    ? addButtonHandler()
    : null
}

const removeButtonHandler = (e) => {
    e.target.previousSibling.previousSibling.classList.toggle('text-overline')
    setTimeout(() => {
        e.target.parentNode.remove()
        setListContainer()
        setPlanCount()
    },1000)
}

const errorThrowHandler = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a plan item!'
      })
}

const setListContainer = () => {
    todoList.childElementCount === 0
    ? todoList.parentNode.classList.toggle('list-container-dnone')
    : null
}

const setPlanCount = () => {
    planCount.innerText = 'Plans For Today: ' + todoList.childElementCount
}

//Event Listeners
addButton.addEventListener('click', addButtonHandler)
document.addEventListener('keydown', enterButtonHandler)



//Todo Item Pattern
 /* <li id="todo-item">
    <input type="checkbox" name="del" id="del">
    <span id="todo-item-text">Hello</span>
    </li> */