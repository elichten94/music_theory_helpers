/* TRANSPOSER PROTOTYPES (see TODO) 
    
    USEAGE:
    transposeWithSharps(notesArray, amount)
        noteString: an array of any number of note letters (a-g#)
        amount: an integer for how many steps to transpose by
            positive -> transpose up
            negative -> transpose down
            NOTE: this number represents semitones, not the standard musical intervals like "3rd" or "5th" (a + 1 -> a#,  f + 2 -> g)
            
    TODO:  
        implement flats
        cases for when to use sharps vs. flats
        double-sharps and double-flats
*/



function main() {
    var result = transposeWithSharps(["c", "e"], 6);
    console.log(result);
}


// only works for naturals and sharps
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
        
        // if first char is not a note letter a - g
        if (i === 0 && !(charCode >= 97 && charCode <= 103)) {
            return false;
        }
        // if second char is not "#"
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
    
    // first check for errors as in other function
    if (typeof amount !== "number" || Math.round(amount) !== amount) {
        return "incorrect parameter: 'amount'";
    }
    
    // all mod 12 now
    if (amount < 0) {
        amount = 12 + (amount % 12);
    }
  
    var length = noteArray.length; 
    for (var j = 0; j < length; j++) {
        if (!(isNote(noteArray[j]))) {
            return "incorrect parameter: 'noteArray'";
        }
    }
    // end of error checking
    
    var transposedNotes = [];
    
    //zero-indexed notes (a-0, b-1, c-2 etc)
    for (var i = 0; i < length; i++) {
        
        var note = noteArray[i].toLowerCase();
        var noteNum;
        // get noteNum by referencing key where the val is that note
        for (var key in noteMap) {
            if (noteMap[key] === note) {
                noteNum = key;
                break;
            }
        }
        
        // if noteNum is undefined
        if (!noteNum) {
            continue;
        }
        
        // add 'amount' to noteNum
        noteNum = parseInt(noteNum);
        noteNum += amount;
        noteNum = noteNum % 12;
        
        // get the val associated with noteNum as a key
        var transposedNote = noteMap[noteNum];
        if (i === length - 1) {
            transposedNotes.push(transposedNote);
        } else {
            transposedNotes.push(transposedNote + " ");
        }
    } //end of i loop
    
    var transposedString = transposedNotes.join("");
    return transposedString;

}

main();
