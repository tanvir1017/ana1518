import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star,
  Navigation,
  Phone,
  Calendar,
  Search,
  Filter,
  Building2
} from 'lucide-react';

interface ServiceCentersScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: 'en' | 'ar';
}

export default function ServiceCentersScreen({ onNavigate, language }: ServiceCentersScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const texts = {
    en: {
      title: 'Service Centers',
      subtitle: 'Find Nearby Centers',
      search: 'Search centers...',
      nearestCenter: 'Nearest Center',
      openNow: 'Open Now',
      closed: 'Closed',
      highTraffic: 'High Traffic',
      mediumTraffic: 'Medium Traffic',
      lowTraffic: 'Low Traffic',
      directions: 'Get Directions',
      callCenter: 'Call Center',
      bookAppointment: 'Book Appointment',
      viewCenter: 'View Center',
      distance: 'km away',
      estimatedWait: 'Estimated Wait',
      minutes: 'minutes',
      operatingHours: 'Operating Hours'
    },
    ar: {
      title: 'مراكز الخدمات',
      subtitle: 'العثور على المراكز القريبة',
      search: 'البحث في المراكز...',
      nearestCenter: 'أقرب مركز',
      openNow: 'مفتوح الآن',
      closed: 'مغلق',
      highTraffic: 'ازدحام عالي',
      mediumTraffic: 'ازدحام متوسط',
      lowTraffic: 'ازدحام منخفض',
      directions: 'الحصول على الاتجاهات',
      callCenter: 'اتصل بالمركز',
      bookAppointment: 'حجز موعد',
      viewCenter: 'عرض المركز',
      distance: 'كم بعيداً',
      estimatedWait: 'وقت انتظار متوقع',
      minutes: 'دقيقة',
      operatingHours: 'ساعات العمل'
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
      hours: '7:00 AM - 10:00 PM',
      services: [
        language === 'ar' ? 'تسجيل المواليد' : 'Birth Registration',
        language === 'ar' ? 'تجديد بطاقة الهوية' : 'ID Card Renewal',
        language === 'ar' ? 'خدمات الإقامة' : 'Residence Services'
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
      hours: '8:00 AM - 8:00 PM',
      services: [
        language === 'ar' ? 'خدمات الإقامة' : 'Residence Services',
        language === 'ar' ? 'تسجيل العقارات' : 'Property Registration'
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
      hours: '7:00 AM - 3:00 PM',
      services: [
        language === 'ar' ? 'خدمات المرور' : 'Traffic Services',
        language === 'ar' ? 'تجديد بطاقة الهوية' : 'ID Card Renewal'
      ]
    },
    {
      id: 4,
      name: language === 'ar' ? 'مركز خدمات الوكرة' : 'Al Wakkra Service Center',
      address: language === 'ar' ? 'مدينة الوكرة' : 'Al Wakkra City',
      distance: 15.7,
      status: 'closed',
      traffic: 'low',
      waitTime: 0,
      satisfaction: 4.1,
      phone: '+974 4000 4005',
      hours: '7:00 AM - 10:00 PM',
      services: [
        language === 'ar' ? 'خدمات المرور' : 'Traffic Services',
        language === 'ar' ? 'خدمات الأعمال' : 'Business Services'
      ]
    },
    {
      id: 5,
      name: language === 'ar' ? 'مركز خدمات الهلال' : 'Al Hilal Service Center',
      address: language === 'ar' ? 'منطقة الهلال' : 'Al Hilal Area',
      distance: 22.3,
      status: 'open',
      traffic: 'high',
      waitTime: 32,
      satisfaction: 4.0,
      phone: '+974 4000 4006',
      hours: '7:00 AM - 2:00 PM',
      services: [
        language === 'ar' ? 'خدمات المرور' : 'Traffic Services',
        language === 'ar' ? 'شهادة عدم محكومية' : 'Police Clearance'
      ]
    },
    {
      id: 6,
      name: language === 'ar' ? 'مركز خدمات روضة الحمامة' : 'Rawdat Al Hamamma Service Center',
      address: language === 'ar' ? 'روضة الحمامة' : 'Rawdat Al Hamamma',
      distance: 35.8,
      status: 'open',
      traffic: 'low',
      waitTime: 10,
      satisfaction: 4.4,
      phone: '+974 4000 4007',
      hours: '7:00 AM - 3:00 PM',
      services: [
        language === 'ar' ? 'تسجيل المواليد' : 'Birth Registration',
        language === 'ar' ? 'خدمات الإقامة' : 'Residence Services'
      ]
    },
    {
      id: 7,
      name: language === 'ar' ? 'مركز خدمات الشمال' : 'Al Shamal Service Center',
      address: language === 'ar' ? 'منطقة الشمال' : 'Al Shamal Area',
      distance: 52.4,
      status: 'open',
      traffic: 'low',
      waitTime: 3,
      satisfaction: 4.6,
      phone: '+974 4000 4008',
      hours: '7:00 AM - 2:00 PM',
      services: [
        language === 'ar' ? 'خدمات المرور' : 'Traffic Services',
        language === 'ar' ? 'تجديد بطاقة الهوية' : 'ID Card Renewal'
      ]
    }
  ];

  const filteredCenters = serviceCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nearestCenter = serviceCenters.sort((a, b) => a.distance - b.distance)[0];

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
              placeholder={t.search}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 rtl:pl-3 rtl:pr-10 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">

        {/* Nearest Center Highlight */}
        {!searchQuery && (
          <Card className="bg-gradient-to-r from-primary to-accent text-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium mb-1">{t.nearestCenter}</h3>
                  <p className="text-white/80 text-sm">{nearestCenter.distance} {t.distance}</p>
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  {nearestCenter.satisfaction}
                </Badge>
              </div>
              
              <h2 className="font-medium text-lg mb-2">{nearestCenter.name}</h2>
              <p className="text-white/80 text-sm mb-4">{nearestCenter.address}</p>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button 
                  onClick={() => onNavigate('service-center', { centerId: nearestCenter.id })}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  {t.viewCenter}
                </Button>
                <Button 
                  className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.callCenter}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Centers List */}
        <div className="space-y-4">
          {filteredCenters.map((center, index) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-md rounded-2xl border-0 hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <h3 className="font-medium text-gray-800 text-lg">{center.name}</h3>
                        <Badge className={`${
                          center.status === 'open' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        } border-0 text-xs`}>
                          {center.status === 'open' ? t.openNow : t.closed}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{center.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Navigation className="w-3 h-3" />
                          <span>{center.distance} {t.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Star className="w-3 h-3 text-[#F3BF24] fill-current" />
                          <span>{center.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Badge className={`${
                        center.traffic === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : center.traffic === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      } border-0 text-xs`}>
                        {center.traffic === 'high' 
                          ? t.highTraffic 
                          : center.traffic === 'medium' 
                          ? t.mediumTraffic 
                          : t.lowTraffic
                        }
                      </Badge>
                      {center.status === 'open' && (
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{center.waitTime} {t.minutes} {t.estimatedWait.toLowerCase()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => onNavigate('service-center', { centerId: center.id })}
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      {t.viewCenter}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t.callCenter}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCenters.length === 0 && searchQuery && (
          <Card className="bg-white shadow-md rounded-2xl border-0">
            <CardContent className="p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-800 mb-2">
                {language === 'ar' ? 'لم يتم العثور على مراكز' : 'No centers found'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar' 
                  ? 'جرب البحث بكلمات مختلفة' 
                  : 'Try searching with different keywords'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}