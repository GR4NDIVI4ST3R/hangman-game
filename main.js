var phrase = "DON'T LET THE GUESSER SEE IT!";
var input = "__invalid__";

/* Paste in full A-Z keyboard using ASCII Codes, instead of manual HTML */
/* Also much easier to make edits to keyboard buttons */
function keyboard() {
    var layout = "";
    var box = "<div class=\"checkbox-container\"><button class=\"checkbox\" id=\""; /*Easy to edit Ex: adding onclick(), changing class names, etc*/
    for (var i = 65; i <= 90; i++) {
        layout += box + String.fromCharCode(i) + "\" onclick=\"guess(this.id)\"> " + String.fromCharCode(i) + "</button></div>";
    }
    document.getElementById("keyboard").innerHTML = layout;
}

function isEmpty(str) {
    return !str.trim().length;
}

function submit() {
    phrase = "";
    input = document.getElementById("input").value;
    for (var i = 0; i < input.length; i+= 1) {
        if (input.charAt(i).match(/^[a-zA-Z]+$/)) { /* The /^[]+$/ is Javascript Regex */
            phrase += "___ ";
        }
        /* If [else if] isn't used, the last [else] will only apply to the [if] above it */
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
        else if (input === "__invalid__") {
            alert("Invalid Phrase; Please use the following: a-z, A-Z, \" ? \", \" ! \", \" \' \" or \" . \"");
            phrase = "DON'T LET THE GUESSER SEE IT!";
            input = "__invalid__";
            break;
        }
        else {
            alert("Invalid Phrase; Please use the following: a-z, A-Z, \" ? \", \" ! \", \" \' \" or \" . \"");
            phrase = "DON'T LET THE GUESSER SEE IT!";
            input = "__invalid__";
            break;
        }
    }
    document.getElementById("phrase").innerHTML = phrase;
    document.getElementById("input").value = "";
}

function guess(id) {
    input = input.toUpperCase();
    if (input.includes(id)) {
        alert("Yay!");
    }
    alert(id);
    alert(input);
    document.getElementById(id).disabled = true;
}

/* Call listed functions after html loads */
function onload() {
    keyboard();
}