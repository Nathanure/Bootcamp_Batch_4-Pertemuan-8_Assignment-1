// Imported modules of core module
const fs = require('fs');
// Imported modules of third-party module
const valid = require('validator');

// Read the JSON file in dir Path
var file = fs.readFileSync('data/contacts.json', 'utf-8');
// Parse string to JSON
var arrayJSON = JSON.parse(file);

// Make a directory and JSON file if it hasn't been made yet
const fsJSON = (dirPath, dataPath) => {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Save data into a JSON file
const saveJSON = (name, email, telp) => {
    // Validations
    // Name validation
    if (valid.isAlpha(name, 'en-US')) {
        // Email validation
        if (valid.isEmail(email)) {
            // Mobile phone number validation
            if (valid.isMobilePhone(telp, 'id-ID')) {
                // Varible for branch and checking JSON file if a certain string already taken/not available 
                const dupe = arrayJSON.find((data) => data.email === email || data.mobile === telp)
                // Branch to check data inside JSON file
                if (dupe) {
                    // Display the inputted
                    console.log('Email', dupe.email, 'and mobile number', dupe.telp, 'are already added');
                } else {
                    // Push the array to JSON
                    arrayJSON.push({ name, email, telp });
                    // Write the file in JSON
                    fs.writeFileSync('data/contacts.json', JSON.stringify(arrayJSON));
                    console.log('Data is received');
                }
            } else console.log('Format mobile number is wrong');
        } else console.log('Format email is wrong');
    } else console.log('Format name is wrong');
}

// List array in JSON
const listJSON = () => {
    // Display all data in JSON
    arrayJSON.forEach((displayJSON, i) => {
        console.log(`${(i+1)}. Contact name:`, displayJSON.name, displayJSON.email, displayJSON.telp);
    });
}

// List a array from a specific name
const searchJSON = (nama) => {
    // Variable for branch and checking JSON file if a certain string already taken/not available 
    const list = arrayJSON.find((contact) => contact.name === nama);
    // Branch to display a contact from a specific name
    if (list) console.log(`Contact name:`, list.name, list.email, list.telp)
    else console.log('Name does not exist');
}

// Delete a array from a specific name
const deleteJSON = (nama) => {
    // Variable for branch and checking JSON file if a certain string to delete 
    const del = arrayJSON.filter((contact) => contact.name !== nama);
    // Branch to delete a contact from a specific name
    if (del) {
        // Write the file in JSON
        fs.writeFileSync('data/contacts.json', JSON.stringify(del));
        console.log('Delete success')
    } else console.log('Delete fail')
}

module.exports = { fsJSON, saveJSON, listJSON, searchJSON, deleteJSON };