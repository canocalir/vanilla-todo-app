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

//Background

var canvas = document.createElement("canvas");
var width = canvas.width = window.innerWidth * 0.75;
var height = canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);
var gl = canvas.getContext('webgl');

var mouse = {x: 0, y: 0};

var numMetaballs = 30;
var metaballs = [];

for (var i = 0; i < numMetaballs; i++) {
  var radius = Math.random() * 60 + 10;
  metaballs.push({
    x: Math.random() * (width - 2 * radius) + radius,
    y: Math.random() * (height - 2 * radius) + radius,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    r: radius * 0.75
  });
}

var vertexShaderSrc = `
attribute vec2 position;

void main() {
// position specifies only x and y.
// We set z to be 0.0, and w to be 1.0
gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentShaderSrc = `
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

var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

var vertexData = new Float32Array([
  -1.0,  1.0, // top left
  -1.0, -1.0, // bottom left
  1.0,  1.0, // top right
  1.0, -1.0, // bottom right
]);
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

var positionHandle = getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
                       2, // position is a vec2
                       gl.FLOAT, // each component is a float
                       gl.FALSE, // don't normalize values
                       2 * 4, // two 4 byte float components per vertex
                       0 // offset into each span of vertex data
                      );

var metaballsHandle = getUniformLocation(program, 'metaballs');

loop();
function loop() {
  for (var i = 0; i < numMetaballs; i++) {
    var metaball = metaballs[i];
    metaball.x += metaball.vx;
    metaball.y += metaball.vy;

    if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
    if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
  }

  var dataToSendToGPU = new Float32Array(3 * numMetaballs);
  for (var i = 0; i < numMetaballs; i++) {
    var baseIndex = 3 * i;
    var mb = metaballs[i];
    dataToSendToGPU[baseIndex + 0] = mb.x;
    dataToSendToGPU[baseIndex + 1] = mb.y;
    dataToSendToGPU[baseIndex + 2] = mb.r;
  }
  gl.uniform3fv(metaballsHandle, dataToSendToGPU);
  
  //Draw
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(loop);
}

function compileShader(shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }

  return shader;
}

function getUniformLocation(program, name) {
  var uniformLocation = gl.getUniformLocation(program, name);
  if (uniformLocation === -1) {
    throw 'Can not find uniform ' + name + '.';
  }
  return uniformLocation;
}

function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Can not find attribute ' + name + '.';
  }
  return attributeLocation;
}

canvas.onmousemove = function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}