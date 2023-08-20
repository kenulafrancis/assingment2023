document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("details-section");
  const continueBtn = document.getElementById("continueBtn");
  const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to validate names
  const phoneRegex = /^\d+$/; // Regular expression to validate phone numbers

  const fullNameError = document.getElementById("fullNameError");
  const mobileNumberError = document.getElementById("mobileNumberError");
  const emailError = document.getElementById("emailError");
  const confirmEmailError = document.getElementById("confirmEmailError");

  // Initialize intl-tel-input plugin on the mobileNumber input
  const mobileNumberInput = document.getElementById("mobileNumber");
  const iti = window.intlTelInput(mobileNumberInput, {
    separateDialCode: true, // Display country codes in the dropdown
  });

  form.addEventListener("input", () => {
    const isFormValid = form.checkValidity() && validateInputs();
    continueBtn.disabled = !isFormValid;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return; // Don't proceed if inputs are invalid
    }

    // Get the selected country code and phone number
    const selectedCountryCode = iti.getSelectedCountryData().dialCode;
    const mobileNumber = iti.getNumber();

    // Store user inputs in localStorage
    const formData = {
      fullName: form.fullName.value,
      countryCode: selectedCountryCode, // Use the selected country code
      mobileNumber: mobileNumber, // Use the enhanced input value
      email: form.email.value,
      confirmEmail: form.confirmEmail.value,
      gender: form.gender.value,
    };
    localStorage.setItem("userData", JSON.stringify(formData));

    // Redirect to Payment page
    window.location.href = "payment.html";
  });

  // Function to validate name, phone number, and email inputs
  function validateInputs() {
    const fullNameInput = form.fullName;
    const mobileNumberInput = form.mobileNumber;
    const emailInput = form.email;
    const confirmEmailInput = form.confirmEmail;

    const fullName = fullNameInput.value.trim();
    const mobileNumber = mobileNumberInput.value.trim();
    const email = emailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();

    const isNameValid = nameRegex.test(fullName);
    const isPhoneValid = phoneRegex.test(mobileNumber);
    const isEmailValid = isValidEmail(email);
    const areEmailsMatching = email === confirmEmail;

    fullNameError.textContent = isNameValid ? "" : "Please enter a valid name.";
    mobileNumberError.textContent = isPhoneValid ? "" : "Please enter a valid phone number.";
    emailError.textContent = isEmailValid ? "" : "Please enter a valid email address.";
    confirmEmailError.textContent = areEmailsMatching ? "" : "Email addresses do not match.";

    // Set error message text color to red
    const errorTextColor = "#FF0000"; // Red color
    fullNameError.style.color = isNameValid ? "" : errorTextColor;
    mobileNumberError.style.color = isPhoneValid ? "" : errorTextColor;
    emailError.style.color = isEmailValid ? "" : errorTextColor;
    confirmEmailError.style.color = areEmailsMatching ? "" : errorTextColor;

    return isNameValid && isPhoneValid && isEmailValid && areEmailsMatching;
  }

  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Retrieve summary table values from localStorage and populate the table
  const storedSummaryDate = localStorage.getItem("summaryDate");
  const storedSummaryTime = localStorage.getItem("summaryTime");
  const storedSummaryDuration = localStorage.getItem("summaryDuration");
  const storedSummaryTickets = localStorage.getItem("summaryTickets");
  const storedSummaryTotal = localStorage.getItem("summaryTotal");

  if (storedSummaryDate && storedSummaryTime && storedSummaryDuration && storedSummaryTickets && storedSummaryTotal) {
    document.getElementById("summaryDate").textContent = storedSummaryDate;
    document.getElementById("summaryTime").textContent = storedSummaryTime;
    document.getElementById("summaryDuration").textContent = storedSummaryDuration;
    document.getElementById("summaryTickets").innerHTML = storedSummaryTickets;
    document.getElementById("summaryTotal").textContent = storedSummaryTotal;
  }
});
