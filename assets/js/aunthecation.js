"use strict";

//selecting elements 

let submit = document.querySelector('#submit');

let usernameInput= document.querySelector('#name');
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');
let phoneNumber = document.querySelector('#phone');


// Check if all fields are met

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const regPasaword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regPasaword.test(password);
};
const validatePhoneNumber = function(phones) {
  const regPhone = /^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907)([0-9]{7})$/
  ;


  return regPhone.test(phones);
}

// error message
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
// succes message
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;


    //hide the error message
    // const error = formField.querySelector('small');
    localStorage.setItem('name' , usernameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('password', passwordInput.value);
    localStorage.setItem('phone', phoneNumber.value );
    // alert('Account created successfully')
 
 
}
// Check usersame
const checkUsername = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const username = usernameInput.value.trim();

    if (!isRequired(username)) {
        showError(usernameInput, 'Please enter username                    .');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameInput, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameInput);
        valid = true;
    }
    return valid;
}

// check email
const checkEmail = () => {
    let valid = false;
    const email = emailInput.value.trim();
    if (!isRequired(email)) {
        showError(emailInput, 'Please enter your email.');
    } else if (!isEmailValid(email)) {
        showError(emailInput, 'Email is not valid.')
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid;
}

// check password 
const checkPassword = () => {

    let valid = false;

    const password = passwordInput.value.trim();

    if (!isRequired(password)) {
        showError(passwordInput, 'Please enter password.');
    } else if (!isPasswordSecure(password)) {
        const ul = document.createElement('ul');
        const li = document.createElement('li');

        // to be continued tomorrow .
        
        li.innerHTML = showError(passwordInput, 'password must have at least 8 characters')
        showError    (passwordInput, 
            
            
            ` Password must have at least 8 characters that includes at least 1 lowercase character 
               \n   1 uppercase characters \n 1 number and 1 special character in (!@#$%^&*)`);
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};

const checkPhone = () => {
  let valid = false;
  const phone = phoneNumber.value.trim();
  if(!isRequired(phone)) {
    showError(phoneNumber, 'Please enter phone number ');
  } else if(!validatePhoneNumber(phone)) {
    showError(phoneNumber, 'Please enter valid phone number')
  } else {
    showSuccess(phone)
    valid = true;

  }
  return valid;
}
//added to track the number of registered users
let dBaseUsers = JSON.parse(localStorage.getItem("userBase")) || [];
function storage() {

    // validate forms
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isPhoneNumberValid = checkPhone()

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid && isPhoneNumberValid ;

        if(isFormValid) {
            localStorage.setItem('name' , usernameInput.value);
            localStorage.setItem('email', emailInput.value);
            localStorage.setItem('password', passwordInput.value);
            localStorage.setItem('phone', phoneNumber.value );
            // alert('Account created successfully')
            
            // window.location.href = "../users/dashboard.html"

            let contactUser = {
              firstName: usernameInput.value,
              contactEmail: emailInput.value,
              phoneNumber: phoneNumber.value,
              Message: passwordInput.value,
            };
            dBaseUsers.push(contactUser)
            localStorage.setItem('userBase',JSON.stringify(dBaseUsers))
            alert('hero')

            window.location.href = "fundraiser-profile.html"

            
        }
        // } else {
            // alert('Please input all details sucessfully')
        // }
        

}



// eye icon
function eyeIcon() {
    // let eyePassword = document.querySelector('login_password');
    let hidePassword1 = document.getElementById('hide1');
    let hidePassword2 = document.getElementById('hide2');
    
    if(passwordInput.type === 'password'){
      passwordInput.type = "text";
      hidePassword1.style.display = 'inline-block';
      hidePassword2.style.display = 'none';
    } else {
      passwordInput.type = "password";
      hidePassword1.style.display = 'none';
      hidePassword2.style.display = 'inline-block';
  
    }
  };

  


//   modal 

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");


const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  

//  login  
function check(){
    const storedName = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    let adminName = [
      {
        Name: 'Admin',
        Password: 'Altruadmin@cohort4'
      }
    ]

    const userName = document.getElementById('UserName');
    const userPassword = document.getElementById('UserPassword');
    const userRemember = document.getElementById("rememberMe");

    if(userName.value == storedName && userPassword.value == storedPassword){
        // alert('You are logged in.');

        let cuurentUser = userName.value == storedName && userPassword.value == storedPassword;
          window.location.href = "fundraiser-profile.html"
        
        



    }else if(userName.value === adminName[0].Name && userPassword.value === adminName[0].Password){
      console.log('reading')
      swal({
        title: "Cash Flow!",
        text: "You are a registered Admin",
        icon: "success",
        button: "Proceed",
      })
      window.location.href = "admin.html"

    }
    else{
      

  //               btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
  
  // btnCloseModal.addEventListener("click", closeModal);
  // overlay.addEventListener("click", closeModal);
  
  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
  //     closeModal();
  //   }
  // })
  swal({
    title: "Oops! Failed to Login",
    text: "Please Check your login details and try again",
    icon: "error",
    button: "Try again",
  });

    }
}


  
