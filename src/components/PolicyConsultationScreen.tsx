import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
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
  Filter,
  Search,
  FileText,
  Clock,
  Users,
  Eye,
  ChevronRight,
  Download,
  ExternalLink
} from 'lucide-react';

interface PolicyConsultationScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function PolicyConsultationScreen({ onNavigate, language }: PolicyConsultationScreenProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [comment, setComment] = useState('');
  const [likedPolicies, setLikedPolicies] = useState<Set<number>>(new Set());
  const [bookmarkedPolicies, setBookmarkedPolicies] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<{[key: number]: any[]}>({
    1: [
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
    ]
  });

  const texts = {
    en: {
      title: 'Policy Consultation',
      subtitle: 'Review Draft Policies',
      back: 'Back',
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      bookmark: 'Bookmark',
      addComment: 'Add your comment...',
      submit: 'Submit',
      viewSummary: 'View Responses Summary',
      likes: 'likes',
      comments: 'comments',
      searchPlaceholder: 'Search policies...',
      filter: 'Filter',
      recent: 'Recent',
      popular: 'Popular',
      myComments: 'My Comments',
      readMore: 'Read More',
      viewComments: 'View Comments',
      hideComments: 'Hide Comments',
      commentFiltered: 'Comment contains inappropriate content and was not posted.',
      commentSubmitted: 'Your comment has been submitted successfully!',
      overview: 'Overview',
      details: 'Details',
      publicComments: 'Public Comments',
      supportingDocs: 'Supporting Documents',
      timeline: 'Timeline',
      daysLeft: 'days left',
      participants: 'participants'
    },
    ar: {
      title: 'استشارة السياسات',
      subtitle: 'مراجعة مسودات السياسات',
      back: 'رجوع',
      like: 'إعجاب',
      comment: 'تعليق',
      share: 'مشاركة',
      bookmark: 'حفظ',
      addComment: 'أضف تعليقك...',
      submit: 'إرسال',
      viewSummary: 'عرض ملخص الردود',
      likes: 'إعجاب',
      comments: 'تعليقات',
      searchPlaceholder: 'البحث في السياسات...',
      filter: 'تصفية',
      recent: 'الحديثة',
      popular: 'الشائعة',
      myComments: 'تعليقاتي',
      readMore: 'اقرأ المزيد',
      viewComments: 'عرض التعليقات',
      hideComments: 'إخفاء التعليقات',
      commentFiltered: 'التعليق يحتوي على محتوى غير مناسب ولم يتم نشره.',
      commentSubmitted: 'تم إرسال تعليقك بنجاح!',
      overview: 'نظرة عامة',
      details: 'التفاصيل',
      publicComments: 'التعليقات العامة',
      supportingDocs: 'الوثائق المساندة',
      timeline: 'الجدول الزمني',
      daysLeft: 'يوم متبقي',
      participants: 'مشارك'
    }
  };

  const t = texts[language];

  const policies = [
    {
      id: 1,
      title: language === 'ar' ? 'مشروع سياسة التعليم عن بُعد' : 'Remote Education Policy Draft',
      ministry: language === 'ar' ? 'وزارة التعليم والتعليم العالي' : 'Ministry of Education & Higher Education',
      description: language === 'ar' 
        ? 'سياسة شاملة لتطوير وتنظيم التعليم عن بُعد في مؤسسات التعليم القطرية'
        : 'Comprehensive policy for developing and regulating remote education in Qatari educational institutions',
      summary: language === 'ar'
        ? 'تهدف هذه السياسة إلى وضع إطار شامل للتعليم عن بُعد يضمن جودة التعليم ويوفر المرونة اللازمة للطلاب والمعلمين. تشمل السياسة متطلبات التكنولوجيا، معايير التقييم، وبرامج التدريب للكوادر التعليمية.'
        : 'This policy aims to establish a comprehensive framework for remote education that ensures educational quality and provides necessary flexibility for students and teachers. The policy includes technology requirements, assessment standards, and training programs for educational staff.',
      status: 'open',
      deadline: '2024-02-15',
      daysLeft: 12,
      likes: 156,
      commentCount: 43,
      participants: 289,
      tags: language === 'ar' ? ['التعليم', 'التكنولوجيا', 'السياسات'] : ['Education', 'Technology', 'Policy'],
      showComments: false
    },
    {
      id: 2,
      title: language === 'ar' ? 'استراتيجية الاستدامة البيئية 2030' : 'Environmental Sustainability Strategy 2030',
      ministry: language === 'ar' ? 'وزارة البيئة والتغير المناخي' : 'Ministry of Environment & Climate Change',
      description: language === 'ar'
        ? 'استراتيجية طويلة المدى لتحقيق الاستدامة البيئية في قطر بحلول 2030'
        : 'Long-term strategy to achieve environmental sustainability in Qatar by 2030',
      summary: language === 'ar'
        ? 'تركز الاستراتيجية على تقليل الانبعاثات الكربونية، تطوير مصادر الطاقة المتجددة، وحماية البيئة البحرية والبرية. تتضمن خطط للتوعية البيئية وتطوير التشريعات البيئية.'
        : 'The strategy focuses on reducing carbon emissions, developing renewable energy sources, and protecting marine and terrestrial environments. It includes plans for environmental awareness and developing environmental legislation.',
      status: 'open',
      deadline: '2024-03-01',
      daysLeft: 28,
      likes: 234,
      commentCount: 67,
      participants: 412,
      tags: language === 'ar' ? ['البيئة', 'الاستدامة', 'المناخ'] : ['Environment', 'Sustainability', 'Climate'],
      showComments: false
    },
    {
      id: 3,
      title: language === 'ar' ? 'سياسة الأمن السيبراني الوطني' : 'National Cybersecurity Policy',
      ministry: language === 'ar' ? 'وزارة الداخلية' : 'Ministry of Interior',
      description: language === 'ar'
        ? 'إطار شامل لحماية البنية التحتية الرقمية والمعلومات في قطر'
        : 'Comprehensive framework for protecting digital infrastructure and information in Qatar',
      summary: language === 'ar'
        ? 'تهدف هذه السياسة إلى تعزيز الأمن السيبراني على المستوى الوطني من خلال وضع معايير أمنية موحدة، برامج التوعية، وآليات الاستجابة للحوادث السيبرانية.'
        : 'This policy aims to enhance cybersecurity at the national level by establishing unified security standards, awareness programs, and cyber incident response mechanisms.',
      status: 'draft',
      deadline: '2024-02-28',
      daysLeft: 25,
      likes: 189,
      commentCount: 52,
      participants: 356,
      tags: language === 'ar' ? ['الأمن السيبراني', 'التكنولوجيا', 'الأمن'] : ['Cybersecurity', 'Technology', 'Security'],
      showComments: false
    }
  ];

  const filterComment = (content: string): boolean => {
    const bannedWords = ['crazy', 'stupid', 'spam'];
    const lowerContent = content.toLowerCase();
    return !bannedWords.some(word => lowerContent.includes(word));
  };

  const handleSubmitComment = (policyId: number) => {
    if (!comment.trim()) return;
    
    if (!filterComment(comment)) {
      alert(t.commentFiltered);
      return;
    }

    const newComment = {
      id: Date.now(),
      author: 'Aisha Al-Thani',
      content: comment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments(prev => ({
      ...prev,
      [policyId]: [...(prev[policyId] || []), newComment]
    }));
    
    setComment('');
    alert(t.commentSubmitted);
  };

  const toggleLike = (policyId: number) => {
    setLikedPolicies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(policyId)) {
        newSet.delete(policyId);
      } else {
        newSet.add(policyId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (policyId: number) => {
    setBookmarkedPolicies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(policyId)) {
        newSet.delete(policyId);
      } else {
        newSet.add(policyId);
      }
      return newSet;
    });
  };

  const toggleComments = (policyId: number) => {
    const policy = policies.find(p => p.id === policyId);
    if (policy) {
      policy.showComments = !policy.showComments;
    }
  };

  // Policy Detail View
  if (selectedPolicy) {
    const policy = policies.find(p => p.id === selectedPolicy);
    if (!policy) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPolicy(null)}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium leading-tight">{policy.title}</h1>
              <p className="text-white/80 text-sm">{policy.ministry}</p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          {/* Policy Overview */}
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${
                  policy.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                } border-0`}>
                  {policy.status === 'open' ? (language === 'ar' ? 'مفتوح للتعليقات' : 'Open for Comments') : (language === 'ar' ? 'مسودة' : 'Draft')}
                </Badge>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    onClick={() => toggleLike(policy.id)}
                    size="sm"
                    variant="ghost"
                    className={`${likedPolicies.has(policy.id) ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${likedPolicies.has(policy.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => toggleBookmark(policy.id)}
                    size="sm"
                    variant="ghost"
                    className={`${bookmarkedPolicies.has(policy.id) ? 'text-primary' : 'text-gray-500'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedPolicies.has(policy.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => {
                      // Simulate download
                      const link = document.createElement('a');
                      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(policy.description + '\n\nFull policy content...')}`;
                      link.download = `${policy.title}.txt`;
                      link.click();
                    }}
                    size="sm"
                    variant="ghost"
                    className="text-gray-500"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: policy.title,
                            text: policy.description,
                            url: window.location.href
                          });
                        } catch (error) {
                          // User cancelled or share failed
                          console.log('Share cancelled or failed');
                        }
                      } else {
                        try {
                          await navigator.clipboard.writeText(`${policy.title}\n${policy.description}\n${window.location.href}`);
                          toast.success(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
                        } catch (error) {
                          // Fallback: show the text in a toast
                          toast.info(language === 'ar' ? 'يرجى نسخ الرابط يدوياً' : 'Please copy the link manually');
                        }
                      }
                    }}
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
                  <Calendar className="w-4 h-4 mr-1" />
                  {policy.daysLeft} {t.daysLeft}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {policy.participants} {t.participants}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {policy.commentCount} {t.comments}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">{policy.summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {policy.tags.map((tag, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary border-0">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button 
                onClick={() => setShowFullPolicy(true)}
                className="w-full bg-primary hover:bg-accent text-white h-12 mb-4"
              >
                <FileText className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'قراءة السياسة كاملة' : 'Read Full Policy'}
              </Button>
              
              {/* Full Policy Modal */}
              {showFullPolicy && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto w-full">
                    <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                      <h2 className="font-medium">{policy.title}</h2>
                      <Button
                        onClick={() => setShowFullPolicy(false)}
                        size="sm"
                        variant="ghost"
                      >
                        ×
                      </Button>
                    </div>
                    <div className="p-6">
                      <div className="prose max-w-none">
                        <h3>Policy Overview</h3>
                        <p>{policy.description}</p>
                        
                        <h3>Background</h3>
                        <p>This policy has been developed in response to the evolving educational landscape and the need for flexible learning solutions that can adapt to various circumstances. The framework outlined here provides a comprehensive approach to implementing remote and hybrid learning models.</p>
                        
                        <h3>Implementation Guidelines</h3>
                        <ul>
                          <li>Technical infrastructure requirements</li>
                          <li>Teacher training and support programs</li>
                          <li>Student assessment methods</li>
                          <li>Parent and community engagement strategies</li>
                        </ul>
                        
                        <h3>Expected Outcomes</h3>
                        <p>The implementation of this policy is expected to improve educational accessibility, enhance digital literacy, and provide more flexible learning opportunities for all students.</p>
                        
                        <h3>Consultation Process</h3>
                        <p>This policy is open for public consultation until {new Date(Date.now() + policy.daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString()}. We encourage all stakeholders to provide their feedback and suggestions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                onClick={() => handleSubmitComment(policy.id)}
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
                {comments[policy.id]?.map((comment) => (
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

        {/* Search Bar */}
        <div className="px-6 pb-6">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 rtl:pl-4 rtl:pr-10 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Policies List */}
        <div className="space-y-4">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-md rounded-2xl border-0 overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <Badge className={`${
                          policy.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        } border-0 text-xs`}>
                          {policy.status === 'open' ? (language === 'ar' ? 'مفتوح' : 'Open') : (language === 'ar' ? 'مسودة' : 'Draft')}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-0 text-xs">
                          {policy.daysLeft} {t.daysLeft}
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium text-gray-800 mb-2 leading-tight">
                        {policy.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {policy.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1" />
                          {policy.ministry}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {policy.participants} {t.participants}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                      <div className="flex items-center">
                        <Heart className={`w-4 h-4 mr-1 ${likedPolicies.has(policy.id) ? 'text-red-500 fill-current' : ''}`} />
                        {policy.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {policy.commentCount}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => setSelectedPolicy(policy.id)}
                      size="sm"
                      className="bg-primary hover:bg-accent text-white"
                    >
                      {t.readMore}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}