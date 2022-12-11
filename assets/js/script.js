$(function () {
  let dateDisplay = $('#todays-date');
  let infoObject;
  let infoArray = [];

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

  // this pullLocalArray pulls the locally stored array of saved hourly text values. this function executes both on the user clicking save and the page loading
  function pullLocalArray() {
    infoArray = JSON.parse(localStorage.getItem("info-array"));
    console.log(infoArray);
  }

  // this replaceDuplicates function checks the array that's just been stored locally for text that's already been stored for a given hour, and if so, it replaces the previously stored text at that hour with new text
  function replaceDuplicates(infoObject) {
    if (infoArray === null) {
      infoArray = [];
      infoArray.push(infoObject);
      console.log('nullpush')
    } else {
      console.log('arraypush');
      let duplicateTest = true;
      for (let i = 0; i < infoArray.length; i++) {
        if (infoObject.hourid === infoArray[i].hourid) {
          infoArray[i].text = infoObject.text;
          duplicateTest = false;
        }
      }
      if (duplicateTest) {
        infoArray.push(infoObject);
      }
    }
  }

  // this printArray function prints the text value in each of the objects in the pulled array. this function executes both when the save button is clicked as well as on page load 
  function printArray() {
    for (let i = 0; i < infoArray.length; i++) {
      let q = '#text-area-' + infoArray[i].hourid;
      $(q).val(infoArray[i].text)
    }
  }

  // this saveLocally function stores the updated array from the replaceDuplicates function
  function saveLocally() {
    console.log("savedlocally")
    localStorage.setItem("info-array", JSON.stringify(infoArray));
  }

  // this event listener listens to the container element with the id 'main' for clicks, and selects those specific to the save buttons and targets the relevant text area and executes the saveLocally function
  $('#main').on('click', function (event) {
    let userClick = event.target.nodeName;
    if (userClick === 'BUTTON' || userClick === 'I') {
      let idNumberConcat = '#text-area-' + event.target.id;
      let infoObject = {
        hourid: event.target.id,
        text: $(idNumberConcat).val().trim()
      }
      pullLocalArray();
      replaceDuplicates(infoObject);
      printArray();
      saveLocally();
    }
  })

  // these functions execute on page load
  dateDisplayFx();
  createTimeSlotDisplay();
  pullLocalArray();
  printArray()
});
