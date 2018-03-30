const Red = "red",
      Orange = "orange",
      Yellow = "yellow",
      Green = "green",
      Blue = "blue",
      Purple = "darkorchid",
      Brown = "saddlebrown",
      Pink = "pink",
      Black = "black",
      Grey = "silver";

// 0 stands for angle effect
const colours = [
    Red, Green, Grey, Orange, Blue,
    "red0", "green0", "grey0", "orange0", "blue0",
    Yellow, Purple, Black, Brown, Pink,
    "yellow0", "purple0", "black0", "brown0", "pink0"
   ];

const EMAIL = "EMAIL",
      BANK = "BANK",
      SHOPPING = "SHOPPING";

//TODO: clear arrays after done testing
let userPasswords = {
    EMAIL: ["yellow0", "purple0", "black0", "brown0", "pink0"],
    BANK: [Red, Green, Grey, Orange, Blue],
    SHOPPING: [Yellow, Purple, Black, Brown, Pink]
}

let currentPassword = [],
    currentTry = [];

let practiceTrials = {
    EMAIL:{},
    BANK: {},
    SHOPPING: {}
}

//function runs once the page DOM is ready for JavaScript code to execute
$(document).ready(function(){
    document.user = generateUsername();
    $("#username").text("User: " + document.user);

    //on click listeners:
    //e-button = creates email pwd
    $("#e-button").click(function() {
        this.style.backgroundColor='#c0c0c0'; //grey
        createPw(EMAIL);
    });

    //b-button = creates bank pwd
    $("#b-button").click(function() {
        this.style.backgroundColor='#c0c0c0'; //grey
        createPw(BANK);
    });

    //s-button = creates shopping pwd
    $("#s-button").click(function() {
        this.style.backgroundColor='#c0c0c0'; //grey
        createPw(SHOPPING);
    });

    //a-button = authenticate button
    $("#a-button").click(function() {
        authenticatePw();
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
//    disableProperty("e-button", true);
//    disableProperty("b-button", true);
//    disableProperty("s-button", true);

    // generate new password
    for(let i = 0; i < 5; i++){
        currentPassword[i] = colours[Math.floor(Math.random() * colours.length)];
    }

    //TODO Need to send it to the server at some point.
    //TODO Everything we need can be stored locally , then maybe at the end of a full session we send it all to server for analysis
    userPasswords[pwType] = currentPassword;

    displayPwSequence(currentPassword);

    $("#PIN").append("\nPlease authenticate your new "+  pwType + " colour PIN below\n");
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


            //TODO repeated code, see displayPwSequence(). Make a single function if possible.
            let colour = colours[c];
            let last = colour[colour.length-1];
            let key = $("<div>")
                        .addClass("square")
                        .addClass(colour)
                         key.attr('id', colour);

            if (last !== '0'){
               // it's a solid colour
               key.css("background-color",colour);
            }

            //add a click listener to each key
            key.click (function (chooseKey){
                let self = $(this);
                let colourClicked = this.getAttribute("id");

                self.addClass("highlight");
                currentTry.push(colourClicked);

                //TODO: remove
                console.log("currentTry: "+currentTry);
            });

            row.append(key);
            c++;
        }
    }
}

function authenticatePw(){
    // unable auth button
//    disableProperty("a-button", true);

    //check for correctness
    if(!passwordCorrect()){
        displayFeedback(false);
    }
    else{
        displayFeedback(true);
        document.getElementById("a-button").style.visibility="hidden";

        //enable buttons to create other passwords, if applicable
//        Object.entries(userPasswords).forEach(([key, value]) => {
//            if (value.length === 0){
//                if (key === EMAIL){
//                    disableProperty("e-button", false);
//                }
//                else if (key === BANK){
//                    disableProperty("b-button", false);
//                }
//                else {
//                    disableProperty("s-button", false);
//                }
//
//            }
//        });

        // clear divs
        $("#sequence").text("");
        $("#PIN").text("");
        $("#keyboard").text("")
                      .css('border','');


       // check if all passwords are authenticated
       let count = 0;
       for (let i in userPasswords) {
           if (userPasswords[i].length !== 0) {
               count++;
           }
        }
        if (count === 3) {
        // all 3 passwords have been authenticated. Make practice + login test options visible
        addPracticeAndLogin();
        }
    }




    //TODO: Remove all below after done testing for practice mode
    // clear divs
    $("#sequence").text("");
    $("#PIN").text("");
    $("#keyboard").text("")
                  .css('border','');
    document.getElementById("a-button").style.visibility="hidden";
    currentTry = [];
    addPracticeAndLogin();
}

//function disableProperty(buttonId, disable){
//    document.getElementById("#"+buttonId).disabled = disable;
//}

function displayPwSequence(sequence) {
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
            .addClass(colour);

         if (last !== '0'){
            // it's a solid colour
            square.css("background-color",colour);
         }

        sequenceRow.append(square);
    }

    $("#PIN").append("1                  2                  3                  4                  5\n");
}

