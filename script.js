
var IcsEventData = {} //globally scoped 
var icsFile = null;
function submit_form() {
    IcsEventData.event_name = document.getElementById("event_name").value;
    IcsEventData.event_location = document.getElementById("event_location").value;
    IcsEventData.event_description = document.getElementById("event_description").value;
    IcsEventData.event_start = document.getElementById("event_start").value;
    IcsEventData.event_end = document.getElementById("event_end").value;

    //current date and time 

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    IcsEventData.currentDateTime = date+' '+time;

    console.log(IcsEventData.currentDateTime);
    var link = document.querySelector("#downloadLink");
    link.href = insertFileData();
    link.style.display="";
    event.preventDefault();
}


function insertFileData(){

    var fileInput =
    "BEGIN:VCALENDAR\n" +
    "CALSCALE:GREGORIAN\n" +
    "METHOD:PUBLISH\n" +
    "PRODID:-//Test Cal//EN\n" +
    "VERSION:2.0\n" +
    "BEGIN:VEVENT\n" +
    "UID:test-1\n" +
    "DTSTART;VALUE=DATE:" +
    convertDate(IcsEventData.event_start) +
    "\n" +
    "DTEND;VALUE=DATE:" +
    convertDate(IcsEventData.event_end) +
    "\n" +
    'LOCATION:' + 
    IcsEventData.event_location +
    "\n" +
    "SUMMARY:\n" +
     "DESCRIPTION:" +
    IcsEventData.event_description +
    "\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";
    // 'BEGIN:VCALENDAR\r\n' +
    // 'CALSCALE:GREGORIAN\r\n' +
    // 'VERSION:2.0\r\n' +
    // 'X-WR-CALNAME:' + IcsEventData.event_name + '\r\n' +
    // 'PRODID:https:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\r\n' +
    // 'METHOD:PUBLISH'+ '\r\n' +
    // 'BEGIN:VEVENT\r\n' +
    // 'UID:test-1\r\n' +
    // 'ORGANIZER;CN="' + '\r\n' +
    // 'ATTENDEE;CN="' + '\r\n' +
    // 'LOCATION:' + IcsEventData.event_location + '\r\n' +
    // 'SUMMARY:' +'\r\n' +
    // 'DESCRIPTION:' + IcsEventData.event_description + '\r\n' +
    // 'CLASS:' +  '\r\n' +
    // 'STATUS' + '\r\n' +
    // 'DTSTART;VALUE=DATE:' + convertDate(IcsEventData.event_start) + '\r\n' +
    // 'DTEND;VALUE=DATE:' + convertDate(IcsEventData.event_end) + '\r\n' +
    // 'DTSTAMP:' + '\r\n' +
    // 'CREATED;VALUE=DATE:' + convertDate(IcsEventData.currentDateTime) + '\r\n' +
    // 'RRULE:FREQ='+'\r\n' +
    // 'URL:' + '\r\n' +
    // 'END:VEVENT\r\n' +
    // 'END:VCALENDAR\r\n';
console.log(fileInput);
var data = new File([fileInput], { type: "text/plain" });

if (icsFile !== null) {
  window.URL.revokeObjectURL(icsFile);
}

icsFile = window.URL.createObjectURL(data);

return icsFile;

}


function convertDate(date) {
  var event = new Date(date).toISOString();
  event = event.split("T")[0];
  event = event.split("-");
  event = event.join("");
  return event;
}