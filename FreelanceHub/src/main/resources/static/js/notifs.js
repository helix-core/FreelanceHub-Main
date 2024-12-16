document.addEventListener("DOMContentLoaded", () => {
    const notification = document.getElementById("notification");
    
    if (notification && notification.classList.contains("visible")) {
        setTimeout(() => {
            notification.classList.remove("visible");
            notification.classList.add("hidden");
        }, 2000);
    }
});