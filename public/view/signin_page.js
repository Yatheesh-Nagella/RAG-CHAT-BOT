import { root } from "./elements.js";
import { signinFirebase } from "../controller/firebase_auth.js";
import { studentPageView } from "./studentpage.js"; // Import student page view

export async function signinPageView() {
    const response = await fetch('/view/templates/signin_page_template.html', {
        cache: 'no-store'
    });

    const divWrapper = document.createElement('div'); // <div></div>
    divWrapper.style.width = "400px";
    divWrapper.classList.add('m-4', 'p-4');
    divWrapper.innerHTML = await response.text();

    // Attach form submit event listener
    const form = divWrapper.getElementsByTagName('form')[0];
    form.onsubmit = signinFirebase;

    // Attach event listener to the Student Access button
    const studentAccessBtn = divWrapper.querySelector("#student-access-btn");
    studentAccessBtn.onclick = () => {
        studentPageView(); // Load the student page
    };

    root.innerHTML = ''; // Clear the current page rendering
    root.appendChild(divWrapper);
}
