import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aishaProfileImage from 'figma:asset/af1470a4393d583ed9cf65c60ffcaf81cc801000.png';
import { 
  Vote, 
  BookOpen, 
  FileText, 
  Star, 
  Building2, 
  MessageSquare,
  ChevronRight,
  Bell,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';
import { getNotifications } from './utils/notificationUtils';

interface HomeScreenProps {
  userData: any;
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function HomeScreen({ userData, onNavigate, language }: HomeScreenProps) {
  const isRTL = language === 'ar';
  const [unreadCount, setUnreadCount] = useState(0);

  // Check for unread notifications
  useEffect(() => {
    const checkUnreadNotifications = () => {
      const notifications = getNotifications();
      const unreadNotifications = notifications.filter(notification => !notification.read);
      setUnreadCount(unreadNotifications.length);
    };

    checkUnreadNotifications();
    
    // Check periodically for changes (when user returns to home screen)
    const interval = setInterval(checkUnreadNotifications, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const texts = {
    en: {
      welcome: 'Welcome',
      quickAccess: 'Quick Access',
      newsAnnouncements: 'News & Announcements',
      eParticipation: 'E-Participation',
      serviceCatalog: 'Service Catalog',
      policyConsultation: 'Policy Consultation',
      satisfactionIndex: 'Satisfaction Index',
      serviceCenter: 'Service Center',
      feedbackTracker: 'Feedback Tracker',
      activeConsultations: 'Active Consultations',
      viewAll: 'View All',
      new: 'New'
    },
    ar: {
      welcome: 'مرحباً',
      quickAccess: 'الوصول السريع',
      newsAnnouncements: 'الأخبار والإعلانات',
      eParticipation: 'المشاركة الإلكترونية',
      serviceCatalog: 'كتالوج الخدمات',
      policyConsultation: 'استشارة السياسات',
      satisfactionIndex: 'مؤشر الرضا',
      serviceCenter: 'مركز الخدمات',
      feedbackTracker: 'متتبع التعليقات',
      activeConsultations: 'الاستشارات النشطة',
      viewAll: 'عرض الكل',
      new: 'جديد'
    }
  };

  const t = texts[language];

  const quickAccessItems = [
    {
      icon: Vote,
      title: t.eParticipation,
      screen: 'e-participation',
      color: 'from-[#468BA4] to-[#5A9AB8]',
      badge: '12'
    },
    {
      icon: BookOpen,
      title: t.serviceCatalog,
      screen: 'service-catalog',
      color: 'from-[#468BA4] to-[#5A9AB8]',
      badge: null
    },
    {
      icon: FileText,
      title: t.policyConsultation,
      screen: 'policy-consultation',
      color: 'from-[#468BA4] to-[#5A9AB8]',
      badge: '3'
    },
    {
      icon: Star,
      title: t.satisfactionIndex,
      screen: 'satisfaction-index',
      color: 'from-[#468BA4] to-[#5A9AB8]',
      badge: null
    },
    {
      icon: Building2,
      title: t.serviceCenter,
      screen: 'service-centers',
      color: 'from-[#468BA4] to-[#5A9AB8]',
      badge: null
    },
    {
      icon: MessageSquare,
      title: t.feedbackTracker,
      screen: 'feedback-tracker',
      color: 'from-[#468BA4] to-[#5A9AB8]',
      badge: '2'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: language === 'ar' ? 'افتتاح مركز قطر الجديد للحكومة الذكية في الدوحة' : 'New Qatar Smart Government Center Opens in Doha',
      subtitle: language === 'ar' ? 'مركز متطور يخدم المواطنين بأحدث التقنيات الذكية' : 'Advanced center serving citizens with latest smart technologies',
      date: '2024-01-18',
      image: 'https://images.unsplash.com/photo-1685113872064-de4180a0ea93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2hhJTIwcWF0YXIlMjBza3lsaW5lJTIwYnVpbGRpbmdzfGVufDF8fHx8MTc1OTc2MzA1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: true
    },
    {
      id: 2,
      title: language === 'ar' ? 'متحف الفن الإسلامي يطلق معرض التراث الرقمي' : 'Museum of Islamic Art Launches Digital Heritage Exhibition',
      subtitle: language === 'ar' ? 'تجربة تفاعلية جديدة تعرض التراث القطري بالتقنيات الحديثة' : 'New interactive experience showcasing Qatari heritage with modern technology',
      date: '2024-01-16',
      image: 'https://images.unsplash.com/photo-1577983683283-03bbe8df2aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMG11c2V1bSUyMGlzbGFtaWMlMjBhcnR8ZW58MXx8fHwxNzU5NzYzMDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: true
    },
    {
      id: 3,
      title: language === 'ar' ? 'مشروع التشجير الجديد في الصحراء القطرية' : 'New Desert Greening Project in Qatar',
      subtitle: language === 'ar' ? 'مبادرة مبتكرة لزراعة الصحراء وحماية البيئة' : 'Innovative initiative for desert cultivation and environmental protection',
      date: '2024-01-14',
      image: 'https://images.unsplash.com/photo-1610034880166-6ef11d8f9176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMGRlc2VydCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTk3NjMwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: false
    },
    {
      id: 4,
      title: language === 'ar' ? 'تطوير سوق واقف بتقنيات رقمية حديثة' : 'Souq Waqif Enhanced with Modern Digital Technologies',
      subtitle: language === 'ar' ? 'دمج التقنيات الذكية مع التراث التقليدي في سوق واقف' : 'Integrating smart technologies with traditional heritage at Souq Waqif',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1607022301188-19eed62de850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMHRyYWRpdGlvbmFsJTIwc291cSUyMG1hcmtldHxlbnwxfHx8fDE3NTk3NjMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: false
    }
  ];

  const stats = [
    { icon: Users, value: '1,247', label: language === 'ar' ? 'المشاركين النشطي��' : 'Active Participants' },
    { icon: FileText, value: '23', label: language === 'ar' ? 'الاستشارات المفتوحة' : 'Open Consultations' },
    { icon: TrendingUp, value: '94%', label: language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate' }
  ];

  return (
    <div className="h-screen bg-gray-50 pb-16 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between p-4 pt-10">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <ImageWithFallback
                src={userData?.profile?.profilePhoto || aishaProfileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                fallback={aishaProfileImage}
              />
            </div>
            <div>
              <p className="text-white/80 text-xs">{t.welcome}</p>
              <h1 className="font-medium">{userData?.profile?.name || 'Aisha'}</h1>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('notifications')}
            className="relative"
          >
            <Bell className="w-6 h-6 text-white" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
            )}
          </motion.button>
        </div>

        {/* Stats Bar */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <stat.icon className="w-3 h-3 text-white/80 mr-1" />
                  <span className="font-medium text-sm">{stat.value}</span>
                </div>
                <p className="text-white/70 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10 space-y-6">
        {/* Quick Access */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-800">{t.quickAccess}</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {quickAccessItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.screen)}
                  className="relative cursor-pointer"
                >
                  <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 rounded-2xl p-4 text-center border border-gray-100 hover:border-primary/20 transition-all duration-300 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    {item.badge && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{item.badge}</span>
                      </div>
                    )}
                    <p className="text-xs font-medium text-gray-700 leading-tight">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* News & Announcements */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-gray-800">{t.newsAnnouncements}</h2>
            <button 
              onClick={() => onNavigate('news-list')}
              className="text-primary text-xs font-medium flex items-center"
            >
              {t.viewAll}
              <ChevronRight className="w-3 h-3 ml-1 rtl:ml-0 rtl:mr-1 rtl:rotate-180" />
            </button>
          </div>

          <div className="flex space-x-3 rtl:space-x-reverse overflow-x-auto pb-3">
            {newsItems.map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('news-article', { newsId: news.id })}
                className="flex-shrink-0 w-64 cursor-pointer"
              >
                <Card className="bg-white shadow-md rounded-xl border-0 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      className="w-full h-24 object-cover"
                    />
                    {news.isNew && (
                      <Badge className="absolute top-2 left-2 bg-destructive text-white border-0 text-xs">
                        {t.new}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center text-gray-500 text-xs mb-1">
                      <Calendar className="w-2 h-2 mr-1" />
                      {news.date}
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 leading-tight mb-1">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                      {news.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Consultations */}
        <Card className="mt-6 bg-white shadow-md rounded-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-gray-800">{t.activeConsultations}</h2>
              <Badge className="bg-primary/10 text-primary border-0 text-xs">12</Badge>
            </div>
            
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => onNavigate('policy-consultation-detail', { consultationId: i })}
                  className="cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {language === 'ar' ? `استشارة السياسة العامة ${i}` : `Public Policy Consultation ${i}`}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-gray-400 rtl:rotate-180" />
                  </div>
                  <p className="text-gray-600 text-xs mb-2">
                    {language === 'ar' ? 'وزارة التطوير الإداري والعمل والشؤون الاجتماعية' : 'Ministry of Administrative Development, Labour and Social Affairs'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="w-3 h-3 mr-1" />
                      {245 + i * 50} {language === 'ar' ? 'مشارك' : 'participants'}
                    </div>
                    <span className="text-xs text-destructive">
                      {language === 'ar' ? 'ينتهي في' : 'Ends in'} {5 - i} {language === 'ar' ? 'أيام' : 'days'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}