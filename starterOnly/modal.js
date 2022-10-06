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
const closeCross = document.querySelector(".close");
const thankYou = document.querySelector("#thank-you");
const content = document.querySelector(".content");
const body = document.querySelector("body");
const everyFormInputs = document.querySelectorAll(".formData input");
const formElement = document.querySelector(".modal-body form");
const errorMessages = document.querySelectorAll(".error-msg");
const backDrop = document.getElementById("backdrop")
const checkBox1 = document.getElementById("checkbox1");
const closeBtn = document.querySelector(".btn-close")

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
closeCross.addEventListener("click", function() {
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
}


//displays an error-message if `input` element is invalid

function showValidation(input, isValid) {

  // error trigger message
  const errorElement = input.parentNode.querySelector(".error-msg")

  if(isValid) {
    errorElement.style.display = "none"; 
    input.style.border = "none";
  }
  else {
    errorElement.style.display = "block"; 
    input.style.border = "4px solid red";
  }
  
}

// inputs validation
everyFormInputs.forEach(input => {
  input.addEventListener("input", function() {
    inputValidation(input)})
})



function inputValidation(input) {

  // creation of a boolean to check if there is an error in at least one input

  let isErrorInInput = false;

  if(input.getAttribute("name") === "email") {
    if(regexEmail.test(input.value)) {
      showValidation(input, true)
    }
    else {
      showValidation(input, false)
      isErrorInInput = true;
    }
  }

   else if(input.getAttribute("type") === "text") {
      if(input.value.length >= 2 && regexFirstLastName.test(input.value)) {
        showValidation(input, true)
      }
      else {
        showValidation(input, false)
        isErrorInInput = true;
      }
    }
  
    
    else if(input.getAttribute("type") === "date") {
      let dateSelected = new Date(document.querySelector(".formData #birthdate").value);

      //Calcul  minimum age (15 Years Old)
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
        showValidation( input, false);
        isErrorInInput = true;
      }
    }
    
    else if(input.getAttribute("type") === "number") {
      if(regexTournament.test(input.value) && input.value >= 0 && input.value < 100) {
        showValidation( input, true)
      }
      else {
        showValidation( input, false)
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

      // isErrorInInput takes the opposite boolean value of isAtLeastOneRadioChecked
    
      isErrorInInput = !isAtLeastOneRadioChecked;
      showValidation(input, isAtLeastOneRadioChecked);
    }
    
    else if(input.getAttribute("type") === "checkbox" && input.hasAttribute("data-required")) {
      if(input.checked) {
        showValidation( input, true)
      }
      else {
        showValidation( input, false)
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


 // checks if there's still an error in form and displays the "thank you" message if there's none + add a new closing button on the end (avoid double handleform validation when finished)


function handleForm(e) {
  e.preventDefault();
  const isCheckFormErrors = checkForm();

  if(isCheckFormErrors) {
    console.log("button disabled")
  }
  else {

    formElement.reset();
    formData.forEach(form => {
      form.style.display = "none"
    });
    thankYou.style.display = "block";
    closeBtn.style.display = "block";
    submitBtn.style.display = "none";
    closeBtn.addEventListener("click", function() {
      modalBg.style.display = "none";
      thankYou.style.display = "none";
      closeBtn.style.display = "none";
      submitBtn.style.display = "block";
      formData.forEach(form => {
        form.style.display = "block"
      });
    })
  }
}