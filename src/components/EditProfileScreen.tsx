import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Camera, Save, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import DataManager, { QATAR_NATIONALITIES } from './utils/dataManager';

interface EditProfileScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  userEmail: string;
  onProfileUpdate: (userData: any) => void;
}

export default function EditProfileScreen({ onNavigate, language, userEmail, onProfileUpdate }: EditProfileScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    dateOfBirth: '',
    address: ''
  });

  useEffect(() => {
    const userData = DataManager.getUser(userEmail);
    if (userData) {
      setFormData({
        name: userData.profile.name || '',
        email: userData.profile.email || '',
        phone: userData.profile.phone || '',
        nationality: userData.profile.nationality || '',
        dateOfBirth: userData.profile.dateOfBirth || '',
        address: userData.profile.address || ''
      });
    }
  }, [userEmail]);

  const texts = {
    en: {
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      personalInfo: 'Personal Information',
      profilePhoto: 'Profile Photo',
      changePhoto: 'Change Photo',
      fullName: 'Full Name',
      namePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailNote: 'Email cannot be changed',
      phone: 'Phone Number',
      phonePlaceholder: '+974 XXXX XXXX',
      nationality: 'Nationality',
      selectNationality: 'Select your nationality',
      dateOfBirth: 'Date of Birth',
      address: 'Address',
      addressPlaceholder: 'Enter your address',
      saveChanges: 'Save Changes',
      profileUpdated: 'Profile updated successfully',
      requiredField: 'This field is required',
      invalidPhone: 'Please enter a valid phone number'
    },
    ar: {
      title: 'تعديل الملف الشخصي',
      subtitle: 'تحديث معلوماتك الشخصية',
      personalInfo: 'المعلومات الشخصية',
      profilePhoto: 'صورة الملف الشخصي',
      changePhoto: 'تغيير الصورة',
      fullName: 'الاسم الكامل',
      namePlaceholder: 'أدخل اسمك الكامل',
      email: 'عنوان البريد الإلكتروني',
      emailNote: 'لا يمكن تغيير البريد الإلكتروني',
      phone: 'رقم الهاتف',
      phonePlaceholder: '+974 XXXX XXXX',
      nationality: 'الجنسية',
      selectNationality: 'اختر جنسيتك',
      dateOfBirth: 'تاريخ الميلاد',
      address: 'العنوان',
      addressPlaceholder: 'أدخل عنوانك',
      saveChanges: 'حفظ التغييرات',
      profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
      requiredField: 'هذا الحقل مطلوب',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح'
    }
  };

  const t = texts[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t.requiredField + ': ' + t.fullName);
      return false;
    }

    if (formData.phone && !formData.phone.match(/^\+?[\d\s-()]+$/)) {
      toast.error(t.invalidPhone);
      return false;
    }

    return true;
  };

  const handleSaveChanges = () => {
    if (!validateForm()) return;

    const updatedUser = DataManager.updateUserProfile(userEmail, {
      name: formData.name,
      phone: formData.phone,
      nationality: formData.nationality,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address
    });

    if (updatedUser) {
      onProfileUpdate(updatedUser);
      toast.success(t.profileUpdated);
      onNavigate('account');
    }
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    toast.success(language === 'en' ? 'Photo upload feature coming soon' : 'ميزة تحميل الصورة قريباً');
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
          <User className="w-6 h-6" />
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10 space-y-6">
        {/* Profile Photo */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <button
                  onClick={handlePhotoUpload}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center"
                >
                  <Camera className="w-3 h-3 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{t.profilePhoto}</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePhotoUpload}
                  className="mt-2"
                >
                  {t.changePhoto}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle>{t.personalInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">{t.fullName} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t.namePlaceholder}
              />
            </div>

            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                value={formData.email}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">{t.emailNote}</p>
            </div>

            <div>
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t.phonePlaceholder}
              />
            </div>

            <div>
              <Label htmlFor="nationality">{t.nationality}</Label>
              <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectNationality} />
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
              <Label htmlFor="dateOfBirth">{t.dateOfBirth}</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="address">{t.address}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder={t.addressPlaceholder}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSaveChanges}
          className="w-full bg-primary hover:bg-accent text-white h-12"
        >
          <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {t.saveChanges}
        </Button>
      </div>
    </div>
  );
}