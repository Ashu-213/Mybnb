// Tax toggle functionality for listings
let switchToggle = document.getElementById('flexSwitchCheckDefault');
switchToggle.addEventListener('click', function () {
    let taxInfo = document.getElementsByClassName('tax-info');
    for (info of taxInfo) {
        if (switchToggle.checked) {
            info.style.display = 'inline';
        } else {
            info.style.display = 'none';
        }
    }
});
