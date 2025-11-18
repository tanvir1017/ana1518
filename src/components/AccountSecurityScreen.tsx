import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Shield, Key, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AccountSecurityScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
}

export default function AccountSecurityScreen({ onNavigate, language, userEmail }: AccountSecurityScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const texts = {
    en: {
      title: 'Account Security',
      subtitle: 'Manage your security settings',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      updatePassword: 'Update Password',
      twoFactor: 'Two-Factor Authentication',
      twoFactorDesc: 'Add an extra layer of security to your account',
      enable: 'Enable',
      enabled: 'Enabled',
      loginHistory: 'Login History',
      viewHistory: 'View Login History',
      securityAlerts: 'Security Alerts',
      securityAlertsDesc: 'Get notified of suspicious activities',
      sessionManagement: 'Active Sessions',
      manageDevices: 'Manage Devices',
      passwordUpdated: 'Password updated successfully',
      passwordError: 'Passwords do not match',
      passwordWeak: 'Password must be at least 8 characters'
    },
    ar: {
      title: 'أمان الحساب',
      subtitle: 'إدارة إعدادات الأمان',
      changePassword: 'تغيير كلمة المرور',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور الجديدة',
      updatePassword: 'تحديث كلمة المرور',
      twoFactor: 'المصادقة الثنائية',
      twoFactorDesc: 'إضافة طبقة أمان إضافية لحسابك',
      enable: 'تفعيل',
      enabled: 'مفعل',
      loginHistory: 'تاريخ تسجيل الدخول',
      viewHistory: 'عرض تاريخ تسجيل الدخول',
      securityAlerts: 'تنبيهات الأمان',
      securityAlertsDesc: 'احصل على إشعارات للأنشطة المشبوهة',
      sessionManagement: 'الجلسات النشطة',
      manageDevices: 'إدارة الأجهزة',
      passwordUpdated: 'تم تحديث كلمة المرور بنجاح',
      passwordError: 'كلمات المرور غير متطابقة',
      passwordWeak: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
    }
  };

  const t = texts[language];

  const handlePasswordChange = () => {
    if (newPassword.length < 8) {
      toast.error(t.passwordWeak);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t.passwordError);
      return;
    }

    // Simulate password update
    toast.success(t.passwordUpdated);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

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
        {/* Change Password */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Key className="w-5 h-5 text-primary" />
              <span>{t.changePassword}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">{t.currentPassword}</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10 rtl:pr-4 rtl:pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="new-password">{t.newPassword}</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10 rtl:pr-4 rtl:pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 rtl:pr-4 rtl:pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              onClick={handlePasswordChange}
              className="w-full bg-primary hover:bg-accent text-white"
            >
              {t.updatePassword}
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{t.twoFactor}</h3>
                <p className="text-sm text-gray-600">{t.twoFactorDesc}</p>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                {t.enable}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="space-y-4">
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{t.loginHistory}</h3>
                  <p className="text-sm text-gray-600">Track your account access</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-primary"
                  onClick={() => toast.info('Login history feature coming soon')}
                >
                  {t.viewHistory}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{t.securityAlerts}</h3>
                    <p className="text-sm text-gray-600">{t.securityAlertsDesc}</p>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-medium">{t.enabled}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{t.sessionManagement}</h3>
                  <p className="text-sm text-gray-600">Monitor active device sessions</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-primary"
                  onClick={() => toast.info('Device management feature coming soon')}
                >
                  {t.manageDevices}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}