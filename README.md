# Contact Management API

## Overview
This is a Contact Management API built using **Node.js** and **Express.js** with **MySQL** as the database. The API allows users to **create, update, delete, view, and search contacts**.

## Features
- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Search Contacts**: Search contacts by name or email.
- **Data Validation**: Uses `express-validator` for input validation.
- **Error Handling**: Proper error messages for missing fields or invalid requests.
- **MySQL Database**: Stores all contacts with a unique `id`.

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **express-validator**

---

## Installation & Setup

### Prerequisites
- Install **Node.js** & **MySQL** on your system.
- Create a MySQL database.

### Steps to Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/contact-management-api.git
   cd contact-management-api
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Configure Database**
   - Create a MySQL database named `contact_db`.
   - Update `config/db.js` with your MySQL credentials.
   ```javascript
   module.exports = {
     host: "localhost",
     user: "root",
     password: "your_password",
     database: "contact_db",
   };
   ```
4. **Run Database Migrations**
   ```bash
   npm run migrate
   ```
5. **Start the Server**
   ```bash
   npm start
   ```
6. **API will be running at:** `http://localhost:5000`

---

## API Endpoints

### 1. Get All Contacts
**Endpoint:** `GET /contacts`
```http
http://localhost:5000/contacts

![BLACKWINSTECH GET Preview](images/Blackwinstech GET.PNG)
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "555-666-7777",
    "address": "789 Pine St, TX",
    "created_at": "2024-02-11T10:10:00.000Z"
  }
]
```

### 2. Get Single Contact
**Endpoint:** `GET /contacts/:id`
```http
http://localhost:5000/contacts/1
```

### 3. Create a Contact
**Endpoint:** `POST /contacts`
```http
http://localhost:5000/contacts

![BLACKWINSTECH POST Preview](images/Blackwinstech POST.PNG)

```
**Request Body:**
```json
{
    "name": "Charlie White",
    "email": "charlie@example.com",
    "phone": "999-888-7777",
    "address": "202 Cedar St, IL"
}
```

### 4. Update a Contact
**Endpoint:** `PUT /contacts/:id`
```http
http://localhost:5000/contacts/3

![BLACKWINSTECH PUT Preview](images/Blackwinstech PUT.PNG)

```
**Request Body:**
```json
{ "message": "Contact updated successfully" }
```

### 5. Delete a Contact
**Endpoint:** `DELETE /contacts/:id`
```http
http://localhost:5000/contacts/5

![BLACKWINSTECH DELETE Preview](images/Blackwinstech DELETE.PNG)

```

### 6. Search Contacts (By Name or Email)
**Endpoint:** `GET /contacts/search?query=Alice`
```http
http://localhost:5000/contacts/search?query=Alice
```

---

## Dummy Data (For Testing)
Insert these records in `contacts` table before testing:
```sql
INSERT INTO contacts (name, email, phone, address, created_at) VALUES
("Alice Johnson", "alice@example.com", "555-666-7777", "789 Pine St, TX", NOW()),
("Bob Smith", "bob@example.com", "555-444-3333", "123 Oak St, CA", NOW());
```

---

## Folder Structure
```
📂 contact-management-api
├── 📂 config
│   ├── db.js  (Database configuration)
├── 📂 controllers
│   ├── contactController.js (API logic)
├── 📂 models
│   ├── Contact.js  (Database Model)
├── 📂 routes
│   ├── contactRoutes.js (Routes definition)
├── server.js (Entry point)
├── package.json
├── README.md (This file)
```

---

Deployment
Live Demo: The application is hosted on Render.
Access it here: 
