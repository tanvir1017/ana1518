import React, { useState, useEffect } from 'react';
import { getAppointments, cancelAppointment, Appointment } from './utils/appointmentUtils';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Navigation,
  Phone,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  QrCode,
  Building2,
  Search,
  Heart,
  Car,
  Briefcase,
  Home,
  GraduationCap
} from 'lucide-react';
import { Input } from './ui/input';
import DataManager from './utils/dataManager';
import { toast } from 'sonner@2.0.3';

// Service Center Rating Component
interface ServiceCenterRatingProps {
  centerId: number;
  centerName: string;
  userEmail: string;
  language: 'en' | 'ar';
}

function ServiceCenterRating({ centerId, centerName, userEmail, language }: ServiceCenterRatingProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    // Load existing rating
    const existingRating = DataManager.getServiceCenterRating(userEmail, centerId);
    if (existingRating !== null) {
      setRating(existingRating);
    }
  }, [userEmail, centerId]);

  const handleRating = (value: number) => {
    setRating(value);
    DataManager.addServiceCenterRating(userEmail, centerId, centerName, value);
    
    const message = language === 'ar' 
      ? `شكراً لتقييمك! لقد قيمت المركز بـ ${value} نجوم`
      : `Thank you for your rating! You rated this center ${value} stars`;
    
    toast.success(message);
  };

  return (
    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-colors duration-150 ${
              (hoveredStar !== null ? star <= hoveredStar : rating !== null && star <= rating)
                ? 'text-[#F3BF24] fill-current'
                : 'text-gray-300'
            }`}
          />
        </motion.button>
      ))}
      {rating !== null && (
        <span className="text-sm text-gray-600 ml-2 rtl:ml-0 rtl:mr-2">
          ({rating}/5)
        </span>
      )}
    </div>
  );
}

interface ServiceCenterScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: 'en' | 'ar';
  refreshTrigger?: number;
  selectedCenterId?: number;
  userEmail: string;
}

export default function ServiceCenterScreen({ onNavigate, language, refreshTrigger, selectedCenterId, userEmail }: ServiceCenterScreenProps) {
  const [selectedCenter, setSelectedCenter] = useState<number | null>(selectedCenterId || 2); // Default to The Pearl Service Center
  const [activeTab, setActiveTab] = useState('entities');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Update selected center if prop changes
    if (selectedCenterId) {
      setSelectedCenter(selectedCenterId);
    }
  }, [selectedCenterId]);

  useEffect(() => {
    // Scroll to top when component mounts or when selected center changes
    window.scrollTo(0, 0);
  }, [selectedCenter]);

  useEffect(() => {
    // Load appointments when component mounts or when selected center changes
    const userAppointments = getAppointments(userEmail);
    setAppointments(userAppointments);
  }, [selectedCenter, refreshTrigger, userEmail]);

  // Also refresh appointments when tab changes to appointment
  useEffect(() => {
    if (activeTab === 'appointment') {
      const userAppointments = getAppointments(userEmail);
      setAppointments(userAppointments);
    }
  }, [activeTab, userEmail]);

  // Add window focus listener to refresh appointments when returning to page
  useEffect(() => {
    const handleFocus = () => {
      const userAppointments = getAppointments(userEmail);
      setAppointments(userAppointments);
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [userEmail]);

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟' : 'Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId, userEmail);
      // Refresh appointments
      const userAppointments = getAppointments(userEmail);
      setAppointments(userAppointments);
    }
  };

  const refreshAppointments = () => {
    const userAppointments = getAppointments(userEmail);
    setAppointments(userAppointments);
  };

  const texts = {
    en: {
      title: 'Service Centers',
      subtitle: 'Find Nearby Centers',
      entities: 'Entities',
      appointment: 'Appointment',
      performance: 'Performance',
      nearestCenter: 'Nearest Center',
      openNow: 'Open Now',
      closed: 'Closed',
      highTraffic: 'High Traffic',
      mediumTraffic: 'Medium Traffic',
      lowTraffic: 'Low Traffic',
      directions: 'Get Directions',
      callCenter: 'Call Center',
      bookAppointment: 'Book Appointment',
      generateToken: 'Generate Token',
      currentWait: 'Current Wait Time',
      avgSatisfaction: 'Avg. Satisfaction',
      totalVisitors: 'Total Visitors Today',
      resolutionRate: 'Resolution Rate',
      openSurveys: 'Open Surveys',
      distance: 'km away',
      estimatedWait: 'Estimated Wait',
      minutes: 'minutes',
      availableServices: 'Available Services',
      operatingHours: 'Operating Hours',
      gpsRequired: 'GPS Required',
      gpsDescription: 'Enable GPS to generate tokens when near the center',
      searchPlaceholder: 'Search service centers...',
      servicesOffered: 'Services Offered',
      noAppointments: 'No appointments scheduled',
      scheduleFirst: 'Schedule your first appointment',
      currentAppointments: 'Your Current Appointments'
    },
    ar: {
      title: 'مراكز الخدمات',
      subtitle: 'العثور على المراكز القريبة',
      entities: 'الجهات',
      appointment: 'الموعد',
      performance: 'الأداء',
      nearestCenter: 'أقرب مركز',
      openNow: 'مفتوح الآن',
      closed: 'مغلق',
      highTraffic: 'ازدحام عالي',
      mediumTraffic: 'ازدحام متوسط',
      lowTraffic: 'ازدحام منخفض',
      directions: 'الحصول على الاتجاهات',
      callCenter: 'اتصل بالمركز',
      bookAppointment: 'حجز موعد',
      generateToken: 'إنشاء رقم',
      currentWait: 'وقت الانتظار الحالي',
      avgSatisfaction: 'متوسط الرضا',
      totalVisitors: 'إجمالي الزوار اليوم',
      resolutionRate: 'معدل الحل',
      openSurveys: 'الاستطلاعات المفتوحة',
      distance: 'كم بعيداً',
      estimatedWait: 'وقت انتظار متوقع',
      minutes: 'دقيقة',
      availableServices: 'الخدمات المتاحة',
      operatingHours: 'ساعات العمل',
      gpsRequired: 'مطلوب GPS',
      gpsDescription: 'تفعيل GPS لإنشاء رقم عند الاقتراب من المركز',
      searchPlaceholder: 'البحث في مراكز الخدمات...',
      servicesOffered: 'الخدمات المقدمة',
      noAppointments: 'لا توجد مواعيد محددة',
      scheduleFirst: 'حدد موعدك الأول',
      currentAppointments: 'مواعيدك الحالية'
    }
  };

  const t = texts[language];

  const serviceCenters = [
    {
      id: 1,
      name: language === 'ar' ? 'مركز خدمات الريان' : 'Al Rayyan Service Center',
      address: language === 'ar' ? 'مدينة الريان، الدوحة' : 'Al Rayyan City, Doha',
      distance: 8.3,
      status: 'open',
      traffic: 'high',
      waitTime: 35,
      satisfaction: 4.5,
      phone: '+974 4000 4002',
      hours: 'Sunday-Thursday: 7:00 AM - 6:00 PM',
      entities: [
        {
          id: 1,
          name: language === 'ar' ? 'وزارة الداخلية' : 'Ministry of Interior',
          icon: Building2,
          services: [
            language === 'ar' ? 'تجديد بطاقة الهوية' : 'ID Card Renewal',
            language === 'ar' ? 'شهادة عدم محكومية' : 'Police Clearance',
            language === 'ar' ? 'خدمات الإقامة' : 'Residence Services',
            language === 'ar' ? 'تصاريح السفر' : 'Travel Permits'
          ]
        },
        {
          id: 2,
          name: language === 'ar' ? 'وزارة الصحة العامة' : 'Ministry of Public Health',
          icon: Heart,
          services: [
            language === 'ar' ? 'شهادة طبية' : 'Medical Certificate',
            language === 'ar' ? 'تصريح نقل جثمان' : 'Body Transfer Permit',
            language === 'ar' ? 'تسجيل الوفاة' : 'Death Registration'
          ]
        },
        {
          id: 3,
          name: language === 'ar' ? 'وزارة النقل' : 'Ministry of Transport',
          icon: Car,
          services: [
            language === 'ar' ? 'تجديد رخصة القيادة' : 'Driving License Renewal',
            language === 'ar' ? 'تسجيل المركبات' : 'Vehicle Registration',
            language === 'ar' ? 'نقل ملكية السيارة' : 'Vehicle Ownership Transfer'
          ]
        },
        {
          id: 4,
          name: language === 'ar' ? 'وزارة العدل' : 'Ministry of Justice',
          icon: Building2,
          services: [
            language === 'ar' ? 'توثيق العقود' : 'Contract Authentication',
            language === 'ar' ? 'شهادة ميراث' : 'Inheritance Certificate'
          ]
        },
        {
          id: 5,
          name: language === 'ar' ? 'وزارة التجارة' : 'Ministry of Commerce',
          icon: Briefcase,
          services: [
            language === 'ar' ? 'تسجيل الشركات' : 'Company Registration',
            language === 'ar' ? 'تراخيص تجارية' : 'Commercial Licenses'
          ]
        },
        {
          id: 6,
          name: language === 'ar' ? 'وزارة البلدية' : 'Ministry of Municipality',
          icon: Home,
          services: [
            language === 'ar' ? 'تسجيل العقارات' : 'Property Registration',
            language === 'ar' ? 'تراخيص البناء' : 'Building Permits'
          ]
        },
        {
          id: 7,
          name: language === 'ar' ? 'وزارة التعليم والتعليم العالي' : 'Ministry of Education and Higher Education',
          icon: GraduationCap,
          services: [
            language === 'ar' ? 'معادلة الشهادات' : 'Certificate Equivalency',
            language === 'ar' ? 'تسجيل المدارس' : 'School Registration'
          ]
        }
      ]
    },
    {
      id: 2,
      name: language === 'ar' ? 'مركز خدمات اللؤلؤة' : 'The Pearl Service Center',
      address: language === 'ar' ? 'جزيرة اللؤلؤة، الدوحة' : 'The Pearl Island, Doha',
      distance: 12.1,
      status: 'open',
      traffic: 'medium',
      waitTime: 18,
      satisfaction: 4.7,
      phone: '+974 4000 4003',
      hours: 'Sunday-Thursday: 7:00 AM - 6:00 PM',
      entities: [
        {
          id: 1,
          name: language === 'ar' ? 'وزارة الداخلية' : 'Ministry of Interior',
          icon: Building2,
          services: [
            language === 'ar' ? 'خدمات الإقامة' : 'Residence Services',
            language === 'ar' ? 'تجديد بطاقة الهوية' : 'ID Card Renewal',
            language === 'ar' ? 'شهادة عدم محكومية' : 'Police Clearance'
          ]
        },
        {
          id: 2,
          name: language === 'ar' ? 'وزارة البلدية' : 'Ministry of Municipality',
          icon: Home,
          services: [
            language === 'ar' ? 'تسجيل العقارات' : 'Property Registration',
            language === 'ar' ? 'تراخيص البناء' : 'Building Permits',
            language === 'ar' ? 'قروض الإسكان' : 'Housing Loans'
          ]
        },
        {
          id: 3,
          name: language === 'ar' ? 'وزارة التجارة' : 'Ministry of Commerce',
          icon: Briefcase,
          services: [
            language === 'ar' ? 'تسجيل الشركات' : 'Company Registration',
            language === 'ar' ? 'تراخيص تجارية' : 'Commercial Licenses'
          ]
        },
        {
          id: 4,
          name: language === 'ar' ? 'وزارة النقل' : 'Ministry of Transport',
          icon: Car,
          services: [
            language === 'ar' ? 'تسجيل المركبات' : 'Vehicle Registration',
            language === 'ar' ? 'رخص القيادة الدولية' : 'International Driving Licenses'
          ]
        },
        {
          id: 5,
          name: language === 'ar' ? 'وزارة الصحة العامة' : 'Ministry of Public Health',
          icon: Heart,
          services: [
            language === 'ar' ? 'شهادة طبية' : 'Medical Certificate',
            language === 'ar' ? 'تصاريح صحية' : 'Health Permits'
          ]
        },
        {
          id: 6,
          name: language === 'ar' ? 'وزارة العدل' : 'Ministry of Justice',
          icon: Building2,
          services: [
            language === 'ar' ? 'توثيق العقود' : 'Contract Authentication'
          ]
        },
        {
          id: 7,
          name: language === 'ar' ? 'وزارة التعليم والتعليم العالي' : 'Ministry of Education and Higher Education',
          icon: GraduationCap,
          services: [
            language === 'ar' ? 'معادلة الشهادات' : 'Certificate Equivalency'
          ]
        },
        {
          id: 8,
          name: language === 'ar' ? 'وزارة المالية' : 'Ministry of Finance',
          icon: Building2,
          services: [
            language === 'ar' ? 'الخدمات الضريبية' : 'Tax Services'
          ]
        }
      ]
    },
    {
      id: 3,
      name: language === 'ar' ? 'مركز خدمات الخور' : 'Al Khor Service Center',
      address: language === 'ar' ? 'مدينة الخور' : 'Al Khor City',
      distance: 45.2,
      status: 'open',
      traffic: 'low',
      waitTime: 5,
      satisfaction: 4.3,
      phone: '+974 4000 4004',
      hours: 'Sunday-Thursday: 7:00 AM - 6:00 PM',
      entities: [
        {
          id: 1,
          name: language === 'ar' ? 'وزارة النقل' : 'Ministry of Transport',
          icon: Car,
          services: [
            language === 'ar' ? 'تجديد رخصة القيادة' : 'Driving License Renewal',
            language === 'ar' ? 'تسجيل المركبات' : 'Vehicle Registration',
            language === 'ar' ? 'فحص المركبات' : 'Vehicle Inspection'
          ]
        },
        {
          id: 2,
          name: language === 'ar' ? 'وزارة الداخلية' : 'Ministry of Interior',
          icon: Building2,
          services: [
            language === 'ar' ? 'تجديد بطاقة الهوية' : 'ID Card Renewal',
            language === 'ar' ? 'خدمات الإقامة' : 'Residence Services'
          ]
        },
        {
          id: 3,
          name: language === 'ar' ? 'وزارة البلدية' : 'Ministry of Municipality',
          icon: Building2,
          services: [
            language === 'ar' ? 'تراخيص البناء' : 'Building Permits',
            language === 'ar' ? 'رخص الأعمال' : 'Business Permits'
          ]
        },
        {
          id: 4,
          name: language === 'ar' ? 'وزارة الصحة العامة' : 'Ministry of Public Health',
          icon: Heart,
          services: [
            language === 'ar' ? 'شهادة طبية' : 'Medical Certificate'
          ]
        },
        {
          id: 5,
          name: language === 'ar' ? 'وزارة التعليم والتعليم العالي' : 'Ministry of Education and Higher Education',
          icon: GraduationCap,
          services: [
            language === 'ar' ? 'خدمات المدارس' : 'School Services'
          ]
        },
        {
          id: 6,
          name: language === 'ar' ? 'وزارة التجارة' : 'Ministry of Commerce',
          icon: Briefcase,
          services: [
            language === 'ar' ? 'تراخيص تجارية' : 'Commercial Licenses'
          ]
        },
        {
          id: 7,
          name: language === 'ar' ? 'وزارة العدل' : 'Ministry of Justice',
          icon: Building2,
          services: [
            language === 'ar' ? 'توثيق المستندات' : 'Document Authentication'
          ]
        },
        {
          id: 8,
          name: language === 'ar' ? 'وزارة البلدية' : 'Ministry of Municipality',
          icon: Home,
          services: [
            language === 'ar' ? 'خدمات الإسكان' : 'Housing Services'
          ]
        },
        {
          id: 9,
          name: language === 'ar' ? 'وزارة المالية' : 'Ministry of Finance',
          icon: Building2,
          services: [
            language === 'ar' ? 'الخدمات الضريبية' : 'Tax Services'
          ]
        }
      ]
    }
  ];

  const performanceData = {
    todayVisitors: 1247,
    resolutionRate: 94,
    avgSatisfaction: 4.3,
    openSurveys: 3
  };

  if (selectedCenter) {
    const center = serviceCenters.find(c => c.id === selectedCenter);
    if (!center) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('service-centers')}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium">{center.name}</h1>
              <p className="text-white/80 text-sm">{center.address}</p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          {/* Center Status */}
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Badge className={`${
                    center.status === 'open' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  } border-0`}>
                    {center.status === 'open' ? t.openNow : t.closed}
                  </Badge>
                  <Badge className={`${
                    center.traffic === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : center.traffic === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  } border-0`}>
                    {center.traffic === 'high' 
                      ? t.highTraffic 
                      : center.traffic === 'medium' 
                      ? t.mediumTraffic 
                      : t.lowTraffic
                    }
                  </Badge>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Star className="w-4 h-4 text-[#F3BF24] fill-current" />
                  <span className="text-sm font-medium">{center.satisfaction}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">{t.estimatedWait}</p>
                  <p className="font-medium">{center.waitTime} {t.minutes}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">Distance</p>
                  <p className="font-medium">{center.distance} {t.distance}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-accent text-white h-12">
                  <Navigation className="w-4 h-4 mr-2" />
                  {t.directions}
                </Button>
                <Button 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white h-12" 
                  variant="outline"
                  onClick={() => onNavigate('appointment-booking', { centerId: center.id, centerName: center.name, centerAddress: center.address })}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.bookAppointment}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generate Token */}
          <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-2">{t.generateToken}</h3>
                  <p className="text-white/80 text-sm">{t.gpsDescription}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={center.distance > 0.1}
                  className="bg-white/20 p-3 rounded-xl disabled:opacity-50"
                >
                  <QrCode className="w-6 h-6" />
                </motion.button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl border shadow-sm h-12 mb-6">
              <TabsTrigger value="entities" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium">
                {t.entities}
              </TabsTrigger>
              <TabsTrigger value="appointment" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium">
                {t.appointment}
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium">
                {t.performance}
              </TabsTrigger>
            </TabsList>



            {/* Entities */}
            <TabsContent value="entities" className="mt-6">
              <div className="space-y-4">
                {center.entities.map((entity) => (
                  <Card key={entity.id} className="bg-white shadow-md rounded-2xl border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                          <entity.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{entity.name}</h4>
                          <p className="text-sm text-gray-500">{entity.services.length} {t.servicesOffered}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {entity.services.map((service, index) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Appointment */}
            <TabsContent value="appointment" className="mt-6 space-y-4">
              {/* Book New Appointment */}
              <Card className="bg-white shadow-md rounded-2xl border-0">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-medium text-gray-800 mb-2">
                    {language === 'ar' ? 'حجز موعد جديد' : 'Book New Appointment'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {language === 'ar' 
                      ? 'احجز موعداً مسبقاً لتجنب الانتظار' 
                      : 'Book an appointment in advance to avoid waiting'
                    }
                  </p>
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-white"
                    onClick={() => onNavigate('appointment-booking', { centerId: center.id, centerName: center.name, centerAddress: center.address })}
                  >
                    {t.bookAppointment}
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Appointments */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">
                  {t.currentAppointments}
                </h4>
                
                {appointments.filter(apt => {
                  // Only show confirmed appointments
                  if (apt.status !== 'confirmed') return false;
                  
                  // More flexible matching to handle different naming formats
                  const aptLocation = apt.location.toLowerCase();
                  const centerName = center.name.toLowerCase();
                  
                  // Direct match
                  if (aptLocation === centerName) return true;
                  
                  // Contains check (both ways)
                  if (aptLocation.includes(centerName) || centerName.includes(aptLocation)) return true;
                  
                  // Check for key parts of the center name
                  const centerKeywords = centerName.split(' ').filter(word => word.length > 2);
                  const aptKeywords = aptLocation.split(' ').filter(word => word.length > 2);
                  
                  // If any significant keyword matches
                  for (const keyword of centerKeywords) {
                    if (aptKeywords.some(aptWord => aptWord.includes(keyword) || keyword.includes(aptWord))) {
                      return true;
                    }
                  }
                  
                  return false;
                }).length === 0 ? (
                  <Card className="bg-white shadow-md rounded-2xl border-0">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="font-medium text-gray-600 mb-2">{t.noAppointments}</h4>
                      <p className="text-gray-500 text-sm mb-4">
                        {t.scheduleFirst}
                      </p>
                      <Button 
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-white"
                        onClick={() => onNavigate('appointment-booking', { centerId: center.id, centerName: center.name, centerAddress: center.address })}
                      >
                        {t.bookAppointment}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  appointments
                    .filter(apt => {
                      // Only show confirmed appointments
                      if (apt.status !== 'confirmed') return false;
                      
                      // More flexible matching to handle different naming formats
                      const aptLocation = apt.location.toLowerCase();
                      const centerName = center.name.toLowerCase();
                      
                      // Direct match
                      if (aptLocation === centerName) return true;
                      
                      // Contains check (both ways)
                      if (aptLocation.includes(centerName) || centerName.includes(aptLocation)) return true;
                      
                      // Check for key parts of the center name
                      const centerKeywords = centerName.split(' ').filter(word => word.length > 2);
                      const aptKeywords = aptLocation.split(' ').filter(word => word.length > 2);
                      
                      // If any significant keyword matches
                      for (const keyword of centerKeywords) {
                        if (aptKeywords.some(aptWord => aptWord.includes(keyword) || keyword.includes(aptWord))) {
                          return true;
                        }
                      }
                      
                      return false;
                    })
                    .map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl border shadow-md"
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 mb-1">
                                {appointment.service}
                              </h4>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span>{appointment.date}</span>
                                <Clock className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                            <Badge className={`${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            } border-0`}>
                              {appointment.status === 'confirmed' 
                                ? (language === 'ar' ? 'مؤكد' : 'Confirmed')
                                : appointment.status === 'cancelled'
                                ? (language === 'ar' ? 'ملغي' : 'Cancelled') 
                                : (language === 'ar' ? 'معلق' : 'Pending')
                              }
                            </Badge>
                          </div>
                          
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                              onClick={() => onNavigate('appointment-details', { appointmentId: appointment.id })}
                            >
                              {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </Button>
                            {appointment.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                {language === 'ar' ? 'إلغاء' : 'Cancel'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </div>
            </TabsContent>

            {/* Performance Dashboard */}
            <TabsContent value="performance" className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-md rounded-2xl border-0">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-medium text-gray-800">{performanceData.todayVisitors}</p>
                    <p className="text-xs text-gray-500">{t.totalVisitors}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-md rounded-2xl border-0">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-medium text-gray-800">{performanceData.resolutionRate}%</p>
                    <p className="text-xs text-gray-500">{t.resolutionRate}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white shadow-md rounded-2xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">{t.avgSatisfaction}</h3>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="w-4 h-4 text-[#F3BF24] fill-current" />
                      <span className="font-medium">{performanceData.avgSatisfaction}</span>
                    </div>
                  </div>
                  <Progress value={performanceData.avgSatisfaction * 20} className="h-2" />
                </CardContent>
              </Card>

              {/* User CSAT Rating */}
              <Card className="bg-white shadow-md rounded-2xl border-0">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    {language === 'ar' ? 'قيّم هذا المركز' : 'Rate This Service Center'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === 'ar' 
                      ? 'شارك تجربتك مع هذا المركز (يمكنك تحديث تقييمك لاحقاً)' 
                      : 'Share your experience with this center (you can update your rating later)'}
                  </p>
                  <ServiceCenterRating 
                    centerId={center.id}
                    centerName={center.name}
                    userEmail={userEmail}
                    language={language}
                  />
                </CardContent>
              </Card>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="bg-white shadow-md rounded-2xl border-0 cursor-pointer" 
                  onClick={() => onNavigate('e-participation')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{t.openSurveys}</h3>
                        <p className="text-gray-600 text-sm">
                          {language === 'ar' 
                            ? 'استطلاعات رضا العملاء المفتوحة' 
                            : 'Open customer satisfaction surveys'
                          }
                        </p>
                        <p className="text-primary text-xs mt-1">
                          {language === 'ar' ? 'انقر للمشاركة' : 'Click to participate'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge className="bg-accent text-white border-0">
                          {performanceData.openSurveys}
                        </Badge>
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">{t.subtitle}</p>
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
        {/* Qatar Map with Service Centers */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6 overflow-hidden">
          <div className="h-56 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative">
            {/* Qatar Map Shape (Simplified) */}
            <svg 
              viewBox="0 0 200 160" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Qatar Peninsula Outline */}
              <path
                d="M100 20 L120 25 L140 35 L155 50 L160 70 L158 90 L150 110 L140 125 L120 135 L100 140 L85 135 L70 125 L60 110 L55 90 L60 70 L70 50 L85 35 L100 20 Z"
                fill="rgba(70, 139, 164, 0.1)"
                stroke="rgba(70, 139, 164, 0.3)"
                strokeWidth="1"
              />
              
              {/* Water around Qatar */}
              <defs>
                <pattern id="water" patternUnits="userSpaceOnUse" width="20" height="20">
                  <circle cx="10" cy="10" r="1" fill="rgba(6, 111, 113, 0.1)" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="200" height="160" fill="url(#water)" opacity="0.3" />
            </svg>

            {/* Service Center Locations */}
            <div className="absolute inset-0">
              {/* Doha Main Center - Central */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {language === 'ar' ? 'الدوحة الرئيسي' : 'Doha Main'}
                  </div>
                </div>
              </div>

              {/* Al Rayyan Center - West */}
              <div className="absolute top-20 left-8">
                <div className="relative">
                  <div className="w-6 h-6 bg-accent rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                    <Building2 className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {language === 'ar' ? 'الريان' : 'Al Rayyan'}
                  </div>
                </div>
              </div>

              {/* Al Wakrah Center - South */}
              <div className="absolute bottom-16 right-12">
                <div className="relative">
                  <div className="w-6 h-6 bg-destructive rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                    <Building2 className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-destructive text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {language === 'ar' ? 'الوكرة' : 'Al Wakrah'}
                  </div>
                </div>
              </div>

              {/* User Location Indicator */}
              <div className="absolute top-14 left-20">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-ping"></div>
                <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>

            {/* Map Title */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                <h3 className="text-sm font-medium text-gray-800">
                  {language === 'ar' ? 'مراكز الخدمات في قطر' : 'Service Centers in Qatar'}
                </h3>
                <p className="text-xs text-gray-600">
                  {language === 'ar' ? '7 مراكز متاحة' : '7 centers available'}
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {language === 'ar' ? 'موقعك' : 'Your Location'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>



        {/* Service Centers List */}
        <div className="space-y-4">
          {serviceCenters.filter(center => 
            center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            center.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
          ).map((center) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white shadow-md rounded-2xl border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <Badge className={`${
                          center.status === 'open' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        } border-0`}>
                          {center.status === 'open' ? t.openNow : t.closed}
                        </Badge>
                        <Badge className={`${
                          center.traffic === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : center.traffic === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        } border-0`}>
                          {center.traffic === 'high' 
                            ? t.highTraffic 
                            : center.traffic === 'medium' 
                            ? t.mediumTraffic 
                            : t.lowTraffic
                          }
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium text-gray-800 mb-1">
                        {center.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {center.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse mb-1">
                        <Star className="w-3 h-3 text-[#F3BF24] fill-current" />
                        <span className="text-xs">{center.satisfaction}</span>
                      </div>
                      <p className="text-xs text-gray-500">{center.distance} {t.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {center.waitTime} {t.minutes}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {center.services.length} services
                      </div>
                    </div>
                    
                    <Button 
                      size="sm"
                      onClick={() => setSelectedCenter(center.id)}
                      className="bg-primary hover:bg-accent text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}