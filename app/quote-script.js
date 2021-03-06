const EMAIL = "EMAIL",
      BANK = "BANK",
      SHOPPING = "SHOPPING";

let countBank=0,
    countShop=0,
    countEmail=0,
    countBankFinal=0,
    countShopFinal=0,
    countEmailFinal=0,
    popUp=true;
    bankbool=true;
    shopbool=true;
    emailbool=true;
    stry=false;
    btry=false;
    etry=false;

let userPasswords = {
    EMAIL: [],
    BANK: [],
    SHOPPING: []
}

let currentPassword = [];

let logData = {
    ID : "",
    TIME : 0,
    START: 0,
    END: 0,
    RESULT : "fail"
}

var timing = false;
var t1 = 0;


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

//input: none
//output: return time diff (ms) between time started and finished typing
function doneTyping () {
     timing = false;
     var t2 = Date.now()
     logData["END"] = t2
     var diff = t2 - t1
     t1 = 0
     return diff;
 }

//input: none
//output: sets logData["START"] to current time
 function startTiming(){
    logData["START"] = Date.now()
     if (!timing){
         t1 = Date.now();
     }
     timing = true;
 }


//input: none
//output: post request to server containing JSOn object of trial data
 function sendToServer(){
    console.log(logData)
    var reqObj = logData
    $.post("data", reqObj, function(data, status){
            console.log("data: " + data);
            console.log("typeof: " + typeof data);
    });

}
//Validates the correctnesss of user's input against the actual password. This is the practice trial
//input: the form ID and the password type
//output: alert in browser indicating validity of password (correct/incorrect)
function validateForm(form, pass) {
      var x = document.forms[form][pass].value;
      if(pass == "EMAIL"){
        countEmail++;
        if (x == userPasswords[pass]) {
          alert("CORRECT! YOU ENTERED THIS: " + x);
          etry=true;
        }
        else{alert("INCORRECT! YOU ENTERED THIS: " + x + ", password is: "+ userPasswords[pass]);}
      }
      else if(pass == "BANK"){
        countBank++;
        if (x == userPasswords[pass]) {
          alert("CORRECT! YOU ENTERED THIS: " + x);
          btry=true;
        }
        else{alert("INCORRECT! YOU ENTERED THIS: " + x + ", password is: "+ userPasswords[pass]);}
      }
      else if(pass == "SHOPPING"){
        countShop++;
        if (x == userPasswords[pass]) {
          alert("CORRECT! YOU ENTERED THIS: " + x);
          stry=true;
        }
        else{alert("INCORRECT! YOU ENTERED THIS: " + x + ", password is: "+ userPasswords[pass]);}
      }
      if(countEmail>0&& countShop>0&&countBank>0&&popUp==true&&stry==true&&btry==true&&etry==true){
        popUp=false;
        alert("You've finished your trial you can move on to login test")
        document.getElementById("finaltest").style.visibility="visible";
      }
    clearText();
    return false;
}
//Validates the correctnesss of user's input against the actual password. This is the testing trial, so data is logged
//input: the form ID and the password type
//output: alert in browser indicating validity of password (correct/incorrect)
function validateFINAL(form, pass){

  time = doneTyping()
  console.log("diff: " + time)
  logData["TIME"] = time
  logData["RESULT"] = "failure"
  var correct = false;
  var x = document.forms[form][pass].value;
  if(pass == "EMAIL"){
    $("#Trial").text("Try: " + (countEmailFinal+1) + "/3");
    if(countEmailFinal>=2){
      alert("FAILED")
      disableProperty("emailbutton", true);
      randomOrder()
    }
    else if(countEmailFinal<3){
      countEmailFinal++;
      if (x == userPasswords[pass]) {
        alert("CORRECT!");
        logData["RESULT"] = "success"
        correct = true;
        disableProperty("emailbutton", true);
        randomOrder();
      }
      else{alert("wrong");}
    }
  }
  if(pass == "SHOPPING"){
    $("#Trial").text("Try: " + (countShopFinal+1) + "/3");
    if(countShopFinal>=2){
      alert("FAILED")
      disableProperty("shopbutton", true);
      randomOrder()
    }
    else if(countShopFinal<3){
      countShopFinal++;
      if (x == userPasswords[pass]) {
        alert("CORRECT!");
        logData["RESULT"] = "success"
        correct = true;
        disableProperty("shopbutton", true);
        randomOrder();
      }
      else{alert("wrong");}
    }
  }
  if(pass == "BANK"){
    $("#Trial").text("Try: " + (countBankFinal+1) + "/3");
    correct = true;
    if(countBankFinal>=2){
      alert("FAILED")
      disableProperty("bankbutton", true);
      randomOrder()
    }
    else if(countBankFinal<3){
      countBankFinal++;
      if (x == userPasswords[pass]) {
        alert("CORRECT!");
        logData["RESULT"] = "success"
        correct = true;
        disableProperty("bankbutton", true);
        randomOrder();
      }
      else{alert("wrong");}
    }
  }
  clearText();
  sendToServer();
  return false;
}


