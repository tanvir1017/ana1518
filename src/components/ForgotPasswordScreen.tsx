import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import logo from 'figma:asset/fd4137f34a2286d10bfa9fbfcd8d577373b5669b.png';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function ForgotPasswordScreen({ onNavigate, language }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const isRTL = language === 'ar';

  const texts = {
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your email to receive reset instructions',
      email: 'Email Address',
      sendReset: 'Send Reset Link',
      emailSent: 'Reset link sent!',
      emailSentDesc: 'Check your email for password reset instructions',
      backToLogin: 'Back to Login',
      resendEmail: 'Resend Email'
    },
    ar: {
      title: 'إعادة تعيين كلمة المرور',
      subtitle: 'أدخل بريدك الإلكتروني لتلقي تعليمات الإعادة',
      email: 'البريد الإلكتروني',
      sendReset: 'إرسال رابط الإعادة',
      emailSent: 'تم إرسال الرابط!',
      emailSentDesc: 'تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور',
      backToLogin: 'العودة إلى تسجيل الدخول',
      resendEmail: 'إعادة إرسال البريد'
    }
  };

  const t = texts[language];

  const handleSendReset = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-[#1E425E] flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('login')}
        className="fixed top-6 left-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-50"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0 rounded-2xl">
          <CardHeader className="text-center pb-4">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              emailSent 
                ? 'bg-gradient-to-r from-primary to-secondary' 
                : 'bg-white p-3 shadow-xl border border-gray-100'
            }`}>
              {emailSent ? (
                <Mail className="w-8 h-8 text-white" />
              ) : (
                <img 
                  src={logo} 
                  alt="Sharek Logo" 
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            
            <CardTitle className="text-xl text-gray-800 mb-1">
              {emailSent ? t.emailSent : t.title}
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {emailSent ? t.emailSentDesc : t.subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!emailSent ? (
              <>
                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm"
                    placeholder="example@email.com"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                <Button
                  onClick={handleSendReset}
                  disabled={isLoading || !email}
                  className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-accent hover:to-primary text-white rounded-lg text-sm"
                >
                  {isLoading ? (language === 'en' ? 'Sending...' : 'جاري الإرسال...') : t.sendReset}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <Mail className="w-10 h-10 text-green-600" />
                </motion.div>

                <p className="text-center text-gray-600 mb-6">
                  Email sent to: <span className="font-medium text-gray-800">{email}</span>
                </p>

                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
                >
                  {t.resendEmail}
                </Button>
              </div>
            )}

            <div className="text-center pt-4">
              <button
                onClick={() => onNavigate('login')}
                className="text-[#1E425E] hover:text-primary font-medium transition-colors"
              >
                {t.backToLogin}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}