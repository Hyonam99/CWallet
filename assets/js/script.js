'use strict';

function toggleView(elementToToggleId, classToToggle) {
  let divID = document.getElementById(elementToToggleId);
    if(arguments.length==2){
      divID.classList.toggle(classToToggle);
    }else if(arguments.length>2){
      for(let i=1;i<arguments.length;i++){
          divID.classList.toggle(arguments[i]);
      }
    }
}
 
// Shows Loading effect on pageLoad
function preloader(){
    window.addEventListener('load', function() { 
      document.querySelector(".preloader").classList.add('preloader-deactivate');
    });
}

 


/*
function addRemoveClass(toggleId, toggleClass){
 let divID =  document.getElementById(toggleId);
 divID.classList.add(toggleClass);
}*/

function faqAccordion(elementTitleID) {
  let elementTitles = document.querySelector(`#${elementTitleID} #accord-body`);
  elementTitles.classList.toggle("d-none");

  let plusMinus = document.querySelector(`#${elementTitleID} .accord-title i`);
  plusMinus.classList.toggle("fa-plus");
  plusMinus.classList.toggle("fa-minus");
}

const toUp = document.querySelector("#scrollup-footer");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    toUp.classList.add("active");
  } else {
    toUp.classList.remove("active");
  }
});
