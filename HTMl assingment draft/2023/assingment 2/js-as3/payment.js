document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");
    const payButton = document.getElementById("payButton");
    const payAmount = document.getElementById("payAmount");

    // Load summary table values from localStorage
    const summaryDate = localStorage.getItem("summaryDate");
    const summaryTime = localStorage.getItem("summaryTime");
    const summaryDuration = localStorage.getItem("summaryDuration");
    const summaryTickets = localStorage.getItem("summaryTickets");
    const summaryTotal = localStorage.getItem("summaryTotal");

    // Populate the summary table on the Payment page
    const summaryTable = document.querySelector(".summary-section");
    summaryTable.innerHTML = `
        <h2>Summary</h2>
        <table>
            <tr>
                <td>Date</td>
                <td>${summaryDate || "-"}</td>
            </tr>
            <tr>
                <td>Time</td>
                <td>${summaryTime || "-"}</td>
            </tr>
            <tr>
                <td>Duration</td>
                <td>${summaryDuration || "-"}</td>
            </tr>
            <tr>
                <td>Tickets</td>
                <td>${summaryTickets || "-"}</td>
            </tr>
            <tr>
                <td>Total Payable</td>
                <td>${summaryTotal || "-"}</td>
            </tr>
        </table>
    `;

    // Display the total amount to pay on the Pay button
    const totalPayable = summaryTotal ? parseFloat(summaryTotal.slice(1)) : 0;
    payAmount.textContent = `$${totalPayable.toFixed(2)}`;

    paymentForm.addEventListener("input", () => {
        const isFormValid = paymentForm.checkValidity() && validateCardNumber() && validateCVV() && validateExpiryDate();
        payButton.disabled = !isFormValid;
    });

    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Redirect to Confirmation page
        window.location.href = "confirmation.html";
    });

    function validateCardNumber() {
        const cardNumberInput = document.getElementById("cardNumber");
        const cardNumber = cardNumberInput.value.replace(/-/g, ""); // Remove hyphens

        // Validate card number: 16 digits, all numbers
        const cardNumberRegex = /^\d{16}$/;
        const isValid = cardNumberRegex.test(cardNumber);
        displayValidationMessage(cardNumberInput, isValid, "Please enter a valid 16-digit card number.");
        return isValid;
    }

    function validateCVV() {
        const cvvInput = document.getElementById("cvc");
        const cvv = cvvInput.value;

        // Validate CVV: 3 digits, all numbers
        const cvvRegex = /^\d{3}$/;
        const isValid = cvvRegex.test(cvv);
        displayValidationMessage(cvvInput, isValid, "Please enter a valid 3-digit CVV.");
        return isValid;
    }

    function validateExpiryDate() {
        const expiryDateInput = document.getElementById("expiryDate");
        const expiryDate = expiryDateInput.value;

        // Validate expiry date format: MM/YY
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const isValid = expiryDateRegex.test(expiryDate);
        const message = isValid ? "" : "Please enter a valid expiry date in the format MM/YY.";
        displayValidationMessage(expiryDateInput, isValid, message);
        return isValid;
    }

    function displayValidationMessage(inputElement, isValid, message) {
        const validationMessage = inputElement.nextElementSibling;
        validationMessage.textContent = message;
        validationMessage.style.color = isValid ? "green" : "red";
    }
});
