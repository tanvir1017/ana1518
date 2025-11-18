import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Star,
  Clock,
  Building2,
  Coins,
  Globe,
  GraduationCap,
  Heart,
  Car,
  Home,
  Briefcase
} from 'lucide-react';

interface ServiceCatalogScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function ServiceCatalogScreen({ onNavigate, language }: ServiceCatalogScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const texts = {
    en: {
      title: 'Service Catalog',
      subtitle: 'Discover Government Services',
      searchPlaceholder: 'Search services...',
      allServices: 'All Services',
      education: 'Education',
      health: 'Health',
      transport: 'Transport',
      housing: 'Housing',
      business: 'Business',
      available: 'available',
      applyNow: 'Apply Now',
      businessDays: 'business days',
      renewLicense: 'Driving License Renewal',
      ministryInterior: 'Ministry of Interior',
      renewDescription: 'Renew driving license for citizens and residents of Qatar',
      policeClearance: 'Police Clearance Certificate',
      policeDescription: 'Issue police clearance certificate for citizens and residents',
      
      // Housing Services
      buildingPermit: 'Building Permit',
      buildingPermitDesc: 'Apply for residential or commercial building permits',
      propertyRegistration: 'Property Registration',
      propertyRegistrationDesc: 'Register property ownership and transfer documents',
      housingLoan: 'Housing Loan Application',
      housingLoanDesc: 'Apply for government housing loan for citizens',
      titleDeed: 'Title Deed Issuance',
      titleDeedDesc: 'Issue official property title deed certificates',
      utilitiesConnection: 'Utilities Connection',
      utilitiesConnectionDesc: 'Connect electricity, water and sewage services',
      
      // Business Services  
      businessLicense: 'Business License',
      businessLicenseDesc: 'Apply for commercial business license registration',
      taxCertificate: 'Tax Clearance Certificate',
      taxCertificateDesc: 'Obtain tax compliance certificate for businesses',
      workPermit: 'Work Permit',
      workPermitDesc: 'Apply for employee work permit and visa',
      trademarkRegistration: 'Trademark Registration',
      trademarkRegistrationDesc: 'Register intellectual property and trademarks',
      companyRegistration: 'Company Registration',
      companyRegistrationDesc: 'Register new company with commercial registry',
      industrialLicense: 'Industrial License',
      industrialLicenseDesc: 'License for industrial and manufacturing activities',
      
      // Health Services
      healthCard: 'Health Card Renewal',
      healthCardDesc: 'Renew health insurance card for medical services',
      medicalLicense: 'Medical License',
      medicalLicenseDesc: 'Professional license for medical practitioners',
      pharmacyLicense: 'Pharmacy License',
      pharmacyLicenseDesc: 'License to operate pharmacy or medical facility',
      vaccinationCert: 'Vaccination Certificate',
      vaccinationCertDesc: 'Official vaccination record and certificates',
      medicalReport: 'Medical Fitness Report',
      medicalReportDesc: 'Medical fitness certificate for employment',
      
      // Education Services
      degreeAttestation: 'Degree Attestation',
      degreeAttestationDesc: 'Authenticate educational certificates and degrees',
      schoolEnrollment: 'School Enrollment',
      schoolEnrollmentDesc: 'Enroll children in public and private schools',
      
      // Government Entities
      ministryHousing: 'Ministry of Municipality',
      ministryBusiness: 'Ministry of Commerce',
      ministryHealth: 'Ministry of Health',
      ministryEducation: 'Ministry of Education'
    },
    ar: {
      title: 'دليل الخدمات',
      subtitle: 'اكتشف الخدمات الحكومية',
      searchPlaceholder: 'البحث في الخدمات...',
      allServices: 'جميع الخدمات',
      education: 'التعليم',
      health: 'الصحة',
      transport: 'النقل',
      housing: 'الإسكان',
      business: 'الأعمال',
      available: 'متاح',
      applyNow: 'اطلب الآن',
      businessDays: 'أيام عمل',
      renewLicense: 'تجديد رخصة القيادة',
      ministryInterior: 'وزارة الداخلية',
      renewDescription: 'تجديد رخصة القيادة للمواطنين والمقيمين في قطر',
      policeClearance: 'شهادة السجل العدلي',
      policeDescription: 'إصدار شهادة السجل العدلي للمواطنين والمقيمين',
      
      // Housing Services
      buildingPermit: 'رخصة البناء',
      buildingPermitDesc: 'طلب رخصة بناء سكني أو تجاري',
      propertyRegistration: 'تسجيل العقار',
      propertyRegistrationDesc: 'تسجيل ملكية العقار ووثائق النقل',
      housingLoan: 'طلب قرض إسكاني',
      housingLoanDesc: 'طلب قرض إسكاني حكومي للمواطنين',
      titleDeed: 'إصدار سند الملكية',
      titleDeedDesc: 'إصدار شهادة سند الملكية الرسمية',
      utilitiesConnection: 'توصيل المرافق',
      utilitiesConnectionDesc: 'توصيل خدمات الكهرباء والماء والصرف الصحي',
      
      // Business Services
      businessLicense: 'رخصة تجارية',
      businessLicenseDesc: 'طلب تسجيل رخصة تجارية للأعمال',
      taxCertificate: 'شهادة خلو طرف ضريبي',
      taxCertificateDesc: 'الحصول على شهادة الامتثال الضريبي للشركات',
      workPermit: 'تصريح عمل',
      workPermitDesc: 'طلب تصريح عمل وتأشيرة للموظفين',
      trademarkRegistration: 'تسجيل العلامة التجارية',
      trademarkRegistrationDesc: 'تسجيل الملكية الفكرية والعلامات التجارية',
      companyRegistration: 'تسجيل شركة',
      companyRegistrationDesc: 'تسجيل شركة جديدة بالسجل التجاري',
      industrialLicense: 'رخصة صناعية',
      industrialLicenseDesc: 'رخصة للأنشطة الصناعية والتصنيعية',
      
      // Health Services
      healthCard: 'تجديد البطاقة الصحية',
      healthCardDesc: 'تجديد بطاقة التأمين الصحي للخدمات الطبية',
      medicalLicense: 'رخصة طبية',
      medicalLicenseDesc: 'رخصة مهنية للممارسين الطبيين',
      pharmacyLicense: 'رخصة صيدلية',
      pharmacyLicenseDesc: 'رخصة لتشغيل صيدلية أو منشأة طبية',
      vaccinationCert: 'شهادة التطعيم',
      vaccinationCertDesc: 'سجل التطعيم الرسمي والشهادات',
      medicalReport: 'تقرير اللياقة الطبية',
      medicalReportDesc: 'شهادة اللياقة الطبية للتوظيف',
      
      // Education Services
      degreeAttestation: 'توثيق الشهادة',
      degreeAttestationDesc: 'توثيق الشهادات والدرجات التعليمية',
      schoolEnrollment: 'تسجيل المدرسة',
      schoolEnrollmentDesc: 'تسجيل الأطفال في المدارس العامة والخاصة',
      
      // Government Entities
      ministryHousing: 'وزارة البلدية',
      ministryBusiness: 'وزارة التجارة',
      ministryHealth: 'وزارة الصحة',
      ministryEducation: 'وزارة التعليم'
    }
  };

  const t = texts[language];

  const categories = [
    { id: 'all', name: t.allServices, count: 20, icon: Globe },
    { id: 'education', name: t.education, count: 2, icon: GraduationCap },
    { id: 'health', name: t.health, count: 5, icon: Heart },
    { id: 'transport', name: t.transport, count: 2, icon: Car },
    { id: 'housing', name: t.housing, count: 5, icon: Home },
    { id: 'business', name: t.business, count: 6, icon: Briefcase }
  ];

  const services = [
    // Transport Services
    {
      id: 1,
      title: t.renewLicense,
      entity: t.ministryInterior,
      description: t.renewDescription,
      rating: 4.5,
      reviews: 324,
      timeText: '2-3',
      timeUnit: t.businessDays,
      cost: '200',
      currency: 'QAR',
      category: 'transport'
    },
    {
      id: 2,
      title: t.policeClearance,
      entity: t.ministryInterior,
      description: t.policeDescription,
      rating: 4.3,
      reviews: 189,
      timeText: '2-3',
      timeUnit: t.businessDays,
      cost: '200',
      currency: 'QAR',
      category: 'transport'
    },
    
    // Housing Services
    {
      id: 3,
      title: t.buildingPermit,
      entity: t.ministryHousing,
      description: t.buildingPermitDesc,
      rating: 4.2,
      reviews: 156,
      timeText: '7-10',
      timeUnit: t.businessDays,
      cost: '500',
      currency: 'QAR',
      category: 'housing'
    },
    {
      id: 4,
      title: t.propertyRegistration,
      entity: t.ministryHousing,
      description: t.propertyRegistrationDesc,
      rating: 4.4,
      reviews: 203,
      timeText: '3-5',
      timeUnit: t.businessDays,
      cost: '300',
      currency: 'QAR',
      category: 'housing'
    },
    {
      id: 5,
      title: t.housingLoan,
      entity: t.ministryHousing,
      description: t.housingLoanDesc,
      rating: 4.0,
      reviews: 89,
      timeText: '15-20',
      timeUnit: t.businessDays,
      cost: '100',
      currency: 'QAR',
      category: 'housing'
    },
    {
      id: 6,
      title: t.titleDeed,
      entity: t.ministryHousing,
      description: t.titleDeedDesc,
      rating: 4.6,
      reviews: 298,
      timeText: '5-7',
      timeUnit: t.businessDays,
      cost: '250',
      currency: 'QAR',
      category: 'housing'
    },
    {
      id: 7,
      title: t.utilitiesConnection,
      entity: t.ministryHousing,
      description: t.utilitiesConnectionDesc,
      rating: 4.1,
      reviews: 167,
      timeText: '3-5',
      timeUnit: t.businessDays,
      cost: '150',
      currency: 'QAR',
      category: 'housing'
    },
    
    // Business Services
    {
      id: 8,
      title: t.businessLicense,
      entity: t.ministryBusiness,
      description: t.businessLicenseDesc,
      rating: 4.3,
      reviews: 412,
      timeText: '5-7',
      timeUnit: t.businessDays,
      cost: '1000',
      currency: 'QAR',
      category: 'business'
    },
    {
      id: 9,
      title: t.taxCertificate,
      entity: t.ministryBusiness,
      description: t.taxCertificateDesc,
      rating: 4.0,
      reviews: 234,
      timeText: '2-3',
      timeUnit: t.businessDays,
      cost: '50',
      currency: 'QAR',
      category: 'business'
    },
    {
      id: 10,
      title: t.workPermit,
      entity: t.ministryInterior,
      description: t.workPermitDesc,
      rating: 4.2,
      reviews: 567,
      timeText: '7-10',
      timeUnit: t.businessDays,
      cost: '500',
      currency: 'QAR',
      category: 'business'
    },
    {
      id: 11,
      title: t.trademarkRegistration,
      entity: t.ministryBusiness,
      description: t.trademarkRegistrationDesc,
      rating: 4.4,
      reviews: 123,
      timeText: '10-15',
      timeUnit: t.businessDays,
      cost: '750',
      currency: 'QAR',
      category: 'business'
    },
    {
      id: 12,
      title: t.companyRegistration,
      entity: t.ministryBusiness,
      description: t.companyRegistrationDesc,
      rating: 4.1,
      reviews: 345,
      timeText: '5-7',
      timeUnit: t.businessDays,
      cost: '2000',
      currency: 'QAR',
      category: 'business'
    },
    {
      id: 13,
      title: t.industrialLicense,
      entity: t.ministryBusiness,
      description: t.industrialLicenseDesc,
      rating: 4.0,
      reviews: 87,
      timeText: '15-20',
      timeUnit: t.businessDays,
      cost: '3000',
      currency: 'QAR',
      category: 'business'
    },
    
    // Health Services
    {
      id: 14,
      title: t.healthCard,
      entity: t.ministryHealth,
      description: t.healthCardDesc,
      rating: 4.5,
      reviews: 678,
      timeText: '1-2',
      timeUnit: t.businessDays,
      cost: '50',
      currency: 'QAR',
      category: 'health'
    },
    {
      id: 15,
      title: t.medicalLicense,
      entity: t.ministryHealth,
      description: t.medicalLicenseDesc,
      rating: 4.2,
      reviews: 134,
      timeText: '10-15',
      timeUnit: t.businessDays,
      cost: '1500',
      currency: 'QAR',
      category: 'health'
    },
    {
      id: 16,
      title: t.pharmacyLicense,
      entity: t.ministryHealth,
      description: t.pharmacyLicenseDesc,
      rating: 4.1,
      reviews: 98,
      timeText: '15-20',
      timeUnit: t.businessDays,
      cost: '2500',
      currency: 'QAR',
      category: 'health'
    },
    {
      id: 17,
      title: t.vaccinationCert,
      entity: t.ministryHealth,
      description: t.vaccinationCertDesc,
      rating: 4.7,
      reviews: 445,
      timeText: '1',
      timeUnit: t.businessDays,
      cost: '25',
      currency: 'QAR',
      category: 'health'
    },
    {
      id: 18,
      title: t.medicalReport,
      entity: t.ministryHealth,
      description: t.medicalReportDesc,
      rating: 4.3,
      reviews: 312,
      timeText: '2-3',
      timeUnit: t.businessDays,
      cost: '100',
      currency: 'QAR',
      category: 'health'
    },
    
    // Education Services
    {
      id: 19,
      title: t.degreeAttestation,
      entity: t.ministryEducation,
      description: t.degreeAttestationDesc,
      rating: 4.2,
      reviews: 267,
      timeText: '5-7',
      timeUnit: t.businessDays,
      cost: '150',
      currency: 'QAR',
      category: 'education'
    },
    {
      id: 20,
      title: t.schoolEnrollment,
      entity: t.ministryEducation,
      description: t.schoolEnrollmentDesc,
      rating: 4.4,
      reviews: 189,
      timeText: '3-5',
      timeUnit: t.businessDays,
      cost: '0',
      currency: 'QAR',
      category: 'education'
    }
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = searchQuery === '' || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Following E-Participation theme */}
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
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 rtl:pl-3 rtl:pr-10 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Category Cards - Following the design pattern */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`cursor-pointer p-4 rounded-xl transition-all duration-200 text-center ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                      selectedCategory === category.id ? 'bg-white/20' : 'bg-primary/10'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        selectedCategory === category.id ? 'text-white' : 'text-primary'
                      }`} />
                    </div>
                    <div className={`font-medium text-xs mb-1 ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </div>
                    <div className={`text-lg font-semibold ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                    }`}>
                      {category.count}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  {/* Status and Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Badge className="bg-green-100 text-green-700 border-0 text-sm px-3 py-1 rounded-full">
                        {t.available}
                      </Badge>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {service.rating} ({service.reviews} {language === 'ar' ? 'تقييم' : 'reviews'})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Time and Cost Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">
                        {language === 'ar' ? 'الوقت المقدر' : 'Estimated Time'}
                      </span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">
                          {service.timeText} {service.timeUnit}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end rtl:items-start">
                      <span className="text-xs text-gray-500 mb-1">
                        {language === 'ar' ? 'التكلفة' : 'Cost'}
                      </span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Coins className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">
                          {service.cost} {service.currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-accent text-white h-11 rounded-xl shadow-sm"
                    onClick={() => onNavigate(`service-details-${service.id}`)}
                  >
                    {t.applyNow}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}