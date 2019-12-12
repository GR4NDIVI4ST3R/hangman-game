//* Global Variables
var phrase = resetMessage;
var input = "__INVALID__"; // Used for when nothing is inside input box
var solution = "__INVALID__"; // Default when nothing is inside input box
var bodyParts = 0;
var phraseList = [];
var posList = [];
var resetMessage = "DON'T LET THE GUESSER SEE IT!";
var winMessage = "You Won!";
var loseMessage = "You Lose! lmao!";
var debug = "";

//TODO: make gallows
//TODO: make underscores turn into letters when guess is correct
//TODO: make git thing with batch

//* Paste in full A-Z keyboard using ASCII Codes, instead of manual HTML
// Also much easier to make edits to keyboard buttons
function keyboard() {
    var layout = "";
    var box = "<div class=\"checkbox-container\"><button class=\"checkbox\" id=\""; // Easy to edit (Ex: adding onclick(), changing class names, etc)
    for (var i = 65; i <= 90; i++) {
        layout += box + String.fromCharCode(i) + "\" onclick=\"guess(this.id)\"> " + String.fromCharCode(i) + "</button></div>";
    }
    document.getElementById("keyboard").innerHTML = layout;
}

function isInvalid(input) {
    input = input.replace("'", ""); // "replace()" does not change the string it is called on. It returns a new string.
    input = input.replace("-", "");
    input = input.replace("–", "");
    input = input.replace(".", "");
    input = input.replace(",", "");
    input = input.replace("?", "");
    input = input.replace("!", "");
    if (input.trim().length === 0) {
        return true;
    }
    else {
        return false;
    }
}

function submit() {
    phrase = "";
    input = document.getElementById("input").value;
    input = input.toUpperCase();
    // Check if input box is empty
    if (isInvalid(input)) {
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
        
        //* Turn input into underscores
        //! Turn this into a function for readability
        for (var i = 0; i < input.length; i++) {
            if (input.charAt(i).match(/^[a-zA-Z]+$/)) { // The /^[]+$/ is Javascript Regex
                phraseList.push("___");
            }
            // If [else if] isn't used, the last [else] will only apply to the [if] above it
            else if (input.charAt(i) == " ") {
                phraseList.push("    ");
            }
            else if (input.charAt(i) == "'") {
                phraseList.push("'");
            }
            else if (input.charAt(i) == "-") {
                phraseList.push("—");
            }
            else if (input.charAt(i) == ".") {
                phraseList.push(".");
            }
            else if (input.charAt(i) == ",") {
                phraseList.push(",");
            }
            else if (input.charAt(i) == "?") {
                phraseList.push("?");
            }
            else if (input.charAt(i) == "!") {
                phraseList.push("!");
            }
            else {
                alert("Invalid Phrase; Please use the following: a-z, A-Z, \" ? \", \" ! \", \" \' \" or \" . \"");
                reset();
                break;
            }
        }

        document.getElementById("phrase").innerHTML = phraseList.join(" ");
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
            //* Create array of the locations of "id" within "input"
            // lastPos = the first pos of "id"
            var lastPos = input.indexOf(id);
            // Find nextPos by searching for the first occurance of "id" AFTER the previous first occurance
            var nextPos = input.indexOf(id, lastPos + 1);
            // Make lastPos the first element in "posList"
            posList = [lastPos];
            while (lastPos !== -1) { // While lastPos is a valid position
                lastPos = posList[posList.push(nextPos) - 1];
                // "posList.push(nextPos)" appends the next pos of "id" to posList AND returns its new length
                nextPos = input.indexOf(id, lastPos + 1);
                // If -1 was returned by indexOf(), it means that it could't find "id" again
                if (lastPos == -1) {
                    posList.pop();
                }
            }

            //* Replce underscores in "phrase" w/ letters from "posList"
            for (var i = 0; i < posList.length; i++) {
                phraseList[posList[i]] = " " + id + " ";
                document.getElementById("phrase").innerHTML = phraseList.join(" ");
            }
            

            //* Remove every instance of "id" from "solution"
            while (solution.includes(id)) {
                solution = solution.replace(id,"");
            }
        }
        //* Incorrect guess
        else if (bodyParts < 9) {
            bodyParts++;
            posList = [];
        }

        //* Win condition
        if (solution.trim().length === 0) {
            //! Make nicer looking winMessage pop up box
            document.getElementById("win-lose-message").innerHTML = winMessage;
            document.getElementById("win-lose-message").classList.remove("hide");
            document.getElementById("reset-btn").classList.remove("hide");
            
            document.getElementById("reset-btn").classList.remove("hide");
            
            return "won"; // "return" exits the guess() function like "break;" exits a loop
            // "won" is for possible later use
        }

        //* Lose condition
        if (bodyParts >= 9) {
            document.getElementById("win-lose-message").innerHTML = loseMessage + "\n" + "Answer: " + input;
            document.getElementById("win-lose-message").classList.remove("hide");
            
            document.getElementById("reset-btn").classList.remove("hide");

            return "lost"; // "return" exits the guess() function like "break;" exits a loop
            // "lost" is for possible later use
        }
    }
    //* Debugging
    debug = "Solution: " + solution + "\n" /*New Line*/ +
            "Answer: " + input + "\n" + 
            "Body Parts: " + bodyParts + "\n" +
            "Phrase: " + phraseList.toString() + "\n" +
            "Positions: " + posList.join(", "); //Turns array into string and allows custom separator
    ////alert(debug); //Toggle using strikethrough
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
    document.getElementById("reset-btn").classList.add("hide");

    document.getElementById("input").value = "";
    input = "__INVALID__";
    solution = "__INVALID__";

    document.getElementById("phrase").innerHTML = resetMessage;
    phrase = "";

    document.getElementById("win-lose-message").innerHTML = "";

    posList = [];
    phraseList = [];
    bodyParts = 0;
}

// Call listed functions after html loads
function onload() {
    keyboard();
}