// JavaScript for processing offences and generating output

//speeding value
const speedingValue = 100 + Math.floor(Math.random() * 100) + 1;

//alert to tell driver they are speeding and get their name and driver's licence
$(document).ready(function(){
  alert("As an OPP traffic officer patrolling Highway 401, I've stopped your vehicle for speeding at " + speedingValue
   + "km/hr. Provide your Name and Driver's License Number.");
});

document.getElementById("trafficForm").addEventListener("submit", function(event) {
  event.preventDefault();
  // Input values
  const name = document.getElementById("driverName").value;
  const licenseNumber = document.getElementById("licenseNumber").value;

  //validation.

  //form hide
  document.getElementById("trafficForm").style.display="none";
  document.getElementById("output").style.display="block";


  // Randomly select validity
  
  const licenseValidity = Math.random() < 0.5 ? "Valid" : "Invalid";
  const permitValidity = Math.random() < 0.5 ? "Valid" : "Invalid";
  const insuranceValidity = Math.random() < 0.5 ? "Valid" : "Invalid";
  const seatBelt = Math.random() < 0.5 ? "yes" : "no";

  // Date and time
  const dateTime = new Date().toLocaleString();

  // Generate ticket number (random number)
  const ticketNumber = Math.floor(Math.random() * 10000);

  // Offences
  const offences = [];
  if (seatBelt === "no") {
    offences.push({
      name: "Seat Belt Violation",
      section: "Section 106(2)",
      fine: "$200",
      warning: false
    });
  }

  // Output
  let output = `<strong>Speeding:</strong> ${speedingValue}<br>`;
  output += `<strong>Date and Time:</strong> ${dateTime}<br>`;
  output += `<strong>Ticket Number:</strong> ${ticketNumber}<br>`;
  output += `<strong>Driver's Name:</strong> ${name}<br>`;
  output += `<strong>Driver's License Insurance:</strong> ${insuranceValidity}<br>`;
  output += `<strong>Driver's License Permit:</strong> ${permitValidity}<br>`;
  output += `<strong>Driver's License :</strong> ${licenseValidity}<br>`;
  output += `<strong>Driver's License Number:</strong> ${licenseNumber}<br>`;
  output += "<strong>Offences:</strong><br>";
  offences.forEach(offence => {
    output += `<li>${offence.name}, Section: ${offence.section}, Fine: ${offence.fine}</li>`;
  });

  document.getElementById("output").innerHTML = output;
});