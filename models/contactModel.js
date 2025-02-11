const db = require("../config/db");

class Contact {
  static getAllContacts(callback) {
    db.query("SELECT * FROM contacts", callback);
  }

  static getContactById(id, callback) {
    db.query("SELECT * FROM contacts WHERE id = ?", [id], callback);
  }

  static createContact(contact, callback) {
    const { name, email, phone, address } = contact;
    db.query(
      "INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)",
      [name, email, phone, address || null],
      callback
    );
  }

  static updateContact(id, contact, callback) {
    const { name, email, phone, address } = contact;
    db.query(
      "UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
      [name, email, phone, address || null, id],
      callback
    );
  }

  static deleteContact(id, callback) {
    db.query("DELETE FROM contacts WHERE id = ?", [id], callback);
  }

  static searchContacts(query, callback) {
    db.query(
      "SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ?",
      [`%${query}%`, `%${query}%`],
      callback
    );
  }
}

module.exports = Contact;
