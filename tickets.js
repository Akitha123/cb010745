function saveDateToLocalStorage() {
    const dateInput = document.getElementById("dateInput");
    const selectedDate = dateInput.value;
    localStorage.setItem("selectedDate", selectedDate);
    console.log("Selected date: " + selectedDate);
    
    ValuesaveDateToLocalStorage = 1;
    console.log(ValuesaveDateToLocalStorage);

    optionCheck(ValueticketTotalCal, ValueshowSelections, ValuesaveDateToLocalStorage, ValuesaveLocationToLocalStorage);

    document.querySelector('.date-sumy').innerHTML = `${selectedDate}`;
}

// Get the current date and calculate the date three months from now
const today = new Date();
const threeMonthsFromNow = new Date(today);
threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

// Format the dates in the 'yyyy-MM-dd' format for setting the min and max attributes of the input
const formattedToday = formatDate(today);
const formattedThreeMonthsFromNow = formatDate(threeMonthsFromNow);

// Set the min and max attributes of the input to restrict date selection
const dateInput = document.getElementById("dateInput");
dateInput.setAttribute("min", formattedToday);
dateInput.setAttribute("max", formattedThreeMonthsFromNow);

// Helper function to format dates in 'yyyy-MM-dd' format
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Add event listener to the date input to save the selected date to local storage when changed
dateInput.addEventListener("change", saveDateToLocalStorage);


document.addEventListener("DOMContentLoaded", () => {
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", showSelections);
    });
});




//time slot selector

