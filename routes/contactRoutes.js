const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  searchContacts,
} = require("../controllers/contactController");
const { validateContact } = require("../validators/contactValidator");

const router = express.Router();

router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", validateContact, createContact);
router.put("/contacts/:id", validateContact, updateContact);
router.delete("/contacts/:id", deleteContact);
router.get("/search", searchContacts);

module.exports = router;
