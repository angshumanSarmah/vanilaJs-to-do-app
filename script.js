let notes = [];
let selectedNoteIndex = -1;

function addNew() {
    const title = document.getElementById('note-title');
    title.value = "";
    const content = document.getElementById('note-content');
    content.value = ""
    selectedNoteIndex = -1;
    removeSelectedClassFromAllElements();
}

function removeSelectedClassFromAllElements() {
    const list = document.querySelectorAll('#list-ul li');
    list?.forEach(el=>{
        el.removeAttribute('class', 'selected')
    })
}

function clearList() {
    sessionStorage.clear();
    notes = [];
    document.getElementById('list-ul').innerHTML = null;
}

function getNotesFromSessionStorage() {
    return JSON.parse(sessionStorage.getItem('notes')) || [];
}

function createCheckbox(content) {
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.addEventListener('change', () => {
        if (completedCheckbox.checked) {
            content.style.textDecoration = 'line-through';
        } else {
            content.style.textDecoration = 'none';
        }
    });
    return completedCheckbox;
}

function handleListItemClick(newLiElement, i, notes) {
    newLiElement.addEventListener('click', (ev) => {
        selectedNoteIndex = Number(ev.target.id);
        const selectedNote = notes[selectedNoteIndex];
        document.getElementById('note-title').value = selectedNote.title;
        document.getElementById('note-content').value = selectedNote.content;
        removeSelectedClassFromAllElements();
        newLiElement.setAttribute('class', 'selected');
    });
}

function createListItem(noteObj, i, notes) {
    const newLiElement = document.createElement('li');
    newLiElement.setAttribute('id', i);

    // Adding text content
    const content = document.createElement('span');
    content.innerHTML = noteObj.title;

    // Adding checkbox
    const completedCheckbox = createCheckbox(content);
    newLiElement.appendChild(completedCheckbox);

    newLiElement.appendChild(content);

    handleListItemClick(newLiElement, i, notes);

    return newLiElement;
}



function populateData() {
    notes = getNotesFromSessionStorage();
    const list = document.getElementById('list-ul');
    notes.forEach((noteObj, i) => {
        const newLiElement = createListItem(noteObj, i, notes);
        list.appendChild(newLiElement);
    });
}


function saveNote() {
    let title = document.getElementById('note-title').value;
    let content = document.getElementById('note-content').value;
    if (!(title && content)) {
        return;
    }
    const note = { title, content };

    if (selectedNoteIndex === -1) {
        notes.push(note);
        const newLiElement = createListItem(note, notes.length - 1, notes);
        const list = document.getElementById('list-ul');
        list.appendChild(newLiElement);
    } else {
        // Update the existing note
        notes[selectedNoteIndex] = note;
        const listItem = document.getElementById(selectedNoteIndex.toString());
        listItem.querySelector('span').innerText = title;
    }

    sessionStorage.setItem('notes', JSON.stringify(notes));
    document.getElementById('note-title').value = "";
    document.getElementById('note-content').value = "";

    selectedNoteIndex = -1;
    removeSelectedClassFromAllElements();
}

