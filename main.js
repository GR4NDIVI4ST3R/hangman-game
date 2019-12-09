//* Global Variables
var phrase = resetMessage;
var input = "__INVALID__"; // Used for when nothing is inside input box
var solution = ""; // Default when nothing is inside input box
var bodyParts = 0;
var resetMessage = "DON'T LET THE GUESSER SEE IT!";
var winMessage = "You Won!";
var loseMessage = "You Lose! lmao!";
var debug = "";

//TODO: make gallows
//TODO: make underscores turn into letters when guess is correct
//TODO: make git thing with batch

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
        //* Format input to be used properly as solution
        solution = input;
        solution = solution.replace("'", "");
        solution = solution.replace("-", "");
        solution = solution.replace("–", "");
        solution = solution.replace(".", "");
        solution = solution.replace(",", "");
        solution = solution.replace("?", "");
        solution = solution.replace("!", "");
        
        //* Make input phrase hidden with underscores
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
        //* Disable button when guess is made
        document.getElementById(id).classList.toggle("hide");
        document.getElementById(id).disabled = true;

        //* Correct Guess
        if (solution.includes(id)) {
            // Show guess in phrase box
                // Find every location of id in input and translate to location of id in phrase
            var pos = [0];

            for (var i = 0; i <= pos.length; i++) {
                if (pos[i] > -1) {
                    pos[i] = input.indexOf(id, pos[i] + 1);
                }
                /* Translate between input.length and var i
                using a scale based on the underscores being four positions long */
                // Account for apostrophe and other punctuation
                // Maybe use a dictionary:
                    // Store the id's as variables and their positions as definitions

            }

            ////phrase = phrase.replace("___ ___ ", " V   A   S   E       ___ ___ ")
            document.getElementById("phrase").innerHTML = phrase;

            // Remove every instance of the guess from solution
            while (solution.includes(id)) {
                solution = solution.replace(id,"");
            }

            document.getElementById("phrase").innerHTML = phrase;
        }
        //* Incorrect guess
        else if (bodyParts < 9) {
            bodyParts++;
        }

        //* Win condition
        if (solution.trim().length === 0) {
            alert(winMessage);
            reset();
            return "won"; //Exits reset function; "won" is for possible later use
        }
        
        //* Lose condition
        if (bodyParts >= 9) {
            alert(loseMessage);
            alert("Answer: " + input);
            reset();
            return "lost"; //Exits reset function; "lost" is for possible later use
        }

        //* Debugging
        /*
        var posArray = "";
        for (var i = 0; i < pos.length; i++) {
            posArray += pos[i].toString() + " "; 
        }
        */
        debug = "Solution: " + solution + "\n" /*New Line*/ +
                "Answer: " + input + "\n" + 
                "Body Parts: " + bodyParts + "\n" +
                "Positions: " + pos[0] + pos[1] + pos[2];
        alert(debug); //Toggle using strikethrough
    }
}

function reset() {
    //* Reset Buttons
    for (var i = 65; i <= 90; i++) {
        // String.fromCharCode(i) = button id "A, B, C...""
        document.getElementById(String.fromCharCode(i)).disabled = false;
        document.getElementById(String.fromCharCode(i)).classList.remove("hide");
    }
    //* Show and reset input box, submit btn, and phrase
    document.getElementById("input").classList.remove("hide");
    document.getElementById("submit").classList.remove("hide");

    document.getElementById("input").value = "";
    input = "__INVALID__";

    document.getElementById("phrase").innerHTML = resetMessage;
    phrase = "";

    solution = "__INVALID__";
    bodyParts = 0;
}

// Call listed functions after html loads
function onload() {
    keyboard();
}