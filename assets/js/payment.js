// ******MODAL FUNCTIONALITY****** 
// Get modal element
let modal = document.getElementById("first-modal");
let openModal = document.getElementById("donate-now-btn");
let closeModal = document.getElementsByClassName("close-modal-btn")[0];
let closeModalBtn = document.getElementById("sent-money-btn");

// Defining the functions

// function to open modal 
openModal.onclick = function() {
  modal.style.display = "block";
}

// funtion to close modal using the (x) sign
closeModal.onclick = function() {
  modal.style.display = "none";
}

// to close modal from any other place on the window
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let tText = JSON.parse(localStorage.getItem("campaignDatabase"));
let dAmount = document.querySelector('.d-amount');
dAmount.innerText = tText[0].amountReceived

function donationSuccess(){
    swal({
      title: "Donation Successful!",
      text: "You will be redirected to the campaign details page in few seconds",
      icon: "success",
      button: "Continue",
    });
    setTimeout(redirect, 5000)
}

function redirect(){
  window.location.href = './campaign_details.html'
}