/*document.addEventListener("DOMContentLoaded", () => {
    const showSlotsButton = document.getElementById('showSlotsButton');
    const timeSlotSelect = document.getElementById('timeSlotSelect');
    const selectedSlotsContainer = document.getElementById('selectedSlots');
    const checkboxes = timeSlotSelect.querySelectorAll('input[type="checkbox"]');
    
    const peakTimeRanges = [
      { start: 10, end: 13 },
      { start: 15, end: 18 },
    ];
  
    let selectedSlots = [];
  
    // Function to populate the time slot select element
    function populateTimeSlots() {
      timeSlotSelect.innerHTML = '';
  
      for (let hour = 7; hour <= 17; hour++) {
        for (let minute = 0; minute <= 45; minute += 60) {
          const startHour = hour;
          const startMinute = minute;
          const endHour = startHour + 1;
          const endMinute = startMinute;
  
          const formattedStartTime = formatTime(startHour, startMinute);
          const formattedEndTime = formatTime(endHour, endMinute);
  
          const isPeak = peakTimeRanges.some(
            range => hour >= range.start && hour < range.end
          );
  
          const slotContainer = document.createElement('div');
          slotContainer.classList.add('time-slot');
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.dataset.startTime = formattedStartTime;
          checkbox.dataset.endTime = formattedEndTime;
          checkbox.dataset.peak = isPeak;
          slotContainer.appendChild(checkbox);
  
          const slotLabel = document.createElement('label');
          slotLabel.textContent = `${formattedStartTime} - ${formattedEndTime} ${
            isPeak ? '(Peak Time)' : ''
          }`;
          slotLabel.htmlFor = checkbox;
          slotContainer.appendChild(slotLabel);
  
          timeSlotSelect.appendChild(slotContainer);
        }
      }
    }
  
    // ... (Rest of your code for the time slot selector)
  
    // Function to check if a selected slot overlaps with existing slots
    function checkOverlapValidity(newStartTime, newEndTime) {
      for (const slot of selectedSlots) {
        const startTime = slot.startTime;
        const endTime = slot.endTime;
  
        if (
          (newStartTime >= startTime && newStartTime < endTime) ||
          (newEndTime > startTime && newEndTime <= endTime)
        ) {
          return true;
        }
      }
  
      return false;
    }
  
    // ... (Rest of your code for the time slot selector)
  
    // Function to update the display of selected slots
    function updateSelectedSlotsDisplay() {
      selectedSlotsContainer.innerHTML = '';
      if (selectedSlots.length > 0) {
        const ul = document.createElement('ul');
        for (const slot of selectedSlots) {
          const li = document.createElement('li');
          li.textContent = `${slot.startTime} - ${slot.endTime} ${
            slot.peak ? '(Peak Time)' : ''
          }`;
          ul.appendChild(li);
        }
        selectedSlotsContainer.appendChild(ul);
      }
    }
  
    // Load selected slots from local storage on page load
    window.addEventListener('load', () => {
      const storedSlots = JSON.parse(localStorage.getItem('selectedSlots'));
      if (storedSlots) {
        selectedSlots = storedSlots;
        updateSelectedSlotsDisplay();
      }
    });
  
    // Clear local storage data when the page is about to be unloaded
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('selectedSlots');
    });
  
    // Additional code for the date input and related functions
    const dateInput = document.getElementById("dateInput");
  
    function saveDateToLocalStorage() {
      const selectedDate = dateInput.value;
      localStorage.setItem("selectedDate", selectedDate);
      console.log("Selected date: " + selectedDate);
      document.querySelector('.date-sumy').innerHTML = `${selectedDate}`;
    }
  
    // Add event listener to the date input to save the selected date to local storage when changed
    dateInput.addEventListener("change", saveDateToLocalStorage);
  
    // ... (Rest of your code for the date input)
  
    // Additional code to prevent gaps between selected time slots
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", function () {
        const index = Array.from(checkboxes).indexOf(this);
  
        if (this.checked) {
          if (
            (index > 0 && !checkboxes[index - 1].checked) ||
            (index < checkboxes.length - 1 && !checkboxes[index + 1].checked)
          ) {
            this.checked = false;
            alert("Please select contiguous time slots.");
          } else if (!checkGapValidity(this.dataset.startTime, this.dataset.endTime)) {
            this.checked = false;
            alert("You cannot select time slots with gaps.");
          } else {
            const slotData = {
              startTime: this.dataset.startTime,
              endTime: this.dataset.endTime,
              peak: this.dataset.peak === "true",
            };
            selectedSlots.push(slotData);
            updateSelectedSlotsDisplay();
            localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
          }
        } else {
          selectedSlots = selectedSlots.filter(
            slot =>
              !(slot.startTime === this.dataset.startTime && slot.endTime === this.dataset.endTime)
          );
          updateSelectedSlotsDisplay();
          localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
        }
      });
    });
  });*/
  
  const startHour = 7;
  const endHour = 18;
  const peakHoursStart = [10, 15];
  const peakHoursEnd = [13, 18];
  const dropdown = document.getElementById('timeDropdown');
  const selectedDiv = document.getElementById('selectedTimes');
  
  // Populate dropdown with multiple selection
  dropdown.setAttribute("multiple", "multiple");
  dropdown.size = (endHour - startHour);  // to show it as a list
  
  for (let i = startHour; i < endHour; i++) {
      const option = document.createElement('option');
      option.value = `${i}:00 - ${i + 1}:00`;
      option.textContent = `${i}:00 - ${i + 1}:00 ${isPeak(i) ? '(Peak)' : ''}`;
      dropdown.appendChild(option);
  }
  
  function isPeak(hour) {
      return (hour >= peakHoursStart[0] && hour < peakHoursEnd[0]) || (hour >= peakHoursStart[1] && hour < peakHoursEnd[1]);
  }
  
  
  function addTime() {
      const times = Array.from(dropdown.selectedOptions).map(opt => opt.value);
      
      if (!areContiguous(times)) {
          alert('Please select contiguous time slots.');
          return;
      }
  
      selectedDiv.innerHTML = ""; // Clear previous times
      times.forEach(time => {
          const div = document.createElement('div');
          div.className = 'selectedTime';
          if (isPeak(parseInt(time))) {
              div.classList.add('peak');
          }
          div.textContent = time;
          selectedDiv.appendChild(div);
      });
  
      // Storing the selected time slots in local storage
      localStorage.setItem('selectedTimeSlots', JSON.stringify(times));
  }
  
  function areContiguous(times) {
      for (let i = 1; i < times.length; i++) {
          const prevEnd = parseInt(times[i - 1].split(' - ')[1]);
          const currentStart = parseInt(times[i].split(' - ')[0]);
          if (prevEnd !== currentStart) {
              return false;
          }
      }
      return true;
  }
  
  // Loading selected slots from local storage
  function loadSelectedSlots() {
      const storedSlots = JSON.parse(localStorage.getItem('selectedTimeSlots')) || [];
      storedSlots.forEach(storedSlot => {
          const option = Array.from(dropdown.options).find(opt => opt.value === storedSlot);
          if (option) option.selected = true;
      });
  }
  
  loadSelectedSlots();


  // ticket categiory selector
  // Get all ticket category elements
const ticketCategories = document.querySelectorAll('.ticket-category');

