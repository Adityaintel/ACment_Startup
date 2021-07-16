const emailValidator = (event) => {
  let email = event.target.email.value;
  let email__error = document.querySelector(".email__error");
  if (email === null || email === "") {
    email__error.innerHTML = "*email should be filled";
    return false;
  } else {
    email__error.innerHTML = "";
  }
  return true;
};

const passwordValidator = (event) => {
  let password = event.target.password.value;
  let password__error = document.querySelector(".password__error");
  if (password === null || password === "") {
    password__error.innerHTML = "*password should be filled";
    return false;
  } else {
    password__error.innerHTML = "";
  }
  return true;
};

export const loginValidator = (event) => {
  if (!emailValidator(event)) {
    console.log("*error in email field");
    return false;
  }
  if (!passwordValidator(event)) {
    console.log("*error in password field");
    return false;
  }
  return true;
};
