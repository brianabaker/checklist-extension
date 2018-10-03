// initially get the input on the top
// a checklist on the bottom
// appends newest on top or bottom?

// it's saving one string and retrieving it properly. it remembers after page refresh.
// next step:
// need to be able to add multiple strings and then display.

const textinput = document.getElementById('add-todo-input');

const getButton = document.getElementById('getButton');

getButton.addEventListener('click', (e) => {
  tempButton();
})

textinput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13){
    saveChanges();
  }
})

function tempButton(){
  chrome.storage.sync.get('value', function (data) {
    console.log(data)
  });
}

function addTodo() {
  let theValue = textinput.value;

  console.log(theValue);
  if (!theValue) {
    console.log("No value is set")
    return;
  }

  chrome.storage.sync.set({'value': theValue}, function() {
    console.log('set to ' + theValue);
  });
}
