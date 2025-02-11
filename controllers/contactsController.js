const db = require("../database/database");
const { body, validationResult } = require("express-validator");

// Fetch all contacts
exports.getContacts = (req, res) => {
    db.all("SELECT * FROM contacts", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        res.status(200).json(rows);
    });
};

// Fetch a single contact by ID
exports.getContactById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM contacts WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(row);
    });
};

// Create a new contact with validation
exports.createContact = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, address } = req.body;
        db.run(
            "INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)",
            [name, email, phone, address],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Database error", error: err.message });
                }
                res.status(201).json({
                    id: this.lastID,
                    name,
                    email,
                    phone,
                    address,
                    created_at: new Date(),
                });
            }
        );
    },
];

// Update an existing contact
exports.updateContact = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        db.run(
            "UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
            [name, email, phone, address, id],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Database error", error: err.message });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ message: "Contact not found" });
                }
                res.status(200).json({ message: "Contact updated successfully" });
            }
        );
    },
];

// Delete a contact
exports.deleteContact = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM contacts WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    });
};

// Search contacts by name or email
exports.searchContacts = (req, res) => {
    const { query } = req.params;
    db.all(
        "SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ?",
        [`%${query}%`, `%${query}%`],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            res.status(200).json(rows);
        }
    );
};
