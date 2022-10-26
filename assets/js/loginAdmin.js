let adminName = [
  {
    Name: 'Admin',
    Password: 'Altruadmin@cohort4'
  }
]

let nameEntry = document.querySelector('.password').value;
let mail = document.querySelector('.email').value;

if(nameEntry === adminName.Name && mail === adminName.Password){
  swal({
    title: "Cash Flow!",
    text: "You are a registered Admin",
    icon: "success",
    button: "Proceed",
  });
}else {
  swal({
    title: "Oops! Failed to Login",
    text: "Please Check your login details and try again",
    icon: "error",
    button: "Try again",
  });
}