import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Star, Send, Heart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RateAppScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
}

export default function RateAppScreen({ onNavigate, language, userEmail }: RateAppScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');

  const texts = {
    en: {
      title: 'Rate Sharek',
      subtitle: 'Help us improve with your feedback',
      rateExperience: 'Rate Your Experience',
      ratePrompt: 'How would you rate your overall experience with Sharek?',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      poor: 'Poor',
      terrible: 'Terrible',
      feedback: 'Additional Feedback',
      feedbackPlaceholder: 'Tell us what you liked or what we could improve...',
      categories: 'What would you like to highlight?',
      userInterface: 'User Interface',
      performance: 'Performance',
      features: 'Features',
      customerService: 'Customer Service',
      overall: 'Overall Experience',
      submitRating: 'Submit Rating',
      thankYou: 'Thank you for your feedback!',
      ratingSubmitted: 'Rating submitted successfully',
      selectRating: 'Please select a rating',
      appStore: 'Rate on App Store',
      playStore: 'Rate on Play Store',
      shareApp: 'Share Sharek with Friends'
    },
    ar: {
      title: 'قيم شارك',
      subtitle: 'ساعدنا في التحسين بملاحظاتك',
      rateExperience: 'قيم تجربتك',
      ratePrompt: 'كيف تقيم تجربتك العامة مع شارك؟',
      excellent: 'ممتاز',
      good: 'جيد',
      average: 'متوسط',
      poor: 'ضعيف',
      terrible: 'سيء جداً',
      feedback: 'ملاحظات إضافية',
      feedbackPlaceholder: 'أخبرنا ما أعجبك أو ما يمكننا تحسينه...',
      categories: 'ما الذي تود تسليط الضوء عليه؟',
      userInterface: 'واجهة المستخدم',
      performance: 'الأداء',
      features: 'الميزات',
      customerService: 'خدمة العملاء',
      overall: 'التجربة العامة',
      submitRating: 'إرسال التقييم',
      thankYou: 'شكراً لك على ملاحظاتك!',
      ratingSubmitted: 'تم إرسال التقييم بنجاح',
      selectRating: 'يرجى اختيار تقييم',
      appStore: 'قيم في متجر التطبيقات',
      playStore: 'قيم في متجر جوجل بلاي',
      shareApp: 'شارك شارك مع الأصدقاء'
    }
  };

  const t = texts[language];

  const ratingLabels = [
    t.terrible,
    t.poor,
    t.average,
    t.good,
    t.excellent
  ];

  const categories = [
    { id: 'ui', label: t.userInterface },
    { id: 'performance', label: t.performance },
    { id: 'features', label: t.features },
    { id: 'service', label: t.customerService },
    { id: 'overall', label: t.overall }
  ];

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error(t.selectRating);
      return;
    }

    // Simulate rating submission
    toast.success(t.ratingSubmitted);
    toast.success(t.thankYou);

    // Reset form
    setRating(0);
    setFeedback('');
    setCategory('');
  };

  const getRatingColor = (star: number) => {
    const activeRating = hoveredRating || rating;
    if (star <= activeRating) {
      if (activeRating <= 2) return 'text-red-500';
      if (activeRating <= 3) return 'text-yellow-500';
      return 'text-green-500';
    }
    return 'text-gray-300';
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
          <Heart className="w-6 h-6" />
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10 space-y-6">
        {/* Rating Section */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-center">{t.rateExperience}</CardTitle>
            <p className="text-center text-gray-600 text-sm">{t.ratePrompt}</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Star Rating */}
            <div className="flex justify-center space-x-2 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`w-10 h-10 ${getRatingColor(star)} transition-colors duration-200`}
                    fill="currentColor"
                  />
                </motion.button>
              ))}
            </div>

            {/* Rating Label */}
            {(rating > 0 || hoveredRating > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-gray-900"
              >
                {ratingLabels[(hoveredRating || rating) - 1]}
              </motion.div>
            )}

            {/* Rating Description */}
            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-600"
              >
                {rating >= 4 && "We're thrilled you love Sharek! 🎉"}
                {rating === 3 && "Thanks for your feedback. We're working to improve! 👍"}
                {rating <= 2 && "We're sorry to hear that. Please tell us how we can improve. 💪"}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Category Selection */}
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow-lg rounded-2xl border-0">
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">{t.categories}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                        category === cat.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Feedback Text */}
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white shadow-lg rounded-2xl border-0">
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">{t.feedback}</h3>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t.feedbackPlaceholder}
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Submit Button */}
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              onClick={handleSubmitRating}
              className="w-full bg-primary hover:bg-accent text-white h-12"
            >
              <Send className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {t.submitRating}
            </Button>
          </motion.div>
        )}

        {/* External Rating Links */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-6 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => toast.info('App Store rating coming soon')}
            >
              <Star className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {t.appStore}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => toast.info('Play Store rating coming soon')}
            >
              <Star className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {t.playStore}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Sharek - Qatar Government Engagement',
                    text: 'Check out Sharek, Qatar\'s digital government platform!',
                    url: window.location.href
                  });
                } else {
                  toast.success('Share feature activated');
                }
              }}
            >
              <Heart className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {t.shareApp}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}