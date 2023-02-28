var saveBtn = $('.saveBtn');
var currentDayEl = $('#currentDay');
var storedArray = [];
//current time in military time format
var currentTime = dayjs().format('HH');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



$(function () {
  // Click listener event targeting the Save Button
  Object.entries(localStorage).forEach(([key, value]) => {
    if (key.startsWith("hour")) {
      storedArray[key] = value;
    }
  });
  var keyValuePairs = Object.entries(storedArray);
  
  keyValuePairs.forEach(([key, value]) => {
    //key matches id of the container/timeblock element
    console.log(key);
    //value is what we want to set as textarea value
    console.log(value);
    $('#' + key).children('.description').val(value);
    });
    

  saveBtn.click(function(event) {
    event.preventDefault();
    
    //getting id of each time block div once button is clicked
     var id = $(this).parent().attr('id');

    //saves user input into the textarea as variable
     var userText = $(this).prev().val();

     //Stores id of the time-block that user clicks as a key and the user input into textarea as value 
     localStorage.setItem(id, userText);

     //retrieves stored key-value pairs and makes them the value for the empty object variable storedArray



   
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
  });

  //Applies past, present or future class to each time block by comparing the id to the current hour
  $(".time-block").each(function () {

    //Takes only the numerical part of the id so it can becompared to current time.
    var timeBlock = $(this).attr("id").match(/\d+$/);

    //Conditional statements comparing current time (military) to the numerical value of each timeblock's id
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

    //figure out if i needed other else if that targets time after work day and sets it all to either past or future
    });
  
  // Displays current date in header
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  currentDayEl.text(currentDate);
  //add ordinal function if im feeling spicy
});
