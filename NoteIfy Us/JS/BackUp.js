newDiv = newDiv+count.toString;
  newDiv = document.createElement("div");
  document.body.appendChild(newDiv);
  
  SpecificNote = database.ref("Notes/"+document.getElementById("titleBox").value);
  refForSpecificNote = database.ref("Notes/"+document.getElementById("titleBox").value+"/title")
  refForSpecificNote.on("value", (data)=>{
    SpecificNoteTitle = data.val();
  });
  refForSpecificNote2 = database.ref("Notes/"+document.getElementById("titleBox").value+"/text")
  refForSpecificNote2.on("value", (data1)=>{
    SpecificNoteText = data1.val();
  });
  console.log(SpecificNoteTitle);
  console.log(SpecificNoteText);

  var titleOfNote = newDiv.appendChild(document.createElement("h1"));
  var textOfNote = newDiv.appendChild(document.createElement("h3"));
  var editButton = newDiv.appendChild(document.createElement("button"));
  editButton.onclick = "editNote()";
  editButton.innerHTML = "Edit Your Note"
  editButton.className = 'button';

  console.log(newDiv);
  
  var deleteButton = newDiv.appendChild(document.createElement("button"));
  deleteButton.id = "deleteButton"
  deleteButton.innerHTML = "Delete Your Note"
  deleteButton.className = 'button';
  // deleteButton.onclick = deleteNote();
  document.getElementById("savedNote").appendChild(newDiv);
  newDiv.style.float = "left";
  newDiv.style.color = 'black';
  newDiv.style.border = "5px solid gray";
  newDiv.style.backgroundColor = "white"
  titleOfNote.innerHTML = SpecificNoteTitle;
  textOfNote.innerHTML = SpecificNoteText;

  document.getElementById("deleteButton").addEventListener("click", function(){
    newDiv.parentNode.removeChild(newDiv);
    database.ref("Notes/"+document.getElementById("titleBox").value).remove();
  });

  count++;