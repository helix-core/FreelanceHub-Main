document.addEventListener("DOMContentLoaded", function () {
    const skillsMatchedBar = document.getElementById("skillsMatchedBar");
    const skillsMatchedPercent = document.getElementById("skillsMatchedPercent");

    // Get the percentage from the data attribute set by Thymeleaf
    const matchedPercentage = parseInt(skillsMatchedBar.getAttribute("data-percentage"), 10);

    updateCircularProgress("skillsMatchedBar", "skillsMatchedPercent", matchedPercentage);
});

function updateCircularProgress(barId, percentageId, percentage) {
    const progressBar = document.getElementById(barId);
    const percentageText = document.getElementById(percentageId);

    // Update the percentage text inside the circle
    percentageText.textContent = `${percentage}%`;

    // Calculate the degree for the conic-gradient (percentage * 3.6 gives the angle)
    const angle = percentage * 3.6;

    // Set the conic-gradient based on the calculated angle
    progressBar.style.background = `conic-gradient(
        rgba(21, 201, 180, 0.50) ${angle}deg,
        #ddd ${angle}deg 360deg
    )`;
}

// Function to populate the missing skills as text
function updateMissingSkills(missingSkills) {
    const skillsMissingList = document.getElementById("skillsMissingList");

    // Clear any existing list items
    skillsMissingList.innerHTML = "";

    // Populate the missing skills dynamically
    missingSkills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsMissingList.appendChild(li);
    });
}

// Consolidated Event Listener for sliders
document.addEventListener("DOMContentLoaded", function () {
    const sliders = [
        { id: "salarySlider", valueId: "salaryValue" },
        { id: "durationSlider", valueId: "durationValue" },
        { id: "experienceSlider", valueId: "experienceValue" }
    ];

    sliders.forEach(({ id, valueId }) => {
        const slider = document.getElementById(id);
        const valueDisplay = document.getElementById(valueId);

        // Set initial display from the slider value
        valueDisplay.textContent = slider.value;

        // Update the value display when the slider changes
        slider.addEventListener("input", () => {
            valueDisplay.textContent = slider.value;
        });
    });
});

// File upload logic for previous works
const fileInput = document.getElementById("previousWorks");
const filesList = document.getElementById("uploadedFilesList");

fileInput.addEventListener("change", () => {
    filesList.innerHTML = ""; // Clear previous list
    Array.from(fileInput.files).forEach((file) => {
        const listItem = document.createElement("p");
        listItem.textContent = `• ${file.name}`;
        filesList.appendChild(listItem);
    });
});
