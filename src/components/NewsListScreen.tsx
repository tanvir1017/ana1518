import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Calendar, 
  Search,
  Filter,
  Share,
  Bookmark,
  Eye,
  Clock
} from 'lucide-react';

interface NewsListScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function NewsListScreen({ onNavigate, language }: NewsListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const texts = {
    en: {
      title: 'News & Announcements',
      subtitle: 'Stay updated with latest government news',
      search: 'Search news...',
      filter: 'Filter',
      all: 'All',
      government: 'Government',
      services: 'Services',
      community: 'Community',
      readingTime: 'min read',
      views: 'views',
      new: 'New',
      featured: 'Featured'
    },
    ar: {
      title: 'الأخبار والإعلانات',
      subtitle: 'ابق على اطلاع بآخر الأخبار الحكومية',
      search: 'البحث في الأخبار...',
      filter: 'تصفية',
      all: 'الكل',
      government: 'حكومية',
      services: 'خدمات',
      community: 'مجتمعية',
      readingTime: 'دقيقة قراءة',
      views: 'مشاهدة',
      new: 'جديد',
      featured: 'مميز'
    }
  };

  const t = texts[language];

  const categories = [
    { id: 'all', label: t.all },
    { id: 'government', label: t.government },
    { id: 'services', label: t.services },
    { id: 'community', label: t.community }
  ];

  const newsArticles = [
    {
      id: 1,
      title: language === 'ar' ? 'افتتاح مركز قطر الجديد للحكومة الذكية في الدوحة' : 'New Qatar Smart Government Center Opens in Doha',
      subtitle: language === 'ar' ? 'مركز متطور يخدم المواطنين بأحدث التقنيات الذكية ويقدم جميع الخدمات الحكومية' : 'Advanced center serving citizens with latest smart technologies and all government services',
      category: 'government',
      date: '2024-01-18',
      readingTime: 5,
      views: 1240,
      image: 'https://images.unsplash.com/photo-1685113872064-de4180a0ea93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2hhJTIwcWF0YXIlMjBza3lsaW5lJTIwYnVpbGRpbmdzfGVufDF8fHx8MTc1OTc2MzA1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: true,
      isFeatured: true,
      content: language === 'ar' ? `
        <p>أعلنت الحكومة القطرية اليوم عن افتتاح مركز قطر الجديد للحكومة الذكية في قلب العاصمة الدوحة، والذي يمثل نقلة نوعية في تقديم الخدمات الحكومية للمواطنين والمقيمين.</p>
        
        <p>يضم المركز الجديد أحدث التقنيات الذكية والحلول الرقمية المتطورة، بهدف تسهيل إجراءات المواطنين وتوفير الوقت والجهد. كما يوفر المركز جميع الخدمات الحكومية تحت سقف واحد، مما يجعل تجربة المواطن أكثر سلاسة وفعالية.</p>
        
        <p>وأكد سعادة وزير التنمية الإدارية والعمل والشؤون الاجتماعية على أن هذا المركز يأتي ضمن استراتيجية قطر الوطنية للتحول الرقمي ورؤية قطر 2030، والتي تهدف إلى جعل قطر دولة رائدة في مجال الحكومة الذكية والخدمات الرقمية.</p>
        
        <p>ويتميز المركز بتصميمه العصري والمستدام، حيث يراعي أعلى معايير الاستدامة البيئية والكفاءة في استخدام الطاقة، مما يجعله نموذجاً يحتذى به في المنطقة.</p>
      ` : `
        <p>The Qatari government announced today the opening of the new Qatar Smart Government Center in the heart of Doha, representing a qualitative leap in providing government services to citizens and residents.</p>
        
        <p>The new center features the latest smart technologies and advanced digital solutions, aimed at facilitating citizen procedures and saving time and effort. The center also provides all government services under one roof, making the citizen experience smoother and more efficient.</p>
        
        <p>His Excellency the Minister of Administrative Development, Labor and Social Affairs emphasized that this center comes within Qatar's national digital transformation strategy and Qatar Vision 2030, which aims to make Qatar a leading country in smart government and digital services.</p>
        
        <p>The center is distinguished by its modern and sustainable design, taking into account the highest standards of environmental sustainability and energy efficiency, making it a model to be emulated in the region.</p>
      `
    },
    {
      id: 2,
      title: language === 'ar' ? 'متحف الفن الإسلامي يطلق معرض التراث الرقمي' : 'Museum of Islamic Art Launches Digital Heritage Exhibition',
      subtitle: language === 'ar' ? 'تجربة تفاعلية جديدة تعرض التراث القطري بالتقنيات الحديثة للزوار من جميع أنحاء العالم' : 'New interactive experience showcasing Qatari heritage with modern technology for visitors worldwide',
      category: 'services',
      date: '2024-01-16',
      readingTime: 3,
      views: 890,
      image: 'https://images.unsplash.com/photo-1577983683283-03bbe8df2aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMG11c2V1bSUyMGlzbGFtaWMlMjBhcnR8ZW58MXx8fHwxNzU5NzYzMDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: true,
      isFeatured: false,
      content: language === 'ar' ? `
        <p>أطلق متحف الفن الإسلامي في الدوحة معرضاً جديداً للتراث الرقمي، يستخدم أحدث التقنيات التفاعلية لعرض التراث القطري والإسلامي بطريقة مبتكرة ومشوقة.</p>
        
        <p>يتيح المعرض للزوار تجربة فريدة من نوعها، حيث يمكنهم التفاعل مع القطع الأثرية والتراثية من خلال الواقع المعزز والافتراضي، مما يوفر فهماً أعمق للتاريخ والثقافة القطرية.</p>
        
        <p>وأشاد مدير المتحف بهذه المبادرة التي تهدف إلى جذب الأجيال الشابة وتعريفهم بتراثهم العريق بلغة العصر التقنية.</p>
      ` : `
        <p>The Museum of Islamic Art in Doha has launched a new digital heritage exhibition, using the latest interactive technologies to showcase Qatari and Islamic heritage in an innovative and engaging way.</p>
        
        <p>The exhibition offers visitors a unique experience, allowing them to interact with artifacts and heritage pieces through augmented and virtual reality, providing a deeper understanding of Qatari history and culture.</p>
        
        <p>The museum director praised this initiative which aims to attract young generations and introduce them to their rich heritage in the technical language of the times.</p>
      `
    },
    {
      id: 3,
      title: language === 'ar' ? 'مشروع التشجير الجديد في الصحراء القطرية' : 'New Desert Greening Project in Qatar',
      subtitle: language === 'ar' ? 'مبادرة مبتكرة لزراعة الصحراء وحماية البيئة ضمن رؤية قطر 2030 للاستدامة' : 'Innovative initiative for desert cultivation and environmental protection under Qatar 2030 sustainability vision',
      category: 'government',
      date: '2024-01-14',
      readingTime: 7,
      views: 1560,
      image: 'https://images.unsplash.com/photo-1610034880166-6ef11d8f9176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMGRlc2VydCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTk3NjMwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: false,
      isFeatured: true,
      content: language === 'ar' ? `
        <p>أطلقت الحكومة القطرية مشروعاً رائداً للتشجير في الصحراء القطرية، يهدف إلى زراعة مئات الآلاف من الأشجار المحلية المقاومة للظروف الصحراوية القاسية.</p>
        
        <p>يأتي هذا المشروع ضمن مبادرات قطر للاستدامة البيئية ورؤية قطر 2030، ويستخدم أحدث التقنيات في الري بالتنقيط وإعادة تدوير المياه لضمان نجاح عملية التشجير.</p>
        
        <p>ومن المتوقع أن يساهم المشروع في تحسين جودة الهواء وخفض درجات الحرارة في المناطق المحيطة، إضافة إلى خلق مساحات خضراء جديدة للمواطنين والمقيمين.</p>
      ` : `
        <p>The Qatari government has launched a pioneering desert greening project aimed at planting hundreds of thousands of local trees resistant to harsh desert conditions.</p>
        
        <p>This project comes within Qatar's environmental sustainability initiatives and Qatar Vision 2030, using the latest drip irrigation and water recycling technologies to ensure the success of the afforestation process.</p>
        
        <p>The project is expected to contribute to improving air quality and reducing temperatures in surrounding areas, in addition to creating new green spaces for citizens and residents.</p>
      `
    },
    {
      id: 4,
      title: language === 'ar' ? 'تطوير سوق واقف بتقنيات رقمية حديثة' : 'Souq Waqif Enhanced with Modern Digital Technologies',
      subtitle: language === 'ar' ? 'دمج التقنيات الذكية مع التراث التقليدي في سوق واقف لتحسين تجربة الزوار' : 'Integrating smart technologies with traditional heritage at Souq Waqif to enhance visitor experience',
      category: 'community',
      date: '2024-01-12',
      readingTime: 4,
      views: 720,
      image: 'https://images.unsplash.com/photo-1607022301188-19eed62de850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMHRyYWRpdGlvbmFsJTIwc291cSUyMG1hcmtldHxlbnwxfHx8fDE3NTk3NjMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: false,
      isFeatured: false,
      content: language === 'ar' ? `
        <p>أعلنت إدارة سوق واقف عن مشروع تطوير شامل يدمج التقنيات الرقمية الحديثة مع التراث الأصيل للسوق، لتعزيز تجربة الزوار والحفاظ على الطابع التراثي المميز.</p>
        
        <p>يشمل المشروع تطبيقات ذكية للهواتف المحمولة تقدم جولات افتراضية ومعلومات تفاعلية عن المحلات والمنتجات التراثية، إضافة إلى نظام دفع إلكتروني موحد.</p>
        
        <p>كما يتضمن المشروع إنشاء متحف رقمي يوثق تاريخ السوق وتطوره عبر العقود، مما يجعله وجهة ثقافية وتجارية متميزة.</p>
      ` : `
        <p>Souq Waqif administration announced a comprehensive development project that integrates modern digital technologies with the authentic heritage of the market, to enhance visitor experience while preserving the distinctive traditional character.</p>
        
        <p>The project includes smart mobile applications offering virtual tours and interactive information about shops and heritage products, in addition to a unified electronic payment system.</p>
        
        <p>The project also includes establishing a digital museum documenting the history and development of the market over decades, making it a distinguished cultural and commercial destination.</p>
      `
    },
    {
      id: 5,
      title: language === 'ar' ? 'استكمال مشاريع البنية التحتية لمونديال قطر' : 'Qatar World Cup Infrastructure Projects Completion',
      subtitle: language === 'ar' ? 'اكتمال المرحلة الأخيرة من مشاريع البنية التحتية التي تخدم المواطنين والزوار' : 'Final phase completion of infrastructure projects serving citizens and visitors',
      category: 'services',
      date: '2024-01-10',
      readingTime: 6,
      views: 980,
      image: 'https://images.unsplash.com/photo-1672088491419-33f6f85a7c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMHdvcmxkJTIwY3VwJTIwc3RhZGl1bXxlbnwxfHx8fDE3NTk3NjMxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: false,
      isFeatured: false,
      content: language === 'ar' ? `
        <p>أعلنت اللجنة العليا للمشاريع والإرث عن اكتمال المرحلة الأخيرة من مشاريع البنية التحتية التي أُقيمت لاستضافة كأس العالم FIFA قطر 2022™، والتي تستمر في خدمة المجتمع القطري.</p>
        
        <p>تشمل هذه المشاريع شبكات النقل المتطورة، والطرق السريعة الجديدة، ومحطات المترو الحديثة التي ربطت جميع أنحاء قطر، مما سهّل حركة المواطنين والمقيمين بشكل كبير.</p>
        
        <p>كما تم الانتهاء من تطوير المرافق الرياضية والثقافية التي تستضيف الآن فعاليات محلية وإقليمية متنوعة، مما يعزز من مكانة قطر كمركز رياضي وثقافي في المنطقة.</p>
      ` : `
        <p>The Supreme Committee for Delivery & Legacy announced the completion of the final phase of infrastructure projects established to host the FIFA World Cup Qatar 2022™, which continue to serve the Qatari community.</p>
        
        <p>These projects include advanced transport networks, new highways, and modern metro stations that connect all parts of Qatar, greatly facilitating the movement of citizens and residents.</p>
        
        <p>The development of sports and cultural facilities has also been completed, now hosting various local and regional events, enhancing Qatar's position as a sports and cultural hub in the region.</p>
      `
    },
    {
      id: 6,
      title: language === 'ar' ? 'برنامج قطر للتعليم الرقمي والابتكار' : 'Qatar Digital Education and Innovation Program',
      subtitle: language === 'ar' ? 'إطلاق برنامج شامل لتطوير التعليم الرقمي وتدريب الشباب على تقنيات المستقبل' : 'Comprehensive program launch for digital education development and youth training in future technologies',
      category: 'government',
      date: '2024-01-08',
      readingTime: 3,
      views: 650,
      image: 'https://images.unsplash.com/photo-1681505546695-682d6c1e2c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxYXRhciUyMGVkdWNhdGlvbmFsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk3NjMxMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: false,
      isFeatured: false,
      content: language === 'ar' ? `
        <p>أطلقت وزارة التربية والتعليم والتعليم العالي برنامجاً شاملاً للتعليم الرقمي والابتكار، يهدف إلى إعداد الشباب القطري لسوق العمل المستقبلي وتقنيات الذكاء الاصطناعي.</p>
        
        <p>يتضمن البرنامج دورات متخصصة في البرمجة وتطوير التطبيقات والأمن السيبراني، إضافة إلى ورش عمل في ريادة الأعمال التقنية والابتكار الرقمي.</p>
        
        <p>ويشارك في البرنامج خبراء دوليون ومحليون، ويوفر للمشاركين شهادات معتمدة ومسارات مهنية واضحة في القطاع التقني المتنامي في قطر.</p>
      ` : `
        <p>The Ministry of Education and Higher Education launched a comprehensive digital education and innovation program aimed at preparing Qatari youth for the future job market and artificial intelligence technologies.</p>
        
        <p>The program includes specialized courses in programming, application development, and cybersecurity, in addition to workshops in technology entrepreneurship and digital innovation.</p>
        
        <p>The program involves international and local experts and provides participants with accredited certificates and clear career paths in Qatar's growing technology sector.</p>
      `
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Article Detail View
  if (selectedArticle) {
    const article = newsArticles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedArticle(null)}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium">Article</h1>
              <p className="text-white/80 text-sm">{article.date}</p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          {/* Article Content */}
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <div className="relative h-48">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex space-x-2 rtl:space-x-reverse">
                {article.isFeatured && (
                  <Badge className="bg-accent text-white border-0">
                    {t.featured}
                  </Badge>
                )}
                {article.isNew && (
                  <Badge className="bg-destructive text-white border-0">
                    {t.new}
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-6">
              {/* Article Meta */}
              <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    {article.readingTime} {t.readingTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    {article.views} {t.views}
                  </div>
                </div>
              </div>

              {/* Title and Subtitle */}
              <h1 className="text-xl font-semibold text-gray-900 mb-3">
                {article.title}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {article.subtitle}
              </p>

              {/* Article Content */}
              <div 
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />

              {/* Action Buttons */}
              <div className="flex space-x-3 rtl:space-x-reverse mt-6 pt-6 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 bg-primary text-white rounded-xl"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.subtitle,
                        url: window.location.href
                      });
                    } else {
                      alert(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied');
                    }
                  }}
                >
                  <Share className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'مشاركة' : 'Share'}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 px-4 bg-gray-100 text-gray-700 rounded-xl"
                  onClick={() => {
                    alert(language === 'ar' ? 'تم حفظ المقال' : 'Article saved');
                  }}
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>
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
      <div className="bg-gradient-to-r from-primary to-[#1E425E] text-white">
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
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/20 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Categories */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        {filteredArticles.find(article => article.isFeatured) && (
          <div className="mb-6">
            <h2 className="font-medium text-gray-800 mb-3">{t.featured}</h2>
            {(() => {
              const featuredArticle = filteredArticles.find(article => article.isFeatured);
              return featuredArticle && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedArticle(featuredArticle.id)}
                >
                  <Card className="bg-white shadow-lg rounded-2xl border-0 overflow-hidden">
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                        <Badge className="bg-accent text-white border-0">
                          {t.featured}
                        </Badge>
                      </div>
                      {featuredArticle.isNew && (
                        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                          <Badge className="bg-destructive text-white border-0">
                            {t.new}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {featuredArticle.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {featuredArticle.readingTime} {t.readingTime}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {featuredArticle.views} {t.views}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {featuredArticle.subtitle}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })()}
          </div>
        )}

        {/* News Articles List */}
        <div className="space-y-4">
          {filteredArticles.filter(article => !article.isFeatured).map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className="cursor-pointer"
              onClick={() => setSelectedArticle(article.id)}
            >
              <Card className="bg-white shadow-md rounded-xl border-0 overflow-hidden">
                <div className="flex">
                  <div className="w-28 h-24 flex-shrink-0 relative">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    {article.isNew && (
                      <Badge className="absolute top-1 left-1 bg-destructive text-white border-0 text-xs">
                        {t.new}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <Calendar className="w-2 h-2 mr-1 rtl:mr-0 rtl:ml-1" />
                      {article.date}
                      <span className="mx-2">•</span>
                      <Clock className="w-2 h-2 mr-1 rtl:mr-0 rtl:ml-1" />
                      {article.readingTime} {t.readingTime}
                      <span className="mx-2">•</span>
                      <Eye className="w-2 h-2 mr-1 rtl:mr-0 rtl:ml-1" />
                      {article.views}
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm mb-1 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                      {article.subtitle}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">
              {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </h3>
            <p className="text-gray-600 text-sm">
              {language === 'ar' ? 'جرب البحث بكلمات مختلفة أو غير الفئة' : 'Try searching with different keywords or change category'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}