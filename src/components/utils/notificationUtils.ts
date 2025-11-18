export interface Notification {
  id: string;
  type: 'appointment' | 'service' | 'announcement' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
  category: string;
  action?: string;
  appointmentId?: string;
}

export const addNotification = (notification: Notification) => {
  try {
    const existing = localStorage.getItem('sharek_notifications');
    const notifications: Notification[] = existing ? JSON.parse(existing) : [];
    
    notifications.unshift(notification); // Add to beginning
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
      notifications.splice(50);
    }
    
    localStorage.setItem('sharek_notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

export const getNotifications = (): Notification[] => {
  try {
    const stored = localStorage.getItem('sharek_notifications');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = (notificationId: string) => {
  try {
    const existing = localStorage.getItem('sharek_notifications');
    const notifications: Notification[] = existing ? JSON.parse(existing) : [];
    
    const updated = notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    
    localStorage.setItem('sharek_notifications', JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating notification:', error);
  }
};