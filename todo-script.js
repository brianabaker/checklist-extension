// initially get the input on the top
// a checklist on the bottom
// appends newest on top or bottom?

// it's saving one string and retrieving it properly. it remembers after page refresh.
// next step:
// need to be able to add multiple strings and then display.

// okay let's remember how to make a todo list in vanilla JS

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
const leftColumn = document.getElementById('left-column');

// this is a temp button to show what's in the get. right now only showing one item.
getButton.addEventListener('click', (e) => {
  // this is returning the new array
  tempButton();
})

// add a todo by pressing enter
textinput.addEventListener('keypress', (e) => {
  // if enter key
  if (e.keyCode === 13){
    // to append a new todo first needs to get the array from chrome storage
    // calls the update function with the data in chrome storage
    chrome.storage.sync.get({ list: [] }, function(data) {
       console.log(data.list);
       update(data.list); //storing the storage value in a variable and passing to update function
     })
   }
})

function update(array){
  let newTodo = textinput.value;
  array.push(newTodo);
  console.log('array', array);
  chrome.storage.sync.set({ list: array }, function() {
    console.log("added to list with new values");
  });
}


function tempButton(){
  chrome.storage.sync.get('list', function (data) {
    console.log(data);
  });
}

function displayTodos(){
  const li = document.createElement('li');
  console.log('in the display todos');
  chrome.storage.sync.get('list', function (data) {
    console.log(data);
    li.innerHTML = data.list;
    leftColumn.append(li);
  });
}

function addTodo() {
  let newTodo = textinput.value;
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
