const fs = require('fs');
const readline = require('readline');

const contactsFile = 'contacts.json';

let contacts = [];

// Load contacts from file if it exists
function loadContacts() {
    if (fs.existsSync(contactsFile)) {
        const data = fs.readFileSync(contactsFile);
        contacts = JSON.parse(data);
    } else {
        console.log('No contacts found.');
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function saveContacts() {
    const data = JSON.stringify(contacts);
    fs.writeFileSync(contactsFile, data);
}

function addContact() {
    rl.question('Enter name: ', (name) => {
        rl.question('Enter phone number: ', (phoneNumber) => {
            rl.question('Enter email address: ', (email) => {
                const contact = { name, phoneNumber, email };
                contacts.push(contact);
                saveContacts();
                console.log('Contact added successfully!');
                showMainMenu();
            });
        });
    });
}

function viewContacts() {
    if (contacts.length === 0) {
        console.log('No contacts found.');
    } else {
        console.log('Contacts:');
        contacts.forEach((contact, index) => {
            console.log(`${index + 1}. Name: ${contact.name}, Phone: ${contact.phoneNumber}, Email: ${contact.email}`);
        });
    }
    showMainMenu();
}

function editContact() {
    if (contacts.length === 0) {
        console.log('No contacts found.');
        showMainMenu();
        return;
    }
    console.log('Contacts:');
    contacts.forEach((contact, index) => {
        console.log(`${index+1}. Name: ${contact.name}, Phone: ${contact.phoneNumber}, Email: ${contact.email}`);
    });

    rl.question('Enter the serial number of the contact you want to edit: ', (index) => {
        const contactIndex = parseInt(index)-1;
        if (contactIndex >= 0 && contactIndex < contacts.length) {
            const contact = contacts[contactIndex];
            rl.question(`Enter new name for ${contact.name}: `, (name) => {
                rl.question(`Enter new phone number for ${contact.phoneNumber}: `, (phoneNumber) => {
                    rl.question(`Enter new email address for ${contact.email}: `, (email) => {
                        contacts[contactIndex] = { name, phoneNumber, email };
                        saveContacts();
                        console.log('Contact edited successfully!');
                        showMainMenu();
                    });
                });
            });
        } else {
            console.log('Invalid contact number.');
            showMainMenu();
        }
    });
}


function deleteContact() {
    if (contacts.length === 0) {
        console.log('No contacts found.');
        showMainMenu();
        return;
    }
    console.log('Contacts:');
    contacts.forEach((contact, index) => {
        console.log(`${index+1}. Name: ${contact.name}, Phone: ${contact.phoneNumber}, Email: ${contact.email}`);
    });
    
    rl.question('Enter the serial number of the contact you want to delete: ', (index) => {
        const contactIndex = parseInt(index) - 1;
        if (contactIndex >= 0 && contactIndex < contacts.length) {
            contacts.splice(contactIndex, 1);
            saveContacts();
            console.log('Contact deleted successfully!');
        } else {
            console.log('Invalid contact number.');
        }
        showMainMenu();
    });
}

function showMainMenu() {
    loadContacts();
    console.log('\nMain Menu:');
    console.log('1. Add Contact');
    console.log('2. View Contacts');
    console.log('3. Edit Contact');
    console.log('4. Delete Contact');
    console.log('5. Exit');

    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                addContact();
                break;
            case '2':
                viewContacts();
                break;
            case '3':
                editContact();
                break;
            case '4':
                deleteContact();
                break;
            case '5':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 5.');
                showMainMenu();
                break;
        }
    });
}

showMainMenu();
