const nextpage = document.getElementById('next-page');

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = phoneInput.getNumber();
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirmEmail').value;
    const gender = document.getElementById('gender').value;

    if(email !== confirmEmail) {
        alert('Emails do not match!');
        return;
    }

    if (!phoneInput.isValidNumber()) {
        alert('Invalid phone number.');
        return;
    } else {
        info.style.display = "";
        info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
    }

    localStorage.setItem('fullName', fullName);
    localStorage.setItem('mobileNumber', phoneNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('gender', gender);

    alert('Form submitted successfully and data stored!');

    window.location.href = "payment.html";
});


//getting the summary table
/// Load stored data from local storage and populate the summary table
function populateSummaryTable() {
    const summaryTable = document.getElementById("summary-table");

    // ... Similar to the logic used on the ticket page to populate the table
    // Retrieve data from local storage, calculate charges, and insert data into table rows

    // Example code for a row:
    /*
    const row = summaryTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = "Category Name";
    cell2.textContent = "Calculated Charges";
    */

    // Example: Loop through different categories and calculate charges
    const ticketCategoryIds = [
        "Foreigner-Adult", "Foreigner-Child", "SL-Adult", "SL-Child", "Infant"
    ];

    ticketCategoryIds.forEach(categoryId => {
        const storedQuantity = localStorage.getItem(categoryId) || 0;
        const storedCharges = calculateCharges(categoryId, storedQuantity);

        const row = summaryTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        // Set the category name and calculated charges in the cells
        cell1.textContent = categoryId;
        cell2.textContent = storedCharges.toFixed(2);
    });

    // Calculate and display the total amount
    const totalRow = summaryTable.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.textContent = "Total Amount Payable";
    totalCell.colSpan = 2;
    totalRow.classList.add("total-row");

    const totalAmountElem = document.createElement("td");
    totalAmountElem.textContent = calculateTotalAmount().toFixed(2);
    totalAmountElem.classList.add("total-amount");
    totalRow.appendChild(totalAmountElem);
}

// ... Other relevant functions (calculateCharges, calculateTotalAmount) can be included here

// Load the stored data from local storage when the page loads
window.addEventListener("load", () => {
    populateSummaryTable();
});
