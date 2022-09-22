//*Selectors
const todoInput = document.querySelector('#todo-input')
const addButton = document.querySelector('#add')
const todoList = document.querySelector('#todo-list')
const liContainer = document.querySelector('.list-container-dnone')
const planCount = document.querySelector('#count')


let newText = null
let todos= []
let initialValue = null

//*Element Creations
const todoItem = document.createElement('li')
todoItem.setAttribute('id', 'todo-item')

const todoRemove = document.createElement('button')
todoRemove.innerText = 'X'
todoRemove.setAttribute('id', 'del')

const todoEdit = document.createElement('button')
todoEdit.innerText = 'E'
todoEdit.setAttribute('id', 'edit')

const editInput = document.createElement('input')
editInput.setAttribute('class', 'edit-input-none')
editInput.setAttribute('type', 'text')

const todoSave = document.createElement('button')
todoSave.innerText = 'S'
todoSave.setAttribute('id', 'save-none')

const todoText = document.createElement('span')
todoText.setAttribute('class', 'todo-item-text')

planCount.innerText = 'Plans For Today: 0'

//!Handler Functions

const createTodoItem = (todo) => {
    todos.push(todo)
    console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
    liContainer.setAttribute('class', 'list-container')
    todoList.appendChild(todoItem)
    todoItem.appendChild(todoText)
    todoItem.appendChild(editInput)
    todoItem.appendChild(todoSave)
    todoItem.appendChild(todoEdit)
    todoItem.appendChild(todoRemove)
    todoText.innerText = todo.text
    setPlanCount()
    todoList.innerHTML += ''
    todoInput.value = ''
    bindHandler(todo)
}

const bindHandler = (todo) => {
    const rmButton = document.querySelectorAll('#del')
    rmButton.forEach((del) => {
        del.addEventListener('click', removeButtonHandler)
    })
    const editButton = document.querySelectorAll('#edit')
    editButton.forEach((edit) => {
        edit.addEventListener('click', editButtonHandler.bind(this,todo))
    })
    const saveButton = document.querySelectorAll('#save-none')
    saveButton.forEach((save) => {
        save.addEventListener('click', saveButtonHandler)
    })
    const isEditable = document.querySelectorAll('.edit-input-none')
    isEditable.forEach((editable) => {
        editable.addEventListener('keydown', textChange)
    })
}

const addButtonHandler = (e) => {
  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    text: todoInput.value
  }
    todoInput.value || e.key === 'Enter'
    ? createTodoItem(newTodo)
    : errorThrowHandler()
}


const editButtonHandler = (todo, e) => {
    e.target.previousSibling.setAttribute('id', 'save')
    e.target.setAttribute('id', 'el-none')
    e.target.parentNode.firstChild.setAttribute('id','el-none')
    e.target.previousSibling.previousSibling.setAttribute('class','edit-input')
    newText  = e.target.parentNode.firstChild.innerText
    todos.map((item) => { 
        item.text = newText
    }
    )
    document.querySelector('.edit-input').value = newText
}


const textChange = () => {
    let newValue = document.querySelector('.edit-input').value.toUpperCase()
    todoText.innerText = newValue
}

const saveButtonHandler = (e) => {
    textChange()
    e.target.parentNode.firstChild.innerText = todoText.innerText
    todos.splice(e.target.index, 1, newText);
    e.target.parentNode.firstChild.setAttribute('class', 'edit-input-none')
    e.target.parentNode.firstChild.setAttribute('id', 'todo-item-text')
    e.target.setAttribute('id', 'save-none')
    e.target.previousSibling.previousSibling.setAttribute('class','todo-item-text')
    e.target.parentNode.firstChild.nextSibling.setAttribute('class','edit-input-none')
    e.target.nextSibling.setAttribute('id', 'edit')
}

const enterButtonHandler = (e) => {
    e.code ==='Enter' || e.code === 'NumpadEnter'
    ? addButtonHandler()
    : null
}

const removeButtonHandler = (e) => {
    e.target.parentNode.firstChild.classList.toggle('text-overline')
    setTimeout(() => {
        e.target.parentNode.remove()
        setListContainer()
        setPlanCount()
        todos.splice(e.target.index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    },300)
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
document.addEventListener('DOMContentLoaded', () => {
  const localData = JSON.parse(localStorage.getItem('todos'))
  localData.map((todo) => (
    createTodoItem(todo)
  ))
})

//Background

let canvas = document.createElement("canvas");
let width = canvas.width = window.innerWidth * 0.75;
let height = canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);
let gl = canvas.getContext('webgl');

let mouse = {x: 0, y: 0};

let numMetaballs = 30;
let metaballs = [];

for (let i = 0; i < numMetaballs; i++) {
  let radius = Math.random() * 60 + 10;
  metaballs.push({
    x: Math.random() * (width - 2 * radius) + radius,
    y: Math.random() * (height - 2 * radius) + radius,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    r: radius * 0.75
  });
}

let vertexShaderSrc = `
attribute vec2 position;

void main() {
// position specifies only x and y.
// We set z to be 0.0, and w to be 1.0
gl_Position = vec4(position, 0.0, 1.0);
}
`;

let fragmentShaderSrc = `
precision highp float;

const float WIDTH = ` + (width >> 0) + `.0;
const float HEIGHT = ` + (height >> 0) + `.0;

uniform vec3 metaballs[` + numMetaballs + `];

void main(){
float x = gl_FragCoord.x;
float y = gl_FragCoord.y;

float sum = 0.0;
for (int i = 0; i < ` + numMetaballs + `; i++) {
vec3 metaball = metaballs[i];
float dx = metaball.x - x;
float dy = metaball.y - y;
float radius = metaball.z;

sum += (radius * radius) / (dx * dx + dy * dy);
}

if (sum >= 0.99) {
gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
return;
}

gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}

`;

const compileShader = (shaderSource, shaderType) => {
  let shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }

  return shader;
}

const getAttribLocation = (program, name) => {
  let attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Can not find attribute ' + name + '.';
  }
  return attributeLocation;
}

const getUniformLocation = (program, name) => {
  let uniformLocation = gl.getUniformLocation(program, name);
  if (uniformLocation === -1) {
    throw 'Can not find uniform ' + name + '.';
  }
  return uniformLocation;
}

const loop = () => {
  for (let i = 0; i < numMetaballs; i++) {
    let metaball = metaballs[i];
    metaball.x += metaball.vx;
    metaball.y += metaball.vy;

    if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
    if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
  }

  let dataToSendToGPU = new Float32Array(3 * numMetaballs);
  for (let i = 0; i < numMetaballs; i++) {
    let baseIndex = 3 * i;
    let mb = metaballs[i];
    dataToSendToGPU[baseIndex + 0] = mb.x;
    dataToSendToGPU[baseIndex + 1] = mb.y;
    dataToSendToGPU[baseIndex + 2] = mb.r;
  }
  gl.uniform3fv(metaballsHandle, dataToSendToGPU);
  
  //Draw
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(loop);
}

let vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
let fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

let program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

let vertexData = new Float32Array([
  -1.0,  1.0, // top left
  -1.0, -1.0, // bottom left
  1.0,  1.0, // top right
  1.0, -1.0, // bottom right
]);
let vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

let positionHandle = getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
                       2, // position is a vec2
                       gl.FLOAT, // each component is a float
                       gl.FALSE, // don't normalize values
                       2 * 4, // two 4 byte float components per vertex
                       0 // offset into each span of vertex data
                      );

let metaballsHandle = getUniformLocation(program, 'metaballs');

loop();

canvas.onmousemove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}