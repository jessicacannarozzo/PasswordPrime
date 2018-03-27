const Red = "red",
      Orange = "orange",
      Yellow = "yellow",
      Green = "green",
      Blue = "blue",
      Purple = "purple",
      Brown = "saddlebrown",
      Pink = "pink",
      Black = "black",
      Grey = "silver";

// 0 stands for angle effect
const colors = [Red, Orange, Yellow, Green, Blue, Purple, Brown, Pink, Black, Grey,
    "red0", "orange0", "yellow0", "green0", "blue0", "purple0", "brown0", "pink0", "black0", "grey0"];

const EMAIL = "EMAIL",
      BANK = "BANK",
      SHOPPING = "SHOPPING";

let userPasswords = {
    EMAIL: [],
    BANK: [],
    SHOPPING: []
}

let currentPassword = [];

//function runs once the page DOM is ready for JavaScript code to execute
$(document).ready(function(){
    document.user = generateUsername();
    $("#username").text("User: " + document.user);

    //on click listeners
    $("#e-button").click(function() {
        this.style.backgroundColor='#c0c0c0'; //grey
        createPw(EMAIL);
    });

    $("#b-button").click(function() {
        this.style.backgroundColor='#c0c0c0'; //grey
        createPw(BANK);
    });

    $("#s-button").click(function() {
        this.style.backgroundColor='#c0c0c0'; //grey
        createPw(SHOPPING);
    });

    $("#a-button").click(function() {
        registerPw();
    });
});


// generates a random username of 6 characters
function generateUsername() {
    let user = "";
    let choices= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++){
        user += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    return user;
}

function createPw(pwType){

    // lock buttons that create passwords
    disableProperty("e-button", true);
    disableProperty("b-button", true);
    disableProperty("s-button", true);

    // generate new password
    for(let i = 0; i < 5; i++){
        currentPassword[i] = colors[Math.floor(Math.random() * colors.length)];
    }

    //TODO Need to send it to the server at some point
    userPasswords[pwType] = currentPassword;

    displayPwSequence(currentPassword);

    $("#PIN").append("Please authenticate your new "+  pwType + " password below\n");
    $("#PIN").append(" * make sure to follow the same order *");

    displayKeyboard();

    // show authentication button
    document.getElementById("a-button").style.visibility="visible";
}


function displayKeyboard(){
    $("#keyboard").append("<p><5x4 colour keyboard here></p>");
}

function registerPw(){
    //TODO need to check for correctness, once we have a colour keyboard


    window.alert("Congratulations! Your new password is in our system.");
    document.getElementById("a-button").style.visibility="hidden";

    //enable buttons to create other passwords, if applicable
    Object.entries(userPasswords).forEach(([key, value]) => {
        if (value.length === 0){
            if (key === EMAIL){
                disableProperty("e-button", false);
            }
            else if (key === BANK){
                disableProperty("b-button", false);
            }
            else {
                disableProperty("s-button", false);
            }

        }
    });

    // clear divs
    $("#PIN").text("");
    $("#keyboard").text("");
}


function disableProperty(buttonId, disable){
    document.getElementById(buttonId).disabled = disable;
}

function displayPwSequence(sequence){
   // clear table
    $("#sequence").empty();

    // show colour sequence
    // table row setup
    let pinSize = sequence.length;
    let sequenceRow = $('<tr>');
    $("#sequence").append(sequenceRow);

    // populate row with new elements
    for(let i = 0; i < pinSize; i++){
        let square = $("<div>")
            .addClass("square")
            .attr({row: 0, col: i});

         let colour = sequence[i];
         let last = colour[colour.length-1];
         if (last !== '0'){
            // it's a solid colour
            square.css("background-color",colour);
         }
         else{
            // it's striped
            square.attr('id', colour);
         }

        sequenceRow.append(square);
    }

    $("#PIN").append("1                  2                  3                  4                  5\n");

    //TODO Delete this when everything else is working
    $("#PIN").append("< "+ sequence + " >" + '\n\n');
}