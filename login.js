import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  confirmPasswordReset,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration
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

// Function to handle login
function handleLogin(event) {
  event.preventDefault();
  const loginInput = document.getElementById("loginInput").value;
  const password = document.getElementById("loginPassword").value;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);
  const isPhoneNumber = /^\+?[0-9]{10,14}$/.test(loginInput);

  if (isEmail) {
    // Email login
    signInWithEmailAndPassword(auth, loginInput, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.emailVerified) {
          // Close the login popup
          document.getElementById("popup-overlay").style.display = "none";

          // Change the button text to "ჩემი პროფილი"
          const openPopupBtn = document.getElementById("open-popup-btn");
          openPopupBtn.innerText = "ჩემი პროფილი";

          // Add event listener to redirect to "myprofile" page
          openPopupBtn.addEventListener("click", function () {
            if (openPopupBtn.innerText === "ჩემი პროფილი") {
              window.location.href = "./myProfilePage/index.html";
            }
          });
        } else {
          sendEmailVerification(user)
            .then(() => {})
            .catch((error) => {
              console.error("Error sending verification email:", error.message);
            });
        }
      })
      .catch((error) => {
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").textContent = error.message;
        document.getElementById("loginInput").style.border = "2px solid red";
        document.getElementById("passwordInput").style.border = "2px solid red";
      });
  } else if (isPhoneNumber) {
    // Phone number login
    const formattedPhoneNumber = loginInput.startsWith("+")
      ? loginInput
      : `+995${loginInput}`;
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        const verificationCode = prompt(
          "შეიყვანეთ კოდი, რომელიც თქვენ მიიღეთ SMS-ით:"
        );
        return confirmationResult.confirm(verificationCode);
      })
      .then((result) => {
        // Phone number verified and login successful
        document.getElementById("forgot-password-popup").style.display = "none";
        const openPopupBtn = document.getElementById("open-popup-btn");
        openPopupBtn.innerText = "ჩემი პროფილი";
        openPopupBtn.addEventListener("click", function () {
          if (openPopupBtn.innerText === "ჩემი პროფილი") {
            window.location.href = "./myProfilePage/index.html";
          }
        });
      })
      .catch((error) => {
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").textContent = error.message;
      });
  } else {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").textContent =
      "გთხოვთ, შეიყვანეთ ვალიდური მეილი ან ტელეფონის ნომერი.";
  }
}

// Attach the login handler to the submit button
document.getElementById("submit").addEventListener("click", handleLogin);

const facebookButton = document.getElementById("facebook");

facebookButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Create an instance of the Facebook provider object
  const provider = new FacebookAuthProvider();

  // Sign in with a popup
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log("User signed in:", user);
      console.log("Facebook Access Token:", accessToken);

      document.getElementById("popup-overlay").style.display = "none";

      // Change the button text to "ჩემი პროფილი"
      const openPopupBtn = document.getElementById("open-popup-btn");
      openPopupBtn.innerText = "ჩემი პროფილი";

      // Add event listener to redirect to "myprofile" page
      openPopupBtn.addEventListener("click", function () {
        if (openPopupBtn.innerText === "ჩემი პროფილი") {
          window.location.href = "./myProfilePage/index.html";
        }
      });
      window.location.href = "signIn.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.error("Error signing in with Facebook:", errorMessage);
    });
});

const googleButton = document.getElementById("google");
googleButton.addEventListener("click", function (event) {
  event.preventDefault();

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      document.getElementById("popup-overlay").style.display = "none";

      // Change the button text to "ჩემი პროფილი"
      const openPopupBtn = document.getElementById("open-popup-btn");
      openPopupBtn.innerText = "ჩემი პროფილი";

      // Add event listener to redirect to "myprofile" page
      openPopupBtn.addEventListener("click", function () {
        if (openPopupBtn.innerText === "ჩემი პროფილი") {
          window.location.href = "./myProfilePage/index.html";
        }
      });
    })
    .catch((error) => {
      // Handle errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// Handle 'Forgot Password' button click// Handle 'Forgot Password' button click
document
  .getElementById("forgot-password")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Display the popup for entering the email
    document.getElementById("forgot-password-popup").style.display = "flex";
  });

