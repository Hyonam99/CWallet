// SCREEN 1

// defining UI variables
const form = document.querySelector("#campaign-form");


// function to fetch Nigerian locations for the location selection
const getStates = async() => {
  let url = "https://locus.fkkas.com/api/all"
  let response = await axios.get(url)
  return response;
  // console.log(response);
}

// On window load attach state list on select option after Get success
window.onload = getStates().then(data => {
  // console.log(data);
  console.log(data.data.data[1].name)
  let statesArr = data.data.data;
  let select = document.getElementById('location');
  for (let i=0; i<statesArr.length; i++) {
    select.innerHTML = select.innerHTML + 
      `<option value="${statesArr[i].name}">${statesArr[i].name}</option>`;
  }
}).catch(error => console.log(error));

// Load all events on Fundraiser Campaign creation
fndraiserCamLoader();

function fndraiserCamLoader() {
  console.log("Loading Campaign 1");
  // Save and continue event
  form.addEventListener("submit", saveToLSandContinue);
}

// Save to local storage and continue
function saveToLSandContinue(e) {
  let campaignDatabase =
    JSON.parse(localStorage.getItem("campaignDatabase")) || [];

  console.log("campaign");
  console.log(campaignDatabase);
  let campaign = {
    title: document.querySelector("#campaign-title").value,
    Category: document.querySelector("#category").value,
    description: document.querySelector("#campaign-description").value,
    location: document.querySelector("#location").value,
    startDate: document.querySelector("#start-date").value,
    endDate: document.querySelector("#end-date").value,
    targetAmount: document.querySelector("#target-amount").value,
    amountReceived: 0
  };
  campaignDatabase.push(campaign);

  // set the campaign database in the local storage
  localStorage.setItem("campaignDatabase", JSON.stringify(campaignDatabase));

  // set window location
  window.location.href = "./fndraiserCam2.html";

  e.preventDefault();
}

// function to save as Draft
const saveDraft = () => {

  let draftDatabase =
    JSON.parse(localStorage.getItem("draftDatabase")) || [];

  let draftCampaign = {
    title: document.querySelector("#campaign-title").value,
    Category: document.querySelector("#category").value,
    description: document.querySelector("#campaign-description").value,
    location: document.querySelector("#location").value,
    startDate: document.querySelector("#start-date").value,
    endDate: document.querySelector("#end-date").value,
    targetAmount: document.querySelector("#target-amount").value,
    amountReceived: 0
  };

  draftDatabase.push(draftCampaign);

  // set the draft database in the local storage
  localStorage.setItem("draftDatabase", JSON.stringify(draftDatabase));

  // set window location
  window.location.href = "/analytics.html";

}




