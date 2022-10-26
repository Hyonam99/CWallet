// SCREEN 2

// defining UI variables
const form2 = document.querySelector("#campaign-form2");
const imgInput = document.querySelector("#imgInput");
const imgBox = document.querySelector(".imgBox");
const galleryInput = document.querySelector("#imgInput2");


// function call to load all events on screen two
fndraiserCamLoader2();

// initiate all events on screen two
function fndraiserCamLoader2() {
  console.log("Loading campaign 2");
  if (imgInput) {
    console.log("hi");
    imgInput.addEventListener("change", acceptDisplayImg);
    imgBox.addEventListener("dragenter", doDragEnter);
    imgBox.addEventListener("dragover", doDragOver);
    imgBox.addEventListener("drop", doDrop);
    galleryInput.addEventListener("change", acceptDisplayGal);
    form2.addEventListener("submit", saveToLSandContinue2);
  }
}

// capture images from input(type=file) for the imgBox
function acceptDisplayImg() {
  console.log("codeCheck");
  // Encode the file using the FileReader API
  const reader = new FileReader();
  // let result = ""
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    
    document.querySelector(".image-guide").style.display = "none";
    document.querySelector(".image-resolution").style.display = "none";
    document.querySelector("#cardImg").src = `${uploaded_image}`;
    document.querySelector("#cardImg").style.display = "block";

  });
  reader.readAsDataURL(this.files[0]);        
}

// for the dragenter event to activate drop target
function doDragEnter(event) {
  // check if its an image
  const isImg = event.dataTransfer.types.includes(
    "image/jpg",
    "image/png",
    "image/jpeg"
  );
  if (isImg) {
    console.log("correct image");

    // preventing default action to trigger dragenter
    event.preventDefault();
  } else {
    console.log("wrong image");
  }
}

// for the dragover event to activate drop target
function doDragOver(event) {
  // check if its an image
  // const isImg = event.dataTransfer.types.includes("image/jpg, image/png, image/jpeg");
  if (event) {
    console.log("right image");
    // preventing default action to trigger dragenter
    event.preventDefault();
  } else {
    console.log("false image");
  }
}

// for the drop event
function doDrop(event) {
  const image = event.dataTransfer.getData("text/uri-list");
  document.querySelector(".imgBox").style.backgroundImage = `url(${image})`;

  event.preventDefault();
}

// for the img gallery - collect images from input field
function acceptDisplayGal(e) {
  console.log("gallery-check");
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Get a reference to the files
    const files = e.target.files; // file list containing all uploaded files
    
    // set the images container to be empty
    const output = document.querySelector(".gallery-container");
    output.innerHTML = "";

    // loop through files to make sure only images and skip if not an img
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue; 

      const imgReader = new FileReader();

      imgReader.addEventListener("load", (ev) => {
        const picFile = ev.target;

        // creating a div element for the images
        const div = document.createElement("div");
        div.innerHTML = `<img class="thumbnail" id="gal-images" src="${picFile.result}" title="${picFile.name}"/>`;
        output.appendChild(div);
      });
      imgReader.readAsDataURL(this.files[i]);
    }
  } else {
    alert("Your browser does not support File API");
  }
  
}

// Save to local storage and continue
function saveToLSandContinue2(e) {
  e.preventDefault();

  console.log("Saving to local storage...");

  // convert the campaign img to base64 string and save to localStorage
  let campaignImg = document.getElementById('cardImg');
  let base64CardImg = getBase64ImageCard(campaignImg);

  // convert the gallery imgs to base64 string and save to localStorage
  bannerImage = document.getElementById('gal-images');
  base64GalImages = getBase64Image(bannerImage);

  // get campaign data from database
  let campaignDatabase = JSON.parse(localStorage.getItem("campaignDatabase"));
  let campaign = campaignDatabase[campaignDatabase.length - 1];

  // adding images to the campaign data
  campaign.CardImg = base64CardImg;
  campaign.GalImages = base64GalImages;

  // set item in localStorage
  localStorage.setItem("campaignDatabase", JSON.stringify(campaignDatabase));

  window.location.href = "/fndraiserCam3.html"
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
}
function getBase64ImageCard(simg) {
  var canvas = document.createElement("canvas");
  canvas.width = simg.width;
  canvas.height = simg.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(simg, 0, 0, canvas.width, canvas.height);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
}