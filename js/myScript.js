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



  // License Number Validation
  if (/^[0-9]{15}$/.test(licenseNumber) == false) {
    document.getElementById("errorlicenseNumber").innerHTML = "Please enter a valid 15-digit license number."; 
    return false;

  }
  else{
    //form hide
    document.getElementById("trafficForm").style.display="none";
    document.getElementById("output").style.display="block";
  }
  
  // Offences
  const offences = [{
    name: "Speeding",
    section: "Schedule B Highway Traffic Act Speeding",
    fine: 85,
    warning: "-",
    courtApperance: "Yes"
  }];
  const offencesIndex = [];// To check if the offence is already selected   
  // Randomly select other offences
  const offencesList = [
    {
      name: " Invalid Driver's Permit",
      section: "23(3)",
      fine: 175,
      warning: "-",
      courtApperance: "Yes"
    },
    {
      name: "Invalid License",
      section: "32(1)",
      fine: 260,
      warning: "-",
      courtApperance: "Yes"
    },
    {
      name: "SeatBelt OFF",
      section: "32(1)",
      fine: 260,
      warning: "-",
      courtApperance: "No"
    },
    {
      name: "Invalid Insurance",
      section: "32(1)",
      fine: 175,
      warning: "-",
      courtApperance: "No"
    }
    
  ];


  // Randomly choose offences from the list
  var randomWaring ;
  const numOfOffences = Math.floor(Math.random() * offencesList.length) + 1;
  for (let i = 0; i < numOfOffences; i++) {
    const randomIndex = Math.floor(Math.random() * offencesList.length);
    if(!offencesIndex.includes(randomIndex)){
      offences.push(offencesList[randomIndex]);
      offencesIndex.push(randomIndex);
    }
  }
  randomWaring=Math.floor(Math.random() * offences.length);
  offences[randomWaring].warning="Warning";
  offences[randomWaring].courtApperance="No";
  offences[randomWaring].fine=0;

  // Date and time
  const dateTime = new Date().toLocaleString();
  const formattedDate = dateTime.replace(/[\/,: PM]/g, ''); // Removing / , and : characters

  // Generate ticket number (random number)
  const ticketNumber = formattedDate   + Math.floor(Math.random() * 100);

  // Calculate total fine
  let totalFine = 0;
    offences.forEach(offence => {
        totalFine += offence.fine;
    });
  // output
  let modalContent= `<div class="ticket-header">Ticket Info</div><div class="info-container"><div class="left-info">`;
  modalContent += `<p><strong>Driver Name:</Strong> ${name}</p>`;
  modalContent += `<p><strong>Driver's License Number:</Strong> ${licenseNumber}</p></div>`;
  modalContent += `<div class="right-info"><p><strong>Date & time:</Strong> ${dateTime}</p>`;
  modalContent += `<p><strong>Ticket Number:</Strong> ${ticketNumber}</p></div>
  </div>`;

  modalContent+= `<table><tr><th>S.N</th><th>Offence Name</th><th>Section Number</th>`+
                `<th>Warning Status</th><th>Court Appearance</th><th>Fine Amount</th></tr>`;

  var SN = 0;
  offences.forEach(offence => {
  SN = SN +1;
    modalContent+=`<tr>
    <td>${SN}</td>
    <td>${offence.name}</td>
    <td>${offence.section}</td>
    <td>${offence.warning}</td>
    <td>${offence.courtApperance}</td>
    <td>${offence.fine}</td>
    </tr>`;
  });



  modalContent += `<tr><td colspan="5" class="total">Total Fine:</td><td> ${totalFine}</td></tr></table>`;

 document.getElementById("output").innerHTML = modalContent;
});