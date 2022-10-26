"use strict";
const firstName = document.querySelector(".firstname");
const lasttName = document.querySelector(".lastname");
const phoneNumber = document.querySelector(".phonenumber");
const Message = document.querySelector("#C-message");
const contactBtn = document.querySelector(".contactbtn");
const contactEmail = document.querySelector(".email");
let dBaseContact = JSON.parse(localStorage.getItem("contactBase")) || [];

contactBtn.addEventListener("click", function () {
  let contactMe = {
    firstName: firstName.value,
    lasttName: lasttName.value,
    contactEmail: contactEmail.value,
    phoneNumber: phoneNumber.value,
    Message: Message.value,
  };
  dBaseContact.push(contactMe);
  localStorage.setItem("contactBase", JSON.stringify(dBaseContact));
});
