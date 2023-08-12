document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("details-section");
  const continueBtn = document.getElementById("continueBtn");

  // Initialize intl-tel-input plugin on the mobileNumber input
  const mobileNumberInput = document.getElementById("mobileNumber");
  const iti = window.intlTelInput(mobileNumberInput, {
    separateDialCode: true, // Display country codes in the dropdown
  });

  // Load previously stored user data from localStorage
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    form.fullName.value = userData.fullName;
    form.email.value = userData.email;
    form.confirmEmail.value = userData.confirmEmail;
    form.gender.value = userData.gender;

    // Load summary table values from Ticket page localStorage
    const summaryDate = localStorage.getItem("summaryDate");
    const summaryTime = localStorage.getItem("summaryTime");
    const summaryDuration = localStorage.getItem("summaryDuration");
    const summaryTickets = localStorage.getItem("summaryTickets");
    const summaryTotal = localStorage.getItem("summaryTotal");

    // Populate the summary table with Ticket page data
    document.getElementById("summaryDate").textContent = summaryDate || "-";
    document.getElementById("summaryTime").textContent = summaryTime || "-";
    
    // Calculate Normal and Peak durations based on Ticket page data
    const selectedTimeSlots = (summaryDuration || "").split(",");
    let normalDuration = 0;
    let peakDuration = 0;
    for (const slot of selectedTimeSlots) {
      if (slot.includes("Normal")) {
        normalDuration++;
      } else if (slot.includes("Peak")) {
        peakDuration++;
      }
    }
    
    const durationText = `Normal: ${normalDuration}, Peak: ${peakDuration}`;
    document.getElementById("summaryDuration").textContent = durationText || "-";

    document.getElementById("summaryTickets").innerHTML = summaryTickets || "-";
    document.getElementById("summaryTotal").textContent = summaryTotal || "-";
  }

  form.addEventListener("input", () => {
    const isFormValid = form.checkValidity();
    continueBtn.disabled = !isFormValid;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

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
});
