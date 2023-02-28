var saveBtn = $('.saveBtn');
var currentDayEl = $('#currentDay');
//empty array to assign to the local storage key-value pairs
var storedArray = [];
//current time in military time format
var currentTime = dayjs().format('HH');

// Wraps all the code to ensure that the code isn't run until the browser has finished rendering all
// the elements in the html.
$(function () {
  //loops through local storage key-value pairs
  Object.entries(localStorage).forEach(([key, value]) => {
    if (key.startsWith("hour")) {
      storedArray[key] = value;
    }
  });

  var keyValuePairs = Object.entries(storedArray);
  
  keyValuePairs.forEach(([key, value]) => {
    //targets id with key, then selects the textarea, which is a child of corresponding id's <div> and sets the value of it to the value that was in local storage
    $('#' + key).children('.description').val(value);
    });
    
// Click listener event targeting the Save Button
  saveBtn.click(function(event) {
    event.preventDefault();
    
    //getting id of each time block div once button is clicked
     var id = $(this).parent().attr('id');

    //saves user input into the textarea as variable
     var userText = $(this).prev().val();

     //Stores id of the time-block that user clicks as a key and the user input into textarea as value 
     localStorage.setItem(id, userText);
  });

  //Applies past, present or future class to each time block by comparing the id to the current hour
  $(".time-block").each(function () {

    //Takes only the numerical part of the id so it can becompared to current time.
    var timeBlock = $(this).attr("id").match(/\d+$/);

    //Conditional statements comparing current time (military) to the numerical value of each timeblock's id. Then, it removes or add the class needed for styling respectively
    if (currentTime == timeBlock) {
     $(this).removeClass("future");
      $(this).removeClass("past");
      $(this).addClass("present");

    } else if (currentTime < timeBlock) {
      $(this).removeClass("present")
      $(this).removeClass("past")
      $(this).addClass("future")

    } else if (currentTime > timeBlock) {
      $(this).removeClass("present")
      $(this).removeClass("future")
      $(this).addClass("past")
    } 
    });
  
  // Displays current date in header
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  currentDayEl.text(currentDate);
});
