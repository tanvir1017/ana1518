import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, AlertTriangle, Bug, Zap, Shield, Camera, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReportIssueScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
}

export default function ReportIssueScreen({ onNavigate, language, userEmail }: ReportIssueScreenProps) {
  const [formData, setFormData] = useState({
    issueType: '',
    severity: '',
    title: '',
    description: '',
    stepsToReproduce: '',
    deviceInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const texts = {
    en: {
      title: 'Report an Issue',
      subtitle: 'Help us improve Sharek',
      reportForm: 'Issue Report Form',
      issueType: 'Issue Type',
      selectIssueType: 'Select the type of issue',
      severity: 'Severity',
      selectSeverity: 'How severe is this issue?',
      issueTitle: 'Issue Title',
      titlePlaceholder: 'Brief summary of the issue',
      description: 'Description',
      descriptionPlaceholder: 'Describe the issue in detail...',
      stepsToReproduce: 'Steps to Reproduce',
      stepsPlaceholder: '1. Go to...\n2. Click on...\n3. Error occurs...',
      deviceInfo: 'Device Information',
      devicePlaceholder: 'Browser, OS, device model (optional)',
      submitReport: 'Submit Report',
      attachment: 'Add Screenshot',
      types: {
        bug: 'Bug/Error',
        ui: 'User Interface Issue',
        performance: 'Performance Problem',
        security: 'Security Concern',
        feature: 'Feature Request',
        other: 'Other'
      },
      severities: {
        low: 'Low - Minor inconvenience',
        medium: 'Medium - Affects functionality',
        high: 'High - Major problem',
        critical: 'Critical - App unusable'
      },
      reportSubmitted: 'Issue report submitted successfully',
      reportNumber: 'Report number: #',
      requiredField: 'This field is required',
      thankYou: 'Thank you for helping us improve Sharek!'
    },
    ar: {
      title: 'الإبلاغ عن مشكلة',
      subtitle: 'ساعدنا في تحسين شارك',
      reportForm: 'نموذج الإبلاغ عن مشكلة',
      issueType: 'نوع المشكلة',
      selectIssueType: 'اختر نوع المشكلة',
      severity: 'الخطورة',
      selectSeverity: 'ما مدى خطورة هذه المشكلة؟',
      issueTitle: 'عنوان المشكلة',
      titlePlaceholder: 'ملخص مختصر للمشكلة',
      description: 'الوصف',
      descriptionPlaceholder: 'اصف المشكلة بالتفصيل...',
      stepsToReproduce: 'خطوات إعادة الإنتاج',
      stepsPlaceholder: '1. اذهب إلى...\n2. انقر على...\n3. يحدث الخطأ...',
      deviceInfo: 'معلومات الجهاز',
      devicePlaceholder: 'المتصفح، نظام التشغيل، طراز الجهاز (اختياري)',
      submitReport: 'إرسال التقرير',
      attachment: 'إضافة لقطة شاشة',
      types: {
        bug: 'خطأ/عطل',
        ui: 'مشكلة في واجهة المستخدم',
        performance: 'مشكلة في الأداء',
        security: 'مخاوف أمنية',
        feature: 'طلب ميزة',
        other: 'أخرى'
      },
      severities: {
        low: 'منخفض - إزعاج بسيط',
        medium: 'متوسط - يؤثر على الوظائف',
        high: 'عالي - مشكلة كبيرة',
        critical: 'حرج - التطبيق غير صالح للاستخدام'
      },
      reportSubmitted: 'تم إرسال تقرير المشكلة بنجاح',
      reportNumber: 'رقم التقرير: #',
      requiredField: 'هذا الحقل مطلوب',
      thankYou: 'شكراً لك لمساعدتنا في تحسين شارك!'
    }
  };

  const t = texts[language];

  const issueTypeIcons = {
    bug: Bug,
    ui: Zap,
    performance: Zap,
    security: Shield,
    feature: AlertTriangle,
    other: AlertTriangle
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.issueType) {
      toast.error(t.requiredField + ': ' + t.issueType);
      return false;
    }
    if (!formData.title.trim()) {
      toast.error(t.requiredField + ': ' + t.issueTitle);
      return false;
    }
    if (!formData.description.trim()) {
      toast.error(t.requiredField + ': ' + t.description);
      return false;
    }
    return true;
  };

  const handleSubmitReport = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate report submission
    setTimeout(() => {
      const reportNumber = 'RPT' + Date.now().toString().slice(-6);
      toast.success(t.reportSubmitted);
      toast.success(t.reportNumber + reportNumber);
      toast.success(t.thankYou);
      
      // Reset form
      setFormData({
        issueType: '',
        severity: '',
        title: '',
        description: '',
        stepsToReproduce: '',
        deviceInfo: ''
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const handleAddScreenshot = () => {
    toast.info(language === 'en' ? 'Screenshot upload feature coming soon' : 'ميزة تحميل لقطة الشاشة قريباً');
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
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10 space-y-6">
        {/* Report Form */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle>{t.reportForm}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="issueType">{t.issueType} *</Label>
              <Select value={formData.issueType} onValueChange={(value) => handleInputChange('issueType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectIssueType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">{t.types.bug}</SelectItem>
                  <SelectItem value="ui">{t.types.ui}</SelectItem>
                  <SelectItem value="performance">{t.types.performance}</SelectItem>
                  <SelectItem value="security">{t.types.security}</SelectItem>
                  <SelectItem value="feature">{t.types.feature}</SelectItem>
                  <SelectItem value="other">{t.types.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="severity">{t.severity}</Label>
              <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSeverity} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t.severities.low}</SelectItem>
                  <SelectItem value="medium">{t.severities.medium}</SelectItem>
                  <SelectItem value="high">{t.severities.high}</SelectItem>
                  <SelectItem value="critical">{t.severities.critical}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">{t.issueTitle} *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={t.titlePlaceholder}
              />
            </div>

            <div>
              <Label htmlFor="description">{t.description} *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={t.descriptionPlaceholder}
                rows={4}
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="steps">{t.stepsToReproduce}</Label>
              <Textarea
                id="steps"
                value={formData.stepsToReproduce}
                onChange={(e) => handleInputChange('stepsToReproduce', e.target.value)}
                placeholder={t.stepsPlaceholder}
                rows={3}
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="device">{t.deviceInfo}</Label>
              <Input
                id="device"
                value={formData.deviceInfo}
                onChange={(e) => handleInputChange('deviceInfo', e.target.value)}
                placeholder={t.devicePlaceholder}
              />
            </div>

            {/* Screenshot Button */}
            <Button
              variant="outline"
              onClick={handleAddScreenshot}
              className="w-full justify-start"
            >
              <Camera className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {t.attachment}
            </Button>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmitReport}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-accent text-white h-12"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:mr-0 rtl:ml-2"></div>
                  {language === 'en' ? 'Submitting...' : 'جاري الإرسال...'}
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t.submitReport}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Report Types */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              {language === 'en' ? 'Common Issues' : 'المشاكل الشائعة'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(t.types).slice(0, 4).map(([key, value]) => {
                const IconComponent = issueTypeIcons[key as keyof typeof issueTypeIcons];
                return (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('issueType', key)}
                    className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                      formData.issueType === key
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mx-auto mb-2" />
                    {value}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}