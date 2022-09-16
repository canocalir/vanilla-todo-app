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
const todoText = document.createElement('span')
todoText.setAttribute('class', 'todo-item-text')
planCount.innerText = 'Plans For Today: 0'

//!Handler Functions

const createTodoItem = () => {
    liContainer.setAttribute('class', 'list-container')
    console.log(todoList.parentNode)
    todoList.appendChild(todoItem)
    todoItem.appendChild(todoText)
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
}

const addButtonHandler = (e) => {
    todoInput.value || e.key === 'Enter'
    ? createTodoItem()
    : errorThrowHandler()
}

const enterButtonHandler = (e) => {
    e.key ==='Enter' 
    ? addButtonHandler()
    : null
}

const removeButtonHandler = (e) => {
    e.target.previousSibling.classList.toggle('text-overline')
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