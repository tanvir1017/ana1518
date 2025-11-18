import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Calendar,
  Building2,
  ThumbsUp,
  Send,
  FileText,
  Users,
  Download,
  Clock
} from 'lucide-react';

interface PolicyConsultationDetailScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  consultationId?: number;
}

export default function PolicyConsultationDetailScreen({ onNavigate, language, consultationId = 1 }: PolicyConsultationDetailScreenProps) {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(156);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Dr. Ahmed Al-Rashid',
      content: language === 'ar' ? 'أعتقد أن هذه السياسة تحتاج لمزيد من التوضيح حول التطبيق العملي' : 'I think this policy needs more clarification on practical implementation',
      timestamp: '2 hours ago',
      likes: 15
    },
    {
      id: 2,
      author: 'Fatima Al-Thani',
      content: language === 'ar' ? 'اقتراح ممتاز، خاصة فيما يتعلق بالتعليم الهجين' : 'Excellent proposal, especially regarding hybrid education',
      timestamp: '1 hour ago',
      likes: 8
    }
  ]);

  const texts = {
    en: {
      title: 'Policy Consultation',
      back: 'Back',
      share: 'Share',
      bookmark: 'Bookmark',
      like: 'Like',
      addComment: 'Add your comment...',
      submit: 'Submit',
      comments: 'Comments',
      participants: 'participants',
      daysLeft: 'days left',
      downloadPdf: 'Download PDF',
      fullPolicy: 'Read Full Policy',
      overview: 'Overview',
      publicComments: 'Public Comments',
      commentSubmitted: 'Your comment has been submitted successfully!'
    },
    ar: {
      title: 'استشارة السياسات',
      back: 'رجوع',
      share: 'مشاركة',
      bookmark: 'حفظ',
      like: 'إعجاب',
      addComment: 'أضف تعليقك...',
      submit: 'إرسال',
      comments: 'تعليقات',
      participants: 'مشارك',
      daysLeft: 'يوم متبقي',
      downloadPdf: 'تحميل PDF',
      fullPolicy: 'قراءة السياسة كاملة',
      overview: 'نظرة عامة',
      publicComments: 'التعليقات العامة',
      commentSubmitted: 'تم إرسال تعليقك بنجاح!'
    }
  };

  const t = texts[language];

  const consultations = [
    {
      id: 1,
      title: language === 'ar' ? 'مشروع سياسة التعليم عن بُعد' : 'Remote Education Policy Draft',
      ministry: language === 'ar' ? 'وزارة التعليم والتعليم العالي' : 'Ministry of Education & Higher Education',
      description: language === 'ar' 
        ? 'سياسة شاملة لتطوير وتنظيم التعليم عن بُعد في مؤسسات التعليم القطرية'
        : 'Comprehensive policy for developing and regulating remote education in Qatari educational institutions',
      fullContent: language === 'ar'
        ? `تهدف هذه السياسة إلى وضع إطار شامل للتعليم عن بُعد يضمن جودة التعليم ويوفر المرونة اللازمة للطلاب والمعلمين.

الأهداف الرئيسية:
• تطوير منصة تعليمية موحدة للتعليم عن بُعد
• وضع معايير جودة للمحتوى الرقمي التعليمي
• تدريب الكوادر التعليمية على التقنيات الحديثة
• ضمان الوصول العادل للتعليم لجميع الطلاب

المتطلبات التقنية:
• اتصال إنترن�� عالي السرعة
• أجهزة حاسوب أو أجهزة لوحية للطلاب
• منصات تعليمية تفاعلية
• أنظمة تقييم إلكترونية

آليات التطبيق:
سيتم تطبيق هذه السياسة على مراحل، بدءاً من المرحلة الثانوية ثم التوسع تدريجياً لتشمل جميع المراحل التعليمية.`
        : `This policy aims to establish a comprehensive framework for remote education that ensures educational quality and provides necessary flexibility for students and teachers.

Main Objectives:
• Develop a unified educational platform for remote learning
• Establish quality standards for digital educational content
• Train educational staff on modern technologies
• Ensure equitable access to education for all students

Technical Requirements:
• High-speed internet connection
• Computers or tablets for students
• Interactive educational platforms
• Electronic assessment systems

Implementation Mechanisms:
This policy will be implemented in phases, starting with secondary education and then gradually expanding to include all educational levels.`,
      status: 'open',
      deadline: '2024-02-15',
      daysLeft: 12,
      participants: 289,
      tags: language === 'ar' ? ['التعليم', 'التكنولوجيا', 'السياسات'] : ['Education', 'Technology', 'Policy']
    },
    {
      id: 2,
      title: language === 'ar' ? 'استراتيجية الاستدامة البيئية 2030' : 'Environmental Sustainability Strategy 2030',
      ministry: language === 'ar' ? 'وزارة البيئة والتغير المناخي' : 'Ministry of Environment & Climate Change',
      description: language === 'ar'
        ? 'استراتيجية طويلة المدى لتحقيق الاستدامة البيئية في قطر بحلول 2030'
        : 'Long-term strategy to achieve environmental sustainability in Qatar by 2030',
      fullContent: language === 'ar'
        ? `تركز الاستراتيجية على تقليل الانبعاثات الكربونية وتطوير مصادر الطاقة المتجددة وحماية البيئة البحرية والبرية.

محاور الاستراتيجية:
• تقليل الانبعاثات الكربونية بنسبة 25% بحلول 2030
• زيادة الاعتماد على الطاقة المتجددة
• حماية التنوع البيولوجي
• تطوير تقنيات إعادة التدوير

الخطط التنفيذية:
سيتم تنفيذ مشاريع رائدة في مجال الطاقة الشمسية وطاقة الرياح، بالإضافة إلى برامج التوعية البيئية.`
        : `The strategy focuses on reducing carbon emissions, developing renewable energy sources, and protecting marine and terrestrial environments.

Strategy Pillars:
• Reduce carbon emissions by 25% by 2030
• Increase reliance on renewable energy
• Protect biodiversity
• Develop recycling technologies

Implementation Plans:
Leading projects in solar and wind energy will be implemented, in addition to environmental awareness programs.`,
      status: 'open',
      deadline: '2024-03-01',
      daysLeft: 28,
      participants: 412,
      tags: language === 'ar' ? ['البيئة', 'الاستدامة', 'المناخ'] : ['Environment', 'Sustainability', 'Climate']
    }
  ];

  const consultation = consultations.find(c => c.id === consultationId) || consultations[0];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: 'Aisha Al-Thani',
      content: comment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments(prev => [...prev, newComment]);
    setComment('');
    alert(t.commentSubmitted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: consultation.title,
          text: consultation.description,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${consultation.title}\n${consultation.description}\n${window.location.href}`);
        toast.success(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
      } catch (error) {
        // Fallback: show the text in a toast
        toast.info(language === 'ar' ? 'يرجى نسخ الرابط يدوياً' : 'Please copy the link manually');
      }
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
            onClick={() => onNavigate('policy-consultation')}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-medium leading-tight">{consultation.title}</h1>
            <p className="text-white/80 text-sm">{consultation.ministry}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Policy Overview */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-green-100 text-green-700 border-0">
                {language === 'ar' ? 'مفتوح للتعليقات' : 'Open for Comments'}
              </Badge>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  onClick={handleLike}
                  size="sm"
                  variant="ghost"
                  className={`${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  size="sm"
                  variant="ghost"
                  className={`${isBookmarked ? 'text-primary' : 'text-gray-500'}`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  onClick={handleShare}
                  size="sm"
                  variant="ghost"
                  className="text-gray-500"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {consultation.daysLeft} {t.daysLeft}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {consultation.participants} {t.participants}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {comments.length} {t.comments}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 leading-relaxed mb-4">{consultation.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {consultation.tags.map((tag, index) => (
                <Badge key={index} className="bg-primary/10 text-primary border-0">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed mb-6">
              {consultation.fullContent.split('\n\n').map((paragraph, index) => (
                <div key={index} className="mb-4">
                  {paragraph.includes('•') ? (
                    <div>
                      {paragraph.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className={line.includes('•') ? 'ml-4 mb-2' : 'font-medium mb-3'}>
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{paragraph}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-3 rtl:space-x-reverse">
              <Button 
                onClick={() => {
                  // Simulate download
                  const link = document.createElement('a');
                  link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(consultation.title + '\n\n' + consultation.fullContent)}`;
                  link.download = `${consultation.title}.txt`;
                  link.click();
                }}
                variant="outline"
                className="flex-1 h-12"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.downloadPdf}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Comment */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{t.addComment}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.addComment}
              rows={4}
              className="bg-gray-50 border-gray-200 rounded-xl"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              className="w-full bg-primary hover:bg-accent text-white h-10"
            >
              <Send className="w-4 h-4 mr-2" />
              {t.submit}
            </Button>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card className="bg-white shadow-md rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-lg">{t.publicComments}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button size="sm" variant="ghost" className="text-gray-500 h-6 px-2">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}