/*Assignment 5&6
CSD 2103	
Front-End Web Development II
2024-Winter

Highway Traffic Act Violation Processing Program

Group Members;
- Pratik Dhakal - C0899291 
- Dipendra Thapa - C0907555 
- Mazlum Unay - C0885585 
- Sudan Krishna Dhakal-C0901145 
- Ashish Pandey - C0895988

03/08/2024*/ 

//Generate Random speeding value
const speedingValue = 100 + Math.floor(Math.random() * 100) + 1;

//Alert to tell driver they are speeding and get their name and driver's licence
$(document).ready(function(){
  alert("As an OPP traffic officer patrolling Highway 401, I've stopped your vehicle for speeding at " + speedingValue
   + "km/hr. Provide your Name and Driver's License Number.");
});

document.getElementById("trafficForm").addEventListener("submit", function(event) {
  event.preventDefault();
  // Get Input values
  const name = document.getElementById("driverName").value;
  const licenseNumber = document.getElementById("licenseNumber").value;

  // License Number Validation
  const licenseNumberIsValid = /^[A-Z]{1}[0-9]{2,5}-[0-9]{1,5}-[0-9]{1,5}$/.test(licenseNumber);
  if (!licenseNumberIsValid) {
    document.getElementById("errorlicenseNumber").innerHTML = "Please enter a valid 15-digit license number. \n (A000-00000-00000)"; 
    return false;

  }
  else{
    //form hide
    document.getElementById("trafficForm").style.display="none";
    //show the output
    document.getElementById("output").style.display="block";
  }
  
  // Offences by the driver. Initially only speeding offence.
  const offences = [{
    name: "Speeding",
    section: "Schedule B Highway Traffic Act Speeding",
    fine: 85,
    warning: "-",
    courtApperance: "Yes"
  }];

  const offencesIndex = [];// To check if the offence is already selected 

  // List of Possible Offences
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
  //Randomly generate total number of offence committed.
  const numOfOffences = Math.floor(Math.random() * offencesList.length) + 1;

  for (let i = 0; i < numOfOffences; i++) {

    //randomly choose index of offence to be added.
    const randomIndex = Math.floor(Math.random() * offencesList.length);

    //add offence to 'offences' randomly if it isnt already added
    if(!offencesIndex.includes(randomIndex)){
      offences.push(offencesList[randomIndex]);
      offencesIndex.push(randomIndex);
    }
  }
  //randomly choose which offence gets warning
  randomWaring=Math.floor(Math.random() * offences.length);
  offences[randomWaring].warning="Warning";
  offences[randomWaring].courtApperance="No";
  offences[randomWaring].fine=0;

  // Date and time
  const dateTime = new Date().toLocaleString();
  const formattedDate = dateTime.replace(/[\/,: PM]/g, ''); // Removing / , and : characters

  // Generate ticket number with first part as datetime and second part between 0 and 99
  const ticketNumber = formattedDate   + Math.floor(Math.random() * 100);

  // Calculate total fine
  let totalFine = 0;
    offences.forEach(offence => {
        totalFine += offence.fine;
    });

  // output
  let content= `<div class="ticket-header">Ticket Info</div><div class="info-container"><div class="left-info">`;
  content += `<p><strong>Driver Name:</Strong> ${name}</p>`;
  content += `<p><strong>Driver's License Number:</Strong> ${licenseNumber}</p></div>`;
  content += `<div class="right-info"><p><strong>Date & time:</Strong> ${dateTime}</p>`;
  content += `<p><strong>Ticket Number:</Strong> ${ticketNumber}</p></div>
  </div>`;

  content+= `<table><tr><th>S.N</th><th>Offence Name</th><th>Section Number</th>`+
                `<th>Warning Status</th><th>Court Appearance</th><th>Fine Amount</th></tr>`;

  var SN = 0;
  offences.forEach(offence => {
  SN = SN +1;
    content+=`<tr>
    <td>${SN}</td>
    <td>${offence.name}</td>
    <td>${offence.section}</td>
    <td>${offence.warning}</td>
    <td>${offence.courtApperance}</td>
    <td>${offence.fine}</td>
    </tr>`;
  });



  content += `<tr><td colspan="5" class="total">Total Fine:</td><td> ${totalFine}</td></tr></table>`;

  //display the output using innerHTML
 document.getElementById("output").innerHTML = content;
});