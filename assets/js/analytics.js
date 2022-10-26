const totalCampaign = document.querySelectorAll(".total-campaign");
const totalAmountReceived = document.querySelectorAll(".total-received");
const campaignOpenRate = document.querySelectorAll(".campaign-open-rate");
const completedCampaign = document.querySelectorAll(".completed-campaign");
const analyticsTableBody = document.getElementById("analytic-body");
const dataTable = document.querySelector(".data-table");


let campaignData = localStorage.getItem("campaignDatabase");

if (campaignData) {
    campaignData = JSON.parse(campaignData);
} else {
    let p = document.createElement("p");
    p.setAttribute("class", "empty-campaign");
    p.textContent = "No hosted  campigns";
    dataTable.appendChild(p);
}

// Stat Data
totalCampaign.forEach(each => each.textContent = campaignData ? campaignData.length : 0);

totalAmountReceived.forEach(each => {
    each.textContent = campaignData
    ? "₦" +
      campaignData
          .map((eachCampaign) => {
              return eachCampaign.amountReceived;
          })
          .reduce((acc, cur) => {
              return Number(acc) + Number(cur);
          }, 0)
    : "₦" + 0;
})

campaignOpenRate.forEach(each => each.textContent = campaignData ? `${campaignData.length}%` : 0);

completedCampaign.forEach(each => {
    each.textContent = campaignData
    ? campaignData.filter(
          (eachCampaign) =>
              eachCampaign.targetAmount == eachCampaign.amountReceived
      ).length
    : 0;
})

// Function to generate table row
let createRow = (campaign) => {
    let tr = document.createElement("tr");

    let campaignName = document.createElement("td");
    campaignName.textContent = campaign.title;

    let startDate = document.createElement("td");
    startDate.textContent = campaign.startDate;

    let endDate = document.createElement("td");
    endDate.textContent = campaign.endDate;

    let amountReceived = document.createElement("td");
    amountReceived.textContent = "₦" + campaign.amountReceived;

    let targetAmount = document.createElement("td");
    targetAmount.textContent = "₦" + campaign.targetAmount;

    let progress = document.createElement("td");
    progress.textContent =
        (
            (Number(campaign.amountReceived) / Number(campaign.targetAmount)) *
            100
        ).toFixed(2) + "%";
    if (campaign.amountReceived == campaign.targetAmount) {
        progress.textContent = "Completed";
        progress.setAttribute("class", "completed");
    }

    // let action = document.createElement("td");
    // action.setAttribute("class", "action");
    // action.textContent = "...";

    tr.append(
        campaignName,
        startDate,
        endDate,
        amountReceived,
        targetAmount,
        progress
    );

    return tr;
};

// Map through the array of campaigns
campaignData && campaignData.map((campaign) => {
    analyticsTableBody.prepend(createRow(campaign));   
});