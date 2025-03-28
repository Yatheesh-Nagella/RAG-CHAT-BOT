import { db, storage } from "./firebase_core.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const auth = getAuth();

export async function onsubmitSyllabusUploadForm(e) {
    e.preventDefault();

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
        alert("You must be signed in to upload a syllabus.");
        return;
    }

    const formData = new FormData(e.target);
    const department = formData.get("department");
    const courseNumber = formData.get("courseNumber");
    const courseName = formData.get("courseName");
    const file = formData.get("syllabus");

    if (!file || file.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
    }

    // Initialize the progress bar
    const progressBar = document.getElementById("uploadProgressBar");
    progressBar.style.width = "0%";
    progressBar.textContent = "0%";

    try {
        // Step 1: Extract Text from PDF
        const pdfExtractedData = await extractTextFromPDF(file);

        if (!pdfExtractedData) {
            alert("Failed to extract text from the PDF. Upload will continue without extracted content.");
        }

        // Step 2: Upload PDF to Firebase Storage with progress tracking
        const storagePath = `syllabi/${department}_${courseNumber}_${courseName}.pdf`;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Update progress bar
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
                progressBar.textContent = `${Math.round(progress)}%`;
            },
            (error) => {
                console.error("Error during file upload:", error);
                alert("Failed to upload file. Please try again.");
            },
            async () => {
                // Step 3: Get the downloadable URL
                const fileURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Step 4: Save Metadata and Extracted Text to Firestore
                const syllabiCollection = collection(db, "syllabi");
                await addDoc(syllabiCollection, {
                    department,
                    courseNumber,
                    courseName,
                    fileURL,
                    pdfExtractedData: pdfExtractedData || "", // Save extracted data
                    uploadedBy: user.email, // Log who uploaded it
                    timestamp: new Date(), // Add timestamp for tracking
                });

                // Reset the form
                e.target.reset();
                progressBar.style.width = "0%";
                progressBar.textContent = "Upload Complete";

                alert("Syllabus uploaded successfully!");
            }
        );
    } catch (error) {
        console.error("Error uploading syllabus:", error);
        alert("Failed to upload syllabus. Please try again.");
    }
}

// Function to extract text from a PDF file using pdf.js
export async function extractTextFromPDF(file) {
    try {
        // Convert the uploaded file to an ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Use pdf.js to load the PDF
        const pdfjsLib = window["pdfjs-dist/build/pdf"];
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let extractedText = "";

        // Loop through all pages in the PDF and extract text
        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
        }

        return extractedText || "No text found.";
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        return null;
    }
}
