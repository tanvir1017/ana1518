import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, MessageCircle, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/fd4137f34a2286d10bfa9fbfcd8d577373b5669b.png';
import { toast } from 'sonner@2.0.3';
import DataManager from './utils/dataManager';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => boolean;
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function LoginScreen({ onLogin, onNavigate, language }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const isRTL = language === 'ar';

  const texts = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      signIn: 'Sign In',
      qatarPass: 'QatarPass',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      or: 'or',
      needHelp: 'Need help?',
      support: 'Contact Support'
    },
    ar: {
      title: 'أهلاً بعودتك',
      subtitle: 'سجّل دخولك إلى حسابك',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      signIn: 'تسجيل الدخول',
      qatarPass: 'بطاقة قطر الرقمية',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
      or: 'أو',
      needHelp: 'تحتاج مساعدة؟',
      support: 'تحتاج مساعدة؟'
    }
  };

  const t = texts[language];

  const handleLogin = async () => {
    console.log('=== LOGIN ATTEMPT START ===');
    console.log('Login attempt:', { email, password: password ? '***' : 'empty' });
    
    // Prevent multiple simultaneous login attempts
    if (isLoading) {
      console.log('Login already in progress, aborting');
      return;
    }
    
    if (!email || !password) {
      console.log('Missing email or password');
      toast.error(language === 'en' ? 'Please fill in all fields' : 'يرجى ملء جميع الحقول');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      toast.error(language === 'en' ? 'Please enter a valid email address' : 'يرجى إدخال عنوان بريد إلكتروني صحيح');
      return;
    }
    
    setIsLoading(true);
    console.log('Starting login process...');
    
    try {
      // Check DataManager directly first for debugging
      console.log('Login: Checking DataManager directly...');
      const userData = DataManager.validateCredentials(email, password);
      console.log('Login: Direct DataManager result:', userData ? 'User found' : 'No user found');
      
      // Simulate API call with promise to avoid nested callbacks
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Attempting to validate credentials through onLogin...');
      const success = onLogin(email, password);
      console.log('Login result from onLogin:', success);
      
      if (success) {
        console.log('Login successful, should redirect now...');
        toast.success(language === 'en' ? 'Login successful!' : 'تم تسجيل الدخول بنجاح!');
        // Don't set loading to false here since we're navigating away
        console.log('=== LOGIN SUCCESS ===');
      } else {
        console.log('Login failed - invalid credentials');
        toast.error(
          language === 'en' 
            ? 'Invalid email or password. Please check your credentials and try again.' 
            : 'بريد إلكتروني أو كلمة مرور غير صحيحة. يرجى التحقق من بياناتك والمحاولة مرة أخرى.'
        );
        setIsLoading(false);
        console.log('=== LOGIN FAILED ===');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(language === 'en' ? 'Login failed. Please try again.' : 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      setIsLoading(false);
      console.log('=== LOGIN ERROR ===');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('splash')}
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
          <CardHeader className="text-center space-y-4 pb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-xl p-3 border border-gray-100"
            >
              <img src={logo} alt="Sharek Logo" className="w-full h-full object-contain" />
            </motion.div>
            <CardTitle className="text-foreground">
              {t.title}
            </CardTitle>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700 mb-2 block">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && email && password && handleLogin()}
                  className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm"
                  placeholder="example@email.com"
                  dir={isRTL ? 'rtl' : 'ltr'}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 mb-2 block">{t.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && email && password && handleLogin()}
                    className={`bg-gray-50 border-gray-200 rounded-lg h-11 text-sm ${isRTL ? 'pl-12' : 'pr-12'}`}
                    placeholder="••••••••"
                    dir={isRTL ? 'rtl' : 'ltr'}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={() => onNavigate('forgot-password')}
                  className="text-primary hover:text-accent transition-colors"
                >
                  {t.forgotPassword}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-accent hover:to-primary text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{language === 'en' ? 'Signing in...' : 'جاري التحميل...'}</span>
                  </span>
                ) : t.signIn}
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white rounded-lg text-sm"
              >
                {t.qatarPass}
              </Button>
            </div>

            <div className="text-center pt-4">
              <span className="text-gray-600">{t.noAccount} </span>
              <button
                onClick={() => onNavigate('signup')}
                className="text-primary hover:text-accent font-medium transition-colors"
              >
                {t.signUp}
              </button>
            </div>

            <div className="text-center pt-2 pb-2">
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-500 text-sm">{t.or}</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <button
                onClick={() => onNavigate('help-center')}
                className="flex items-center justify-center w-full space-x-2 text-gray-600 hover:text-primary transition-colors text-sm"
              >
                <MessageCircle size={16} />
                <span>{t.support}</span>
              </button>
              
              {/* Test credentials info */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {language === 'en' ? 'Test Accounts:' : 'حسابات تجريبية:'}
                </p>
                <div className="text-xs text-gray-500 space-y-1 mb-2">
                  <div>anthani@cgb.gov.qa / 123456</div>
                  <div>test@sharek.gov.qa / test123</div>
                  <div>demo@sharek.gov.qa / demo123</div>
                </div>
                <button
                  onClick={() => {
                    console.log('Clearing app data...');
                    try {
                      localStorage.clear();
                      console.log('App data cleared, reloading...');
                      toast.success(language === 'en' ? 'App data cleared!' : 'تم مسح بيانات التطبيق!');
                      setTimeout(() => window.location.reload(), 1000);
                    } catch (error) {
                      console.error('Error clearing data:', error);
                      toast.error(language === 'en' ? 'Error clearing data' : 'خطأ في مسح البيانات');
                    }
                  }}
                  className="text-xs text-primary hover:text-accent transition-colors"
                  disabled={isLoading}
                >
                  {language === 'en' ? 'Reset App Data' : 'إعادة تعيين بيانات التطبيق'}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}