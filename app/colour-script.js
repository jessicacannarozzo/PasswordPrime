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

let userPasswords = {
    EMAIL: [],
    BANK: [],
    SHOPPING: []
}

let currentPassword = [],
    currentTry = [];

let practiceTrials = {
    EMAIL:[],
    BANK: [],
    SHOPPING: []
}

let loginTrials = {
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
        createPw(EMAIL);
    });

    //b-button = creates bank pwd
    $("#b-button").click(function() {
        createPw(BANK);
    });

    //s-button = creates shopping pwd
    $("#s-button").click(function() {
        createPw(SHOPPING);
    });

    $("#keyboard-button").click(function(event) {
        if ($(event.target).text() === 'Submit') {
            authenticatePw();
        }
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

function createPw(pwType) {
    setButtonsActiveState('.create-button', false);

    // generate new password
    for (let i = 0; i < 5; i++) {
        currentPassword[i] = colours[Math.floor(Math.random() * colours.length)];
    }

    //TODO Need to send it to the server at some point.
    //TODO Everything we need can be stored locally , then maybe at the end of a full session we send it all to server for analysis
    userPasswords[pwType] = currentPassword;

    displayPwSequence(currentPassword);

    $("#sequence").prepend("\nYOUR NEW "+  pwType + " COLOUR PIN:\n");
    $("#PIN").append("\nPlease authenticate your colour PIN below\n");
    $("#PIN").append(" * make sure to follow the given order *\n\n");

    startKeyboard();
}

function hideKeyboard() {
    $('#kb-container').hide();
}

function startKeyboard(){
    currentTry = [];
    $("#keyboard").text('');

    let rows = 4,
        cols = 5,
        tableRows = [];

    // make a counter for the colours array
    let c = 0;

    // create table row objects
    for (let x = 0; x < rows; x++) {
        tableRows[x] = $('<tr>');
    }

    for (let i = 0; i < rows; i++) {
        let row = tableRows[i];
        $("#keyboard").append(row);

        // for each row, add coloured squares
        for (let j = 0; j < cols; j++) {

            let colour = colours[c];
            let last = colour[colour.length-1];
            let key = $("<div>")
                        .addClass("square")
                        .addClass("key")
                        .addClass(colour)
                        .attr('id', colour);

            if (last !== '0'){
               // it's a solid colour
               key.css("background-color",colour);
            }

            //add a click listener to each key
            key.click (function (chooseKey){
                let self = $(this);
                let colourClicked = this.getAttribute("id");

                currentTry.push(colourClicked);
            });

            row.append(key);
            c++;
        }
    }

    $('#keyboard-button').text('Submit');
    $("#kb-container").show();
}

function setButtonsActiveState(selector, active) {
    $(selector).each(function (index, elem) { $(elem).attr('disabled', !active); });
}

function authenticatePw(){

    //check for correctness
    if(!passwordCorrect()){
        displayFeedback('INCORRECT PASSWORD. PLEASE TRY AGAIN.', 'Try again', startKeyboard);
    }
    else{
        displayFeedback('SUCCESS!', 'OK', refreshMenu);

        // clear divs
        $("#sequence").text("");
        $("#PIN").text("");
    }
}

function displayPwSequence(sequence) {
   // clear table
    $("#sequence").empty();
    $("#PIN").empty();

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

function refreshMenu() {

    if (userPasswords[EMAIL].length === 0) {
        setButtonsActiveState('#e-button', true);
    }

    if (userPasswords[BANK].length === 0) {
        setButtonsActiveState('#b-button', true);
    }

    if (userPasswords[SHOPPING].length === 0) {
        setButtonsActiveState('#s-button', true);
    }

    if (userPasswords[SHOPPING].length !== 0 && userPasswords[BANK].length !== 0 && userPasswords[EMAIL].length !== 0) {
        addPracticeAndLogin();
        $('.create-button').hide();
    }
}

function displayFeedback(msg, buttonMsg, callback){
    hideKeyboard();
    $('#feedback').show();
    $('#feedback-msg').text(msg);
    $('#feedback-button').text(buttonMsg)
                         .unbind()
                         .click(function () { $('#feedback').hide(); typeof callback === 'function' && callback(); });
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

    // show PIN
    $('#pin-container').show();
    $('#hideshow-button').show();
    currentPassword = userPasswords[pwType];
    displayPwSequence(currentPassword);
    $("#kb-container").prepend("\n\n" + pwType + " Colour PIN Practice Trial\n");

    // show keyboard
    startKeyboard();
    $('#msg').text("Please enter your "+  pwType + " colour PIN below");

    // User has 3 tries per round. Unlimited rounds on practice mode.
    let trialRecord = createTrialObj();

    //record round results onto practiceTrials
    practiceTrials[pwType].push(trialRecord);

    $('#keyboard-button').unbind().click(logTrialResult.bind(this, trialRecord));

   startKeyboard();

}

function logTrialResult(currentTryObj, finishCallback){
    let elem = $(event.target);

    currentTryObj.tries++;

    // check correctness and display partial results
    if(passwordCorrect()){
        currentTryObj.result = true;
        displayFeedback('SUCCESS! (tries: ' + currentTryObj.tries + '/3)', 'OK', finishCallback);

    } else  if (currentTryObj.tries < 3) {
        displayFeedback('Wrong password. Please, try again. \n(Try: ' + currentTryObj.tries + '/3)', 'OK', startKeyboard);

    } else {
        displayFeedback('Wrong password. \nEnd of trial.', 'OK', finishCallback);
    }

    //TODO remove below
    console.log("practiceTrials: " + practiceTrials);
    console.log("loginTrials: " + loginTrials);
}

function loginMode(){
    let pwType = this.data("pwType").toUpperCase();
    setButtonsActiveState('#' + pwType.toLowerCase() + 'practice', false);
    setButtonsActiveState('#' + pwType.toLowerCase() + 'login', false);

    // hide PIN
    $('#pin-container').hide();
    $('#hideshow-button').hide();

    $("#kb-container").prepend("\n\n" + pwType + " Colour PIN Login Test\n\n");
    // show keyboard
    startKeyboard();
    $('#msg').text("Please enter your "+  pwType + " colour PIN below");

    // User has 3 tries in only one round
    let currentTrial = createTrialObj();

    //record round results onto loginTrials
    loginTrials[pwType] = currentTrial;

    $('#keyboard-button').unbind().click(logTrialResult.bind(this, currentTrial));

   startKeyboard();

}

function createTrialObj(){
    return ({tries: 0, result: false});
}

var changeState = function (){
    let elem = $('#hideshow-button');
    if (elem.hasClass("visible")){
        elem.removeClass("visible")
            .addClass("hidden")
            .text("Show PIN");

        $('#pin-container').hide();

    }
    else{
        $('#pin-container').show();
        elem.removeClass("hidden")
            .addClass("visible")
            .text("Hide PIN");
    }
}