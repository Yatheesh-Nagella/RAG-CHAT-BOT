# Smart Data Query Assistant

This project is a web-based application that allows students to interact with uploaded course syllabi using natural language queries. The platform integrates Firebase for data management and storage and uses `pdf.js` for PDF parsing to provide a seamless experience.

---

## Features

- **Filter by Department**: Students can select a department to view all associated courses and their syllabi.
- **Download Syllabus**: Students can click on any course to download or view the syllabus PDF.
- **Upload PDF Syllabus**: Users can upload PDF syllabi for processing and storage.
- **Natural Language Query**: Students can ask questions about the syllabus using a natural language interface powered by a backend LLM server.

---

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - `pdf.js` for in-browser PDF text extraction

- **Backend**:
  - Firebase Firestore for database management
  - Firebase Storage for storing syllabus PDFs
  - An LLM server for answering natural language queries (`http://csai01:8000/generate/`)

---

## Prerequisites

### Firebase Configuration
1. Set up a Firebase project.
2. Configure Firestore with a `syllabi` collection. Each document should contain:
   - `department`: The department name (e.g., "Computer Science").
   - `courseName`: The name of the course (e.g., "Data Structures").
   - `courseNumber`: The course number (e.g., "CS202").
   - `fileURL`: A link to the uploaded PDF syllabus.

3. Configure Firebase Storage to allow uploading PDF files.

### Dependencies
- **pdf.js**:
  Add the following script to your `HTML`:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>


## File Structure

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
├── README.md                    # Documentation
```

#### License
This project is licensed under the GNU GENERAL PUBLIC LICENSE. See the LICENSE file for details.