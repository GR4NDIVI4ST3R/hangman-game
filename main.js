var resetMessage = "DON'T LET THE GUESSER SEE IT!";
var winMessage = "You Won!"
var phrase = resetMessage;
var input = "__INVALID__"; // Default when nothing is inside input box
var solution = ""; // Default when nothing is inside input box

//TODO: make incorrect button guesses do something

// Paste in full A-Z keyboard using ASCII Codes, instead of manual HTML
// Also much easier to make edits to keyboard buttons
function keyboard() {
    var layout = "";
    var box = "<div class=\"checkbox-container\"><button class=\"checkbox\" id=\""; // Easy to edit Ex: adding onclick(), changing class names, etc
    for (var i = 65; i <= 90; i++) {
        layout += box + String.fromCharCode(i) + "\" onclick=\"guess(this.id)\"> " + String.fromCharCode(i) + "</button></div>";
    }
    document.getElementById("keyboard").innerHTML = layout;
}

function submit() {
    phrase = "";
    input = document.getElementById("input").value;
    input = input.toUpperCase();
    // Check if input box is empty
    if (input.trim().length === 0) {
        alert("Invalid Phrase; Please use the following: [ a-z ], [ A-Z ], [ – ], [ . ], [ \' ], [ ? ] or [ ! ]");
        reset();
    }
    else {
        solution = input;
        for (var i = 0; i < input.length; i+= 1) {
            if (input.charAt(i).match(/^[a-zA-Z]+$/)) { // The /^[]+$/ is Javascript Regex
                phrase += "___ ";
            }
            // If [else if] isn't used, the last [else] will only apply to the [if] above it
            else if (input.charAt(i) == " ") {
                phrase += "     ";
            }
            else if (input.charAt(i) == "'") {
                phrase += "' ";
            }
            else if (input.charAt(i) == "-") {
                phrase += "— ";
            }
            else if (input.charAt(i) == ".") {
                phrase += ". ";
            }
            else if (input.charAt(i) == ",") {
                phrase += ", ";
            }
            else if (input.charAt(i) == "?") {
                phrase += "? ";
            }
            else if (input.charAt(i) == "!") {
                phrase += "! ";
            }
            // If input contains any characters not listed above, do the following:
            else {
                alert("Invalid Phrase; Please use the following: a-z, A-Z, \" ? \", \" ! \", \" \' \" or \" . \"");
                phrase = "DON'T LET THE GUESSER SEE IT!";
                input = "__INVALID__";
                break;
            }
        }
        document.getElementById("phrase").innerHTML = phrase;
        document.getElementById("input").value = "";
        document.getElementById("input").classList.toggle("hide");
        document.getElementById("submit").classList.toggle("hide");
    }
}


function guess(id) {
    if (solution === "__INVALID__") {
        alert("Da hell u doin'");
    }
    else {
        // Remove every instance of the btn's letter from solution
        while (solution.includes(id)) {
            solution = solution.replace(id,"");
        }
        //* Win Condition
        if (solution.trim().length === 0) {
            document.getElementById("phrase").innerHTML = winMessage;
        }
        alert(solution);
        /* Debugging:
        alert(input);
        */
        document.getElementById(id).disabled = true;
    }
}

function reset() {
    for (var i = 65; i <= 90; i++) {
        document.getElementById(String.fromCharCode(i)).disabled = false;
    }
    document.getElementById("input").value = "";
    document.getElementById("phrase").innerHTML = resetMessage;
    document.getElementById("input").classList.remove("hide");
    document.getElementById("submit").classList.remove("hide");
    phrase = "";
    input = "__INVALID__";
    solution = "__INVALID__";
}

// Call listed functions after html loads
function onload() {
    keyboard();
}