// Loop through each ticket category
ticketCategories.forEach(category => {
  const minusBtn = category.querySelector('.minus-btn');
  const plusBtn = category.querySelector('.plus-btn');
  const countElem = category.querySelector('.ticket-count');

  // Get the ticket category name from the ID
  const categoryName = category.id;

  // Load ticket count from localStorage or set to 0 if not present
  let ticketCount = localStorage.getItem(categoryName) || 0;
  countElem.textContent = ticketCount;

  minusBtn.addEventListener('click', () => {
    if (ticketCount > 0) {
      ticketCount--;
      countElem.textContent = ticketCount;
      localStorage.setItem(categoryName, ticketCount);
    }
  });

  plusBtn.addEventListener('click', () => {
    ticketCount++;
    countElem.textContent = ticketCount;
    localStorage.setItem(categoryName, ticketCount);
  });
});

// Load ticket counts from local storage on page load
window.addEventListener('load', () => {
  ticketCategories.forEach(category => {
    const categoryName = category.id;
    const countElem = category.querySelector('.ticket-count');
    const storedCount = localStorage.getItem(categoryName);
    if (storedCount !== null) {
      countElem.textContent = storedCount;
    }
  });
});

// summary table and its calculations
/// Charging rates for different categories and hours
const charges = {
  "Foreigner-Adult": { normal: 10, peak: 13 },
  "Foreigner-Child": { normal: 5, peak: 8 },
  "SL-Adult": { normal: 4, peak: 6 },
  "SL-Child": { normal: 2, peak: 3 },
  "Infant": 0
};

// Load stored data from local storage and populate the summary table
function populateSummaryTable() {
  const ticketCategoryIds = [
    "Foreigner-Adult", "Foreigner-Child", "SL-Adult", "SL-Child", "Infant"
  ];


  
  ticketCategoryIds.forEach(categoryId => {
    const quantityElem = document.getElementById(`quantity-${categoryId}`);
    const chargesElem = document.getElementById(`charges-${categoryId}`);
    
    const storedQuantity = localStorage.getItem(categoryId) || 0;
    const storedCharges = calculateCharges(categoryId, storedQuantity);

    quantityElem.textContent = storedQuantity;
    chargesElem.textContent = storedCharges.toFixed(2);

    // Store the charges in local storage
    localStorage.setItem(`charges-${categoryId}`, storedCharges.toFixed(2));
  });

  
// Load stored date from local storage and display it
const summaryDateElem = document.getElementById("summary-date");
const storedDate = localStorage.getItem("selectedDate") || "No date selected";
summaryDateElem.textContent = storedDate;

// Load stored time slots from local storage and display them
const selectedTimesElem = document.getElementById("selectedTimes");
const storedTimes = JSON.parse(localStorage.getItem("selectedTimeSlots")) || [];
selectedTimesElem.textContent = storedTimes.join(', ');

  // Update total amount payable
  const totalAmountElem = document.getElementById("total-amount-payable");
  const totalAmount = calculateTotalAmount();
  totalAmountElem.textContent = totalAmount.toFixed(2);
  localStorage.setItem("total-amount-payable", totalAmount.toFixed(2));
}

// Calculate charges based on category and quantity
function calculateCharges(categoryId, quantity) {
  const categoryCharges = charges[categoryId];
  const isPeakTime = isPeak(parseInt(dropdown.value.split(':')[0]));

  if (categoryCharges) {
    const chargeRate = isPeakTime ? categoryCharges.peak : categoryCharges.normal;
    return chargeRate * quantity;
  }

  return 0;
}

// Calculate total amount based on stored data
function calculateTotalAmount() {
  let totalAmount = 0;
  const ticketCategoryIds = [
    "Foreigner-Adult", "Foreigner-Child", "SL-Adult", "SL-Child", "Infant"
  ];

  ticketCategoryIds.forEach(categoryId => {
    const storedQuantity = localStorage.getItem(categoryId) || 0;
    const storedCharges = calculateCharges(categoryId, storedQuantity);
    totalAmount += storedCharges;
  });

  return totalAmount;
}

// Load the stored data from local storage when the page loads
window.addEventListener("load", () => {
  populateSummaryTable();
});


window.addEventListener("load", () => {
  // Load and populate charges for each category
  ticketCategoryIds.forEach(categoryId => {
    const chargesElem = document.getElementById(`charges-${categoryId}`);
    const storedCharges = localStorage.getItem(`charges-${categoryId}`) || 0;
    chargesElem.textContent = storedCharges;
  });

  // Load and populate total amount payable
  const totalAmountElem = document.getElementById("total-amount-payable");
  const storedTotalAmount = localStorage.getItem("total-amount-payable") || 0;
  totalAmountElem.textContent = storedTotalAmount;

  populateSummaryTable();
});
