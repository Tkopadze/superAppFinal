import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk-ILy4a3B6f0bVpMGUDT-Ad4bK7RDcXQ",
  authDomain: "login-c102a.firebaseapp.com",
  projectId: "login-c102a",
  storageBucket: "login-c102a.appspot.com",
  messagingSenderId: "761789754250",
  appId: "1:761789754250:web:ac3ae41c5e67c1c53df673",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function addErrorBorder(elementId) {
  document.getElementById(elementId).classList.add("error-border");
}

function clearErrorStates() {
  document.getElementById("reg-errorMessage").style.display = "none";
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("error-border");
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

const registerButton = document.getElementById("register");
registerButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearErrorStates();

  let hasError = false;

  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    document.getElementById("reg-errorMessage").style.display = "block";
    document.getElementById("reg-errorMessage").textContent =
      "Passwords do not match.";
    addErrorBorder("password");
    addErrorBorder("confirmPassword");
    hasError = true;
    return;
  }

  if (email && !validateEmail(email)) {
    addErrorBorder("email");
    document.getElementById("reg-errorMessage").style.display = "block";
    document.getElementById("reg-errorMessage").textContent =
      "Please provide a valid email.";
    hasError = true;
  }

  // Check if phone number is provided and valid
  if (!email && !phoneNumber) {
    addErrorBorder("phoneNumber");
    document.getElementById("reg-errorMessage").style.display = "block";
    document.getElementById("reg-errorMessage").textContent =
      "Please provide either an email or phone number.";
    hasError = true;
  }

  if (hasError) {
    return;
  }
  if (email) {
    // Register with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById("reg-errorMessage").style.display = "block";
        document.getElementById("reg-errorMessage").textContent = errorMessage;
      });
  } else if (phoneNumber) {
    // Register with phone number
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );

    const appVerifier = window.recaptchaVerifier;

    // Format the phone number
    let formattedPhoneNumber = phoneNumber;
    if (!formattedPhoneNumber.startsWith("+")) {
      formattedPhoneNumber = `+995${formattedPhoneNumber}`;
    }

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("Verification code sent!");

        // Prompt the user to enter the verification code
        const verificationCode = prompt(
          "Enter the verification code you received:"
        );
        return confirmationResult.confirm(verificationCode);
      })
      .then((result) => {
        const user = result.user;
        alert("Phone number verified and account created successfully!");
        // Redirect or perform other actions after registration
        window.location.href = "register.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById("reg-errorMessage").style.display = "block";
        document.getElementById("reg-errorMessage").textContent = errorMessage;
      });
  } else {
    document.getElementById("reg-errorMessage").style.display = "block";
    document.getElementById("reg-errorMessage").textContent =
      "Please provide either an email or phone number.";
  }
});
