document.addEventListener("DOMContentLoaded", () => {
    const confirmationTable = document.getElementById("confirmationTable");
    const confirmButton = document.getElementById("confirmButton");

    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        document.getElementById("summaryName").textContent = userData.fullName || "-";
        document.getElementById("summaryMobile").textContent = `${userData.countryCode} ${userData.mobileNumber}` || "-";
        document.getElementById("summaryEmail").textContent = userData.email || "-";
        document.getElementById("summaryGender").textContent = userData.gender || "-";
    }

    // Load summary table values from Ticket page localStorage
    const summaryDate = localStorage.getItem("summaryDate");
    const summaryTime = localStorage.getItem("summaryTime");
    const summaryDuration = localStorage.getItem("summaryDuration");
    const summaryTickets = localStorage.getItem("summaryTickets");
    const summaryTotal = localStorage.getItem("summaryTotal");

    // Populate the confirmation table with summary data
    document.getElementById("summaryDate").textContent = summaryDate || "-";
    document.getElementById("summaryTime").textContent = summaryTime || "-";
    document.getElementById("summaryDuration").textContent = summaryDuration || "-";
    document.getElementById("summaryTickets").innerHTML = summaryTickets || "-";
    document.getElementById("summaryTotal").textContent = summaryTotal || "-";

    // Add event listener for the confirm button
    confirmButton.addEventListener("click", () => {

        // Display a confirmation message to the user
        alert("Thank you for your booking!");

        //  reset the form fields
        const form = document.getElementById("details-form");
        form.reset();
    });
});
