for (const noteButton of Array.from(document.getElementsByClassName('note-button'))) {
    noteButton.onclick = onNoteButtonClick;
}

const background = document.getElementById('background');

document.getElementById('march').onclick = _ => createBackground(4);
document.getElementById('waltz').onclick = _ => createBackground(3);

function createBackground(beat) {
    const quarters = beat * 2;
    clearNotes();
    background.innerHTML = '';
    for (let i = 0; i < quarters; i++) {
        const elm = document.createElement('div');
        elm.classList.add('quarter');
        if (i === beat) {
            elm.classList.add('bar');
        }
        background.insertAdjacentElement('beforeend', elm);
    }
    document.getElementById('maker').style.width = `calc(var(--quarter-width) * ${quarters})`;
}

function getBeat() {
    return document.getElementById('march').checked ? 4 : 3;
}

function clearNotes() {
    document.getElementById('notes').innerHTML = '';
}

function onNoteButtonClick(ev) {
    const container = document.getElementById('notes');
    const val = parseInt(ev.target.dataset.value);
    if (isNaN(val)) {
        clearNotes();
        return;
    }
    const notes = Array.from(document.getElementsByClassName('note'))
        .map(el => parseInt(el.dataset.value))
        .reduce((p, c) => p += c, 0);
    if (notes + val > (120 * getBeat() * 2)) {
        return;
    }
    const note = document.createElement('div');
    note.className = 'note';
    note.dataset.value = '' + val;
    note.style.width = (val / 120 * 8).toFixed(0) + 'rem';
    note.textContent = ev.target.textContent;
    note.style.minWidth = note.style.width;
    note.style.maxWidth = note.style.width;
    container.insertAdjacentElement('beforeend', note);

    note.onclick = _ => {
        note.remove();
    };
}