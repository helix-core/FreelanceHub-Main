document.addEventListener("DOMContentLoaded", function () {
        const role = document.getElementById("userRole").value;
        const navbarLinks = document.getElementById("nav-links");
        const signupLink = document.getElementById("signup-link");
        const loginLink = document.getElementById("login-link");
        const messagesDropdown = document.getElementById("messages-dropdown");
		const messagesList = messagesDropdown.querySelector("ul");

        // Clear default links if logged in
        if (role !== "") {
            navbarLinks.removeChild(signupLink);
            navbarLinks.removeChild(loginLink);
        }
        
  
        function createProfileDropdown() {
            const profileItem = document.createElement("li");
            profileItem.classList.add("profile-item");

            // Profile Icon Container
            const profileIconContainer = document.createElement("div");
            profileIconContainer.className = "profile-icon-container";

            const icon = document.createElement("img");
            icon.src = "/images/profile_png.png"; // Replace with the actual image URL
            icon.className = "profile-icon";

            profileIconContainer.appendChild(icon);

            // Dropdown Menu
            const dropdownMenu = document.createElement("div");
            dropdownMenu.className = "dropdown-menu";

            const profileLink = document.createElement("a");
            profileLink.href = role === "client" ? "/profile/client" : "/profile/freelancer";
            profileLink.textContent = "Profile";

            const dashboardLink = document.createElement("a");
            dashboardLink.href = role === "client" ? "/posted-jobs" : "/accepted-jobs";
            dashboardLink.textContent = "Dashboard";

            const logoutLink = document.createElement("a");
            logoutLink.href = "/logout";
            logoutLink.textContent = "Logout";

            dropdownMenu.appendChild(profileLink);
            dropdownMenu.appendChild(dashboardLink);
            dropdownMenu.appendChild(logoutLink);

            // Append dropdown to profile icon container
            profileItem.appendChild(profileIconContainer);
            profileItem.appendChild(dropdownMenu);

            // Show/hide dropdown on click
            profileIconContainer.addEventListener("click", () => {
                const isVisible = dropdownMenu.style.display === "block";
                dropdownMenu.style.display = isVisible ? "none" : "block";
            });

            // Close dropdown if clicked outside
            document.addEventListener("click", (event) => {
                if (!profileItem.contains(event.target)) {
                    dropdownMenu.style.display = "none";
                }
            });

            return profileItem;
        }

        // Role-based Navbar Links
        if (role === "client") {
            // Client-specific Navbar links
            const hireTalent = document.createElement("li");
            const hireTalentLink = document.createElement("a");
            hireTalentLink.href = "/postjob";
            hireTalentLink.textContent = "Post Job";
            hireTalent.appendChild(hireTalentLink);
            navbarLinks.appendChild(hireTalent);

        } else if (role === "freelancer") {
            // Freelancer-specific Navbar links
            const findWork = document.createElement("li");
            const findWorkLink = document.createElement("a");
            findWorkLink.href = "/applied-jobs";
            findWorkLink.textContent = "Applications";
            findWork.appendChild(findWorkLink);
            navbarLinks.appendChild(findWork);

        }
        
     	
        if (role === "client" || role === "freelancer") {
            const messages = document.createElement("li");
            const messagesLink = document.createElement("a");
            messagesLink.href = "#";
            messagesLink.classList.add("button");
            messagesLink.textContent = "Notifications";
            
            const notificationBadge = document.createElement("span");
            notificationBadge.classList.add("notification-badge");
            messagesLink.appendChild(notificationBadge);
            
            messages.appendChild(messagesLink);
            navbarLinks.appendChild(messages);
			
            messagesDropdown.style.display = "none";
            messages.appendChild(messagesDropdown);
         	
            let hasOpenedDropdown = false; 
            // Add a click event to show/hide the dropdown
            messagesLink.addEventListener("click", () => {
                const isVisible = messagesDropdown.style.display === "block";
                messagesDropdown.style.display = isVisible ? "none" : "block";
                
				if (!hasOpenedDropdown) {
                    notificationBadge.style.display = "none";
                    
                    // When opening the dropdown, mark notifications as read
                    fetch('/markNotificationsAsRead', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                // Update badge to reflect only new unread notifications in the future
                                notificationBadge.textContent="";
                                notificationBadge.style.display = "none";
                            } else {
                                console.error('Failed to mark notifications as read');
                            }
                        })
                        .catch(error => console.error('Error marking notifications as read:', error));
                		
                    	hasOpenedDropdown=true;
				}
            });

            // Close dropdown if clicked outside
            document.addEventListener("click", (event) => {
                if (!messages.contains(event.target)) {
                    messagesDropdown.style.display = "none";
                }
            });

            fetch('/getUnreadNotifications')
            .then(response => response.json())
            .then(data => {
            	console.log(data)
            	const notifications=data.notifications;
            	const unreadCount=data.unreadCount;
                if (notifications.length > 0) {
                	if(unreadCount>0){
                		notificationBadge.textContent = unreadCount;// Set the count
                    	notificationBadge.style.display = "block";
                	}
                	else{
                		notificationBadge.style.display = "none"; 
                	}
                    notifications.forEach(notif => {
                        const notifItem = document.createElement("li");
                        const notifMessage = document.createElement("p");
                        notifMessage.textContent = notif.message;
                        notifItem.appendChild(notifMessage);
                        messagesList.appendChild(notifItem);
                    });
                } else {
                	notificationBadge.style.display="none";
                    const noNotifications = document.createElement("li");
                    noNotifications.textContent = "No new messages.";
                    messagesList.appendChild(noNotifications);
                }
            })
            .catch(error => console.error('Error fetching notifications:', error));
            
            // Add profile dropdown
            navbarLinks.appendChild(createProfileDropdown());
        }

    });