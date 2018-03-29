const EMAIL = "EMAIL",
      BANK = "BANK",
      SHOPPING = "SHOPPING";

let userPasswords = {
    EMAIL: [],
    BANK: [],
    SHOPPING: []
}

let currentPassword = [];

let logData = {
    ID : "",
    SCHEME : "quotes",
    TIME : 0,
    RESULT : "fail"
}

var timing = false;
var typingTime  = 0;


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
    $("#readyB-button").click(function() {
        document.getElementById("submitBank").style.visibility="visible";
    });
    $("#readyS-button").click(function() {
        document.getElementById("submitShopping").style.visibility="visible";
    });
    $("#readyE-button").click(function() {
        document.getElementById("submitEmail").style.visibility="visible";
    });

});


 function doneTyping () {
     timing = false;
     console.log("DONE TYPING")
     var t2 = performance.now()
     console.log(t2)
     console.log("took " + (t2 - typingTime) + " ms")
     return t2 - typingTime;    
 }
 
 function startTiming(){
     if (!timing){
         typingTime = performance.now();
         console.log("TYPING  " + typingTime)
     }
     timing = true;
 }
 

 function validateTrial(form, pass) {
       time = doneTyping()
       var x = document.forms[form][pass].value;
       var correct = false;
       console.log(x);
       if (x == userPasswords[pass]) {
         alert("Congratulations! Your new password is in our system ");
         correct = true;
       }
       return false;
 }

function validateTrial(form, pass) {
      time = doneTyping()
      var x = document.forms[form][pass].value;
      var correct = false;
      console.log(x);
      if (x == userPasswords[pass]) {
        alert("Congratulations! Your new password is in our system ");
        correct = true;
      }
      sendToServer();
      return false;
}

function sendToServer(){
    console.log(logData)
    var reqObj = logData
    $.post("data", reqObj, function(data, status){
            console.log("data: " + data);
            console.log("typeof: " + typeof data);
    });

}

function validateForm(form, pass) {
      time = doneTyping()
      logData["TIME"] = time
      var x = document.forms[form][pass].value;
      console.log(x);
      var correct = false;
      if (x == userPasswords[pass]) {
        alert("CORRECT! YOU ENTERED THIS: " + x);
        logData["RESULT"] = "success"
        correct = true;
      } else {
        alert("INCORRECT! YOU ENTERED THIS: " + x);
        logData["RESULT"] = "failure"
    }
      sendToServer();
      return false;
}


// generates a random username of 6 characters
function generateUsername() {
    let user = "";
    let choices= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++){
        user += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    logData["ID"] = user;
    return user;
}

function createPw(pwType){

    // lock buttons that creates passwords
    disableProperty("e-button", true);
    disableProperty("b-button", true);
    disableProperty("s-button", true);

    var password = ""

    $.get("quotes", function(data){
            console.log("data: " + data);
            console.log("typeof: " + typeof data);
            console.log("password: " + data.pw);
            console.log("quote: " + data.quote);
            // var responseObj = JSON.stringify(data);

            password = data.pw
            var quote = data.quote

            userPasswords[pwType] = password;

            $("#QUOTE").append("Quote: " + data.quote + '\n');
            $("#QUOTE").append('\n' + "\nAuthor: " + data.author + '\n\n');

            $("#PIN").append("\nPassword: " +  data.pw + '\n\n');
            $("#PIN").append("(Hint: Your password is made up of the first letter of each word in the quote!)\nPlease authenticate your new " +  pwType + " password in TRIAL \n");


            document.getElementById("a-button").style.visibility="visible";
            //replace word array with new words if there are an 
            });

    // add authentication button

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

