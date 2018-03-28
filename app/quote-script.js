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

function validateForm(pwType, domain) {
     console.log("ho");
      var x = document.forms["myForm"][pwType].value;
      console.log(x);
      if (x == userPasswords[domain]) {
        //alert("YOU ENTEERD THIS: " + x);
        return false;
      }
      return false;
}


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

             $("#PIN").append("Quote: " + data.quote + '\n\n');
             $("#PIN").append("Password: " +  data.pw + '\n\n');
             $("#PIN").append("Please authenticate your new " +  pwType + " password below: \n");

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