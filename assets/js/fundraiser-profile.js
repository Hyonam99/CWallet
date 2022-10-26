// defining UI variables
const imgInput = document.querySelector("#profileImage");

// function call to load all events on screen two
fndraiserCamLoader2();

// initiate all events on screen two
function fndraiserCamLoader2() {
  console.log("Loading campaign 2");
  if (imgInput) {
    console.log("hi");
    imgInput.addEventListener("change", acceptDisplayImg);
  }
}


function acceptDisplayImg() {
  console.log("codeCheck");
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    let pImage = document.querySelector("#image-picture");
    pImage.src = `${uploaded_image}`;
  });
  reader.readAsDataURL(this.files[0]);
}




function base64ProfileImage(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function ImageToLocal(){
let profileImage = document.getElementById('image-picture');
imgData = base64ProfileImage(profileImage);
if(imgInput){
  imgInput.addEventListener("change", acceptDisplayImg);
  console.log('picture received')
return imgData
  }
  
}

function reDisplayImgage(){
  let keyName = document.getElementById("emailAddress").value;
  let checkValue = JSON.parse(localStorage.getItem(keyName))
let dispImg = document.getElementById('image-picture');
dispImg.src = "data:image/png;base64," + checkValue.Picture;
}

function deleteProfileImage(){
let checkValue = JSON.parse(localStorage.getItem("victorbassey767@gmail.com"))
// if(confirm('do you want to delete your profile picture') == true){
//   delete checkValue.Picture
//   console.log(checkValue)
// localStorage.setItem("victorbassey767@gmail.com", JSON.stringify(checkValue));
// display()
// }else {
// console.log('picture is not deleted')
//   console.log(checkValue)
// }
swal("Are you sure you want to delete your profile picture?", {
  title: "Delete profile picture",
  dangerMode: true,
  buttons: true,
  icon: "warning",
})

.then((profilePictureDeleted) => {
  if (profilePictureDeleted) {
    swal("Your Profile picture has been deleted!", {
      icon: "success",
    });
    delete checkValue.Picture
    console.log('profile picture deleted')
    localStorage.setItem("victorbassey767@gmail.com", JSON.stringify(checkValue));
  } else {
    swal("Your profile picture is still saved!",{});
    console.log('profile picture retained')
  }
 
});

// if(swal.dangerMode == true){

// }

}

/**this function validates name to ensure that no numeric value is passed into it */
function checkName() {
  let notify;
  let validName = document.getElementById("fullName").value;
  let checkName = /^[A-Za-z][A-Za-z]+/gi;
  let cInput = document.getElementById("fullName");
  let message = document.getElementById("nameError");
  if (checkName.test(validName) === false) {
    cInput.style.outlineColor = "red";
    message.style.color = "red";
    notify = "This is not a valid name";
    document.getElementById("nameError").innerHTML = notify;
  } else {
    cInput.style.outlineColor = "green";
    message.style.color = "green";
    notify = "valid name";
    document.getElementById("nameError").innerHTML = notify;
    return validName;
  }
}

/**this function validates phone number to ensure that no alphabetic value is passed into it */
function checkNumber() {
  let notify;
  let validNum = document.getElementById("phoneNumber").value;
  let checkNum = /^[0]+[7-9]+[0-1]+[0-9]{8}$/;
  let cInput = document.getElementById("phoneNumber");
  let message = document.getElementById("numberError");
  if (isNaN(validNum) || validNum <= "" || checkNum.test(validNum) === false) {
    cInput.style.outlineColor = "red";
    message.style.color = "red";
    notify = "This is not a proper phone number";
    document.getElementById("numberError").innerHTML = notify;
  } else {
    cInput.style.outlineColor = "green";
    message.style.color = "green";
    notify = "Valid phone number";
    document.getElementById("numberError").innerHTML = notify;
    return validNum;
  }
}

/**this function validates email to ensure that no numeric value is passed into it */
function checkEmail() {
  let notify;
  let validMail = document.getElementById("emailAddress").value;
  let checkMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let cInput = document.getElementById("emailAddress");
  let message = document.getElementById("emailError");
  if (checkMail.test(validMail) === false) {
    cInput.style.outlineColor = "red";
    message.style.color = "red";
    notify = "This is not a valid mail";
    document.getElementById("emailError").innerHTML = notify;
  } else {
    cInput.style.outlineColor = "green";
    message.style.color = "green";
    notify = "This is a valid mail";
    document.getElementById("emailError").innerHTML = notify;
    return validMail;
  }
}
/**this function validates NIN to ensure that the proper value is passed into it */
function checkNin() {
  let notify;
  let validNin = document.getElementById("nin").value;
  let checkNum = /^[0-9]{11}$/;
  let cInput = document.getElementById("nin");
  let message = document.getElementById("ninError");
  if (isNaN(validNin) || validNin <= "" || checkNum.test(validNin) === false) {
    cInput.style.outlineColor = "red";
    message.style.color = "red";
    notify = '<i class="fa-solid fa-circle-exclamation"></i> Id validation required';
    document.getElementById("ninError").innerHTML = notify;
  } else {
    cInput.style.outlineColor = "green";
    message.style.color = "green";
    notify = '<i class="fa-solid fa-spinner"></i> NIN validation will undergo review';
    document.getElementById("ninError").innerHTML = notify;
    return validNin;
  }
}


/* the function receiveInput() sends input to the local storage from the form inputs 
and alerts the user of success or failue*/

function receiveInput() {
  let keyName = document.getElementById("emailAddress").value;
  // let profileImage = document.getElementById('image-picture');
  let details = {
    fullName: checkName(),
    emailAddress: checkEmail(),
    phoneNumber: checkNumber(),
    gender: document.getElementById("gender").value,
    residence: document.getElementById("residentialAddress").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value,
    nin: checkNin(),
    // Picture:ImageToLocal()
  };

  if (
    details.fullName &&
    details.phoneNumber &&
    details.emailAddress &&
    details.nin
    
  ) {
    swal({
      title: "Details Saved Successfully",
      text: "You can proceed to create a campaign",
      icon: "success",
      button: "Proceed",
      timer: 4000,
    });

    details.Picture = ImageToLocal()
    localStorage.setItem(keyName, JSON.stringify(details));
    // setTimeout(display, 2000)
    
  } else {
    swal({
      title: "Incomplete details",
      text: "Please Check your details and try again",
      icon: "error",
      button: "Try again",
      timer: 4000,
    });
  }

  
}

window.onload = (event) => {
  // alert('complete your registration')
  document.getElementById("fullName").value = localStorage.getItem("name");
  document.getElementById("emailAddress").value = localStorage.getItem("email");
  document.getElementById("phoneNumber").value = localStorage.getItem("phone");
  let keyName = document.getElementById("emailAddress").value;
  let checkValue = JSON.parse(localStorage.getItem(keyName));
  let name, number, mail, resid, city, country, gender, nin, profilePicture
  name = checkValue.fullName
  number = checkValue.phoneNumber
  mail = checkValue.emailAddress
  resid = checkValue.residence
  city = checkValue.city
  country = checkValue.country
  gender = checkValue.gender
  nin = checkValue.nin
  profilePicture = checkValue.Picture
  // reDisplayImgage()
  if(name && 
    number && 
    mail && 
    resid && 
    city &&
    country &&
    gender &&
    nin){
  setTimeout(display, 300)
  setTimeout(disableEdit, 500)
  // setTimeout(reDisplayImgage, 2000)
  }
  // if(profilePicture){
  //   setTimeout(reDisplayImgage, 2000)
  //   alert('picture displayed')
  // }
};


function startProject() {
  window.location.href = "fndraiserCam.html";
}

/* the function display() calls input from the local storage and displays it on the profile 
form to enable the user edit their details appropraitely
*/

function display(){
  let keyName = document.getElementById("emailAddress").value;
  let checkValue = JSON.parse(localStorage.getItem(keyName));
  // console.log(checkValue)
  document.getElementById("fullName").value = checkValue.fullName;
  document.getElementById("emailAddress").value = checkValue.emailAddress;
  document.getElementById("phoneNumber").value = checkValue.phoneNumber;
  document.getElementById("gender").value = checkValue.gender;
  document.getElementById("residentialAddress").value = checkValue.residence;
  document.getElementById("city").value = checkValue.city;
  document.getElementById("country").value = checkValue.country;
  document.getElementById("nin").value = checkValue.nin
  profilePicture = checkValue.Picture
  if(profilePicture){
    setTimeout(reDisplayImgage, 2000)
  }

}

/** this functions below that disables editing by users can be re-written in one function
 * check it again !
 */

function saveInput() {
  let edit = document.getElementById("phoneNumber");
  edit.setAttribute("disabled", true);
}
function saveAddress() {
  let edit = document.getElementById("residentialAddress");
  edit.setAttribute("disabled", true);
}
function saveCity() {
  let edit = document.getElementById("city");
  edit.setAttribute("disabled", true);
}
function saveCountry() {
  let edit = document.getElementById("country");
  edit.setAttribute("disabled", true);
}

function saveName() {
  let edit = document.getElementById("fullName");
  edit.setAttribute("disabled", true);
}
function saveGender() {
  let edit = document.getElementById("gender");
  edit.setAttribute("disabled", true);
}
function saveNin() {
  let edit = document.getElementById("nin");
  edit.setAttribute("disabled", true);
}
function saveEmail() {
  let edit = document.getElementById("emailAddress");
  edit.setAttribute("disabled", true);
}



/**this function disable all edit fields */

function disableEdit(){
  saveName();
  saveCountry();
  saveCity();
  saveAddress();
  saveInput();
  saveGender();
  saveEmail()
  saveNin()
}
/** this fuction saveDetails() call every function and checks all inputs simultaneously for validity
 * before passing it to the local storage */

function saveDetails() {
  receiveInput();
  display()
  disableEdit()
}


/** this functions below that allows users to edit each field independently can be re-written in one function
 * check it again !
 */

function editInput() {
  let edit = document.getElementById("phoneNumber");
  edit.removeAttribute("disabled");
}
function editAddress() {
  let edit = document.getElementById("residentialAddress");
  edit.removeAttribute("disabled");
}
function editCity() {
  let edit = document.getElementById("city");
  edit.removeAttribute("disabled");
}
function editCountry() {
  let edit = document.getElementById("country");
  edit.removeAttribute("disabled");
}
