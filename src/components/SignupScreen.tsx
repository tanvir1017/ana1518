import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, ArrowLeft, MessageCircle } from 'lucide-react';
import logo from 'figma:asset/fd4137f34a2286d10bfa9fbfcd8d577373b5669b.png';
import DataManager, { QATAR_NATIONALITIES } from './utils/dataManager';
import { toast } from 'sonner@2.0.3';

interface SignupScreenProps {
  onSignup: (profileData: any) => void;
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function SignupScreen({ onSignup, onNavigate, language }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    nationality: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isRTL = language === 'ar';

  const texts = {
    en: {
      title: 'Create Account',
      subtitle: 'Join the Sharek community',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      dob: 'Date of Birth',
      nationality: 'Nationality',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signUp: 'Create Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
      qatari: 'Qatari',
      resident: 'Resident',
      visitor: 'Visitor'
    },
    ar: {
      title: 'إنشاء حساب',
      subtitle: 'انضم إلى مجتمع شارك',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      dob: 'تاريخ الميلاد',
      nationality: 'الجنسية',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      signUp: 'إنشاء الحساب',
      haveAccount: 'لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      qatari: 'قطري',
      resident: 'مقيم',
      visitor: 'زائر'
    }
  };

  const t = texts[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    console.log('=== SIGNUP ATTEMPT START ===');
    console.log('Signup attempt with data:', { ...formData, password: '***', confirmPassword: '***' });
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      console.log('Missing required fields');
      toast.error(language === 'en' ? 'Please fill in all required fields' : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log('Invalid email format');
      toast.error(language === 'en' ? 'Please enter a valid email address' : 'يرجى إدخال عنوان بريد إلكتروني صحيح');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match');
      toast.error(language === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 6) {
      console.log('Password too short');
      toast.error(language === 'en' ? 'Password must be at least 6 characters' : 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    console.log('Checking if email exists...');
    if (DataManager.emailExists(formData.email)) {
      console.log('Email already exists');
      toast.error(language === 'en' ? 'Email already exists' : 'البريد الإلكتروني موجود بالفعل');
      return;
    }

    setIsLoading(true);
    console.log('All validations passed, creating user account...');
    
    // Simulate API call - reduced delay for better UX
    setTimeout(() => {
      try {
        console.log('Calling onSignup with form data...');
        onSignup(formData);
        console.log('onSignup completed, user account should be created');
        toast.success(language === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!');
        console.log('=== SIGNUP SUCCESS ===');
      } catch (error) {
        console.error('Error creating account:', error);
        toast.error(language === 'en' ? 'Error creating account' : 'خطأ في إنشاء الحساب');
        setIsLoading(false);
        console.log('=== SIGNUP ERROR ===');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 relative">
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
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-xl p-3 border border-gray-100">
              <img 
                src={logo} 
                alt="Sharek Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <CardTitle className="text-xl text-gray-800 mb-1">{t.title}</CardTitle>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 mb-2 block">{t.name} <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">{t.email} <span className="text-destructive">*</span></Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 mb-2 block">{t.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm"
                placeholder="+974"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <Label htmlFor="dob" className="text-gray-700 mb-2 block">{t.dob}</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="nationality" className="text-gray-700 mb-2 block">{t.nationality}</Label>
              <Select onValueChange={(value) => handleInputChange('nationality', value)}>
                <SelectTrigger className="bg-gray-50 border-gray-200 rounded-lg h-11 text-sm">
                  <SelectValue placeholder={t.nationality} />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {QATAR_NATIONALITIES.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">{t.password} <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`bg-gray-50 border-gray-200 rounded-lg h-11 text-sm ${isRTL ? 'pl-12' : 'pr-12'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
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

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700 mb-2 block">{t.confirmPassword} <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSignup()}
                  className={`bg-gray-50 border-gray-200 rounded-lg h-11 text-sm ${isRTL ? 'pl-12' : 'pr-12'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-accent hover:to-primary text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{language === 'en' ? 'Creating Account...' : 'جاري الإنشاء...'}</span>
                </span>
              ) : t.signUp}
            </Button>

            <div className="text-center pt-4">
              <span className="text-gray-600">{t.haveAccount} </span>
              <button
                onClick={() => onNavigate('login')}
                className="text-primary hover:text-accent font-medium transition-colors"
              >
                {t.signIn}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}