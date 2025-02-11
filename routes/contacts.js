const express = require("express");
const router = express.Router();
const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    searchContacts,
} = require("../controllers/contactsController");

// Routes
router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);
router.get("/contacts/search/:query", searchContacts); // Bonus Feature

module.exports = router;
