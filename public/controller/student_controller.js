import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(); // Initialize Firestore

export async function getSyllabus(department) {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = ""; // Clear existing content

    if (!department) {
        courseList.innerHTML = "<p class='text-muted'>Please select a department.</p>";
        return;
    }

    try {
        console.log("Fetching syllabus for department:", department);

        // Query Firestore for syllabus in the selected department
        const syllabusQuery = query(
            collection(db, "syllabi"),
            where("department", "==", department.trim().toLowerCase())
        );
        const querySnapshot = await getDocs(syllabusQuery);

        console.log("Query Snapshot Size:", querySnapshot.size);

        if (querySnapshot.empty) {
            courseList.innerHTML = "<p class='text-muted'>No syllabus found for this department.</p>";
            return;
        }

        // Dynamically generate syllabus list
        querySnapshot.forEach((doc) => {
            const { courseName, courseNumber, fileURL, pdfExtractedData } = doc.data();

            const courseItem = document.createElement("div");
            courseItem.className = "list-group-item d-flex justify-content-between align-items-center";

            const courseDetails = document.createElement("span");
            courseDetails.textContent = `${courseNumber} - ${courseName}`;

            const downloadLink = document.createElement("a");
            downloadLink.href = fileURL;
            downloadLink.target = "_blank";
            downloadLink.textContent = "Download";
            downloadLink.className = "btn btn-sm btn-dark";

            const askButton = document.createElement("button");
            askButton.textContent = "Ask";
            askButton.className = "btn btn-sm btn-secondary ms-2";
            askButton.onclick = () => {
                const questionInput = document.getElementById("questionInput");
                questionInput.dataset.context = pdfExtractedData || "";
                questionInput.placeholder = "Ask a question about this syllabus...";
                alert("You can now ask questions about this syllabus.");
            };

            courseItem.appendChild(courseDetails);
            courseItem.appendChild(downloadLink);
            courseItem.appendChild(askButton);
            courseList.appendChild(courseItem);
        });
    } catch (error) {
        console.error("Error fetching syllabus data:", error);
        courseList.innerHTML = "<p class='text-danger'>Failed to load syllabus. Please try again later.</p>";
    }
}

// Function to send query to the LLM server and display the answer
export async function askQuestion(prompt) {
    const url = "http://csai01:8000/generate/"; // LLM server URL
    const answerOutput = document.getElementById("answerOutput");
    const questionInput = document.getElementById("questionInput");

    const context = questionInput.dataset.context || ""; // Get the syllabus content as context

    answerOutput.textContent = "Generating response...";

    const payload = {
        prompt: `${context}\n\n${prompt}`, // Combine syllabus content with user question
        max_tokens: 200,
        temperature: 0.75,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
    };

    try {
        console.log("Sending request to LLM server...");
        console.log("Payload:", payload);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);

        if (data && data.response && data.response.content) {
            answerOutput.textContent = data.response.content;
        } else {
            answerOutput.textContent = "Invalid response format. No content found.";
        }
    } catch (error) {
        console.error("Error querying LLM:", error);
        answerOutput.textContent = "Failed to get response. Please try again.";
    }
}
