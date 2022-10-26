class CampaignPreview{
    constructor(containerID){
        this.campaignBox = containerID;
    } 
    getAllCampaign(key){ // allUsers
        let allCampaign = JSON.parse(localStorage.getItem(key)) || [];
        return allCampaign;
    }
    toCurrency(amount){
        let formatType = Intl.NumberFormat('en-US');
        return formatType.format(amount);
    }
    daysLeft(startDate, endDate){
            let difMs = (endDate - startDate); 
            if(difMs<=0){ 
                return "<span style='color:red'>expired</span>"; 
            }else{
                let difDays = Math.floor(difMs / 86400000);
                let difHrs = Math.floor((difMs % 86400000) / 3600000);
                let difMins = Math.round(((difMs % 86400000) % 3600000) / 60000);
                 //return difMs / 86400000
                if(difDays <= 0 && difHrs<24 && difHrs>=1 ){
                    return difHrs + " hr left";
                }else if(difDays <= 0 && difHrs <=0 && difMins<60 && difMins>=1 ){ 
                    return difMins + " min left";
                }  
                return difDays + " days left";
            }
    }
    todayDate(){
        let date = new Date();
	    let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        return current_date;
    }
    checkPercentage(targetAmount, amountReceived){
        let percent = Math.floor(100*amountReceived/targetAmount);
        return percent; 
    }
    trimTitle(string, length){
        let str = string.split('').slice(0,length).join('');
        if(string.length>length){
            return str +' ...';
        }
        return str;
    }
 
   showCampaignByLimit(limit){

    let allCampaign = this.checkCampaign();
    if(allCampaign===false) return ;
 
        let name = localStorage.getItem('name') || '';
        let initial = name[0].toUpperCase() || ''; 
        let camp = "";  
        let  viewCampaign =0;

    if(limit && allCampaign.length>=limit){
        viewCampaign = limit;
    }else{
        viewCampaign = allCampaign.length;
    }
       
    for(let element=0; element<viewCampaign;element++){
        camp += `
            <div class="ft-cont">
                <div class="img">
                    <img src="data:image/png;base64, ${allCampaign[element].CardImg}" alt="">
                </div>
                <div class="cont">
                    <p class="title">${this.trimTitle(allCampaign[element]['title'],80)}</p>
                    <div class="author"><span class="circle">${initial}</span>by ${name}</div>
                    <div class="price">#${this.toCurrency(allCampaign[element]['amountReceived'])} <span>raised out of #${this.toCurrency(allCampaign[element]['targetAmount'])}</span> </div>
                    <div class="progress-bar">
                        <div class="inner-progress-bar" style="width:${this.checkPercentage(allCampaign[element]['targetAmount'], allCampaign[element]['amountReceived'])}%;"></div>
                    </div> 
                    <div class="duration">
                        <span>${this.checkPercentage(allCampaign[element]['targetAmount'], allCampaign[element]['amountReceived'])}% <span class="secondary-color">complete</span></span> <span><i class="fas fa-clock"></i> ${
                            this.daysLeft(new Date(this.todayDate()), new Date(allCampaign[element]['endDate']  ) )}</span>
                    </div>
                    <div class="action">
                        <a href="#" class="btn btn-outline-color"><i class="fas fa-share"></i> SHARE</a>
                        <a href="campaign_details.html?id=${element}" class="btn btn-color text-white" onclick="">DONATE NOW</a>
                    </div>
                    <div class="click text-center"><a href="./campaign_details.html?id=${element}" >Click to view more</a></div>
                </div>
            </div>
        `;
    }
        if(camp!=''){
            return document.getElementById(this.campaignBox).innerHTML=camp;
        }
    }

    checkCampaign(){
            let allCampaign = this.getAllCampaign('campaignDatabase').reverse();
            if(allCampaign.length<1){
                const container = document.createElement("div");
                const content   = document.createTextNode("There is no Campaign currently running in the localStorage, Kindly create a campaign"); 
                container.setAttribute("class", "ft-cont");
                container.appendChild(content);  
                document.getElementById(this.campaignBox).appendChild(container);
                return false;
            }else{
                return allCampaign ;
            }
    }
 
    showAllCampaign(limit){
        let result = this.showCampaignByLimit(limit);
        return result;
    }

}