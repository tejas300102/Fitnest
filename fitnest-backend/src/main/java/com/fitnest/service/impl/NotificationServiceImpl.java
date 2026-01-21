package com.fitnest.service.impl;

import com.fitnest.model.Notification;
import com.fitnest.model.User;
import com.fitnest.repository.NotificationRepository;
import com.fitnest.repository.UserRepository;
import com.fitnest.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void createNotificationsForAllUsers(Long postId, String title, String message) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (!"ADMIN".equals(user.getRole())) { // Don't notify admins
                Notification notification = new Notification();
                notification.setUserId(user.getId());
                notification.setPostId(postId);
                notification.setTitle(title);
                notification.setMessage(message);
                notificationRepository.save(notification);
            }
        }
    }
    
    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    @Override
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }
    
    @Override
    public long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }
    
    @Override
    public void markAsRead(Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }
    
    @Override
    public void markAllAsRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
        notifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(notifications);
    }
}