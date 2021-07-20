/* TRANSPOSER PROTOTYPE (see TODO) 
    
    USEAGE:
    transpose(notesString, amount)
        noteString: a string of any number of note letters (a-g)
        amount: an integer for how many steps to transpose by
            positive -> transpose up
            negative -> transpose down
            NOTE: this number represents "one step", not a musical interval (a + 2 -> c, f + 5 -> d)
            
    TODO:
        error responses for
        cases for sharps and flats
        cases for e-f and b-c
*/

function transpose(noteString, amount) {
    
    if (typeof amount !== "number" || Math.round(amount) !== amount) {
        return "incorrect parameter: 'amount'";
    }
    if (amount < 0) {
        amount = 7 + (amount % 7);
    }
  
    var transposedNotes = [];
    noteString = noteString.toLowerCase();
    var length = noteString.length;
  
    for (var i = 0; i < length; i++) {
        var noteNum = noteString.charCodeAt(i) - 97;
        if (noteNum < 0 || noteNum > 6) {
            continue;
        }
        noteNum += amount;
        noteNum = noteNum % 7;
        var transposedNote = String.fromCharCode(noteNum + 97);
        transposedNotes.push(transposedNote);
    }
  
    var transposedString = transposedNotes.join("");
    return transposedString;
}