// Handle 'Submit' button click for email verification
document
  .getElementById("verification-submit")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const emailInput = document
      .getElementById("verification-input")
      .value.trim();
    const errorMessageElement = document.getElementById("verification-error");

    try {
      // Check if the email exists in Firebase
      const auth = getAuth();
      const signInMethods = await fetchSignInMethodsForEmail(auth, emailInput);

      if (signInMethods.length === 0) {
        // Display an error message if the email is not found
        errorMessageElement.style.display = "block";
        errorMessageElement.textContent = "Email not found in the system.";
        return; // Exit the function early
      }

      // Generate a 5-digit verification code
      const verificationCode = Math.floor(
        10000 + Math.random() * 90000
      ).toString();

      // In a real application, send the verification code to the user's email
      console.log(`Verification code for ${emailInput}: ${verificationCode}`);

      // Store the email and verification code (in a real app, store these securely)
      window.resetEmail = emailInput;
      window.resetCode = verificationCode;

      // Automatically close the email input popup and open the verification code popup
      document.getElementById("forgot-password-popup").style.display = "none";
      document.getElementById("verification-code-popup").style.display = "flex";

      // Focus on the verification code input field
      document.getElementById("verification-code-input").focus();

      // Optionally, display a message to the user
    } catch (error) {
      errorMessageElement.style.display = "block";
      errorMessageElement.textContent = error.message;
    }
  });

// Handle 'Submit' button click for verifying the code
document
  .getElementById("verify-submit")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const codeInput = document
      .getElementById("verification-code-input")
      .value.trim();

    if (codeInput === window.resetCode) {
      // Code is correct, show the password reset form
      document.getElementById("verification-code-popup").style.display = "none";
      document.getElementById("new-password-popup").style.display = "flex";
    } else {
    }
  });

// Handle 'Submit' button click for resetting the password
document
  .getElementById("new-password-submit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword === confirmPassword) {
      // In a real application, reset the password in the database or with Firebase Auth
      console.log(`Password reset for ${window.resetEmail}`);

      document.getElementById("new-password-popup").style.display = "none";

      // Clear stored data
      window.resetEmail = null;
      window.resetCode = null;
    } else {
      const newPasswordErrorElement =
        document.getElementById("new-password-error");
      newPasswordErrorElement.style.display = "block";
      newPasswordErrorElement.textContent = "Passwords do not match.";
    }
  });

// Check if the email is registered

// // Event listener for showing the phone number verification popup
// document
//   .getElementById("forgot-password")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     // Display the popup for phone number verification
//     document.getElementById("forgot-password-popup").style.display = "flex";
//   });

// // Event listener for sending the verification code to the phone number
// document
//   .getElementById("verification-submit")
//   .addEventListener("click", function (e) {
//     e.preventDefault();

//     // Get the phone number input value
//     let phoneNumber = document.getElementById("verification-input").value;

//     // Basic validation for phone number format (you can adjust this regex for your needs)
//     const isPhoneNumber = /^\+?[0-9]{10,14}$/.test(phoneNumber);

//     if (isPhoneNumber) {
//       // Prepend country code if it's not included
//       if (!phoneNumber.startsWith("+")) {
//         phoneNumber = `+995${phoneNumber}`;
//       }

//       // Setup Recaptcha verifier to prevent abuse of the verification process
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {},
//         auth
//       );
//       const appVerifier = window.recaptchaVerifier;

//       // Send the verification code to the phone number
//       signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//           // Store the confirmation result to use for verifying the code later
//           window.confirmationResult = confirmationResult;
//           alert("Verification code sent to your phone.");

