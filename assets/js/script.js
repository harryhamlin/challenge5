// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let dateDisplay = $('#todays-date');

  // dateDisplayFx displays the time once per second and displays it within the element tagged todays-date. dateDisplay.text is set to current time and date on load for a cleaner look but is replaced by the dateDisplayFx function to account for time
  function dateDisplayFx() {
    dateDisplay.text(dayjs().format('MMM DD, YYYY, h:mm:ss a'))
    setInterval(function () {
      dayjs();
      dateDisplay.text(dayjs().format('MMM DD, YYYY, h:mm:ss a'));
    }, 1000)
  }

  // the createTimeSlotDisplay creates a series of timeslots through DOM manipulation, accounting for the AM/PM time display. it sets variabls hourcheck and current hour to use in the later function checkIfPPF to see if the current time slot is past present or future.
  function createTimeSlotDisplay() {
    for (let i = 0; i < 25; i++) {
      let currentHour = parseInt(dayjs().format('H'));
      let ppf = checkIfPPF();
      // createTimeSlot() is declared, the creation of the slots through DOM manipulation
      function createTimeSlot(ppf, time, meridiem) {
        $('#main').append('<div id="hour-' + i + '" class="row time-block ' + ppf + '"><div class="col-2 col-md-1 hour text-center py-3">' + time + meridiem + '</div><textarea id="text-area-' + i + '" class="col-8 col-md-10 description" rows="3"> </textarea><button id="' + i + '" class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true" id="' + i + '"></i></button></div>');
      }
      // checkIfPFF() is declared, checking if each slot is before, during or after the present time
      function checkIfPPF() {
        if (i < currentHour) {
          return 'past';
        } else 
        if (i === currentHour) {
          return 'present';
        } else {
          return 'future';
        }
      }

      // a series of if statements accounting for AM v PM, hour 12 v not hour 12
      if (i === 0) {
        let time = 12;
        let meridiem = 'AM';
        createTimeSlot(ppf, time, meridiem);
      } else if (i > 0 && i < 12) {
        let time = i;
        let meridiem = 'AM';
        createTimeSlot(ppf, time, meridiem);
      } else if (i === 12) {
        let time = i;
        let meridiem = 'PM';
        createTimeSlot(ppf, time, meridiem);
      } else {
        let time = (i - 12);
        let meridiem = 'PM';
        createTimeSlot(ppf, time, meridiem);
      }
    }
  }

  $('#main').on('click',function (event) {
    let userClick = event.target.nodeName;
    if (userClick === 'BUTTON' || userClick === 'I') {
      let idNumberConcat = '#text-area-' + event.target.id;
      let textContent = $(idNumberConcat).val();
      
    }
  })
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //



  dateDisplayFx();
  createTimeSlotDisplay();
});
