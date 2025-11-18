import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Calendar,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  Eye,
  User
} from 'lucide-react';

interface NewsArticleScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  newsId?: number;
}

export default function NewsArticleScreen({ onNavigate, language, newsId = 1 }: NewsArticleScreenProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(156);

  useEffect(() => {
    // Scroll to top when component mounts or when newsId changes
    window.scrollTo(0, 0);
  }, [newsId]);

  const texts = {
    en: {
      title: 'News Article',
      back: 'Back',
      share: 'Share',
      bookmark: 'Bookmark',
      like: 'Like',
      comments: 'Comments',
      views: 'Views',
      relatedNews: 'Related News',
      readMore: 'Read More'
    },
    ar: {
      title: 'مقال إخباري',
      back: 'رجوع',
      share: 'مشاركة',
      bookmark: 'حفظ',
      like: 'إعجاب',
      comments: 'تعليقات',
      views: 'مشاهدات',
      relatedNews: 'أخبار ذات صلة',
      readMore: 'اقرأ المزيد'
    }
  };

  const t = texts[language];

  const newsArticles = [
    {
      id: 1,
      title: language === 'ar' ? 'افتتاح مركز قطر الجديد للحكومة الذكية في الدوحة' : 'New Qatar Smart Government Center Opens in Doha',
      subtitle: language === 'ar' ? 'مركز متطور يخدم المواطنين بأحدث التقنيات الذكية' : 'Advanced center serving citizens with latest smart technologies',
      content: language === 'ar' 
        ? `أعلنت الحكومة القطرية اليوم عن افتتاح مركز جديد للحكومة الذكية في العاصمة الدوحة، والذي يهدف إلى تعزيز الخدمات الحكومية الرقمية وتحسين تجربة المواطنين والمقيمين.

يقع المركز الجديد في منطقة استراتيجية بالدوحة ويضم أحدث التقنيات الذكية والحلول الرقمية المبتكرة. ويهدف المركز إلى توفير خدمات حكومية شاملة تحت سقف واحد، مما يسهل على المواطنين الوصول إلى الخدمات المختلفة بسهولة ويسر.

يشمل المركز قاعات خدمة متطورة مجهزة بأحدث التقنيات، بالإضافة إلى مناطق انتظار مريحة ونظام ذكي لإدارة الطوابير. كما يوفر المركز خدمات رقمية متنوعة تشمل التقديم للوثائق الحكومية، والاستعلام عن المعاملات، وتحديث البيانات الشخصية.

وفي تصريح لوزير التطوير الإداري والعمل والشؤون الاجتماعية، أكد أن هذا المركز يأتي في إطار رؤية قطر الوطنية 2030 لتحقيق التحول الرقمي الشامل وتعزيز كفاءة الخدمات الحكومية.`
        : `The Qatari government today announced the opening of a new Smart Government Center in the capital Doha, aimed at enhancing digital government services and improving the experience of citizens and residents.

The new center is located in a strategic area of Doha and features the latest smart technologies and innovative digital solutions. The center aims to provide comprehensive government services under one roof, making it easier for citizens to access various services with ease and convenience.

The center includes advanced service halls equipped with the latest technologies, in addition to comfortable waiting areas and a smart queue management system. The center also provides various digital services including applications for government documents, transaction inquiries, and personal data updates.

In a statement by the Minister of Administrative Development, Labor and Social Affairs, he confirmed that this center comes within the framework of Qatar National Vision 2030 to achieve comprehensive digital transformation and enhance the efficiency of government services.`,
      date: '2024-01-18',
      author: language === 'ar' ? 'فريق التحرير' : 'Editorial Team',
      image: 'https://images.unsplash.com/photo-1685113872064-de4180a0ea93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2hhJTIwcWF0YXIlMjBza3lsaW5lJTIwYnVpbGRpbmdzfGVufDF8fHx8MTc1OTc2MzA1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      views: 2847,
      comments: 23
    },
    {
      id: 2,
      title: language === 'ar' ? 'متحف الفن الإسلامي يطلق معرض التراث الرقمي' : 'Museum of Islamic Art Launches Digital Heritage Exhibition',
      subtitle: language === 'ar' ? 'تجربة تفاعلية جديدة تعرض التراث القطري بالتقنيات الحديثة' : 'New interactive experience showcasing Qatari heritage with modern technology',
      content: language === 'ar'
        ? `أطلق متحف الفن الإسلامي في الدوحة معرضاً جديداً للتراث الرقمي يستخدم أحدث التقنيات التفاعلية لعرض التراث القطري والإسلامي بطريقة مبتكرة ومثيرة.

يتضمن المعرض مجموعة من القطع الأثرية النادرة التي تم رقمنتها باستخدام تقنيات ثلاثية الأبعاد، مما يتيح للزوار استكشافها بتفاصيل دقيقة لم تكن ممكنة من قبل. كما يضم المعرض شاشات تفاعلية تحكي قصص التراث القطري عبر العصور.`
        : `The Museum of Islamic Art in Doha has launched a new digital heritage exhibition that uses the latest interactive technologies to showcase Qatari and Islamic heritage in an innovative and exciting way.

The exhibition includes a collection of rare artifacts that have been digitized using three-dimensional technologies, allowing visitors to explore them in precise detail that was not possible before. The exhibition also features interactive screens that tell the stories of Qatari heritage through the ages.`,
      date: '2024-01-16',
      author: language === 'ar' ? 'مراسل ثقافي' : 'Cultural Reporter',
      image: 'https://images.unsplash.com/photo-1577983683283-03bbe8df2aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMG11c2V1bSUyMGlzbGFtaWMlMjBhcnR8ZW58MXx8fHwxNzU5NzYzMDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 1923,
      comments: 18
    },
    {
      id: 3,
      title: language === 'ar' ? 'مشروع التشجير الجديد في الصحراء القطرية' : 'New Desert Greening Project in Qatar',
      subtitle: language === 'ar' ? 'مبادرة مبتكرة لزراعة الصحراء وحماية البيئة' : 'Innovative initiative for desert cultivation and environmental protection',
      content: language === 'ar'
        ? `أطلقت الحكومة القطرية مشروعاً طموحاً جديداً لتشجير مناطق واسعة من الصحراء القطرية، بهدف زيادة الغطاء النباتي وتحسين البيئة المحلية.

يستخدم المشروع أحدث التقنيات الزراعية المستدامة وأنظمة الري الذكية التي تحافظ على المياه وتضمن نمو النباتات في البيئة الصحراوية القاسية. كما يتضمن المشروع زراعة أنواع نباتية محلية مقاومة للجفاف والملوحة.

ويهدف المشروع إلى تحسين جودة الهواء وخفض درجات الحرارة في المناطق المحيطة، بالإضافة إلى خلق بيئة طبيعية جديدة تدعم التنوع البيولوجي في قطر.`
        : `The Qatari government has launched an ambitious new project to green vast areas of the Qatari desert, aimed at increasing vegetation cover and improving the local environment.

The project uses the latest sustainable agricultural technologies and smart irrigation systems that conserve water and ensure plant growth in the harsh desert environment. The project also includes planting local plant species resistant to drought and salinity.

The project aims to improve air quality and reduce temperatures in surrounding areas, in addition to creating a new natural environment that supports biodiversity in Qatar.`,
      date: '2024-01-14',
      author: language === 'ar' ? 'مراسل بيئي' : 'Environmental Reporter',
      image: 'https://images.unsplash.com/photo-1610034880166-6ef11d8f9176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMGRlc2VydCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTk3NjMwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 1456,
      comments: 12
    },
    {
      id: 4,
      title: language === 'ar' ? 'تطو��ر سوق واقف بتقنيات رقمية حديثة' : 'Souq Waqif Enhanced with Modern Digital Technologies',
      subtitle: language === 'ar' ? 'دمج التقنيات الذكية مع التراث التقليدي في سوق واقف' : 'Integrating smart technologies with traditional heritage at Souq Waqif',
      content: language === 'ar'
        ? `شهد سوق واقف التراثي في قلب الدوحة تطويراً شاملاً يدمج بين التراث العريق والتقنيات الحديثة، في إطار مشروع طموح لتعزيز تجربة الزوار والحفاظ على التراث القطري.

يتضمن التطوير تركيب أنظمة ملاحة ذكية ومرشدين رقميين باللغتين العربية والإنجليزية، بالإضافة إلى تطبيق ذكي يوفر معلومات مفصلة عن المحلات والمطاعم والفعاليات الثقافية.

كما تم تجهيز السوق بشبكة إنترنت فائقة السرعة ونقاط شحن ذكية للهواتف، مع الحفاظ على الطابع التراثي الأصيل للمكان والذي يجذب ملايين الزوار سنوياً.`
        : `The heritage Souq Waqif in the heart of Doha has undergone comprehensive development that integrates ancient heritage with modern technologies, as part of an ambitious project to enhance visitor experience and preserve Qatari heritage.

The development includes installing smart navigation systems and digital guides in both Arabic and English, in addition to a smart application that provides detailed information about shops, restaurants and cultural events.

The souq has also been equipped with ultra-high-speed internet and smart charging points for phones, while maintaining the authentic heritage character of the place that attracts millions of visitors annually.`,
      date: '2024-01-12',
      author: language === 'ar' ? 'مراسل تراثي' : 'Heritage Reporter',
      image: 'https://images.unsplash.com/photo-1607022301188-19eed62de850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMHRyYWRpdGlvbmFsJTIwc291cSUyMG1hcmtldHxlbnwxfHx8fDE3NTk3NjMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: 2134,
      comments: 27
    }
  ];

  const article = newsArticles.find(a => a.id === newsId) || newsArticles[0];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${article.title}\n${article.subtitle}\n${window.location.href}`);
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
            onClick={() => onNavigate('home')}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div>
            <h1 className="text-lg font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">{article.date}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Article */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <div className="relative">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="bg-primary text-white border-0 mb-2">
                {language === 'ar' ? 'أخبار حكومية' : 'Government News'}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              
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

            <h1 className="text-xl font-medium text-gray-800 mb-3 leading-tight">
              {article.title}
            </h1>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {article.subtitle}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                <div className="flex items-center">
                  <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                  {likes}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {article.comments}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {article.views}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related News */}
        <Card className="bg-white shadow-md rounded-2xl border-0">
          <CardHeader>
            <CardTitle>{t.relatedNews}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsArticles.filter(news => news.id !== newsId).slice(0, 2).map((news) => (
                <motion.div
                  key={news.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onNavigate('news-article', { newsId: news.id })}
                  className="flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-xl bg-gray-50 cursor-pointer"
                >
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm leading-tight mb-1">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-tight">
                      {news.subtitle}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {news.date}
                    </div>
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