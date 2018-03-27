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
//const colours = [
//    Red, "red0", Grey, "green0", Green,
//    "blue0",Blue, "grey0", Orange, "orange0",
//    Yellow, "yellow0", Black, "purple0", Purple,
//    "brown0", Brown, "black0", Pink, "pink0"];

const colours = [
    Red, Green, Grey, Orange, Blue,
    "red0", "green0", "grey0", "orange0", "blue0",
    Yellow, Purple, Black, Brown, Pink,
    "yellow0", "purple0", "black0", "brown0", "pink0"

   ];

const EMAIL = "EMAIL",
      BANK = "BANK",
      SHOPPING = "SHOPPING";

let userPasswords = {
    EMAIL: [],
    BANK: [],
    SHOPPING: []
}

let currentPassword = [],
    currentTry = [];

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
        currentPassword[i] = colours[Math.floor(Math.random() * colours.length)];
    }

    //TODO Need to send it to the server at some point
    userPasswords[pwType] = currentPassword;

    displayPwSequence(currentPassword);

    $("#PIN").append("Please authenticate your new "+  pwType + " password below\n");
    $("#PIN").append(" * make sure to follow the given order *\n\n");

    displayKeyboard();

    // show authentication button
    document.getElementById("a-button").style.visibility="visible";
}


function displayKeyboard(){
    $("#keyboard").css("border","2px solid black");

    let rows = 4,
        cols = 5,
        tableRows = [];

    // make a counter for the colours array
    let c = 0;


    // create table row objects
    for(let x = 0; x < rows; x++){
        tableRows[x] = $('<tr>');
    }

    for(let i = 0; i < rows; i++){

        let row = tableRows[i];
        $("#keyboard").append(row);

        // for each row, add coloured squares
        for(let j = 0; j < cols; j++){


            //TODO repeated code, see displayPwSequence(). Make a function if possible.
            let colour = colours[c];
            let last = colour[colour.length-1];
            let key = $("<div>")
                        .addClass("square")
                         key.attr('id', colour);

            if (last !== '0'){
               // it's a solid colour
               key.css("background-color",colour);
            }

            //add a click listener to each key
            key.click (function (chooseKey){
                let self = $(this);
                currentTry.push(this.getAttribute("id"));


                //TODO remove this later
                console.log("key pressed: " + this.getAttribute("id"));
            });

            row.append(key);
            c++;
        }
    }


}

function registerPw(){
    //TODO need to check for correctness


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
    $("#sequence").text("");
    $("#PIN").text("");
    $("#keyboard").text("")
                  .css('border','');
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

        let colour = sequence[i];
        let last = colour[colour.length-1];

        let square = $("<div>")
            .addClass("square")
            .attr('id', colour);

         if (last !== '0'){
            // it's a solid colour
            square.css("background-color",colour);
         }

        sequenceRow.append(square);
    }

    $("#PIN").append("1                  2                  3                  4                  5\n");

    //TODO Delete this when everything else is working
    console.log("PIN: < "+ sequence + " >" + '\n\n');
}