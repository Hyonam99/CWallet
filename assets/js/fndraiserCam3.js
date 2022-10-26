// SCREEN 3

// defining UI variables
const form3 = document.querySelector("#campaign-form3");

// Ensure accurate account number supplied
const checkAccountNum = () => {
    let acctNum = document.getElementById("account-number").value;
    let notifyError;
    let errorMsg = document.getElementById("error-msg");

    if (acctNum.length !== 10) {
        
        notifyError = "Please enter a valid account number";
        errorMsg.innerHTML = notifyError;

    }
    else {
        errorMsg.innerHTML = "";
    }
}

// function bClick(){

    
// }

// load all events
// saveToLSandLaunch
fndraiserCamLoader3()

function fndraiserCamLoader3() {
    form3.addEventListener("submit", saveToLSandLaunch
      )
}

// Save to Local Storage and launch campaign
function saveToLSandLaunch(e) {
    e.preventDefault();
    console.log("check");
    
   

    // get campaign data from database
     let campaignDatabase = JSON.parse(localStorage.getItem("campaignDatabase"))
    console.log(campaignDatabase);

    // for the last added campaign object to add new properties
    let campaign = campaignDatabase[campaignDatabase.length - 1];
    console.log(campaign);
    
    // adding new properties
    campaign.accountNumber = document.querySelector("#account-number").value;
    campaign.bankName = document.querySelector("#bank-name").value;

    console.log(campaign);
    console.log(campaignDatabase);

    // Set item in local Storage
    localStorage.setItem("campaignDatabase", JSON.stringify(campaignDatabase));

    // Get the modal
    // let modal = document.getElementById("myModal");
    // modal.style.display = "block";
   
    swal({
        title: "Campaign has been launched",
        text: `Your campaign is still under review but you can receive donations, goodluck!
        Do you want to go to your campaign dashboard or preview this campaign`,
        icon: "info",
        buttons: {
            proceed: "Dashboard",
        campaign: 'View  campaign',
    }
      })
      .then((campaignLaunched) => {
        switch (campaignLaunched) {
 
            case "proceed":
              swal("you will be redirected to the campaign dashboard shortly", {timer: 3500});
              console.log('analytics page')
              window.location.href = './analytics.html'
              break;
         
            case "campaign":
              swal("you will be redirected to the campaign details shortly", {timer: 3500});
              console.log('campaign page')
              window.location.href = './campaign_details.html'
              break;
      }
       
      });

      
    
}

// fetch bank list from API
const getBanks = async() => {
    let url = "https://staging-biz.coinprofile.co/v2/bank/supported?country=NG"
    let response = await fetch(url)
    let data = await response.json()
    return data;
  }
  
//  On window load attach bank list on select option after fetch success
  window.onload = getBanks().then(data => { 
    let bankArr = data.data;
    let select = document.getElementById('bank-name');
    for (let i = 0; i < bankArr.length; i++) {
        select.innerHTML = select.innerHTML +
        `<option value="${bankArr[i].Code}"> ${bankArr[i].Name} </option>`;
    }
    console.log(data.data[1].Name)
}).catch(error => console.log(error));


// Get the arrow icon that proceeds
let proceed = document.getElementById("arrow-icon")
proceed.onclick = function() {
    window.location.href = "./analytics.html" 
}

