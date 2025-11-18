import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aishaProfileImage from 'figma:asset/af1470a4393d583ed9cf65c60ffcaf81cc801000.png';
import DataManager from './utils/dataManager';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  User, 
  Edit3,
  Bell,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Settings,
  Star,
  Calendar,
  MessageSquare,
  Eye
} from 'lucide-react';

interface AccountScreenProps {
  userData: any;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export default function AccountScreen({ userData, onLogout, onNavigate, language, setLanguage }: AccountScreenProps) {
  const [notifications, setNotifications] = useState(userData?.settings?.notifications || true);
  const [emailNotifications, setEmailNotifications] = useState(userData?.settings?.emailNotifications || true);
  const [smsNotifications, setSmsNotifications] = useState(userData?.settings?.smsNotifications || true);

  useEffect(() => {
    if (userData?.settings) {
      setNotifications(userData.settings.notifications);
      setEmailNotifications(userData.settings.emailNotifications);
      setSmsNotifications(userData.settings.smsNotifications);
    }
  }, [userData]);

  const handleNotificationToggle = (checked: boolean) => {
    setNotifications(checked);
    if (userData) {
      DataManager.updateUserSettings(userData.profile.email, { notifications: checked });
      toast.success(
        checked 
          ? (language === 'en' ? 'Notifications enabled' : 'تم تفعيل الإشعارات')
          : (language === 'en' ? 'Notifications disabled' : 'تم إيقاف الإشعارات')
      );
    }
  };

  const handleEmailNotificationToggle = (checked: boolean) => {
    setEmailNotifications(checked);
    if (userData) {
      DataManager.updateUserSettings(userData.profile.email, { emailNotifications: checked });
      toast.success(
        checked 
          ? (language === 'en' ? 'Email notifications enabled' : 'تم تفعيل إشعارات البريد الإلكتروني')
          : (language === 'en' ? 'Email notifications disabled' : 'تم إيقاف إشعارات البريد الإلكتروني')
      );
    }
  };

  const handleSmsNotificationToggle = (checked: boolean) => {
    setSmsNotifications(checked);
    if (userData) {
      DataManager.updateUserSettings(userData.profile.email, { smsNotifications: checked });
      toast.success(
        checked 
          ? (language === 'en' ? 'SMS notifications enabled' : 'تم تفعيل إشعارات الرسائل النصية')
          : (language === 'en' ? 'SMS notifications disabled' : 'تم إيقاف إشعارات الرسائل النصية')
      );
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    alert(language === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Profile updated successfully');
  };

  const handleContactSupport = () => {
    onNavigate('contact-support');
  };

  const handleRateApp = () => {
    onNavigate('rate-app');
  };

  const handleReportIssue = () => {
    onNavigate('report-issue');
  };

  const handleAccountSecurity = () => {
    onNavigate('account-security');
  };

  const handlePrivacySettings = () => {
    onNavigate('privacy-settings');
  };

  const handleHelpCenter = () => {
    onNavigate('help-center');
  };

  const texts = {
    en: {
      title: 'Account',
      subtitle: 'Manage Your Profile',
      editProfile: 'Edit Profile',
      personalInfo: 'Personal Information',
      settings: 'Settings',
      preferences: 'Preferences',
      security: 'Security & Privacy',
      support: 'Support',
      logout: 'Logout',
      notifications: 'Push Notifications',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      language: 'Language',
      darkMode: 'Dark Mode',
      changePhoto: 'Change Photo',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      nationality: 'Nationality',
      memberSince: 'Member Since',
      participationStats: 'Participation Stats',
      consultationsJoined: 'Consultations Joined',
      feedbackSubmitted: 'Feedback Submitted',
      servicesUsed: 'Services Used',
      satisfactionGiven: 'Satisfaction Reviews',
      accountSecurity: 'Account Security',
      privacySettings: 'Privacy Settings',
      helpCenter: 'Help Center',
      contactSupport: 'Contact Support',
      reportIssue: 'Report an Issue',
      rateApp: 'Rate the App',
      version: 'App Version',
      confirmLogout: 'Are you sure you want to logout?',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save Changes',
      english: 'English',
      arabic: 'العربية'
    },
    ar: {
      title: 'الحساب',
      subtitle: 'إدارة ملفك الشخصي',
      editProfile: 'تعديل الملف الشخصي',
      personalInfo: 'المعلومات الشخصية',
      settings: 'الإعدادات',
      preferences: 'التفضيلات',
      security: 'الأمان والخصوصية',
      support: 'الدعم',
      logout: 'تسجيل الخروج',
      notifications: 'الإشعارات',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      smsNotifications: 'إشعارات الرسائل النصية',
      language: 'اللغة',
      darkMode: 'الوضع المظلم',
      changePhoto: 'تغيير الصورة',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      nationality: '��لجنسية',
      memberSince: 'عضو منذ',
      participationStats: 'إحصائيات المشاركة',
      consultationsJoined: 'الاستشارات المشارك بها',
      feedbackSubmitted: 'التعليقات المقدمة',
      servicesUsed: 'الخدمات المستخدمة',
      satisfactionGiven: 'تقييمات الرضا',
      accountSecurity: 'أمان الحساب',
      privacySettings: 'إعدادات الخصوصية',
      helpCenter: 'مركز المساعدة',
      contactSupport: 'التواصل مع الدعم',
      reportIssue: 'الإبلاغ عن مشكلة',
      rateApp: 'تقييم التطبيق',
      version: 'إصدار التطبيق',
      confirmLogout: 'هل أنت متأكد من تسجيل الخروج؟',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ التغييرات',
      english: 'English',
      arabic: 'العربية'
    }
  };

  const t = texts[language];

  const userStats = [
    { icon: MessageSquare, value: '0', label: t.consultationsJoined },
    { icon: Edit3, value: userData?.feedbackCount?.toString() || '0', label: t.feedbackSubmitted },
    { icon: Settings, value: userData?.appointments?.length?.toString() || '0', label: t.servicesUsed },
    { icon: Star, value: userData?.satisfactionRatings?.length?.toString() || '0', label: t.satisfactionGiven }
  ];

  const settingsOptions = [
    {
      icon: Bell,
      title: t.notifications,
      action: handleNotificationToggle,
      hasSwitch: true,
      switchValue: notifications
    },
    {
      icon: Bell,
      title: t.emailNotifications,
      action: handleEmailNotificationToggle,
      hasSwitch: true,
      switchValue: emailNotifications
    },
    {
      icon: Bell,
      title: t.smsNotifications,
      action: handleSmsNotificationToggle,
      hasSwitch: true,
      switchValue: smsNotifications
    },
    {
      icon: Globe,
      title: t.language,
      subtitle: language === 'ar' ? t.arabic : t.english,
      action: () => setLanguage(language === 'ar' ? 'en' : 'ar'),
      hasChevron: true
    }
  ];

  const securityOptions = [
    { icon: Shield, title: t.accountSecurity, action: handleAccountSecurity },
    { icon: Eye, title: t.privacySettings, action: handlePrivacySettings }
  ];

  const supportOptions = [
    { icon: HelpCircle, title: t.helpCenter, action: handleHelpCenter },
    { icon: MessageSquare, title: t.contactSupport, action: handleContactSupport },
    { icon: Settings, title: t.reportIssue, action: handleReportIssue },
    { icon: Star, title: t.rateApp, action: handleRateApp }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between p-6 pt-12">
          <div className="flex items-center">
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
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Profile Section */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <ImageWithFallback
                    src={userData?.profile?.profilePhoto || aishaProfileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    fallback={aishaProfileImage}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{userData?.profile?.name || 'Aisha Al-Thani'}</h2>
                    <p className="text-gray-600 text-sm">{userData?.profile?.email || 'aisha@example.com'}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('edit-profile')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                  <Badge className="bg-green-100 text-green-700 border-0">Active Member</Badge>
                  <span className="text-xs text-gray-500">• {t.memberSince} Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xl font-medium text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Settings className="w-5 h-5 text-primary" />
              <span>{t.preferences}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settingsOptions.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={option.hasSwitch ? undefined : option.action}
                  className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <option.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">{option.title}</p>
                      {option.subtitle && (
                        <p className="text-sm text-gray-500">{option.subtitle}</p>
                      )}
                    </div>
                  </div>
                  
                  {option.hasSwitch ? (
                    <motion.div
                      className="relative"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          option.action(!option.switchValue);
                        }}
                        className={`relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          option.switchValue
                            ? 'bg-gradient-to-r from-primary to-accent shadow-lg'
                            : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          className={`w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
                            option.switchValue ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                          layout
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {option.switchValue && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-primary rounded-full"
                            />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : option.hasChevron ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : null}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Shield className="w-5 h-5 text-destructive" />
              <span>{t.security}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityOptions.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={option.action}
                  className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <option.icon className="w-5 h-5 text-gray-600" />
                    <p className="font-medium text-gray-800">{option.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <HelpCircle className="w-5 h-5 text-accent" />
              <span>{t.support}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={option.action}
                  className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <option.icon className="w-5 h-5 text-gray-600" />
                    <p className="font-medium text-gray-800">{option.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">{t.version}</p>
            <p className="text-gray-500 text-xs">1.0.0</p>
          </CardContent>
        </Card>



        {/* Logout */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {t.logout}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}