const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions= {
  describe:'Title of note',
  demand:true,
  alias:'t'
};

const bodyOptions= {
  describe:'Body of note',
  demand:true,
  alias:'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title:titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title:titleOptions
  })
  .command('remove','Remove a note',{
    title: titleOptions
  })
  .help()
  .argv;
var commond = argv._[0];
console.log('Commond', commond);

if(commond == 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if(note) {
    console.log('Note created');
    notes.logNote(note);
  }else{
    console.log('Note title token');
  }
}else if(commond == 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
}else if (commond == 'read') {
  var note = notes.getNote(argv.title);
  if(note) {
    console.log('Note found');
    notes.logNote(note);
  }else{
    console.log('Note not found');
  }
}else if (commond == 'remove'){
  var noteRemoved = notes.remove(argv.title);
  var message = noteRemoved ? 'Note was removed': 'Note not found';
  console.log(message);
}else {
  console.log('commond not recognized');
}
