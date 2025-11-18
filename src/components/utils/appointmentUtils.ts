// Utility functions for managing appointments and notifications

export interface Appointment {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export const createAppointmentNotification = (appointment: Appointment, language: 'en' | 'ar') => {
  const notification = {
    id: `appointment-${appointment.id}`,
    type: 'appointment',
    title: language === 'ar' 
      ? `تم تأكيد موعدك: ${appointment.service}` 
      : `Appointment Confirmed: ${appointment.service}`,
    description: language === 'ar' 
      ? `موعدك في ${appointment.location} يوم ${appointment.date} الساعة ${appointment.time}` 
      : `Your appointment at ${appointment.location} on ${appointment.date} at ${appointment.time}`,
    time: 'Just now',
    read: false,
    category: 'services',
    action: 'View Details',
    appointmentId: appointment.id
  };

  // Add to notifications
  const existingNotifications = JSON.parse(localStorage.getItem('sharek_notifications') || '[]');
  const updatedNotifications = [notification, ...existingNotifications];
  localStorage.setItem('sharek_notifications', JSON.stringify(updatedNotifications));

  return notification;
};

export const cancelAppointmentNotification = (appointmentId: string, language: 'en' | 'ar') => {
  // Remove appointment notification
  const existingNotifications = JSON.parse(localStorage.getItem('sharek_notifications') || '[]');
  const filteredNotifications = existingNotifications.filter(
    (notif: any) => notif.appointmentId !== appointmentId
  );
  localStorage.setItem('sharek_notifications', JSON.stringify(filteredNotifications));

  // Add cancellation notification
  const cancellationNotification = {
    id: `cancellation-${appointmentId}-${Date.now()}`,
    type: 'service',
    title: language === 'ar' ? 'تم إلغاء الموعد' : 'Appointment Cancelled',
    description: language === 'ar' 
      ? 'تم إلغاء موعدك بنجاح. يمكنك حجز موعد جديد في أي وقت' 
      : 'Your appointment has been cancelled successfully. You can book a new appointment anytime',
    time: 'Just now',
    read: false,
    category: 'services',
    action: null
  };

  const updatedNotifications = [cancellationNotification, ...filteredNotifications];
  localStorage.setItem('sharek_notifications', JSON.stringify(updatedNotifications));
};

export const saveAppointment = (appointment: Appointment) => {
  const existingAppointments = JSON.parse(localStorage.getItem('sharek_appointments') || '[]');
  const updatedAppointments = [appointment, ...existingAppointments];
  localStorage.setItem('sharek_appointments', JSON.stringify(updatedAppointments));
};

export const getAppointments = (): Appointment[] => {
  const stored = JSON.parse(localStorage.getItem('sharek_appointments') || '[]');
  
  // If no appointments exist, add a default sample appointment
  if (stored.length === 0) {
    const defaultAppointment: Appointment = {
      id: 'default-appointment-1',
      service: 'Document Verification',
      location: 'The Pearl Service Center',
      date: new Date(Date.now() + 86400000).toLocaleDateString(), // Tomorrow
      time: '10:00 AM',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('sharek_appointments', JSON.stringify([defaultAppointment]));
    return [defaultAppointment];
  }
  
  return stored;
};

export const cancelAppointment = (appointmentId: string) => {
  const existingAppointments = getAppointments();
  const updatedAppointments = existingAppointments.map(apt => 
    apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
  );
  localStorage.setItem('sharek_appointments', JSON.stringify(updatedAppointments));
};

export const addAppointment = (appointment: Appointment) => {
  const existingAppointments = getAppointments();
  const updatedAppointments = [appointment, ...existingAppointments];
  localStorage.setItem('sharek_appointments', JSON.stringify(updatedAppointments));
};

export const getAppointmentById = (appointmentId: string): Appointment | null => {
  const appointments = getAppointments();
  return appointments.find(apt => apt.id === appointmentId) || null;
};