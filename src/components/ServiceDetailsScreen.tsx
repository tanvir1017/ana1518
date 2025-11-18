import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Star,
  Clock,
  DollarSign,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { getServiceById, getServiceCenterForService, getServiceCentersForService } from './utils/servicesData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ServiceDetailsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: 'en' | 'ar';
  serviceId: string;
}

export default function ServiceDetailsScreen({ onNavigate, language, serviceId }: ServiceDetailsScreenProps) {
  const service = getServiceById(serviceId);
  const [showCenterSelection, setShowCenterSelection] = useState(false);

  const texts = {
    en: {
      backToServices: 'Service Catalog',
      available: 'Available',
      digital: 'Digital',
      incompleteDigital: 'Incomplete Digital',
      applyNow: 'Apply Now',
      giveFeedback: 'Give Feedback',
      businessDays: 'business days',
      steps: 'Steps',
      requiredDocuments: 'Required Documents',
      contact: 'Contact',
      relatedServices: 'Related Services',
      estimatedTime: 'Estimated Time',
      cost: 'Cost',
      reviews: 'reviews',
      step1: 'Book appointment online',
      step1Digital: 'Visit the online portal',
      step2: 'Prepare required documents',
      step3: 'Visit service center',
      step3Digital: 'Fill out the online form',
      step4: 'Pay fees',
      step4Digital: 'Submit your application',
      step5: 'Receive service',
      step5Digital: 'Track your application status',
      qatarId: 'Qatar ID',
      passport: 'Passport',
      currentLicense: 'Current driving license',
      medicalCertificate: 'Medical certificate',
      photos: 'Passport-sized photos (2)',
      serviceCenter: 'Service Center',
      address: 'Service center address',
      phone: '+974 4444 4444',
      email: 'services@gov.qa',
      hours: 'Sun-Thu: 7:00 AM - 6:00 PM',
      licenseRenewal: 'License Renewal',
      required: 'Required',
      optional: 'Optional',
      bookAppointment: 'Book Appointment',
      redirectingToPortal: 'Redirecting to online portal...',
      navigatingToBooking: 'Redirecting to appointment booking...'
    },
    ar: {
      backToServices: 'دليل الخدمات',
      available: 'متاح',
      digital: 'رقمية',
      incompleteDigital: 'رقمية جزئياً',
      applyNow: 'اطلب الآن',
      giveFeedback: 'تقييم الخدمة',
      businessDays: 'أيام عمل',
      steps: 'الخطوات',
      requiredDocuments: 'الوثائق المطلوبة',
      contact: 'التوا��ل',
      relatedServices: 'خدمات ذات صلة',
      estimatedTime: 'الوقت المقدر',
      cost: 'التكلفة',
      reviews: 'تقييم',
      step1: 'احجز موعداً عبر الإنترنت',
      step1Digital: 'زيارة البوابة الإلكترونية',
      step2: 'جهز الوثائق المطلوبة',
      step3: 'زر مركز الخدمة',
      step3Digital: 'املأ النموذج الإلكتروني',
      step4: 'ادفع الرسوم',
      step4Digital: 'أرسل طلبك',
      step5: 'استلم الخدمة',
      step5Digital: 'تتبع حالة طلبك',
      qatarId: 'الهوية القطرية',
      passport: 'جواز السفر',
      currentLicense: 'رخصة القيادة الحالية',
      medicalCertificate: 'الشهادة الطبية',
      photos: 'صور شخصية (2)',
      serviceCenter: 'مركز الخدمة',
      address: 'عنوان مركز الخدمة',
      phone: '+974 4444 4444',
      email: 'services@gov.qa',
      hours: 'الأحد-الخميس: 7:00 ص - 6:00 م',
      licenseRenewal: 'تجديد الرخصة',
      required: 'مطلوب',
      optional: 'اختياري',
      bookAppointment: 'حجز موعد',
      redirectingToPortal: 'جاري التوجيه إلى البوابة الإلكترونية...',
      navigatingToBooking: 'جاري التوجيه إلى حجز المواعيد...'
    }
  };

  const t = texts[language];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <p className="text-gray-600">Service not found</p>
      </div>
    );
  }

  const serviceCenter = service.serviceCenterId ? getServiceCenterForService(service.serviceCenterId) : null;

  const steps = service.type === 'Digital' ? [
    { id: 1, title: t.step1Digital, description: language === 'ar' ? 'استخدم البوابة الإلكترونية الرسمية' : 'Use the official online portal' },
    { id: 2, title: t.step2, description: language === 'ar' ? 'تأكد من توفر جميع الوثائق المطلوبة' : 'Ensure all required documents are available' },
    { id: 3, title: t.step3Digital, description: language === 'ar' ? 'أكمل النموذج الإلكتروني بالمعلومات المطلوبة' : 'Complete the online form with required information' },
    { id: 4, title: t.step4Digital, description: language === 'ar' ? 'أرسل الطلب مع المستندات المطلوبة' : 'Submit application with required documents' },
    { id: 5, title: t.step5Digital, description: language === 'ar' ? 'تابع حالة طلبك عبر البوابة' : 'Track your application status via portal' }
  ] : [
    { id: 1, title: t.step1, description: language === 'ar' ? 'استخدم موقع الحجز الإلكتروني أو تطبيق الهاتف' : 'Use the online booking website or mobile app' },
    { id: 2, title: t.step2, description: language === 'ar' ? 'تأكد من توفر جميع الوثائق المطلوبة' : 'Ensure all required documents are available' },
    { id: 3, title: t.step3, description: language === 'ar' ? 'احضر إلى المركز في الموعد المحدد' : 'Arrive at the center at the scheduled time' },
    { id: 4, title: t.step4, description: language === 'ar' ? 'ادفع الرسوم نقداً أو بالبطاقة الائتمانية' : 'Pay fees in cash or by credit card' },
    { id: 5, title: t.step5, description: language === 'ar' ? 'استلم الخدمة المطلوبة' : 'Receive your requested service' }
  ];

  const documents = [
    { id: 1, title: t.qatarId, required: true },
    { id: 2, title: t.passport, required: true },
    { id: 3, title: language === 'ar' ? 'المستندات الداعمة' : 'Supporting documents', required: true },
    { id: 4, title: language === 'ar' ? 'إثبات الدفع' : 'Proof of payment', required: false },
    { id: 5, title: t.photos, required: service.type === 'Incomplete Digital' }
  ];

  const handleApplyNow = () => {
    if (service.type === 'Digital' && service.url) {
      // Open external URL for digital services
      window.open(service.url, '_blank');
    } else if (service.type === 'Incomplete Digital') {
      // Check if service is available at multiple centers
      const availableCenters = getServiceCentersForService(service);
      
      if (availableCenters.length > 1) {
        // Show center selection dialog
        setShowCenterSelection(true);
      } else if (availableCenters.length === 1) {
        // Navigate directly to appointment booking
        const center = availableCenters[0];
        onNavigate('appointment-booking', {
          centerId: center.id,
          centerName: language === 'ar' ? center.nameAr : center.nameEn,
          centerAddress: language === 'ar' ? center.addressAr : center.addressEn,
          serviceName: language === 'ar' ? service.titleAr : service.titleEn,
          previousScreen: `service-details-${serviceId}`
        });
      }
    }
  };

  const handleCenterSelect = (centerId: number) => {
    const availableCenters = getServiceCentersForService(service);
    const center = availableCenters.find(c => c.id === centerId);
    
    if (center) {
      setShowCenterSelection(false);
      onNavigate('appointment-booking', {
        centerId: center.id,
        centerName: language === 'ar' ? center.nameAr : center.nameEn,
        centerAddress: language === 'ar' ? center.addressAr : center.addressEn,
        serviceName: language === 'ar' ? service.titleAr : service.titleEn,
        previousScreen: `service-details-${serviceId}`
      });
    }
  };

  const handleGiveFeedback = () => {
    onNavigate('service-feedback-survey', {
      serviceId: service.id,
      serviceName: language === 'ar' ? service.titleAr : service.titleEn
    });
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
              onClick={() => onNavigate('service-catalog')}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div>
              <h1 className="text-xl font-medium">{t.backToServices}</h1>
              <p className="text-white/80 text-sm">{language === 'ar' ? service.entityAr : service.entityEn}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Service Overview Card */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            {/* Status Badges */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
              <Badge className="bg-green-100 text-green-700 border-0 text-sm px-3 py-1 rounded-full">
                {t.available}
              </Badge>
              <Badge className={`border-0 text-sm px-3 py-1 rounded-full ${
                service.type === 'Digital' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {service.type === 'Digital' ? t.digital : t.incompleteDigital}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse mb-4">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {service.rating} ({service.reviews} {t.reviews})
              </span>
            </div>

            {/* Service Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {language === 'ar' ? service.titleAr : service.titleEn}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {language === 'ar' ? service.descriptionAr : service.descriptionEn}
            </p>

            {/* Time and Cost */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">{t.estimatedTime}</span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">
                    {service.timeText} {t.businessDays}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end rtl:items-start">
                <span className="text-xs text-gray-500 mb-1">{t.cost}</span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">
                    {service.cost === '0' ? (language === 'ar' ? 'مجاني' : 'Free') : `${service.cost} ${service.currency}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 rtl:space-x-reverse">
              <Button 
                className="flex-1 min-w-0 bg-primary hover:bg-accent text-white h-12 rounded-xl text-sm"
                onClick={handleApplyNow}
              >
                <span className="truncate">{service.type === 'Digital' ? t.applyNow : t.bookAppointment}</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 rtl:gap-reverse h-12 px-4 rounded-xl border-gray-200 flex-shrink-0 text-sm"
                onClick={handleGiveFeedback}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{t.giveFeedback}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Steps Section */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.steps}</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">{step.id}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Documents Section */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.requiredDocuments}</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 flex-1">{doc.title}</span>
                  {doc.required ? (
                    <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                      {t.required}
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                      {t.optional}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section - Only show for Incomplete Digital services */}
        {service.type === 'Incomplete Digital' && serviceCenter && (
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.contact}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'ar' ? serviceCenter.nameAr : serviceCenter.nameEn}
                    </p>
                    <p className="text-sm text-gray-600">{t.hours}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="w-5 h-5 text-primary" />
                  <p className="text-sm text-gray-700">
                    {language === 'ar' ? serviceCenter.addressAr : serviceCenter.addressEn}
                  </p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="w-5 h-5 text-primary" />
                  <p className="text-sm text-gray-700">{t.phone}</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="w-5 h-5 text-primary" />
                  <p className="text-sm text-gray-700">{t.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Service Center Selection Dialog */}
      <Dialog open={showCenterSelection} onOpenChange={setShowCenterSelection}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {language === 'ar' ? 'اختر مركز الخدمة' : 'Select Service Center'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-600">
              {language === 'ar' 
                ? 'هذه الخدمة متوفرة في عدة مراكز خدمات. يرجى اختيار المركز الذي تفضل زيارته:'
                : 'This service is available at multiple service centers. Please select your preferred center:'}
            </p>
            <div className="space-y-2">
              {getServiceCentersForService(service).map((center) => (
                <motion.div
                  key={center.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    onClick={() => handleCenterSelect(center.id)}
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {language === 'ar' ? center.nameAr : center.nameEn}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {language === 'ar' ? center.addressAr : center.addressEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
