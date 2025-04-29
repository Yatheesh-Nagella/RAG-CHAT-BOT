# 🤖 RAG-CHAT-BOT

A **Smart Data Query Assistant** built using JavaScript, Firebase, and PDF.js.  
This project allows faculty to upload course syllabi and enables students to query those documents using a Retrieval-Augmented Generation (RAG) model integrated via an external LLM API.

---

## 🧩 Features

- 🔐 Faculty authentication (sign in / sign up)
- 📤 Upload course syllabi (PDF only)
- 📚 Extracts and stores text content from PDFs
- 🔍 Students can query syllabi using natural language
- 💬 Integration with an LLM (via local API)
- ☁️ Uses Firebase Firestore and Storage
- 🌗 Supports Dark/Light mode toggle

---

## 📁 Folder Structure

```
/project-root
├── /controller
│   ├── firebase_core.js         # Firebase initialization and configuration
│   ├── student_controller.js    # Handles Firestore queries and PDF parsing
│   └── firebase_auth.js         # (Optional) Firebase authentication
├── /view
│   ├── templates/
│   │   ├── signin_page_template.html
│   │   ├── student_page_template.html
│   │   └── home_page_template.html
│   └── elements.js              # DOM element references
├── index.html                   # Main entry point
├── app.js                       # Centralized routing and event handling
├── studentpage.js               # Handles student page rendering and interactions
├── [README.md](http://_vscodecontentref_/0)                    # Documentation

```

---

## 🚀 Getting Started (Run Locally)

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) installed
- Firebase CLI installed  
  Run: `npm install -g firebase-tools`
- A Firebase project with:
  - **Authentication (Email/Password)** enabled
  - **Firestore** and **Storage** set up

---

### 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/RAG-CHAT-BOT.git
cd RAG-CHAT-BOT
npm install
```

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) installed
- Firebase CLI installed  
  Run: `npm install -g firebase-tools`
- A Firebase project with:
  - **Authentication (Email/Password)** enabled
  - **Firestore** and **Storage** set up

### 🔧 Configuration
1. **Firebase Configuration**:  
   Update the Firebase configuration in `controller/firebase_core.js` with your project's credentials.
2. **LLM API**:
   Update the LLM API endpoint in `controller/student_controller.js` with your API URL.
3. **Firebase Authentication**:  
   Ensure that Firebase authentication is set up correctly in your Firebase console.
4. **Firebase Firestore Rules**:
   Ensure that your Firestore rules allow read/write access for authenticated users.  
   Example rules:
   ```json
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

#### To run the project locally, use the following command:
```bash
firebase serve
```
This will start a local server, and you can access the application at `http://localhost:5000`.
