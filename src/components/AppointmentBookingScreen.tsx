import React, { useState } from 'react';
import { createAppointmentNotification, saveAppointment, Appointment } from './utils/appointmentUtils';
import DataManager from './utils/dataManager';
import { servicesData } from './utils/servicesData';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText,
  CheckCircle,
  Building2,
  AlertCircle,
  Car
} from 'lucide-react';

interface AppointmentBookingScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
  selectedCenter?: {
    id: number;
    name: string;
    address: string;
  };
  userEmail: string;
  preSelectedServiceName?: string;
  previousScreen?: string;
}

export default function AppointmentBookingScreen({ onNavigate, language, selectedCenter, userEmail, preSelectedServiceName, previousScreen }: AppointmentBookingScreenProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('');
  const formInitialized = React.useRef(false);

  // Get user data and initialize form with user information
  const userData = DataManager.getUser(userEmail);
  console.log('AppointmentBooking: User data loaded:', { 
    userEmail, 
    userData: userData ? 'Found' : 'Not found',
    name: userData?.profile.name,
    phone: userData?.profile.phone 
  });

  const [formData, setFormData] = useState({
    name: '',
    email: userEmail || '',
    phone: '',
    service: preSelectedServiceName || '',
    center: selectedCenter?.id?.toString() || '',
    notes: ''
  });

  // Update form data when selectedCenter changes
  React.useEffect(() => {
    if (selectedCenter?.id) {
      setFormData(prev => ({ ...prev, center: selectedCenter.id.toString() }));
    }
  }, [selectedCenter]);

  // Initialize form data with user information once
  React.useEffect(() => {
    if (userData?.profile && userEmail && !formInitialized.current) {
      console.log('AppointmentBooking: Initializing form data with user profile:', {
        name: userData.profile.name,
        email: userData.profile.email,
        phone: userData.profile.phone
      });
      
      setFormData(prev => ({
        ...prev,
        name: userData.profile.name || '',
        email: userData.profile.email || userEmail,
        phone: userData.profile.phone || ''
      }));
      
      formInitialized.current = true;
    }
  }, [userEmail]); // Only depend on userEmail which should be stable

  const texts = {
    en: {
      title: 'Book Appointment',
      subtitle: 'Schedule Your Visit',
      step1: 'Select Entity',
      step2: 'Select Service',
      step3: 'Choose Date & Time',
      step4: 'Personal Details',
      step5: 'Confirmation',
      selectEntity: 'Select Government Entity',
      selectService: 'Select Service',
      selectCenter: 'Select Service Center',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      availableTimes: 'Available Times',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      additionalNotes: 'Additional Notes',
      notesPlaceholder: 'Any specific requirements or details...',
      next: 'Next',
      previous: 'Previous',
      confirm: 'Confirm Booking',
      summary: 'Appointment Summary',
      service: 'Service',
      center: 'Service Center',
      date: 'Date',
      time: 'Time',
      contact: 'Contact',
      bookingSuccess: 'Appointment Booked Successfully!',
      bookingReference: 'Reference Number',
      confirmationMessage: 'Your appointment has been confirmed. You will receive a confirmation email shortly.',
      backToServices: 'Back to Service Center',
      reschedule: 'Reschedule',
      cancel: 'Cancel Appointment'
    },
    ar: {
      title: 'حجز موعد',
      subtitle: 'جدولة زيارتك',
      step1: 'اختيار الجهة',
      step2: 'اختيار الخدمة',
      step3: 'اختيار التاريخ والوقت',
      step4: 'البيانات الشخصية',
      step5: 'التأكيد',
      selectEntity: 'اختر الجهة الحكومية',
      selectService: 'اختر الخدمة',
      selectCenter: 'اختر مركز الخدمات',
      selectDate: 'اختر التاريخ',
      selectTime: 'اختر الوقت',
      availableTimes: 'الأوقات المتاحة',
      personalInfo: 'المعلومات الشخصية',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      additionalNotes: 'ملاحظات إضافية',
      notesPlaceholder: 'أي متطلبات أو تفاصيل خاصة...',
      next: 'التالي',
      previous: 'السابق',
      confirm: 'تأكيد الحجز',
      summary: 'ملخص الموعد',
      service: 'الخدمة',
      center: 'مركز الخدمات',
      date: 'التاريخ',
      time: 'الوقت',
      contact: 'التواصل',
      bookingSuccess: 'تم حجز الموعد بنجاح!',
      bookingReference: 'رقم المرجع',
      confirmationMessage: 'تم تأكيد موعدك. ستتلقى رسالة تأكيد عبر البريد الإلكتروني قريباً.',
      backToServices: 'العودة إلى مركز الخدمات',
      reschedule: 'إعادة جدولة',
      cancel: 'إلغاء الموعد'
    }
  };

  const t = texts[language];

  // Get unique entities that have services available at the selected center
  const getUniqueEntities = () => {
    if (!selectedCenter) return [];
    
    const centerId = selectedCenter.id;
    const entities = new Set<string>();
    
    Object.values(servicesData).forEach(service => {
      // Only include "Incomplete Digital" services that need appointments
      if (service.type !== 'Incomplete Digital') return;
      
      // Check if service is available at this center
      const isAvailable = service.serviceCenterId === centerId || 
                         (service.serviceCenterIds && service.serviceCenterIds.includes(centerId));
      
      if (isAvailable) {
        const entity = language === 'ar' ? service.entityAr : service.entityEn;
        entities.add(entity);
      }
    });
    
    return Array.from(entities).sort();
  };

  // Filter services by entity and center availability (only incomplete digital services)
  const getFilteredServices = () => {
    if (!selectedEntity || !selectedCenter) return [];
    
    const centerId = selectedCenter.id;
    
    return Object.values(servicesData).filter(service => {
      const serviceEntity = language === 'ar' ? service.entityAr : service.entityEn;
      
      // Filter by entity
      if (serviceEntity !== selectedEntity) return false;
      
      // Only include "Incomplete Digital" services that need appointments
      if (service.type !== 'Incomplete Digital') return false;
      
      // Check if service is available at this center
      if (service.serviceCenterId === centerId) return true;
      if (service.serviceCenterIds && service.serviceCenterIds.includes(centerId)) return true;
      
      return false;
    });
  };

  const centers = [
    {
      id: 1,
      name: language === 'ar' ? 'مركز خدمات الريان' : 'Al-Rayyan SC',
      address: language === 'ar' ? 'مدينة الريان، الدوحة' : 'Al Rayyan City, Doha'
    },
    {
      id: 2,
      name: language === 'ar' ? 'مركز خدمات الوكرة' : 'Al-Wakkra SC',
      address: language === 'ar' ? 'مدينة الوكرة' : 'Al Wakrah City'
    },
    {
      id: 3,
      name: language === 'ar' ? 'مركز خدمات الهلال' : 'Al-Hilal SC',
      address: language === 'ar' ? 'منطقة الهلال' : 'Al Hilal Area'
    },
    {
      id: 4,
      name: language === 'ar' ? 'مركز خدمات الخور' : 'Al-Khor SC',
      address: language === 'ar' ? 'مدينة الخور' : 'Al Khor City'
    },
    {
      id: 5,
      name: language === 'ar' ? 'مركز خدمات روضة الحمامة' : 'Rawdat Alhamamma SC',
      address: language === 'ar' ? 'روضة الحمامة' : 'Rawdat Alhamamma'
    },
    {
      id: 6,
      name: language === 'ar' ? 'مركز خدمات اللؤلؤة' : 'The Pearl SC',
      address: language === 'ar' ? 'جزيرة اللؤلؤة' : 'The Pearl Island'
    },
    {
      id: 7,
      name: language === 'ar' ? 'مركز خدمات الشمال' : 'Al-Shammal SC',
      address: language === 'ar' ? 'منطقة الشمال' : 'Al Shammal Area'
    }
  ];

  // Working hours: Sunday to Thursday, 7:00 AM to 6:00 PM with break 1:30-2:00 PM
  const timeSlots = [
    '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', // Break from 1:30 PM to 2:00 PM
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
  ];



  const getSelectedService = () => {
    return servicesData[formData.service];
  };

  const getSelectedCenter = () => {
    // If a center was pre-selected from the service center page, use it
    if (selectedCenter && formData.center === selectedCenter.id?.toString()) {
      return selectedCenter;
    }
    return centers.find(c => c.id.toString() === formData.center);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedEntity;
      case 2:
        return formData.service;
      case 3:
        return selectedDate && selectedTime;
      case 4:
        return formData.name && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get the selected service and center details
      const selectedServiceData = getSelectedService();
      const selectedCenterData = getSelectedCenter();
      
      // For pre-selected service names, use them directly
      const serviceName = preSelectedServiceName || selectedServiceData?.name || formData.service;
      
      // Create appointment object
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        service: serviceName,
        location: selectedCenterData?.name || 'Unknown Center',
        date: selectedDate?.toLocaleDateString() || '',
        time: selectedTime,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save the appointment using existing function
      saveAppointment(newAppointment);

      // Create notification using existing function
      createAppointmentNotification(newAppointment, language);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep(6);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (step === 6) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <div className="flex-1 text-center">
              <h1 className="text-xl font-medium">{t.bookingSuccess}</h1>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-medium text-gray-800 mb-4">{t.bookingSuccess}</h2>
              <p className="text-gray-600 mb-6">{t.confirmationMessage}</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">{t.bookingReference}</h3>
                <p className="text-lg font-mono text-primary">SHK-{new Date().getFullYear()}-{Date.now().toString().slice(-6)}</p>
              </div>
              
              <div className="space-y-2 text-left mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.service}:</span>
                  <span className="font-medium">
                    {preSelectedServiceName || (getSelectedService() ? (language === 'ar' ? getSelectedService()?.titleAr : getSelectedService()?.titleEn) : '')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.center}:</span>
                  <span className="font-medium">{getSelectedCenter()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.date}:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.time}:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate(previousScreen || 'service-centers')}
                  className="w-full bg-primary hover:bg-accent text-white h-12"
                >
                  {t.backToServices}
                </Button>
                <Button
                  onClick={() => {
                    setStep(1);
                    setSelectedDate(undefined);
                    setSelectedTime('');
                  }}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white h-12"
                >
                  {t.reschedule}
                </Button>
              </div>
            </CardContent>
          </Card>
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
            onClick={() => {
              if (step === 1) {
                // Navigate back to where we came from
                onNavigate(previousScreen || 'service-centers');
              } else {
                setStep(step - 1);
              }
            }}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">{t.subtitle}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex-1">
                <div className={`h-2 rounded-full ${
                  stepNumber <= step ? 'bg-white' : 'bg-white/30'
                }`}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/80">
            <span>{t.step1}</span>
            <span>{t.step2}</span>
            <span>{t.step3}</span>
            <span>{t.step4}</span>
            <span>{t.step5}</span>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Step 1: Select Entity */}
        {step === 1 && (
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">{t.step1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-700 mb-3 block">{t.selectEntity}</Label>
                {getUniqueEntities().length > 0 ? (
                  <div className="grid gap-3">
                    {getUniqueEntities().map((entity) => (
                      <motion.div
                        key={entity}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          onClick={() => setSelectedEntity(entity)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedEntity === entity
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">{entity}</h3>
                            </div>
                            {selectedEntity === entity && (
                              <CheckCircle className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-gray-50 rounded-xl">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {language === 'ar' 
                        ? 'لا توجد جهات متاحة في هذا المركز' 
                        : 'No entities available at this center'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Service */}
        {step === 2 && (
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">{t.step2}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-700 mb-3 block">{t.selectService}</Label>
                {selectedCenter ? (
                  <div>
                    {getFilteredServices().length > 0 ? (
                      <div className="grid gap-3">
                        {getFilteredServices().map((service) => (
                          <motion.div
                            key={service.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              onClick={() => setFormData(prev => ({ ...prev, service: service.id }))}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                formData.service === service.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-200 hover:border-primary/50'
                              }`}
                            >
                              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-800">
                                    {language === 'ar' ? service.titleAr : service.titleEn}
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {service.cost} {service.currency} • {service.timeText} {service.timeUnit}
                                  </p>
                                </div>
                                {formData.service === service.id && (
                                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center bg-gray-50 rounded-xl">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">
                          {language === 'ar' 
                            ? 'لا توجد خدمات متاحة لهذه الجهة في هذا المركز' 
                            : 'No services available for this entity at this center'}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Select
                    value={formData.center}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, center: value }))}
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl h-12">
                      <SelectValue placeholder={t.selectCenter} />
                    </SelectTrigger>
                    <SelectContent>
                      {centers.map((center) => (
                        <SelectItem key={center.id} value={center.id.toString()}>
                          <div>
                            <div className="font-medium">{center.name}</div>
                            <div className="text-sm text-gray-500">{center.address}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div className="space-y-6">
            <Card className="bg-white shadow-lg rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="text-lg">{t.selectDate}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ar' 
                    ? 'مواعيد العمل: الأحد - الخميس، 7:00 ص - 6:00 م (استراحة: 1:30 - 2:00 م)'
                    : 'Working Hours: Sunday - Thursday, 7:00 AM - 6:00 PM (Break: 1:30 - 2:00 PM)'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    // Get actual current date
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
                    
                    // Create a copy of the date and reset time for comparison
                    const compareDate = new Date(date);
                    compareDate.setHours(0, 0, 0, 0);
                    
                    // Disable past dates
                    if (compareDate < today) {
                      return true;
                    }
                    
                    // Disable weekends (Friday = 5, Saturday = 6)
                    // In JavaScript: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
                    const dayOfWeek = date.getDay();
                    if (dayOfWeek === 5 || dayOfWeek === 6) {
                      return true;
                    }
                    
                    return false;
                  }}
                  modifiers={{
                    weekend: (date) => date.getDay() === 5 || date.getDay() === 6
                  }}
                  modifiersClassNames={{
                    weekend: "bg-red-50 text-red-400"
                  }}
                  fromDate={new Date()} // Start from today
                  toDate={new Date(new Date().getFullYear() + 1, 11, 31)} // End at Dec 31 next year
                  defaultMonth={new Date()} // Current month
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {selectedDate && (
              <Card className="bg-white shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg">{t.availableTimes}</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'ar' 
                      ? 'استراحة من 1:30 إلى 2:00 ظهراً'
                      : 'Break time: 1:30 PM - 2:00 PM'
                    }
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`h-12 ${
                          selectedTime === time
                            ? 'bg-primary text-white'
                            : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 4: Personal Details */}
        {step === 4 && (
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">{t.personalInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-700 mb-2 block">{t.fullName}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-50 border-gray-200 rounded-xl h-12"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">{t.email}</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-50 border-gray-200 rounded-xl h-12"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">{t.phone}</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-gray-50 border-gray-200 rounded-xl h-12"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">{t.additionalNotes}</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder={t.notesPlaceholder}
                  rows={4}
                  className="bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">{t.summary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{t.service}</span>
                  </div>
                  <span className="font-medium">
                    {preSelectedServiceName || (getSelectedService() ? (language === 'ar' ? getSelectedService()?.titleAr : getSelectedService()?.titleEn) : '')}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{t.center}</span>
                  </div>
                  <span className="font-medium">{getSelectedCenter()?.name}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{t.date}</span>
                  </div>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{t.time}</span>
                  </div>
                  <span className="font-medium">{selectedTime}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{t.contact}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formData.name}</div>
                    <div className="text-sm text-gray-500">{formData.email}</div>
                    <div className="text-sm text-gray-500">{formData.phone}</div>
                  </div>
                </div>
              </div>

              {formData.notes && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{t.additionalNotes}</h4>
                  <p className="text-gray-600">{formData.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-4 rtl:space-x-reverse mt-6">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-white h-12"
            >
              {t.previous}
            </Button>
          )}
          
          <Button
            onClick={() => step === 5 ? handleSubmit() : setStep(step + 1)}
            disabled={!canProceed() || isSubmitting}
            className="flex-1 bg-primary hover:bg-accent text-white h-12"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : step === 5 ? t.confirm : t.next}
          </Button>
        </div>
      </div>
    </div>
  );
}
