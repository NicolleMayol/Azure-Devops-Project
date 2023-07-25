function togglePasswordVisibility() {
  console.log('whyy is this not working anymore')
  const passwordInput = document.getElementById("password");
  const visibilityButton = document.getElementById("visibility-button");
  const imgSrc = passwordInput.type === "password" ? "./assets/icon-pass-hide-login.3b4c819ab8a1de32ad85.png" : "./assets/icon-pass-show-login.406d2097166c4e8e0e1c.png";
  const imgAlt = passwordInput.type === "password" ? "Hide password" : "Show password";
  
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  visibilityButton.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;

  // Remove the event listener before adding it again
  visibilityButton.removeEventListener("click", togglePasswordVisibility);
  visibilityButton.addEventListener("click", togglePasswordVisibility);
}

function enableLoginButton() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const loginButton = document.getElementById("login-button");
  const passwordLabel = document.getElementById("password-label");
  const emailLabel = document.getElementById("email-label");
  
  function checkEmailValidity() {
    const emailIsEmpty = emailInput.value === "";
    emailInput.classList.toggle("invalid", emailIsEmpty);
    emailError.innerHTML = emailIsEmpty ? "<img src='./assets/icon-validation-error.png'> Ingresa un usuario válido" : "";
    emailLabel.innerHTML = emailIsEmpty ? "<span style='color:#b0002a'>Usuario</span>" : "Usuario";
  }
  
  function checkPasswordValidity() {
    const passwordIsInvalid = passwordInput.value.length < 6;
    passwordInput.classList.toggle("invalid", passwordIsInvalid);
    passwordError.innerHTML = passwordIsInvalid ? "<img src='./assets/icon-validation-error.png'> Debe tener 6 caracteres" : "";
    passwordLabel.innerHTML = passwordIsInvalid ? "<span style='color:#b0002a'>Contraseña</span>" : "Contraseña";
  }
  
  emailInput.addEventListener("input", function () {
    checkEmailValidity();
    checkButtonValidity();
  });
  
  passwordInput.addEventListener("input", function () {
    checkPasswordValidity();
    checkButtonValidity();
  });
  
  function checkButtonValidity() {
    loginButton.disabled = emailInput.value === "" || passwordInput.value.length < 6;
  }
  
  loginButton.addEventListener("click", function (event) {
    if (loginButton.disabled) {
      event.preventDefault();
    } else {
      window.location.href = "/";
    }
  });

  loginButton.addEventListener("click", function (event) {
    if (loginButton.disabled) {
      event.preventDefault();
    } else {
      $.post("/login", { email: emailInput.value, password: passwordInput.value }, function () {
        window.location.href ="/";
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const visibilityButton = document.getElementById("visibility-button");
  visibilityButton.addEventListener("click", togglePasswordVisibility);
  const emailInput = document.getElementById("email");
  
  emailInput.addEventListener("input", function() {
    enableLoginButton();
  });
  
  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("input", enableLoginButton);
  
  enableLoginButton();
});
