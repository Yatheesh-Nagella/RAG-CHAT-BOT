import { askQuestion, getSyllabus } from "../controller/student_controller.js";

export async function studentPageView() {
    const response = await fetch('/view/templates/student_page_template.html', {
        cache: 'no-store'
    });

    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();

    root.innerHTML = ''; // Clear the current page rendering
    root.appendChild(divWrapper);

    // Attach event listener to department filter
    const departmentFilter = document.getElementById("departmentFilter");
    departmentFilter.addEventListener("change", (event) => {
        const selectedDepartment = event.target.value;
        getSyllabus(selectedDepartment); // Fetch and display syllabus
    });

    // Attach event listener to ask question button
    const askQuestionBtn = document.getElementById("askQuestionBtn");
    askQuestionBtn.addEventListener("click", () => {
        const questionInput = document.getElementById("questionInput");
        const questionText = questionInput.value.trim();
        const context = questionInput.dataset.context || ""; // Use context from loaded syllabus

        if (!questionText) {
            alert("Please enter a question!");
            return;
        }

        askQuestion(questionText, context);
    });
}
