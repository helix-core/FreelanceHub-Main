package com.example.FreelanceHub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.FreelanceHub.models.Notification;
import com.example.FreelanceHub.repositories.NotificationRepository;



@Service
public class NotificationService {
	@Autowired
	private NotificationRepository notificationRepository;

	public void addNotification(String userId, String message) {
	    Notification notification = new Notification();
	    notification.setUserId(userId);
	    notification.setMessage(message);
	    notificationRepository.save(notification);
	}
	
	public void delNotification(String userId) {
		notificationRepository.deleteOldNotifications(userId);
	}

	public List<Notification> getNotifications(String userId) {
	    return notificationRepository.findByUserId(userId);
	}
}
