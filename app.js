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

const editInput = document.createElement('input')
editInput.setAttribute('id', 'edit-input-none')
editInput.setAttribute('type', 'text')

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
    todoItem.appendChild(editInput)
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
    const isEditable = document.querySelectorAll('#edit-input-none')
    isEditable.forEach((editable) => {
        editable.addEventListener('keydown', textChange)
    })
}

const addButtonHandler = (e) => {
    todoInput.value || e.key === 'Enter'
    ? createTodoItem()
    : errorThrowHandler()
}

const editButtonHandler = (e) => {
    e.target.previousSibling.setAttribute('id', 'save')
    e.target.setAttribute('id', 'el-none')
    e.target.parentNode.firstChild.setAttribute('id','el-none')
    e.target.previousSibling.previousSibling.setAttribute('id','edit-input')
    document.querySelector('#edit-input').value = todoText.innerText
}

const textChange = () => {
    let newValue = document.querySelector('#edit-input').value.toUpperCase()
    todoText.innerText = newValue
}

const saveButtonHandler = (e) => {
    textChange()
    e.target.parentNode.firstChild.innerText = todoText.innerText
    e.target.parentNode.firstChild.setAttribute('id', 'el-none')
    e.target.setAttribute('id', 'save-none')
    e.target.previousSibling.previousSibling.setAttribute('id','todo-item-text')
    e.target.parentNode.firstChild.nextSibling.setAttribute('id','save-none')
    e.target.nextSibling.setAttribute('id', 'edit')
}

const enterButtonHandler = (e) => {
    e.key ==='Enter' 
    ? addButtonHandler()
    : null
}

const removeButtonHandler = (e) => {
    e.target.parentNode.firstChild.classList.toggle('text-overline')
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