let dateForm    = document.querySelector('#date-form');

let day, month;
    // year         = dateForm.children.year.selectedIndex


dateForm.day.addEventListener('change', function() {
    day = dateForm.children.day.value;
});

dateForm.month.addEventListener('change', function() {
    month = dateForm.children.month.selectedOptions[0].innerText
});