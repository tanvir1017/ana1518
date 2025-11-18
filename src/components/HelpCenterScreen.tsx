import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, Search, HelpCircle, Book, MessageCircle, FileText, Phone, Video } from 'lucide-react';

interface HelpCenterScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function HelpCenterScreen({ onNavigate, language }: HelpCenterScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const texts = {
    en: {
      title: 'Help Center',
      subtitle: 'Find answers and get support',
      searchPlaceholder: 'Search for help...',
      popularTopics: 'Popular Topics',
      quickActions: 'Quick Actions',
      gettingStarted: 'Getting Started with Sharek',
      gettingStartedDesc: 'Learn the basics of using our platform',
      accountHelp: 'Account Management',
      accountHelpDesc: 'Manage your profile and settings',
      servicesHelp: 'Government Services',
      servicesHelpDesc: 'How to apply for services',
      technicalHelp: 'Technical Support',
      technicalHelpDesc: 'Troubleshoot technical issues',
      privacyHelp: 'Privacy & Security',
      privacyHelpDesc: 'Understand your privacy rights',
      contactSupport: 'Contact Support',
      contactSupportDesc: 'Get help from our team',
      livechat: 'Live Chat',
      livechatDesc: 'Chat with support agent',
      videoCall: 'Video Support',
      videoCallDesc: 'Video call with specialist',
      tutorials: 'Video Tutorials',
      tutorialsDesc: 'Step-by-step guides',
      faq: 'Frequently Asked Questions',
      faqDesc: 'Common questions and answers'
    },
    ar: {
      title: 'مركز المساعدة',
      subtitle: 'العثور على الإجابات والحصول على الدعم',
      searchPlaceholder: 'البحث عن مساعدة...',
      popularTopics: 'المواضيع الشائعة',
      quickActions: 'إجراءات سريعة',
      gettingStarted: 'البدء مع شارك',
      gettingStartedDesc: 'تعلم أساسيات استخدام منصتنا',
      accountHelp: 'إدارة الحساب',
      accountHelpDesc: 'إدارة ملفك الشخصي والإعدادات',
      servicesHelp: 'الخدمات الحكومية',
      servicesHelpDesc: 'كيفية التقدم للخدمات',
      technicalHelp: 'الدعم التقني',
      technicalHelpDesc: 'حل المشاكل التقنية',
      privacyHelp: 'الخصوصية والأمان',
      privacyHelpDesc: 'فهم حقوق الخصوصية الخاصة بك',
      contactSupport: 'الاتصال بالدعم',
      contactSupportDesc: 'احصل على مساعدة من فريقنا',
      livechat: 'دردشة مباشرة',
      livechatDesc: 'تحدث مع وكيل الدعم',
      videoCall: 'دعم بالفيديو',
      videoCallDesc: 'مكالمة فيديو مع المختص',
      tutorials: 'دروس الفيديو',
      tutorialsDesc: 'أدلة خطوة بخطوة',
      faq: 'الأسئلة الشائعة',
      faqDesc: 'الأسئلة والأجوبة الشائعة'
    }
  };

  const t = texts[language];

  const helpTopics = [
    {
      icon: Book,
      title: t.gettingStarted,
      description: t.gettingStartedDesc,
      action: () => onNavigate('help-getting-started')
    },
    {
      icon: HelpCircle,
      title: t.accountHelp,
      description: t.accountHelpDesc,
      action: () => onNavigate('help-account')
    },
    {
      icon: FileText,
      title: t.servicesHelp,
      description: t.servicesHelpDesc,
      action: () => onNavigate('help-services')
    },
    {
      icon: HelpCircle,
      title: t.technicalHelp,
      description: t.technicalHelpDesc,
      action: () => onNavigate('help-technical')
    },
    {
      icon: FileText,
      title: t.privacyHelp,
      description: t.privacyHelpDesc,
      action: () => onNavigate('help-privacy')
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: t.contactSupport,
      description: t.contactSupportDesc,
      action: () => onNavigate('contact-support'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageCircle,
      title: t.livechat,
      description: t.livechatDesc,
      action: () => onNavigate('chatbot'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Video,
      title: t.videoCall,
      description: t.videoCallDesc,
      action: () => onNavigate('video-support'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: HelpCircle,
      title: t.faq,
      description: t.faqDesc,
      action: () => onNavigate('faq'),
      color: 'bg-orange-100 text-orange-600'
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
          <HelpCircle className="w-6 h-6" />
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-6">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/20 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10 space-y-6">
        {/* Quick Actions */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t.quickActions}</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="cursor-pointer p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Popular Topics */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t.popularTopics}</h2>
            <div className="space-y-3">
              {helpTopics.map((topic, index) => {
                const IconComponent = topic.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={topic.action}
                    className="cursor-pointer flex items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}