//           // Hide the phone number popup and show the verification code popup
//           document.getElementById("forgot-password-popup").style.display =
//             "none";
//           document.getElementById("verification-popup").style.display = "flex";
//         })
//         .catch((error) => {
//           // Show error message if there's an issue with sending the code
//           document.getElementById("verification-error").style.display = "block";
//           document.getElementById("verification-error").textContent =
//             error.message;
//         });
//     } else {
//       // Show error message if the phone number is not valid
//       document.getElementById("verification-error").style.display = "block";
//       document.getElementById("verification-error").textContent =
//         "Please enter a valid phone number.";
//     }
//   });

// // Event listener for submitting the verification code
// document
//   .getElementById("verification-submit")
//   .addEventListener("click", function (e) {
//     e.preventDefault();

//     // Get the verification code input value
//     const code = document.getElementById("verification-input").value;

//     // Use the confirmation result to confirm the verification code
//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         // If the verification is successful, the user is signed in
//         const user = result.user;
//         alert("Phone number verified successfully!");

//         // Hide the verification code popup
//         document.getElementById("verification-popup").style.display = "none";

//         // Here you can redirect the user or perform other actions after successful verification
//       })
//       .catch((error) => {
//         // Show error message if the verification code is incorrect
//         document.getElementById("verification-error").style.display = "block";
//         document.getElementById("verification-error").textContent =
//           error.message;
//       });
//   });

// Get the elements
const backToLoginLink = document.getElementById("back-to-login");
const forgotPasswordPopup = document.getElementById("forgot-password-popup");
const popupOverlay = document.getElementById("popup-content");
const authForm = document.getElementById("auth-form");
const regForm = document.getElementById("reg-form");
const popupHeader = document.querySelector(".popup-header h2");

// Event listener for the "უკან" (Back) link
backToLoginLink.addEventListener("click", () => {
  // Hide the password reset popup
  forgotPasswordPopup.style.display = "none";

  // Show the main popup overlay (authorization view)
  popupOverlay.style.display = "block";
  ს;

  // Reset to the initial authorization form state
  authForm.classList.remove("hidden");
  regForm.classList.add("hidden");

  // Update the header text back to "გაიარეთ ავტორიზაცია"
  popupHeader.innerHTML = "გაიარეთ ავტორიზაცია";
});

const openPopupBtn = document.getElementById("open-popup-btn");

// Function to handle the authentication state
function handleAuthState(user) {
  if (user) {
    // User is signed in, change the button text to "ჩემი პროფილი"
    openPopupBtn.innerText = "ჩემი პროფილი";

    // Redirect to the profile page when the button is clicked
    openPopupBtn.addEventListener("click", function () {
      window.location.href = "./myProfilePage/index.html";
    });
  } else {
    // User is not signed in, keep the button as "შესვლა"
    openPopupBtn.innerText = "შესვლა";

    // Redirect to the login page or show login popup
    openPopupBtn.addEventListener("click", function () {
      // Show login popup or redirect to login page
    });
  }
}

// Check the user's authentication state when the page loads
onAuthStateChanged(auth, (user) => {
  handleAuthState(user);
});
function checkHeaderText() {
  fetch("http://127.0.0.1:5501/index.html")
    .then((response) => response.text())
    .then((data) => {
      // Create a DOM parser to parse the index.html content
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Check if the header contains "ჩემი პროფილი"
      const header = doc.querySelector("header");
      if (header && header.textContent.includes("ჩემი პროფილი")) {
        // Update headers on other pages
        updateHeaders("ჩემი პროფილი");
      }
    })
    .catch((error) => console.error("Error fetching index.html:", error));
}

checkHeaderText();
function handleLogout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User logged out successfully");
      // Redirect to index.html
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // An error happened.
      console.error("Error logging out:", error.message);
    });
}

// Attach the logout handler to the logout button
document
  .getElementById("logout-button")
  .addEventListener("click", handleLogout);

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("eye");

// On page load, reset to default (hidden)
window.onload = function () {
  passwordInput.setAttribute("type", "password");
  togglePassword.classList.remove("fa-eye-slash"); // Ensure no slash on load
  togglePassword.classList.add("fa-eye");
};

// Toggle password visibility and icon change
togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle between eye and eye-slash icons
  if (type === "text") {
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});
