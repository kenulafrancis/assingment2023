document.addEventListener("DOMContentLoaded", function () {
  // Function to calculate the total payable, normal hours, and peak hours based on user inputs
  function calculateTotalPayable() {
    const slAdultTickets = parseInt(document.getElementById("slAdult").value) || 0;
    const slChildTickets = parseInt(document.getElementById("slChild").value) || 0;
    const foreignerAdultTickets = parseInt(document.getElementById("foreignerAdult").value) || 0;
    const foreignerChildTickets = parseInt(document.getElementById("foreignerChild").value) || 0;

    // Retrieve the selected time slots
    const selectedTimeSlots = Array.from(document.querySelectorAll("#timeSlots option:checked")).map(option => option.value);
    
    // Calculate the total hours, normal hours, and peak hours
    const selectedHours = selectedTimeSlots.length; // Total number of selected hours
    const normalHours = selectedTimeSlots.filter(slot => !(slot >= "10-11" && slot <= "17-18" || slot === "05-06")).length;
    const peakHours = selectedHours - normalHours;

    // Retrieve the pricing details for each ticket type
    const slAdultNormalCharge = 4;
    const slAdultPeakCharge = 6;
    const slChildNormalCharge = 2;
    const slChildPeakCharge = 3;
    const foreignerAdultNormalCharge = 10;
    const foreignerAdultPeakCharge = 13;  
    const foreignerChildNormalCharge = 5;
    const foreignerChildPeakCharge = 8;

    // Calculate the total payable amount
    const totalPayable =
      (slAdultTickets * normalHours * slAdultNormalCharge) + 
      (slAdultTickets * peakHours * slAdultPeakCharge) +
      (slChildTickets * normalHours * slChildNormalCharge) +
      (slChildTickets * peakHours * slChildPeakCharge) +
      (foreignerAdultTickets * normalHours * foreignerAdultNormalCharge) +
      (foreignerAdultTickets * peakHours * foreignerAdultPeakCharge) +
      (foreignerChildTickets * normalHours * foreignerChildNormalCharge) +
      (foreignerChildTickets * peakHours * foreignerChildPeakCharge);

    return { totalPayable, normalHours, peakHours };
  }

  // Function to update the summary table based on user inputs
  function updateSummary() {
    const visitDate = document.getElementById("visitDate").value;
    const selectedTimeSlots = Array.from(document.querySelectorAll("#timeSlots option:checked")).map(option => option.value);
    const { normalHours, peakHours, totalPayable } = calculateTotalPayable();

    const summaryDateCell = document.getElementById("summaryDate");
    const summaryTimeCell = document.getElementById("summaryTime");
    const summaryDurationCell = document.getElementById("summaryDuration");
    const summaryTicketsCell = document.getElementById("summaryTickets");
    const summaryTotalCell = document.getElementById("summaryTotal");

    summaryDateCell.textContent = visitDate;
    summaryTimeCell.textContent = selectedTimeSlots.join(", ");
    summaryDurationCell.textContent = `Normal hours: ${normalHours}, Peak hours: ${peakHours}`;

    const slAdultTickets = parseInt(document.getElementById("slAdult").value) || 0;
    const slChildTickets = parseInt(document.getElementById("slChild").value) || 0;
    const foreignerAdultTickets = parseInt(document.getElementById("foreignerAdult").value) || 0;
    const foreignerChildTickets = parseInt(document.getElementById("foreignerChild").value) || 0;

    summaryTicketsCell.innerHTML = `
        ${slAdultTickets} SL Adult $${slAdultTickets * (peakHours * 6 + normalHours * 4)}<br>
        ${slChildTickets} SL Child $${slChildTickets * (peakHours * 3 + normalHours * 2)}<br>
        ${foreignerAdultTickets} Foreigner Adult $${foreignerAdultTickets * (peakHours * 13 + normalHours * 10)}<br>
        ${foreignerChildTickets} Foreigner Child $${foreignerChildTickets * (peakHours * 8 + normalHours * 5)}
    `;

    summaryTotalCell.textContent = `$${totalPayable}`;

    // Store the summary table values in the browser's local storage
    localStorage.setItem("summaryDate", visitDate);
    localStorage.setItem("summaryTime", selectedTimeSlots.join(", "));
    localStorage.setItem("summaryDuration", `Normal hours: ${normalHours}, Peak hours: ${peakHours}`);
    localStorage.setItem("summaryTickets", summaryTicketsCell.innerHTML);
    localStorage.setItem("summaryTotal", `$${totalPayable}`);

    // Enable or disable the "Continue with purchase" button based on user inputs
    const conButton = document.getElementById("conButton");
    conButton.disabled = totalPayable <= 0;
  }

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

  document.getElementById("timeSlots").addEventListener("change", updateSummary);
  document.getElementById("visitDate").addEventListener("change", updateSummary);
  document.getElementById("slAdult").addEventListener("input", updateSummary);
  document.getElementById("slChild").addEventListener("input", updateSummary);
  document.getElementById("foreignerAdult").addEventListener("input", updateSummary);
  document.getElementById("foreignerChild").addEventListener("input", updateSummary);

  const addButtons = document.querySelectorAll(".add");
  const minusButtons = document.querySelectorAll(".minus");

  function handleadd(event) {
    const inputElement = event.target.parentElement.querySelector("input");
    inputElement.value = parseInt(inputElement.value) + 1;
    updateSummary();
  }

  function handleminus(event) {
    const inputElement = event.target.parentElement.querySelector("input");
    const currentValue = parseInt(inputElement.value);
    inputElement.value = currentValue > 0 ? currentValue - 1 : 0;
    updateSummary();
  }

  addButtons.forEach((button) => {
    button.addEventListener("click", handleadd);
  });

  minusButtons.forEach((button) => {
    button.addEventListener("click", handleminus);
  });

  updateSummary();
});