//For user testing, generate a password to test in random order
//input: none
//output: generates a textbox for password input
function randomOrder(){
  $("#PIN").text("");
  $("#Trial").text("Try: 0/3");
  if (emailbool==false&&shopbool==false&&bankbool==false){
    disableProperty("finaltest",true);
    return;
  }
  num= Math.floor((Math.random() * 3) + 1);
  if (num==1){
    if(emailbool==true){
      emailbool=false;
      document.getElementById("TestEmail").style.visibility="visible";
      document.getElementById("EmailTest").style.visibility="visible";
    }
    else{randomOrder();}
  }
  if (num==2){
    if(bankbool== true){
      bankbool = false;
      document.getElementById("TestBank").style.visibility="visible";
      document.getElementById("BankTest").style.visibility="visible";
    }
    else{randomOrder();}
  }
  else if (num==3){
    if (shopbool==true){
      shopbool=false;
      document.getElementById("TestShop").style.visibility="visible";
      document.getElementById("shopTest").style.visibility="visible";
    }
    else{randomOrder();}
  }
}

//clears the text in all textboxes
function clearText(){
  document.getElementById("emailform").value="";
  document.getElementById("bankform").value="";
  document.getElementById("shopform").value="";
  document.getElementById("EmailTest").value="";
  document.getElementById("BankTest").value="";
  document.getElementById("shopTest").value="";
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

//sends a get request to the serve for a new random password, saves the pas
//input: pwType (email, bank, shopping)
//outut: stores the password in userPasswords
function createPw(pwType){
  $("#PIN").text("");
    // lock buttons that creates passwords
    disableProperty("e-button", true);
    disableProperty("b-button", true);
    disableProperty("s-button", true);
    disableProperty("emailform",true);
    disableProperty("bankform",true);
    disableProperty("shopform",true);
    disableProperty("es",true);
    disableProperty("bs",true);
    disableProperty("ss",true);
    var password = ""
    $.get("quotes", function(data){
            console.log("data: " + data);
            console.log("typeof: " + typeof data);
            console.log("password: " + data.pw);
            console.log("quote: " + data.quote);
            password = data.pw
            var quote = data.quote
            userPasswords[pwType] = password;
             $("#PIN").append("Quote: " + data.quote + '\n');
             $("#PIN").append("Author: " + data.author + '\n\n');
             $("#PIN").append("Password: " + data.pw.bold() + '\n\n');
             $("#PIN").append("(Hint: Your password is made up of the first letter of each word in the quote!)\n");
             $("#PIN").append("Please authenticate your new " +  pwType + " password in TRIAL \n");
              document.getElementById("a-button").style.visibility="visible";
            });
}

//allows the user to start practicing their passowrd
//input: none
//output: enables the submit button for the chosen pw type, disables the other pw submit buttons
function registerPw(){
    //*** need to check for correctness
    disableProperty("emailform",false);
    disableProperty("bankform",false);
    disableProperty("shopform",false);
    disableProperty("es",false);
    disableProperty("bs",false);
    disableProperty("ss",false);

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

}

//disables a button
//input: buttonId, booelean disable
//disables / enables the button
function disableProperty(buttonId, disable){
    document.getElementById(buttonId).disabled = disable;
}
