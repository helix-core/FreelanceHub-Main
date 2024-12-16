
async function performSearch() {
    const searchInput = document.getElementById("searchInput").value;

    if (searchInput.trim()) {
        try {
            const response = await fetch(`/search?query=${encodeURIComponent(searchInput)}`);
            if (!response.ok) {
                alert("No matching jobs found.");
                return;
            }

            const { jobs, role } = await response.json();
            displayJobs(jobs, role);
        } catch (error) {
            console.error("Error while fetching jobs:", error);
            alert("An error occurred. Please try again later.");
        }
    } else {
        fetchAllJobs();
    }
}

async function fetchAllJobs() {
    try {
        const response = await fetch(`/search?query=`);

        if (!response.ok) {
            alert("No jobs found.");
            return;
        }

        const { jobs, role } = await response.json();
        displayJobs(jobs, role);
    } catch (error) {
        console.error("Error while fetching all jobs:", error);
        alert("An error occurred. Please try again later.");
    }
}

function displayJobs(jobs, role) {
    const jobListingsContainer = document.querySelector(".job-listings");
    jobListingsContainer.innerHTML = ""; // Clear current job listings

    if (jobs.length === 0) {
        jobListingsContainer.innerHTML = "<p>No jobs found.</p>";
    } else {
        jobs.forEach(job => {
            const jobCard = document.createElement("div");
            jobCard.classList.add("job-card");

            jobCard.innerHTML = `
                <h2>${job.jobTitle}</h2>
                <p><strong>Company:</strong> ${job.clients.companyName}</p>
                <p><strong>Max Duration:</strong> ${job.durMax} months</p>
                <p><strong>Average Wage:</strong> $${(job.costMin + job.costMax) / 2}$/hour</p>
                <p><strong>Experience:</strong> ${job.expMin} years</p>
                ${
                    role === 'freelancer'
                    ? `<a type="button" class="button-style" href="/apply?id=${job.jobId}">Apply</a>`
                    : ''
                }
            `;

            jobListingsContainer.appendChild(jobCard);
        });
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        performSearch();
    }
}


