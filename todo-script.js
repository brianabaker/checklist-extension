// initially get the input on the top
// a checklist on the bottom
// appends newest on top or bottom?

// it's saving one string and retrieving it properly. it remembers after page refresh.
// next step:
// need to be able to add multiple strings and then display.

// okay let's remember how to make a todo list in vanilla JS

// THIS CLEARED MY HISTORY
// chrome.storage.sync.clear()

// HERE IS THE DRAGGABLE JS
const todoListContainer = document.querySelectorAll('#todo-list');

const draggable = new window.Draggable.Sortable(todoListContainer, {
  draggable: '.draggable-source',
  appendTo: '#todo-list',
  classes: {
    body: 'draggable-container--is-dragging',
  },
});

draggable.on('sortable:sorted', function() {
  console.log('sorted!');
});
// END DRAGGABLE JS

// THIS IS NOT WORKING AND I DON'T KNOW WHY
chrome.runtime.onStartup.addListener(() => {
  console.log("I started up!");
  let defaultValue = [];
  chrome.storage.sync.get({list: defaultValue}, function(data) {
    chrome.storage.sync.set({list: data.list}, function() {
    });
  });
});

const textinput = document.getElementById('add-todo-input');
const getButton = document.getElementById('getButton');
// const leftColumn = document.getElementById('left-column');
const todoList = document.getElementById('todo-list');
const checkbox = document.querySelectorAll("input[name=checkbox]");

// using querySelector grabs all the checkboxes


// this is a temp button to show what's in the get. right now only showing one item.
getButton.addEventListener('click', (e) => {
  // this is returning the new array
  tempButton();
})
function tempButton(){
  chrome.storage.sync.get('list', function (data) {
    console.log(data);
  });
}

// add a todo by pressing enter
textinput.addEventListener('keypress', (e) => {
  // if enter key
  if (e.keyCode === 13){
    // to append a new todo first needs to get the array from chrome storage
    // calls the update function with the data in chrome storage
    chrome.storage.sync.get({ list: [] }, function(data) {
       console.log(data.list);
       //calls the update function with the value in the text box
       update(data.list); //storing the storage value in a variable and passing to update function
     })
   }
})

// appends a new todo to the end of the array
function update(array){
  let newTodo = textinput.value;
  array.push(newTodo);
  console.log('array', array);
  chrome.storage.sync.set({ list: array }, function() {
    console.log("added to list with new values");
  });
  displayTodos();
}

function makeSpan(){
  // <i class="fas fa-trash-alt"></i>
  document.createElement("i");
  // trash icon
  // i.class="fas fa-trash-alt";
  // sort down icon
  i.class="fas fa-sort-down";
}

function displayTodos(){
  // not sure if this is the most efficient way but deletes all content in the todo list
  // to pessimistically render each new todo
  const pageBreak = document.createElement('br');
  todoList.innerHTML = '';
  chrome.storage.sync.get('list', function (data) {
    console.log(data.list);
    data.list.forEach((item, idx) => {
      let newCheckbox = document.createElement('input');
      let newDiv = document.createElement('div')
      let label = document.createElement('label') // DO I NEED THIS? DO I GET RID OF CHECKBOX
      let checkSpan = document.createElement('span')
      let mainSpan = document.createElement('span')
      let delSpan = document.createElement('span')
      newDiv.classList.add('a-todo');
      newDiv.classList.add('draggable-source');
      newDiv.id = idx;
      // let i = document.createElement("i");
      // i.classList.add('fas fa-sort-down');
      mainSpan.innerHTML = item;
      // span.append('<i class="fas fa-trash-alt"></i>');
      checkSpan.id = idx;
      mainSpan.id = idx;
      delSpan.id = idx;
      delSpan.innerHTML = 'del';
      checkSpan.innerHTML = 'CK'
      checkSpan.classList.add('check-off-item')
      delSpan.classList.add('delete-item')
      checkSpan.onclick = function() { alert('completed! ' + idx); };
      delSpan.onclick = function() { alert('delete' + idx); };
      // label.innerHTML = item;
      // label.prepend(newCheckbox);
      mainSpan.append(delSpan);
      mainSpan.prepend(checkSpan);
      newDiv.append(mainSpan)
      // let checkSpan = document.createElement("checkSpan");
      todoList.append(newDiv);
    });
  });
}

// THIS IS PROBABLY TO DELETE
// FROM BEFORE AND AFTER PSEUDOELEMENTS
// document.addEventListener( "click", someListener );
// // && element.classList.contains("todo-before")
// function someListener(event){
//     var element = event.target;
//     console.info(element);
//     if(element.tagName == 'SPAN'){
//       // var color = window.getComputedStyle(document.querySelector('.a-todo'),':after').getPropertyValue('color');
//
//       var a = window.getComputedStyle(document.querySelector('.a-todo'), 'hover').getPropertyValue('color');
//       console.log(a)
//       // console.log('color', color);
//     }
// }

// I think this is nothing right now
function todoHover(){
  console.info('in todo hover', this);
  this.innerHTML = "Completed!";
}

function addTodo() {
  let newTodo = textinput.value;
  textinput.value = '';
  console.log(theValue);
  if (!theValue) {
    console.log("No value is set");
    return;
  }
  chrome.storage.sync.set({'list': [newTodo]}, function() {
    console.log('set to ' + newTodo);
  });
  displayTodos();
}

function updateTodos(array, value) {
  let newTodo = textinput.value;
    // add new todo to array of todos
  array.push(newTodo);
    // set the updated array in chrome storage
  chrome.storage.sync.set({'list': array}, function() {
      console.log("added to list with new values");
  });
}
window.onload = function(){
  displayTodos();
  checkbox.addEventListener('change', function() {
    if(this.checked) {
      console.log('if checked', this)
    }
  })
}
