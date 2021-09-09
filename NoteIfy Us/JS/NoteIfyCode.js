var mainDiv;

function listen()
{
  if("speechSynthesis" in window){
    var recognition = new window.webkitSpeechRecognition();

    recognition.onstart = function(){
        console.log("Voice recognition started. Try speaking into the microphone.");
    }

    recognition.onerror = function(event){
        console.log("Error " + event.error);
    }

    recognition.onresult = function(event){
        var transcript = event.results[0][0].transcript;
        console.log(transcript);

        document.getElementById("textBox").innerText = document.getElementById("textBox").innerHTML +" "+ transcript;
    }

    recognition.start();
  }
}

var database = firebase.database();
// var noteCountRef = database.ref("NoteCount");
// noteCountRef.on("value", (data)=>{
//   noteCount = data.val();
// });
// var pushNote = notesRef.push();

let noteCount

function addNote()
{
  var notesRef = "Notes/" + document.getElementById("titleBox").value;
  database.ref(notesRef).set({
    title: document.getElementById("titleBox").value,
    text: document.getElementById("textBox").value.split(" ")[0]
  });

  saveNotes();
  scrollToSaved();
}

function scrollToSaved(){
  window.scrollTo(0,350);
}

var NoteTextDB, NoteTitleDB, refForSpecificNote, SpecificNote;
let count = 0;

function saveNotes(){
  var mainDiv = document.getElementById("divForSaved");
  var noteDiv = document.createElement("div");
  mainDiv.style.float = "left";
  mainDiv.style.color = 'black';
  mainDiv.style.display = "flex";
  noteDiv.style.margin = "10px"
  noteDiv.style.border = "2px solid gray";
  noteDiv.style.backgroundColor = "white"
  savedNote = mainDiv.appendChild(noteDiv);

  var NoteTitleDBRef = database.ref("Notes/"+document.getElementById("titleBox").value+"/title");
  NoteTitleDBRef.on("value", (data)=>{
    NoteTitleDB = data.val();
  });
  var NoteTextDBRef = database.ref("Notes/"+document.getElementById("textBox").value+"/text");
  NoteTextDBRef.on("value", (data)=>{
    NoteTextDB = data.val();
  });

  var titleOfNote = noteDiv.appendChild(document.createElement("h1"));
  var textOfNote = noteDiv.appendChild(document.createElement("h3"));
  
  let deleteButton = noteDiv.appendChild(document.createElement("button"));
  let editButton = noteDiv.appendChild(document.createElement("button"));

  titleOfNote.innerHTML = NoteTitleDB;
  textOfNote.innerHTML = document.getElementById("textBox").value;

  editButton.innerHTML = "Edit Your Note"
  editButton.className = 'button';

  console.log(titleOfNote.innerHTML);

  deleteButton.id = "deleteButton"
  deleteButton.innerHTML = "Delete Your Note"
  deleteButton.className = 'button';

  deleteButton.addEventListener("click", function(){
    document.getElementById("deleteButton").parentElement.remove();
    database.ref("Notes/"+titleOfNote.innerHTML).remove();
  });
}

// function deleteNote(){
//   var div = document.getElementById("idFormainDiv");
//   document.body.removeChild(div);
// }