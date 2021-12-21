/*  Useage:
    transposeWithSharps(noteArray, amount)
        noteArray: Array of note letters (a-g#)
        amount: Integer number of steps to transpose by
            positive -> transpose up
            negative -> transpose down
            NOTE: this number represents semitones, not the standard musical intervals like "3rd" or "5th" (a + 1 -> a#,  f + 2 -> g)
            
*/


// naturals and sharps
function isNote(str) {
    if (!str || str. length > 2 || typeof str !== "string") {
        return false;
    }
    
    str = str.toLowerCase();
    var length = str.length;
    var charCode;
    var char;
    
    for (var i = 0; i < length; i++) {
        charCode = str.charCodeAt(i);
        char = str[i];
        if (i === 0 && !(charCode >= 97 && charCode <= 103)) {
            return false;
        }

        if (i === 1 && char !== "#") {
            return false;
        }
    }
    return true;
}


function transposeWithSharps(noteArray, amount) {
    
    // map every note to a number
    var noteMap = {
        0: "a",
        1: "a#",
        2: "b",
        3: "c",
        4: "c#",
        5: "d",
        6: "d#",
        7: "e",
        8: "f",
        9: "f#",
        10: "g",
        11: "g#"
    };
    
    if (typeof amount !== "number" || Math.round(amount) !== amount) {
        return "incorrect parameter: 'amount'";
    }
    
    if (amount < 0) {
        amount = 12 + (amount % 12);
    }
  
    var length = noteArray.length; 
    for (var j = 0; j < length; j++) {
        if (!(isNote(noteArray[j]))) {
            return "incorrect parameter: 'noteArray'";
        }
    }
    
    var transposedNotes = [];
    for (var i = 0; i < length; i++) {
        var note = noteArray[i].toLowerCase();
        var noteNum;
        for (var key in noteMap) {
            if (noteMap[key] === note) {
                noteNum = key;
                break;
            }
        }
        
        if (!noteNum) {
            continue;
        }
        
        noteNum = parseInt(noteNum);
        noteNum += amount;
        noteNum = noteNum % 12;        
        var transposedNote = noteMap[noteNum];
        
        if (i === length - 1) {
            transposedNotes.push(transposedNote);
        } else {
            transposedNotes.push(transposedNote + " ");
        }
    }
    
    var transposedString = transposedNotes.join("");
    return transposedString;
}
