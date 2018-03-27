const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Pink", "Black", "White"];

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

    displayKeyboard();
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

    // lock buttons that creates passwords
    disableProperty("e-button", true);
    disableProperty("b-button", true);
    disableProperty("s-button", true);

    // generate new password
    for(let i = 0; i < 5; i++){
        currentPassword[i] = colors[Math.floor(Math.random() * colors.length)];
    }
    userPasswords[pwType] = currentPassword;

    $("#PIN").text(currentPassword + '\n');
    $("#PIN").append("Please authenticate your new "+  pwType + " password below");

    // add authentication button
    document.getElementById("a-button").style.visibility="visible";
}


function displayKeyboard(){
    $("#keyboard").append("<p><5x4 colour keyboard here></p>");
}

function registerPw(){
    //*** need to check for correctness


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


    $("#PIN").text("");
}


function disableProperty(buttonId, disable){
    document.getElementById(buttonId).disabled = disable;
}