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
    // Search button handler
    const searchBtn = document.getElementById("searchBtn");
    const departmentFilter = document.getElementById("departmentFilter");

    searchBtn.addEventListener("click", () => {
        const selectedDepartment = departmentFilter.value.trim().toLowerCase();
        if (!selectedDepartment) {
            alert("Please enter a department name.");
            return;
        }
        getSyllabus(selectedDepartment);
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
