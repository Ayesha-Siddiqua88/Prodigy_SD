const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const app = express();
const PORT = 3000; 

app.use(express.json());

let contacts = [];


app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Add a new contact
app.post('/contacts', (req, res) => {
    const { name, number } = req.body;
    const id = uuidv4(); // Generate unique ID
    const contact = { id, name, number };
    contacts.push(contact);
    res.status(201).json(contact);
});

// Update an existing contact
app.put('/contacts/:name', (req, res) => {
    const name = req.params.name;
    const { number } = req.body;
    const index = contacts.findIndex(contact => contact.name === name);
    if (index !== -1) {
        contacts[index] = { id, name, number };
        res.send('Contact updated successfully');
    } else {
        res.status(404).send('Contact not found');
    }
});

// Delete a contact
app.delete('/contacts/:name', (req, res) => {
    const name = req.params.name;
    const index = contacts.findIndex(contact => contact.name === name);
    if (index !== -1) {
        contacts.splice(index, 1);
        res.send('Contact deleted successfully');
    } else {
        res.status(404).send('Contact not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
