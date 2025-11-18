import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContactSupportScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
}

export default function ContactSupportScreen({ onNavigate, language, userEmail }: ContactSupportScreenProps) {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const texts = {
    en: {
      title: 'Contact Support',
      subtitle: 'Get help from our support team',
      contactInfo: 'Contact Information',
      supportChannels: 'Support Channels',
      submitRequest: 'Submit Support Request',
      subject: 'Subject',
      subjectPlaceholder: 'Brief description of your issue',
      category: 'Category',
      selectCategory: 'Select a category',
      priority: 'Priority',
      selectPriority: 'Select priority level',
      message: 'Message',
      messagePlaceholder: 'Describe your issue in detail...',
      submitTicket: 'Submit Support Ticket',
      phone: 'Phone Support',
      phoneNumber: '+974 4000 0000',
      phoneHours: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      email: 'Email Support',
      emailAddress: 'support@sharek.gov.qa',
      emailResponse: 'Response within 24 hours',
      livechat: 'Live Chat',
      livechatDesc: 'Available during business hours',
      startChat: 'Start Chat',
      categories: {
        technical: 'Technical Issue',
        account: 'Account Problem',
        service: 'Service Application',
        payment: 'Payment Issue',
        general: 'General Inquiry'
      },
      priorities: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        urgent: 'Urgent'
      },
      ticketSubmitted: 'Support ticket submitted successfully',
      ticketNumber: 'Your ticket number is: #',
      requiredField: 'This field is required'
    },
    ar: {
      title: 'الاتصال بالدعم',
      subtitle: 'احصل على مساعدة من فريق الدعم',
      contactInfo: 'معلومات الاتصال',
      supportChannels: 'قنوات الدعم',
      submitRequest: 'إرسال طلب دعم',
      subject: 'الموضوع',
      subjectPlaceholder: 'وصف مختصر لمشكلتك',
      category: 'الفئة',
      selectCategory: 'اختر فئة',
      priority: 'الأولوية',
      selectPriority: 'اختر مستوى الأولوية',
      message: 'الرسالة',
      messagePlaceholder: 'اصف مشكلتك بالتفصيل...',
      submitTicket: 'إرسال تذكرة دعم',
      phone: 'الدعم الهاتفي',
      phoneNumber: '+974 4000 0000',
      phoneHours: 'الأحد - الخميس: 8:00 ص - 6:00 م',
      email: 'دعم البريد الإلكتروني',
      emailAddress: 'support@sharek.gov.qa',
      emailResponse: 'رد خلال 24 ساعة',
      livechat: 'دردشة مباشرة',
      livechatDesc: 'متاح خلال ساعات العمل',
      startChat: 'بدء الدردشة',
      categories: {
        technical: 'مشكلة تقنية',
        account: 'مشكلة في الحساب',
        service: 'تطبيق خدمة',
        payment: 'مشكلة في الدفع',
        general: 'استفسار عام'
      },
      priorities: {
        low: 'منخفض',
        medium: 'متوسط',
        high: 'عالي',
        urgent: 'عاجل'
      },
      ticketSubmitted: 'تم إرسال تذكرة الدعم بنجاح',
      ticketNumber: 'رقم تذكرتك هو: #',
      requiredField: 'هذا الحقل مطلوب'
    }
  };

  const t = texts[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.subject.trim()) {
      toast.error(t.requiredField + ': ' + t.subject);
      return false;
    }
    if (!formData.category) {
      toast.error(t.requiredField + ': ' + t.category);
      return false;
    }
    if (!formData.message.trim()) {
      toast.error(t.requiredField + ': ' + t.message);
      return false;
    }
    return true;
  };

  const handleSubmitTicket = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate ticket submission
    setTimeout(() => {
      const ticketNumber = 'SUP' + Date.now().toString().slice(-6);
      toast.success(t.ticketSubmitted);
      toast.success(t.ticketNumber + ticketNumber);
      
      // Reset form
      setFormData({
        subject: '',
        category: '',
        priority: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const supportChannels = [
    {
      icon: Phone,
      title: t.phone,
      contact: t.phoneNumber,
      description: t.phoneHours,
      action: () => window.open(`tel:${t.phoneNumber}`, '_self'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: t.email,
      contact: t.emailAddress,
      description: t.emailResponse,
      action: () => window.open(`mailto:${t.emailAddress}`, '_blank'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MessageCircle,
      title: t.livechat,
      contact: t.startChat,
      description: t.livechatDesc,
      action: () => onNavigate('chatbot'),
      color: 'bg-purple-100 text-purple-600'
    }
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
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10 space-y-6">
        {/* Support Channels */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle>{t.supportChannels}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportChannels.map((channel, index) => {
              const IconComponent = channel.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={channel.action}
                  className="cursor-pointer flex items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 ${channel.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{channel.title}</h3>
                    <p className="text-sm text-primary font-medium">{channel.contact}</p>
                    <p className="text-xs text-gray-600">{channel.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>

        {/* Support Request Form */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle>{t.submitRequest}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">{t.subject} *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder={t.subjectPlaceholder}
              />
            </div>

            <div>
              <Label htmlFor="category">{t.category} *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">{t.categories.technical}</SelectItem>
                  <SelectItem value="account">{t.categories.account}</SelectItem>
                  <SelectItem value="service">{t.categories.service}</SelectItem>
                  <SelectItem value="payment">{t.categories.payment}</SelectItem>
                  <SelectItem value="general">{t.categories.general}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">{t.priority}</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectPriority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t.priorities.low}</SelectItem>
                  <SelectItem value="medium">{t.priorities.medium}</SelectItem>
                  <SelectItem value="high">{t.priorities.high}</SelectItem>
                  <SelectItem value="urgent">{t.priorities.urgent}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">{t.message} *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder={t.messagePlaceholder}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button 
              onClick={handleSubmitTicket}
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
                  {t.submitTicket}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}