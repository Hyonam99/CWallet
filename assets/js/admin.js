
let dataProg = document.querySelector('.camps-in-prog');
let dataRev = document.querySelector('.camps-rev');
let tableData = document.querySelector('.table-body');
let complaints = document.querySelector('.complaints')
let allUsers = document.querySelector('.all-users')
let UnverifiedUsers = document.querySelector('.unverified')


//get data from the relevant localstorage keys
let admincontactdb = JSON.parse(localStorage.getItem('contactBase')) || [];
let admindCampaigndb = JSON.parse(localStorage.getItem('campaignDatabase')) || [];
let adminUsersdb = JSON.parse(localStorage.getItem('userBase'))||[]
//supply the data to the dashboard 
complaints.innerHTML=admincontactdb.length;
dataProg.innerHTML=admindCampaigndb.length;
dataRev.innerHTML=admindCampaigndb.length;
allUsers.innerHTML=adminUsersdb.length
UnverifiedUsers.innerHTML=adminUsersdb.length



//this section is used for displaying the existing data dynamically 
for(let i =0;i<admindb.length;i++){
    let tr = document.createElement('tr')
    tr.innerHTML=`<td>${admindb[i]['title']}</td> 
                <td>${admindb[i]['title']}</td>
                <td>${admindb[i]['startDate']}</td>
                <td>${admindb[i]['endDate']}</td>
                <td>${'&#x20A6 '}${parseInt(admindb[i]['targetAmount']).toLocaleString("en-US")}</td>
                <td style="color:gold;">pending</td>
                <td><div class="action"></div></td>`
    tableData.append(tr)
}


