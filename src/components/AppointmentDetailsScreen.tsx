import React, { useState, useEffect } from 'react';
import { getAppointmentById, cancelAppointment, cancelAppointmentNotification } from './utils/appointmentUtils';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle,
  Edit,
  XCircle,
  Share2
} from 'lucide-react';

interface AppointmentDetailsScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  appointmentId?: string;
}

export default function AppointmentDetailsScreen({ onNavigate, language, appointmentId }: AppointmentDetailsScreenProps) {
  const [appointment, setAppointment] = useState<any>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    // Try to get appointment from URL parameter or localStorage notifications
    if (appointmentId) {
      const savedAppointment = getAppointmentById(appointmentId);
      if (savedAppointment) {
        setAppointment({
          id: savedAppointment.id,
          title: savedAppointment.service,
          serviceCenter: savedAppointment.location,
          date: savedAppointment.date,
          time: savedAppointment.time,
          address: language === 'ar' ? 'الدوحة، قطر' : 'Doha, Qatar',
          phone: '+974 4444 0000',
          email: 'services@gov.qa',
          status: savedAppointment.status,
          requiredDocuments: language === 'ar' 
            ? ['بطاقة الهوية الشخصية', 'الوثائق المطلوبة للخدمة']
            : ['National ID Card', 'Required documents for service'],
          instructions: language === 'ar'
            ? ['يرجى الوصول قبل 10 دقائق من الموعد', 'إحضار جميع الوثائق المطلوبة', 'يرجى التأكد من ارتداء الملابس المحتشمة']
            : ['Please arrive 10 minutes before appointment', 'Bring all required documents', 'Please make sure to wear modest clothes']
        });
      }
    } else {
      // Default appointment for demo
      setAppointment({
        id: 'APT-2024-001',
        title: language === 'ar' ? 'تجديد رخصة القيادة' : 'Driving License Renewal',
        serviceCenter: language === 'ar' ? 'مركز خدمات الدوحة الرئيسي' : 'Doha Main Service Center',
        date: '2024-01-15',
        time: '10:00 AM',
        address: language === 'ar' ? 'الدوحة، قطر' : 'Doha, Qatar',
        phone: '+974 4444 0000',
        email: 'services@gov.qa',
        status: 'confirmed',
        requiredDocuments: language === 'ar' 
          ? ['بطاقة الهوية الشخصية', 'رخصة القيادة الحالية', 'فحص العين']
          : ['National ID Card', 'Current Driving License', 'Eye Test Report'],
        instructions: language === 'ar'
          ? ['يرجى الوصول قبل 10 دقائق من الموعد', 'إحضار جميع الوثائق المطلوبة', 'يرجى التأكد من ارتداء الملابس المحتشمة']
          : ['Please arrive 10 minutes before appointment', 'Bring all required documents', 'Please make sure to wear modest clothes']
      });
    }
  }, [appointmentId, language]);

  const handleCancelAppointment = () => {
    if (appointment && appointment.id) {
      cancelAppointment(appointment.id);
      cancelAppointmentNotification(appointment.id, language);
      alert(language === 'ar' ? 'تم إلغاء الموعد بنجاح' : 'Appointment cancelled successfully');
      onNavigate('notifications');
    }
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  const texts = {
    en: {
      title: 'Appointment Details',
      appointmentId: 'Appointment ID',
      serviceCenter: 'Service Center',
      date: 'Date',
      time: 'Time',
      address: 'Address',
      contact: 'Contact Information',
      status: 'Status',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      requiredDocuments: 'Required Documents',
      instructions: 'Important Instructions',
      reschedule: 'Reschedule',
      cancel: 'Cancel Appointment',
      share: 'Share Details',
      getDirections: 'Get Directions',
      call: 'Call',
      email: 'Email'
    },
    ar: {
      title: 'تفاصيل الموعد',
      appointmentId: 'رقم الموعد',
      serviceCenter: 'مركز الخدمة',
      date: 'التاريخ',
      time: 'الوقت',
      address: 'العنوان',
      contact: 'معلومات الاتصال',
      status: 'الحالة',
      confirmed: 'مؤكد',
      pending: 'في الانتظار',
      cancelled: 'ملغي',
      requiredDocuments: 'الوثائق المطلوبة',
      instructions: 'تعليمات مهمة',
      reschedule: 'إعادة جدولة',
      cancel: 'إلغاء الموعد',
      share: 'مشاركة التفاصيل',
      getDirections: 'الحصول على الاتجاهات',
      call: 'اتصال',
      email: 'بريد إلكتروني'
    }
  };

  const t = texts[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center p-6 pt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('notifications')}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">{appointment.id}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/20 rounded-full"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Main Appointment Info */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-800 mb-2">{appointment.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{appointment.serviceCenter}</p>
              </div>
              <Badge className={`${getStatusColor(appointment.status)} border-0`}>
                {t[appointment.status as keyof typeof t]}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-800">{t.date}</p>
                  <p className="text-gray-600 text-sm">{appointment.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-800">{t.time}</p>
                  <p className="text-gray-600 text-sm">{appointment.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-800">{t.address}</p>
                  <p className="text-gray-600 text-sm">{appointment.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t.contact}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(`tel:${appointment.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                {appointment.phone}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(`mailto:${appointment.email}`)}
              >
                <Mail className="w-4 h-4 mr-2" />
                {appointment.email}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-base">
              <FileText className="w-5 h-5 text-primary" />
              <span>{t.requiredDocuments}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {appointment.requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-base">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span>{t.instructions}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {appointment.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse p-2 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span className="text-sm text-orange-700">{instruction}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => onNavigate('appointment-booking')}
          >
            <Edit className="w-4 h-4 mr-2" />
            {t.reschedule}
          </Button>
          <Button 
            onClick={() => setShowCancelConfirm(true)}
            variant="outline" 
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
            disabled={appointment.status === 'cancelled'}
          >
            <XCircle className="w-4 h-4 mr-2" />
            {appointment.status === 'cancelled' 
              ? (language === 'ar' ? 'تم الإلغاء' : 'Cancelled')
              : t.cancel
            }
          </Button>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'تأكيد إلغاء الموعد' : 'Confirm Appointment Cancellation'}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {language === 'ar' 
                    ? 'هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.'
                    : 'Are you sure you want to cancel this appointment? This action cannot be undone.'
                  }
                </p>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button
                    onClick={() => setShowCancelConfirm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button
                    onClick={handleCancelAppointment}
                    className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
                  >
                    {language === 'ar' ? 'تأكيد الإلغاء' : 'Confirm Cancellation'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}