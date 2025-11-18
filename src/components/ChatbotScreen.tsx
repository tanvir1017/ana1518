import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import sharekoLogo from 'figma:asset/fd4137f34a2286d10bfa9fbfcd8d577373b5669b.png';
import { createAppointmentNotification, saveAppointment, Appointment } from './utils/appointmentUtils';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Paperclip,
  Bot,
  User,
  Clock,
  MessageSquare,
  Search,
  FileText,
  MapPin
} from 'lucide-react';

interface ChatbotScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export default function ChatbotScreen({ onNavigate, language }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const texts = {
    en: {
      title: 'Sharek Assistant',
      subtitle: 'AI-Powered Support',
      typePlaceholder: 'Type your message...',
      send: 'Send',
      typing: 'Assistant is typing...',
      suggestions: 'Quick Actions',
      welcomeMessage: 'Hello! I\'m your Sharek virtual assistant. How can I help you today?',
      quickActions: [
        'Track my feedback',
        'Check service status',
        'Find nearby centers',
        'Book appointment',
        'View consultations',
        'Get service info'
      ],
      botResponses: {
        'track my feedback': 'I can help you track your feedback submissions. You have 2 open cases and 1 resolved case. Would you like to see the details?',
        'check service status': 'I can check the status of various government services. Which specific service are you interested in?',
        'find nearby centers': 'Based on your location, the nearest service center is Doha Main Service Center, 2.5km away. It\'s currently open with a 25-minute estimated wait time.',
        'book appointment': 'I can help you book an appointment. Let me redirect you to our booking system.',
        'view consultations': 'There are currently 12 active consultations you can participate in. The most popular one is about the New Higher Education Law Draft.',
        'get service info': 'I can provide information about any government service. What service are you looking for?'
      }
    },
    ar: {
      title: 'مساعد شارك',
      subtitle: 'دعم مدعوم بالذكاء الاصطناعي',
      typePlaceholder: 'اكتب رسالتك...',
      send: 'إرسال',
      typing: 'المساعد يكتب...',
      suggestions: 'الإجراءات السريعة',
      welcomeMessage: 'مرحباً! أنا مساعدك الافتراضي في شارك. كيف يمكنني مساعدتك اليوم؟',
      quickActions: [
        'تتبع تعليقي',
        'فحص حالة الخدمة',
        'العثور على المراكز القريبة',
        'حجز موعد',
        'عرض الاستشارات',
        'الحصول على معلومات الخدمة'
      ],
      botResponses: {
        'تتبع تعليقي': 'يمكنني مساعدتك في تتبع مقترحاتك المقدمة. لديك قضيتان مفتوحتان وقضية واحدة محلولة. هل تريد رؤية التفاصيل؟',
        'فحص حالة الخدمة': 'يمكنني فحص حالة الخدمات الحكومية المختلفة. أي خدمة محددة تهتم بها؟',
        'العثور على المراكز القريبة': 'بناءً على موقعك، أقرب مركز خدمة هو مركز خدمات الدوحة الرئيسي، على بعد 2.5 كم. إنه مفتوح حالياً مع وقت انتظار متوقع 25 دقيقة.',
        'حجز موعد': 'يمكنني مساعدتك في حجز موعد. أي مركز خدمة ونوع خدمة تحتاج؟',
        'عرض الاستشارات': 'هناك حالياً 12 استشارة نشطة يمكنك المشاركة فيها. الأكثر شعبية تتعلق بمشروع قانون التعليم العالي الجديد.',
        'الحصول على معلومات الخدمة': 'يمكنني تقديم معلومات حول أي خدمة حكومية. أي خدمة تبحث عنها؟'
      }
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Initial welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: t.welcomeMessage,
          isBot: true,
          timestamp: new Date(),
          suggestions: t.quickActions
        }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponseText = getBotResponse(inputText.toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
        suggestions: generateSuggestions(inputText.toLowerCase())
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    const responses = t.botResponses as { [key: string]: string };
    
    for (const [key, response] of Object.entries(responses)) {
      if (input.includes(key.toLowerCase()) || input.includes(key)) {
        return response;
      }
    }

    // Default responses
    if (input.includes('hello') || input.includes('hi') || input.includes('مرحبا') || input.includes('أهلا')) {
      return language === 'ar' 
        ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' 
        : 'Hello! How can I assist you today?';
    }

    if (input.includes('thank') || input.includes('thanks') || input.includes('شكرا') || input.includes('شكراً')) {
      return language === 'ar' 
        ? 'عفواً! أسعد دائماً بمساعدتك.' 
        : 'You\'re welcome! I\'m always happy to help.';
    }

    return language === 'ar' 
      ? 'أعتذر، لم أفهم سؤالك بشكل كامل. هل يمكنك إعادة صياغته أو اختيار أحد الخيارات السريعة؟'
      : 'I apologize, I didn\'t fully understand your question. Could you rephrase it or choose one of the quick options?';
  };

  const generateSuggestions = (input: string): string[] => {
    if (input.includes('feedback') || input.includes('تعليق')) {
      return language === 'ar' 
        ? ['عرض حالة التعليقات', 'تقديم تعليق جديد', 'العودة للرئيسية']
        : ['View feedback status', 'Submit new feedback', 'Go to home'];
    }

    if (input.includes('service') || input.includes('خدمة')) {
      return language === 'ar'
        ? ['عرض الخدمات', 'حجز موعد', 'العثور على مركز']
        : ['View services', 'Book appointment', 'Find center'];
    }

    return t.quickActions.slice(0, 3);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.toLowerCase().includes('book appointment') || suggestion.includes('حجز موعد')) {
      // Handle appointment booking via chatbot
      handleAppointmentBooking();
    } else {
      setInputText(suggestion);
      handleSendMessage();
    }
  };

  const handleAppointmentBooking = () => {
    // Simulate appointment booking through chatbot
    const appointmentId = `chatbot-${Date.now()}`;
    const appointment: Appointment = {
      id: appointmentId,
      service: language === 'ar' ? 'خدمة عامة' : 'General Service',
      location: language === 'ar' ? 'مركز خدمات الدوحة الرئيسي' : 'Doha Main Service Center',
      date: new Date(Date.now() + 86400000).toLocaleDateString(), // Tomorrow
      time: '10:00 AM',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save appointment
    saveAppointment(appointment);
    
    // Create notification
    createAppointmentNotification(appointment, language);
    
    // Add confirmation message to chat
    const confirmationMessage: Message = {
      id: messages.length + 1,
      text: language === 'ar' 
        ? 'تم حجز موعدك بنجاح! ستتلقى إشعاراً بالتفاصيل. موعدك غداً في الساعة 10:00 صباحاً في مركز خدمات الدوحة الرئيسي.'
        : 'Your appointment has been booked successfully! You will receive a notification with details. Your appointment is tomorrow at 10:00 AM at Doha Main Service Center.',
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        language === 'ar' ? 'عرض تفاصيل الموعد' : 'View appointment details',
        language === 'ar' ? 'العودة للرئيسية' : 'Go to home'
      ]
    };

    setMessages(prev => [...prev, confirmationMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-lg border-2 border-white/30">
              <img 
                src={sharekoLogo} 
                alt="Sharek Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-medium">{t.title}</h1>
              <p className="text-white/80 text-sm">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-3">{t.suggestions}</h3>
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto">
          {t.quickActions.slice(0, 4).map((action, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSuggestionClick(action)}
              className="flex-shrink-0 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-colors"
            >
              {action}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 rtl:space-x-reverse ${
                message.isBot ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot 
                    ? 'bg-gradient-to-r from-primary to-secondary' 
                    : 'bg-gray-200'
                }`}>
                  {message.isBot ? (
                    <img 
                      src={sharekoLogo} 
                      alt="Sharek" 
                      className="w-4 h-4 object-contain"
                    />
                  ) : (
                    <User className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                
                <div className={`rounded-2xl px-4 py-3 ${
                  message.isBot 
                    ? 'bg-white border border-gray-200' 
                    : 'bg-gradient-to-r from-primary to-secondary text-white'
                }`}>
                  <p className={`text-sm leading-relaxed ${
                    message.isBot ? 'text-gray-800' : 'text-white'
                  }`}>
                    {message.text}
                  </p>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs text-gray-700 transition-colors"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`flex items-center space-x-1 rtl:space-x-reverse mt-1 ${
                message.isBot ? 'justify-start' : 'justify-end'
              }`}>
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t.typePlaceholder}
              className="pr-12 rtl:pr-3 rtl:pl-12 rounded-full border-gray-200 bg-gray-50"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}