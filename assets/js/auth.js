class Auth{
    constructor(){
        this.name = localStorage.getItem('name') || false;
    }

    checkLogin(){
        if(this.name!==false){
            return true;
        }else{
            return false;
        }
    }
    userFullName(){
        if(this.checkLogin()===true){
            return this.name;
        }else{
            return "";
        }
    }
    toPascalCase(str){
        let data = str.toLowerCase().trim().split(' ');
        let newData=[];

        data.forEach(element => { 
               let rest = element.slice(1);
                newData.push(element.charAt(0).toUpperCase()+rest)
        }); 
            return newData.join(' ');
    }
    showFullName(data){
        let initAll = document.querySelectorAll(data);
        for (let i = 0; i < initAll.length; i++) {
            initAll[i].innerText  = this.toPascalCase(this.userFullName());
        }
    }
    userInitial(){
        let Initial = this.name.split('');
        return Initial[0]; 
    }
    showInitial(id){
        let initAll = document.querySelectorAll(id);
        for (let i = 0; i < initAll.length; i++) {
            initAll[i].innerText  = this.userInitial().toUpperCase();
        }
    }
    displayNone(data){
        let initAll = document.querySelectorAll(data);
        for (let i = 0; i < initAll.length; i++){
            initAll[i].style.display  = 'none';
        }
    }
    changeAttr(elem, to){
        let initAll = document.querySelectorAll(elem);
        for (let i = 0; i < initAll.length; i++){
            initAll[i].setAttribute("href", to);
        }
    }
    changeValue(elem, to){
        let initAll = document.querySelectorAll(elem);
        for (let i = 0; i < initAll.length; i++){
            initAll[i].innerHTML= to;
        }
    }


}

