// Inner Error message with Const.js dictionnary (Line 131)
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");
const closeBtn = document.querySelector(".close");
const thankYou = document.querySelector("#thank-you");
const content = document.querySelector(".content");
const body = document.querySelector("body");
const everyFormInputs = document.querySelectorAll(".formData input");
const formElement = document.querySelector(".modal-body form");
const errorMessages = document.querySelectorAll(".error-msg");
const backDrop = document.getElementById("backdrop");
const checkBox1 = document.getElementById("checkbox1");




// regex
const regexFirstLastName = /^[a-zA-Z\u00e0-\u00ff]+(([- ])?[a-zA-Z\u00e0-\u00ff])+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexTournament = /\d$/;

// date 
let today = new Date();
let date = new Date(today.getFullYear(),today.getMonth(),today.getDate());



console.log(date.getTime);

// launch modal form
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalBg.style.display = "block";
  body.style.overflow = "hidden";

  errorMessages.forEach(errorMessage => {
    if (errorMessage.style.display = "block") {
      errorMessage.style.display = "none"
    }
  })
  

}

// close button 
closeBtn.addEventListener("click", function() {
  if(thankYou.style.display = "block") {
    formElement.reset();
    closeModal();
    thankYou.style.display = "none";
    submitBtn.value = "C'est parti!";
    formData.forEach(form => {
        form.style.display = "block"
      });
    
  }
  else {
    closeModal();
  }
})

// other Close Cases (Backdrop and Escape keybord btn)
backDrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
         closeModal();
      }
    });

 // close modal function 
function closeModal() {
  modalBg.style.display = "none";
  body.style.overflow = "auto";
  clearErrors();
}

// shows if errors were made by users

//displays an error-message if `input` element is invalid

function showValidation(input, isValid, errorMessage = "") {

  // error trigger message
  const errorElement = input.parentNode.querySelector(".error-msg")

  if(isValid) {
    errorElement.style.display = "none"; 
    input.style.border = "none";
    errorElement.innerHTML = "";
  }
  else {
    errorElement.style.display = "block"; 
    input.style.border = "4px solid red";
    errorElement.innerHTML = errorMessage;
  }

}


// Clear trigger borders after validation 

function clearErrors(){
  const inputs = documents.querySelectorAll(formData)
  inputs.forEach(input => { input.value ="";});
}

// inputs validation
everyFormInputs.forEach(input => {
  input.addEventListener("input", function() {
    inputValidation(input)})
})



function inputValidation(input) {

  // creation of a boolean to check if there is an error in at least one input  + Error message from céonst.js

  let isErrorInInput = false;

  if(input.getAttribute("name") === "email") {
    if(regexEmail.test(input.value)) {
      showValidation(input, true)
    }
    else {
      console.log(errorMessage.email.verification)
      showValidation(input, false, errorMessage.email.verification)
      isErrorInInput = true;
    }
  }

   else if(input.getAttribute("type") === "text") {
      if(input.value.length >= 2 && regexFirstLastName.test(input.value)) {
        showValidation(input, true,)
        
      }
      else {
        showValidation(input, false, errorMessage.fullname.verification)
        isErrorInInput = true;
      }
    }
  
    
    else if(input.getAttribute("type") === "date") {
      let dateSelected = new Date(document.querySelector(".formData #birthdate").value);

      //Calcul  minimum age
      function getAge(dateSelected) {
        
        let age = today.getFullYear() - dateSelected.getFullYear();
        let minimumMonth = today.getMonth() - dateSelected.getMonth();
        if (minimumMonth < 0 || (minimumMonth === 0 && today.getDate() < dateSelected.getDate())) {
            age--;
        }
        return age;
    }

      
      if(dateSelected.getTime() < date.getTime() && getAge(dateSelected)>= 15) {
        showValidation( input, true);
      }
      else {
        showValidation( input, false, errorMessage.birthdate.verification);
        isErrorInInput = true;
      }
    }
    
    else if(input.getAttribute("type") === "number") {
      if(regexTournament.test(input.value) && input.value >= 0 && input.value < 100) {
        showValidation( input, true)
      }
      else {
        showValidation( input, false, errorMessage.tournament.verification)
        isErrorInInput = true;
      }
    }
    
    else if(input.getAttribute("type") === "radio") {
      const inputsRadio = document.querySelectorAll(".formData .radio-input");

      // creation of a boolean to check if at least one of the  // 6 radio-input is checked
     
      let isAtLeastOneRadioChecked = false;

      for (i in inputsRadio) {
        if(inputsRadio[i].checked) {
          isAtLeastOneRadioChecked = true;
          break;
        }
      }

      // isErrorInInput takes the opposite boolean value   // of isAtLeastOneRadioChecked
    
      isErrorInInput = !isAtLeastOneRadioChecked;
      showValidation(input, isAtLeastOneRadioChecked, errorMessage.radio.verification);
    }
    
    else if(input.getAttribute("type") === "checkbox" && input.hasAttribute("data-required")) {
      if(input.checked) {
        showValidation( input, true)
      }
      else {
        showValidation( input, false,  errorMessage.check.verification)
        isErrorInInput = true;
      }
    }
  return isErrorInInput;
}


 //checks if there's an error in the form when submit btn is clicked and returns a boolean


function checkForm() {
  let isErrorInForm = false;

  everyFormInputs.forEach(input => {
    if(inputValidation(input)) {
      isErrorInForm = true;
      console.error("error on " , input)
    }
  })
  return isErrorInForm
}

// Grey on button if CGU not checked

checkBox1.addEventListener("click", stateCheckBox);
function stateCheckBox() {
  submitBtn.classList.toggle("btn-hide");
  document.querySelector(".btn-submit").append("btn-hide");
}



formElement.addEventListener("submit", handleForm); 


 // checks if there's still an error in form and displays the "thank you" message if there's none


function handleForm(e) {
  e.preventDefault();
  const isCheckFormErrors = checkForm();

  if(isCheckFormErrors) {
    console.log("button disabled")
  }
  else {

    formElement.reset();
    submitBtn.style.backgroundColor = "#FE142F";
    formData.forEach(form => {
      form.style.display = "none"
    });
    thankYou.style.display = "block";
    submitBtn.value = "Fermer";
    submitBtn.addEventListener("click", function() {
      modalBg.style.display = "none";
      thankYou.style.display = "none";
      submitBtn.value = "C'est parti!";
      formData.forEach(form => {
        form.style.display = "block"
      });
    })
  }
}