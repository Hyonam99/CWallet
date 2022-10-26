
//to display the image already stored in the local storage

var url_string = location.href;
var url = new URL(url_string);
var idUrl = url.searchParams.get("id");

let campaignData = JSON.parse(localStorage.getItem("campaignDatabase")).reverse();

let dataImage = campaignData[idUrl].CardImg
 
let campaignImage = document.querySelector('.cmPictureDisplay');
campaignImage.src = "data:image/png;base64," + dataImage;
let nairaFormat = Intl.NumberFormat('en-US');  //-> converts number to accounting format with commas

// The section below is grabbing inputs from all neccesary locations and displaying them appropraitely

//1. Grab the title, the Target amount and the Campaign description from the Campaign creation page stored in an Array of Objects
let tText = campaignData;
let title = document.querySelector('.cm-title');
let tAmount = document.querySelector('.tAmount');
let cmDescription = document.querySelector('.aboutCampaign');
title.innerText = tText[idUrl].title
tAmount.innerText = nairaFormat.format(tText[idUrl].targetAmount)
cmDescription.innerText = tText[idUrl].description

//2. Grab the name of the organiser from the registration page and display it here
/**this code can be merged as one, check it again and debug any issue that arises usin the querySelectorALL */
let organiserSource = localStorage.getItem('name');
let organiser = document.querySelector('.Organiser');
let organiserTitle = document.querySelector('.Otitle');
    organiserTitle.innerText = '(Organiser)'
    organiser.innerHTML = organiserSource + ' ' + organiserTitle.innerText
let organiserTSource = localStorage.getItem('name');
let organiserS = document.querySelector('.OrganiserS');
let organiserTTitle = document.querySelector('.Ottitle');
organiserTTitle.innerText = '(Organiser)'
organiserS.innerHTML = organiserTSource + ' ' + organiserTTitle.innerText

//3. Grab the location from the Campaign creation page stored in an Array of Objects
let dbLocation = campaignData;
let currentLocation = document.querySelector('.location');
currentLocation.innerText = dbLocation[idUrl].location
let currentLocation2 = document.querySelector('.location2');
currentLocation2.innerText = dbLocation[idUrl].location

  
// var dataImage = localStorage.getItem('imgData');
// bannerImg = document.getElementById('picDisplay');
// bannerImg.src = "data:image/png/jpg/jpeg;base64," + B64Img;


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("b-modal");

// Get the <span> element that closes the modal
let span = document.querySelector(".close");

// When the user clicks the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// the variable name 't' holds the title of the campaign
// receive donation amount and move to the payment page
let donateAmount = document.querySelector('.e-amount');

function proceed(){
  console.log("received")
  let campaignDb = campaignData;
  let donateAmountvalue = Number(donateAmount.value)
  let t = title.innerText
  const currentSession = campaignDb.findIndex(cmpn => cmpn.title == t)
  console.log(`the index is ${currentSession}`)
  console.log(typeof(currentSession))

  // if (currentSession && (donateAmountvalue > 0)) 
  if (donateAmountvalue > 0) {
  console.log(campaignDb)
  console.log(donateAmountvalue)
  campaignDb[idUrl].amountReceived += donateAmountvalue 

  localStorage.setItem("campaignDatabase", JSON.stringify(campaignDb.reverse()));
  
  window.location.href = './payment.html'
}
else {
  // alert("pls enter a valid amount")
  swal({
    title: "Low Donation Amount!",
    text: "Please enter an amount greater than 0!",
    icon: "error",
    button: "Try again",
  });
}

}

let campaignDb = campaignData
  let pbar = document.getElementById("myBar"); 
  let inputD = campaignDb[idUrl].amountReceived
  let targetAtest = campaignDb[idUrl].targetAmount;
  let inFlow = document.querySelector('in-flow')
  let setSpeed = (Number(inputD) / Number(targetAtest)) *100
  if(setSpeed >= 100){
        alert('completed')
      } else{
      console.log(setSpeed)
      console.log(inputD)
      document.querySelector(".progressIndicator").innerHTML = setSpeed +'%';
      pbar.value = setSpeed;
      document.querySelector('.in-flow').innerHTML = '₦' + nairaFormat.format(inputD)
      }


// function move(){
//   let campaignDb = campaignData
//   let pbar = document.getElementById("myBar"); 
//   let inputD = campaignDb[idUrl].amountReceived
//   let targetAtest = campaignDb[idUrl].targetAmount; 
//   let width
//   // pbar.max = 100;
//   let setSpeed = (Number(inputD) / Number(targetAtest)) *100

//     if(width >= 100){
//     alert('completed')
//   } else{
//     width += setSpeed
//     // localStorage.setItem('progress', width)
//   console.log(width)
//   document.querySelector(".progressIndicator").innerHTML = width +'%';
//   pbar.value = width; 
//   }
// }

// window.onload = (event) => {
//  setTimeout(move(), 2000)
//   // if(){
//   // setTimeout(display, 300)
//   // setTimeout(disableEdit, 500)
//   // }
  
// };
