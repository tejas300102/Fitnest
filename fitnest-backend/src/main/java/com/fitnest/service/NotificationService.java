package com.fitnest.service;

import com.fitnest.model.Notification;
import java.util.List;

public interface NotificationService {
    void createNotificationsForAllUsers(Long postId, String title, String message);
    List<Notification> getUserNotifications(Long userId);
    List<Notification> getUnreadNotifications(Long userId);
    long getUnreadCount(Long userId);
    void markAsRead(Long notificationId);
    void markAllAsRead(Long userId);
}