const Contact = require("../models/contactModel");

exports.getAllContacts = (req, res) => {
  Contact.getAllContacts((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};

exports.getContactById = (req, res) => {
  Contact.getContactById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(results[0]);
  });
};

exports.createContact = (req, res) => {
  Contact.createContact(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

exports.updateContact = (req, res) => {
  Contact.updateContact(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact updated successfully" });
  });
};

exports.deleteContact = (req, res) => {
  Contact.deleteContact(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  });
};

exports.searchContacts = (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Search query required" });

  Contact.searchContacts(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};
