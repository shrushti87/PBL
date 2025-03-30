// An object to store passwords in memory (for simplicity, this can be expanded later)
let passwordStore = {};

// Handle the form submission for saving passwords
document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;

    // Save the password in the passwordStore object
    passwordStore[account] = password;

    alert("Password saved successfully!");

    // Clear input fields after submission
    document.getElementById('account').value = '';
    document.getElementById('password').value = '';
});

// Handle the password retrieval
function retrievePassword() {
    const accountName = document.getElementById('retrieve-account').value;
    const retrievedPassword = passwordStore[accountName];

    const retrievedPasswordElement = document.getElementById('retrieved-password');
    
    if (retrievedPassword) {
        retrievedPasswordElement.textContent = `Password for ${accountName}: ${retrievedPassword}`;
    } else {
        retrievedPasswordElement.textContent = `No password found for ${accountName}.`;
    }
}
