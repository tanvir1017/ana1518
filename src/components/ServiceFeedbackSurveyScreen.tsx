import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import DataManager from './utils/dataManager';

interface ServiceFeedbackSurveyScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
  serviceId?: string;
  serviceName?: string;
}

export default function ServiceFeedbackSurveyScreen({ 
  onNavigate, 
  language, 
  userEmail, 
  serviceId,
  serviceName 
}: ServiceFeedbackSurveyScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const texts = {
    en: {
      title: 'Service Feedback Survey',
      subtitle: 'Your opinion matters to us',
      question: 'Question',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Feedback',
      thankYou: 'Thank you for your feedback!',
      submissionMessage: 'Your response has been recorded',
      questions: [
        {
          id: 1,
          text: 'How satisfied are you with the government service you received?',
          options: [
            { value: 1, label: 'Very Dissatisfied' },
            { value: 2, label: 'Dissatisfied' },
            { value: 3, label: 'Neutral' },
            { value: 4, label: 'Satisfied' },
            { value: 5, label: 'Very Satisfied' }
          ]
        },
        {
          id: 2,
          text: 'The steps and requirements of the service were clear and easy to understand.',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Neutral' },
            { value: 4, label: 'Agree' },
            { value: 5, label: 'Strongly Agree' }
          ]
        },
        {
          id: 3,
          text: 'It was easy to complete my request without unnecessary effort or complications.',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Neutral' },
            { value: 4, label: 'Agree' },
            { value: 5, label: 'Strongly Agree' }
          ]
        },
        {
          id: 4,
          text: 'The service channel (or staff) was professional, responsive, and helpful in completing my request.',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Neutral' },
            { value: 4, label: 'Agree' },
            { value: 5, label: 'Strongly Agree' }
          ]
        },
        {
          id: 5,
          text: 'I trust that my request was handled fairly, efficiently, and in my best interest.',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Neutral' },
            { value: 4, label: 'Agree' },
            { value: 5, label: 'Strongly Agree' }
          ]
        }
      ]
    },
    ar: {
      title: 'استبيان تقييم الخدمة',
      subtitle: 'رأيك يهمنا',
      question: 'السؤال',
      of: 'من',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال التقييم',
      thankYou: 'شكراً لك على تقييمك!',
      submissionMessage: 'تم تسجيل ردك',
      questions: [
        {
          id: 1,
          text: 'ما مدى رضاك عن الخدمة الحكومية التي تلقيتها؟',
          options: [
            { value: 1, label: 'غير راضٍ جداً' },
            { value: 2, label: 'غير راضٍ' },
            { value: 3, label: 'محايد' },
            { value: 4, label: 'راضٍ' },
            { value: 5, label: 'راضٍ جداً' }
          ]
        },
        {
          id: 2,
          text: 'كانت خطوات ومتطلبات الخدمة واضحة وسهلة الفهم.',
          options: [
            { value: 1, label: 'أعارض بشدة' },
            { value: 2, label: 'أعارض' },
            { value: 3, label: 'محايد' },
            { value: 4, label: 'أوافق' },
            { value: 5, label: 'أوافق بشدة' }
          ]
        },
        {
          id: 3,
          text: 'كان من السهل إكمال طلبي دون جهد أو تعقيدات غير ضرورية.',
          options: [
            { value: 1, label: 'أعارض بشدة' },
            { value: 2, label: 'أعارض' },
            { value: 3, label: 'محايد' },
            { value: 4, label: 'أوافق' },
            { value: 5, label: 'أوافق بشدة' }
          ]
        },
        {
          id: 4,
          text: 'كانت قناة الخدمة (أو الموظفين) محترفة ومستجيبة ومفيدة في إكمال طلبي.',
          options: [
            { value: 1, label: 'أعارض بشدة' },
            { value: 2, label: 'أعارض' },
            { value: 3, label: 'محايد' },
            { value: 4, label: 'أوافق' },
            { value: 5, label: 'أوافق بشدة' }
          ]
        },
        {
          id: 5,
          text: 'أثق في أن طلبي قد تم التعامل معه بشكل عادل وفعال وفي مصلحتي.',
          options: [
            { value: 1, label: 'أعارض بشدة' },
            { value: 2, label: 'أعارض' },
            { value: 3, label: 'محايد' },
            { value: 4, label: 'أوافق' },
            { value: 5, label: 'أوافق بشدة' }
          ]
        }
      ]
    }
  };

  const t = texts[language];
  const totalQuestions = t.questions.length;
  const question = t.questions[currentQuestion];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (answers.length < totalQuestions || answers.some(a => a === undefined)) {
      toast.error(language === 'ar' ? 'يرجى الإجابة على جميع الأسئلة' : 'Please answer all questions');
      return;
    }

    // Calculate average rating
    const avgRating = answers.reduce((sum, val) => sum + val, 0) / answers.length;
    
    // Save feedback to user data
    if (serviceName) {
      DataManager.addSatisfactionRating(userEmail, serviceName, avgRating);
      DataManager.addFeedback(userEmail);
    }

    toast.success(t.thankYou, {
      description: t.submissionMessage
    });

    // Navigate back to service catalog or service details
    setTimeout(() => {
      onNavigate('service-catalog');
    }, 1500);
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / totalQuestions) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center p-6 pt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('service-catalog')}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div>
            <h1 className="text-xl font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">{t.subtitle}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/80">
              {t.question} {currentQuestion + 1} {t.of} {totalQuestions}
            </span>
            <span className="text-sm text-white/80">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Question Card */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            {/* Question Text */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(option.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    answers[currentQuestion] === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      answers[currentQuestion] === option.value
                        ? 'text-primary'
                        : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                    {answers[currentQuestion] === option.value && (
                      <CheckCircle className="w-5 h-5 text-primary fill-current" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="space-y-3">
          {currentQuestion < totalQuestions - 1 ? (
            <>
              <Button
                className="w-full bg-primary hover:bg-accent text-white h-12 rounded-xl"
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
              >
                {t.next}
              </Button>
              {currentQuestion > 0 && (
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 rounded-xl"
                  onClick={handlePrevious}
                >
                  {t.previous}
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                className="w-full bg-primary hover:bg-accent text-white h-12 rounded-xl"
                onClick={handleSubmit}
                disabled={answers[currentQuestion] === undefined}
              >
                {t.submit}
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 rounded-xl"
                onClick={handlePrevious}
              >
                {t.previous}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
