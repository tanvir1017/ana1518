import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Bell, 
  MessageSquare, 
  Vote, 
  Calendar, 
  FileText,
  Users,
  CheckCircle,
  Clock,
  Trash2,
  Filter
} from 'lucide-react';

interface NotificationScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: 'en' | 'ar';
}

export default function NotificationScreen({ onNavigate, language }: NotificationScreenProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  
  // Load notifications from localStorage, initialize with defaults only once
  const getNotifications = () => {
    const stored = localStorage.getItem('sharek_notifications');
    
    // If there's stored data, use it
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored notifications:', error);
      }
    }
    
    // Only use default notifications if no stored data exists
    const defaultNotifications = [
      {
        id: '1',
        type: 'survey',
        title: language === 'ar' ? 'استطلاع جديد: تطوير النقل العام' : 'New Survey: Public Transport Development',
        description: language === 'ar' ? 'شاركنا رأيك في تطوير النقل العام في قطر' : 'Share your opinion on public transport development in Qatar',
        time: '2 hours ago',
        read: false,
        category: 'participation',
        action: 'Take Survey'
      },
      {
        id: '2',
        type: 'poll',
        title: language === 'ar' ? 'تصويت جديد: أفضل وقت لفعاليات المجتمع' : 'New Poll: Best Time for Community Events',
        description: language === 'ar' ? 'صوت الآن لاختيار أفضل وقت للفعاليات' : 'Vote now to choose the best time for events',
        time: '4 hours ago',
        read: false,
        category: 'participation',
        action: 'Vote Now'
      },
      {
        id: '3',
        type: 'policy',
        title: language === 'ar' ? 'مشروع سياسة التعليم عن بُعد متاح للمراجعة' : 'Remote Education Policy Draft Available for Review',
        description: language === 'ar' ? 'اطلع على مشروع السياسة الجديدة وشارك بتعليقاتك' : 'Review the new policy draft and share your comments',
        time: '1 day ago',
        read: true,
        category: 'policy',
        action: 'Review Policy'
      },
      {
        id: '4',
        type: 'appointment',
        title: language === 'ar' ? 'تذكير: موعد في مركز الخدمات غداً' : 'Reminder: Service Center Appointment Tomorrow',
        description: language === 'ar' ? 'موعدك في مركز خدمات الدوحة الرئيسي الساعة 10:00 ص' : 'Your appointment at Doha Main Service Center at 10:00 AM',
        time: '1 day ago',
        read: false,
        category: 'services',
        action: 'View Details',
        appointmentId: 'default-appointment-1'
      },
      {
        id: '5',
        type: 'forum',
        title: language === 'ar' ? 'رد جديد على مناقشتك: مستقبل التكنولوجيا' : 'New Reply to Your Discussion: Future of Technology',
        description: language === 'ar' ? 'أحمد علي رد على مناقشتك حول التكنولوجيا' : 'Ahmed Ali replied to your discussion about technology',
        time: '2 days ago',
        read: true,
        category: 'participation',
        action: 'View Discussion'
      },
      {
        id: '6',
        type: 'service',
        title: language === 'ar' ? 'طلب تجديد رخصة القيادة قيد المعالجة' : 'Driving License Renewal Request Processing',
        description: language === 'ar' ? 'طلبك رقم #DL-2024-001 قيد المراجعة' : 'Your request #DL-2024-001 is under review',
        time: '3 days ago',
        read: true,
        category: 'services',
        action: 'Track Status'
      }
    ];
    
    // Save default notifications to localStorage for first time
    localStorage.setItem('sharek_notifications', JSON.stringify(defaultNotifications));
    return defaultNotifications;
  };

  const [notifications, setNotifications] = useState<any[]>([]);

  // Load notifications when component mounts
  useEffect(() => {
    setNotifications(getNotifications());
  }, [language]); // Reload when language changes

  const texts = {
    en: {
      title: 'Notifications',
      subtitle: 'Stay Updated',
      all: 'All',
      participation: 'Participation',
      services: 'Services',
      policy: 'Policy',
      markAllRead: 'Mark All Read',
      clearAll: 'Clear All',
      noNotifications: 'No notifications',
      noNotificationsDesc: 'You\'re all caught up!',
      settings: 'Notification Settings'
    },
    ar: {
      title: 'التنبيهات',
      subtitle: 'ابق على اطلاع',
      all: 'الكل',
      participation: 'المشاركة',
      services: 'الخدمات',
      policy: 'السياسات',
      markAllRead: 'تعيين الكل كمقروء',
      clearAll: 'مسح الكل',
      noNotifications: 'لا توجد تنبيهات',
      noNotificationsDesc: 'أنت مواكب لكل شيء!',
      settings: 'إعدادات التنبيهات'
    }
  };

  const t = texts[language];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'survey':
        return <FileText className="w-5 h-5 text-primary" />;
      case 'poll':
        return <Vote className="w-5 h-5 text-accent" />;
      case 'policy':
        return <FileText className="w-5 h-5 text-orange-500" />;
      case 'appointment':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'forum':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'service':
        return <Users className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    return notification.category === activeTab;
  });

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    try {
      localStorage.setItem('sharek_notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    try {
      localStorage.setItem('sharek_notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    try {
      localStorage.setItem('sharek_notifications', JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    try {
      localStorage.setItem('sharek_notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationAction = (notification: any) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'survey':
      case 'poll':
      case 'forum':
        onNavigate('e-participation');
        break;
      case 'policy':
        onNavigate('policy-consultation');
        break;
      case 'appointment':
        // For appointment notifications, show appointment details
        if (notification.action === 'View Details' || notification.appointmentId) {
          onNavigate('appointment-details', { appointmentId: notification.appointmentId });
        } else {
          onNavigate('appointment-booking');
        }
        break;
      case 'service':
        onNavigate('service-center');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center p-6 pt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('home')}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div>
            <h1 className="text-xl font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Action Buttons */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <Button
                onClick={markAllAsRead}
                variant="outline"
                size="sm"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t.markAllRead}
              </Button>
              <Button
                onClick={clearAllNotifications}
                variant="outline"
                size="sm"
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t.clearAll}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl border shadow-sm h-12 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
              {t.all}
            </TabsTrigger>
            <TabsTrigger value="participation" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
              {t.participation}
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
              {t.services}
            </TabsTrigger>
            <TabsTrigger value="policy" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs">
              {t.policy}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredNotifications.length === 0 ? (
              <Card className="bg-white shadow-md rounded-2xl border-0">
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-800 mb-2">{t.noNotifications}</h3>
                  <p className="text-gray-600 text-sm">{t.noNotificationsDesc}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'} shadow-md rounded-2xl border cursor-pointer hover:shadow-lg transition-all`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-blue-900'} text-sm leading-tight`}>
                                {notification.title}
                              </h3>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse ml-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                )}
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 text-gray-400 hover:text-destructive hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </motion.button>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                              {notification.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                              
                              {notification.type === 'appointment' && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationAction(notification);
                                  }}
                                  size="sm"
                                  className="bg-primary hover:bg-accent text-white text-xs px-3 py-1 h-7"
                                >
                                  {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}