function passwordCorrect(){
    if(currentTry.length !== currentPassword.length){
        return false;
    }
    else{
        for (let i = 0; i < currentPassword.length; i++){
            if(currentTry[i] !== currentPassword[i]){
                return false;
            }
        }
        return true;
    }
}

function displayFeedback(correct){

    let div = document.createElement('div');
    $(div).attr('id', "msg")
          .appendTo($("#feedback"));

    if(correct){
        $("#msg").html("CONGRATULATIONS!  ");
    }
    else{
        $("#msg").html("INCORRECT PASSWORD. PLEASE TRY AGAIN.");
    }

    // add ok button
    $("#feedback").append("<input type='button' class='action-button'id='ok-button' value='OK' />");
    $("#ok-button").css('visibility', 'visible');
    $("#ok-button").click(function() { clearUpForAnotherTry(); });
}

function clearUpForAnotherTry(){
    $("#feedback").html("");

     //enable action button
//     disableProperty("a-button", false);

     //remove highlights from clicked keys
     clearHighlights();
}

function clearHighlights(){
    for (let i = 0; i < currentTry.length; i++) {
        let keyId = "#" + currentTry[i];
        $(keyId).removeClass("highlight");
    }

    // clear user current try
    currentTry = [];
}

function addPracticeAndLogin() {

    // make an array of of pw types, to be used as ids
    let pwTypes = [];
    pwTypes = Object.keys(userPasswords);

    for (let i = 0; i < 3; i++) {
        let div = document.createElement('div'),
            practiceButton = document.createElement('button'),
            loginButton = document.createElement('button'),
            pwType = pwTypes[i].toLowerCase();

        $(practiceButton).attr('class', 'pw-button')
                         .attr('id', pwType +'practice')
                         .text("Practice Password")
                         .data('pwType', pwType)
                         .click(practiceMode.bind($(practiceButton)));

         $(loginButton).attr('class', 'pw-button')
                       .attr('id', pwType +'login')
                       .text("Test Login")
                       .data('pwType', pwType)
                       .click(loginMode.bind($(loginButton)));

        $(practiceButton).appendTo($(div));
        $(loginButton).appendTo($(div));

        $(div).appendTo($("#" + pwType));
        $(div).appendTo($("#" + pwType));
    }
}

function practiceMode(){

    let pwType = this.data("pwType").toUpperCase();

    // lock other buttons
//    $('.pw-button').each(function() {
//        disableProperty(this.id, true);
//    });

    // show PIN
    currentPassword = userPasswords[pwType];
    displayPwSequence(currentPassword);
    addHideShowButton(pwType);
    $("#sequence").prepend("\n\n" + pwType + " Colour PIN trial\n");

    // show keyboard
    displayKeyboard();
    $("#keyboard").prepend("\nPlease enter your "+  pwType + " colour PIN below\n\n");
    $("#submit-button").css('visibility', 'visible')
                      .data('pwType', pwType)
                      .click(practiceResults);


    // User has 3 tries per round. The number of rounds is unlimited on practice mode.
    let currentTrial = (Object.keys(practiceTrials[pwType]).length) + 1,
        key = "T" + currentTrial,
        trialRecord = createTrialObj(key);

//    while (trialRecord.tries < 4 || trialRecord.result !== true){
//        //log
//        trialRecord.tries ++;
//
//        // display partial results
//        if(passwordCorrect()){
//            trialRecord.result= true;
//            displayFeedback(true);
//        }
//        else{
//            displayResults(currentTrial, trialRecord.result);
//            //change button to try again
//            displayFeedback(false);
//        }
//    }


    //record round results onto practiceTrials
    practiceTrials[pwType] = trialRecord;

    //TODO: only unlock the ones not logged in yet
    // unlock other buttons
//    $('.pw-button').each(function() {
//        disableProperty(this.id, false);
//    });


    //TODO: repeated code. Make a function later.
    // clear divs
//    $("#sequence").text("");
//    $("#PIN").text("");
//    $("#keyboard").text("")
//                  .css('border','');
}

function loginMode(){
    //TODO:
    //unable practice + test options for the given type after 3 trials & make them gray
    //add end of session message + clear everything up + maybe send everything at once to server
}


// add button to hide/show user's PIN
function addHideShowButton(pwType){
    $("#hideshow-button").css('visibility', 'visible')
                         .addClass('visible')
                         .data('pwType', pwType)
                         .click(changeState.bind($("#hideshow-button")));
}

// callback for submit button
function practiceResults(){
    //TODO: remove
    console.log("currentPassword: "+currentPassword);
}

function createTrialObj(){
    return ({tries: 0, result: false});
}

function displayResults(trial, result){
    let r = result? "Success!" : "Fail";
    $("#keyboard").append("TRIAL " + trial + "/3   RESULT: " + r);
}

function changeState(){
    if (this.hasClass("visible")){
        this.removeClass("visible")
            .addClass("hidden")
            .text("Show PIN");

        // clear PIN
        $("#sequence").text("");
        $("#PIN").text("");
    }
    else{
        displayPwSequence(currentPassword);
        this.removeClass("hidden")
            .addClass("visible")
            .text("Hide PIN");
    }
}


