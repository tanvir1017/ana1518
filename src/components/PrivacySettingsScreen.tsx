import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { ArrowLeft, Shield, Eye, Database, Bell, Share2 } from 'lucide-react';
import DataManager from './utils/dataManager';
import { toast } from 'sonner@2.0.3';

interface PrivacySettingsScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
}

export default function PrivacySettingsScreen({ onNavigate, language, userEmail }: PrivacySettingsScreenProps) {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    dataSharing: false,
    analyticsTracking: true,
    marketingEmails: false,
    locationTracking: false,
    activityLogging: true,
    thirdPartySharing: false,
    cookieConsent: true
  });

  useEffect(() => {
    const userData = DataManager.getUser(userEmail);
    if (userData) {
      // Load existing privacy settings if any
      setSettings(prev => ({ ...prev }));
    }
  }, [userEmail]);

  const texts = {
    en: {
      title: 'Privacy Settings',
      subtitle: 'Control your data and privacy',
      dataCollection: 'Data Collection',
      profileVisibility: 'Profile Visibility',
      profileVisibilityDesc: 'Allow others to see your public profile',
      dataSharing: 'Data Sharing',
      dataSharingDesc: 'Share anonymous usage data to improve services',
      analyticsTracking: 'Analytics Tracking',
      analyticsTrackingDesc: 'Allow collection of usage analytics',
      communication: 'Communication Preferences',
      marketingEmails: 'Marketing Emails',
      marketingEmailsDesc: 'Receive promotional emails and updates',
      locationTracking: 'Location Services',
      locationTrackingDesc: 'Allow location-based services',
      security: 'Security & Logging',
      activityLogging: 'Activity Logging',
      activityLoggingDesc: 'Log account activity for security',
      thirdPartySharing: 'Third-party Sharing',
      thirdPartySharingDesc: 'Share data with trusted partners',
      cookieConsent: 'Cookie Consent',
      cookieConsentDesc: 'Allow cookies for better experience',
      settingsUpdated: 'Privacy settings updated'
    },
    ar: {
      title: 'إعدادات الخصوصية',
      subtitle: 'تحكم في بياناتك وخصوصيتك',
      dataCollection: 'جمع البيانات',
      profileVisibility: 'ظهور الملف الشخصي',
      profileVisibilityDesc: 'السماح للآخرين برؤية ملفك الشخصي العام',
      dataSharing: 'مشاركة البيانات',
      dataSharingDesc: 'مشاركة بيانات الاستخدام المجهولة لتحسين الخدمات',
      analyticsTracking: 'تتبع التحليلات',
      analyticsTrackingDesc: 'السماح بجمع تحليلات الاستخدام',
      communication: 'تفضيلات التواصل',
      marketingEmails: 'رسائل التسويق الإلكترونية',
      marketingEmailsDesc: 'تلقي رسائل ترويجية وتحديثات',
      locationTracking: 'خدمات الموقع',
      locationTrackingDesc: 'السماح بالخدمات المبنية على الموقع',
      security: 'الأمان والتسجيل',
      activityLogging: 'تسجيل النشاط',
      activityLoggingDesc: 'تسجيل نشاط الحساب للأمان',
      thirdPartySharing: 'المشاركة مع الطرف الثالث',
      thirdPartySharingDesc: 'مشاركة البيانات مع الشركاء الموثوقين',
      cookieConsent: 'موافقة ملفات تعريف الارتباط',
      cookieConsentDesc: 'السماح بملفات تعريف الارتباط لتجربة أفضل',
      settingsUpdated: 'تم تحديث إعدادات الخصوصية'
    }
  };

  const t = texts[language];

  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(t.settingsUpdated);
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    setting, 
    value 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    setting: keyof typeof settings, 
    value: boolean 
  }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div className="flex items-start space-x-3 rtl:space-x-reverse flex-1">
        <Icon className="w-5 h-5 text-primary mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <Switch
        checked={value}
        onCheckedChange={(checked) => handleSettingChange(setting, checked)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between p-6 pt-12">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('account')}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div>
              <h1 className="text-xl font-medium">{t.title}</h1>
              <p className="text-white/80 text-sm">{t.subtitle}</p>
            </div>
          </div>
          <Shield className="w-6 h-6" />
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10 space-y-6">
        {/* Data Collection */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Database className="w-5 h-5 text-primary" />
              <span>{t.dataCollection}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingItem
              icon={Eye}
              title={t.profileVisibility}
              description={t.profileVisibilityDesc}
              setting="profileVisibility"
              value={settings.profileVisibility}
            />
            <SettingItem
              icon={Share2}
              title={t.dataSharing}
              description={t.dataSharingDesc}
              setting="dataSharing"
              value={settings.dataSharing}
            />
            <SettingItem
              icon={Database}
              title={t.analyticsTracking}
              description={t.analyticsTrackingDesc}
              setting="analyticsTracking"
              value={settings.analyticsTracking}
            />
          </CardContent>
        </Card>

        {/* Communication */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bell className="w-5 h-5 text-primary" />
              <span>{t.communication}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingItem
              icon={Bell}
              title={t.marketingEmails}
              description={t.marketingEmailsDesc}
              setting="marketingEmails"
              value={settings.marketingEmails}
            />
          </CardContent>
        </Card>

        {/* Security & Logging */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Shield className="w-5 h-5 text-primary" />
              <span>{t.security}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingItem
              icon={Database}
              title={t.activityLogging}
              description={t.activityLoggingDesc}
              setting="activityLogging"
              value={settings.activityLogging}
            />
            <SettingItem
              icon={Share2}
              title={t.thirdPartySharing}
              description={t.thirdPartySharingDesc}
              setting="thirdPartySharing"
              value={settings.thirdPartySharing}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}