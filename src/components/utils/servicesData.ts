// Service types and data for the Sharek application
export type ServiceType = 'Digital' | 'Incomplete Digital';

export interface Service {
  id: string;
  titleEn: string;
  titleAr: string;
  entityEn: string;
  entityAr: string;
  descriptionEn: string;
  descriptionAr: string;
  rating: number;
  reviews: number;
  timeText: string;
  timeUnit: string;
  cost: string;
  currency: string;
  category: string;
  type: ServiceType;
  url?: string; // For Digital services
  serviceCenterId?: number; // For Incomplete Digital services (single center)
  serviceCenterIds?: number[]; // For Incomplete Digital services (multiple centers)
}

export const servicesData: Record<string, Service> = {
  '1': {
    id: '1',
    titleEn: 'Driving License Renewal',
    titleAr: 'تجديد رخصة القيادة',
    entityEn: 'Ministry of Interior',
    entityAr: 'وزارة الداخلية',
    descriptionEn: 'Renew driving license for citizens and residents of Qatar',
    descriptionAr: 'تجديد رخصة القيادة للمواطنين والمقيمين في قطر',
    rating: 4.5,
    reviews: 324,
    timeText: '2-3',
    timeUnit: 'business days',
    cost: '200',
    currency: 'QAR',
    category: 'transport',
    type: 'Digital',
    url: 'https://portal.moi.gov.qa/wps/portal/MOIInternet/departmentcommittees/trafficDepartment'
  },
  '2': {
    id: '2',
    titleEn: 'Police Clearance Certificate',
    titleAr: 'شهادة السجل العدلي',
    entityEn: 'Ministry of Interior',
    entityAr: 'وزارة الداخلية',
    descriptionEn: 'Issue police clearance certificate for citizens and residents',
    descriptionAr: 'إصدار شهادة السجل العدلي للمواطنين والمقيمين',
    rating: 4.3,
    reviews: 189,
    timeText: '2-3',
    timeUnit: 'business days',
    cost: '200',
    currency: 'QAR',
    category: 'transport',
    type: 'Incomplete Digital',
    serviceCenterIds: [1, 2, 3] // Available at multiple centers
  },
  '3': {
    id: '3',
    titleEn: 'Building Permit',
    titleAr: 'رخصة البناء',
    entityEn: 'Ministry of Municipality',
    entityAr: 'وزارة البلدية',
    descriptionEn: 'Apply for residential or commercial building permits',
    descriptionAr: 'طلب رخصة بناء سكني أو تجاري',
    rating: 4.2,
    reviews: 156,
    timeText: '7-10',
    timeUnit: 'business days',
    cost: '500',
    currency: 'QAR',
    category: 'housing',
    type: 'Incomplete Digital',
    serviceCenterId: 2
  },
  '4': {
    id: '4',
    titleEn: 'Property Registration',
    titleAr: 'تسجيل العقار',
    entityEn: 'Ministry of Municipality',
    entityAr: 'وزارة البلدية',
    descriptionEn: 'Register property ownership and transfer documents',
    descriptionAr: 'تسجيل ملكية العقار ووثائق النقل',
    rating: 4.4,
    reviews: 203,
    timeText: '3-5',
    timeUnit: 'business days',
    cost: '300',
    currency: 'QAR',
    category: 'housing',
    type: 'Digital',
    url: 'https://www.mmup.gov.qa'
  },
  '5': {
    id: '5',
    titleEn: 'Housing Loan Application',
    titleAr: 'طلب قرض إسكاني',
    entityEn: 'Ministry of Municipality',
    entityAr: 'وزارة البلدية',
    descriptionEn: 'Apply for government housing loan for citizens',
    descriptionAr: 'طلب قرض إسكاني حكومي للمواطنين',
    rating: 4.0,
    reviews: 89,
    timeText: '15-20',
    timeUnit: 'business days',
    cost: '100',
    currency: 'QAR',
    category: 'housing',
    type: 'Incomplete Digital',
    serviceCenterId: 2
  },
  '6': {
    id: '6',
    titleEn: 'Title Deed Issuance',
    titleAr: 'إصدار سند الملكية',
    entityEn: 'Ministry of Municipality',
    entityAr: 'وزارة البلدية',
    descriptionEn: 'Issue official property title deed certificates',
    descriptionAr: 'إصدار شهادة سند الملكية الرسمية',
    rating: 4.6,
    reviews: 298,
    timeText: '5-7',
    timeUnit: 'business days',
    cost: '250',
    currency: 'QAR',
    category: 'housing',
    type: 'Digital',
    url: 'https://www.mmup.gov.qa'
  },
  '7': {
    id: '7',
    titleEn: 'Utilities Connection',
    titleAr: 'توصيل المرافق',
    entityEn: 'Ministry of Municipality',
    entityAr: 'وزارة البلدية',
    descriptionEn: 'Connect electricity, water and sewage services',
    descriptionAr: 'توصيل خدمات الكهرباء والماء والصرف الصحي',
    rating: 4.1,
    reviews: 167,
    timeText: '3-5',
    timeUnit: 'business days',
    cost: '150',
    currency: 'QAR',
    category: 'housing',
    type: 'Incomplete Digital',
    serviceCenterId: 1
  },
  '8': {
    id: '8',
    titleEn: 'Business License',
    titleAr: 'رخصة تجارية',
    entityEn: 'Ministry of Commerce',
    entityAr: 'وزارة التجارة',
    descriptionEn: 'Apply for commercial business license registration',
    descriptionAr: 'طلب تسجيل رخصة تجارية للأعمال',
    rating: 4.3,
    reviews: 412,
    timeText: '5-7',
    timeUnit: 'business days',
    cost: '1000',
    currency: 'QAR',
    category: 'business',
    type: 'Digital',
    url: 'https://www.moci.gov.qa'
  },
  '9': {
    id: '9',
    titleEn: 'Tax Clearance Certificate',
    titleAr: 'شهادة خلو طرف ضريبي',
    entityEn: 'Ministry of Commerce',
    entityAr: 'وزارة التجارة',
    descriptionEn: 'Obtain tax compliance certificate for businesses',
    descriptionAr: 'الحصول على شهادة الامتثال الضريبي للشركات',
    rating: 4.0,
    reviews: 234,
    timeText: '2-3',
    timeUnit: 'business days',
    cost: '50',
    currency: 'QAR',
    category: 'business',
    type: 'Digital',
    url: 'https://www.gta.gov.qa'
  },
  '10': {
    id: '10',
    titleEn: 'Work Permit',
    titleAr: 'تصريح عمل',
    entityEn: 'Ministry of Interior',
    entityAr: 'وزارة الداخلية',
    descriptionEn: 'Apply for employee work permit and visa',
    descriptionAr: 'طلب تصريح عمل وتأشيرة للموظفين',
    rating: 4.2,
    reviews: 567,
    timeText: '7-10',
    timeUnit: 'business days',
    cost: '500',
    currency: 'QAR',
    category: 'business',
    type: 'Incomplete Digital',
    serviceCenterId: 1
  },
  '11': {
    id: '11',
    titleEn: 'Trademark Registration',
    titleAr: 'تسجيل العلامة التجارية',
    entityEn: 'Ministry of Commerce',
    entityAr: 'وزارة التجارة',
    descriptionEn: 'Register intellectual property and trademarks',
    descriptionAr: 'تسجيل الملكية الفكرية والعلامات التجارية',
    rating: 4.4,
    reviews: 123,
    timeText: '10-15',
    timeUnit: 'business days',
    cost: '750',
    currency: 'QAR',
    category: 'business',
    type: 'Digital',
    url: 'https://www.moci.gov.qa'
  },
  '12': {
    id: '12',
    titleEn: 'Company Registration',
    titleAr: 'تسجيل شركة',
    entityEn: 'Ministry of Commerce',
    entityAr: 'وزارة التجارة',
    descriptionEn: 'Register new company with commercial registry',
    descriptionAr: 'تسجيل شركة جديدة بالسجل التجاري',
    rating: 4.1,
    reviews: 345,
    timeText: '5-7',
    timeUnit: 'business days',
    cost: '2000',
    currency: 'QAR',
    category: 'business',
    type: 'Digital',
    url: 'https://www.moci.gov.qa'
  },
  '13': {
    id: '13',
    titleEn: 'Industrial License',
    titleAr: 'رخصة صناعية',
    entityEn: 'Ministry of Commerce',
    entityAr: 'وزارة التجارة',
    descriptionEn: 'License for industrial and manufacturing activities',
    descriptionAr: 'رخصة للأنشطة الصناعية والتصنيعية',
    rating: 4.0,
    reviews: 87,
    timeText: '15-20',
    timeUnit: 'business days',
    cost: '3000',
    currency: 'QAR',
    category: 'business',
    type: 'Incomplete Digital',
    serviceCenterId: 2
  },
  '14': {
    id: '14',
    titleEn: 'Health Card Renewal',
    titleAr: 'تجديد البطاقة الصحية',
    entityEn: 'Ministry of Public Health',
    entityAr: 'وزارة الصحة العامة',
    descriptionEn: 'Renew health insurance card for medical services',
    descriptionAr: 'تجديد بطاقة التأمين الصحي للخدمات الطبية',
    rating: 4.5,
    reviews: 678,
    timeText: '1-2',
    timeUnit: 'business days',
    cost: '50',
    currency: 'QAR',
    category: 'health',
    type: 'Digital',
    url: 'https://www.moph.gov.qa'
  },
  '15': {
    id: '15',
    titleEn: 'Medical License',
    titleAr: 'رخصة طبية',
    entityEn: 'Ministry of Public Health',
    entityAr: 'وزارة الصحة العامة',
    descriptionEn: 'Professional license for medical practitioners',
    descriptionAr: 'رخصة مهنية للممارسين الطبيين',
    rating: 4.2,
    reviews: 134,
    timeText: '10-15',
    timeUnit: 'business days',
    cost: '1500',
    currency: 'QAR',
    category: 'health',
    type: 'Incomplete Digital',
    serviceCenterId: 1
  },
  '16': {
    id: '16',
    titleEn: 'Pharmacy License',
    titleAr: 'رخصة صيدلية',
    entityEn: 'Ministry of Public Health',
    entityAr: 'وزارة الصحة العامة',
    descriptionEn: 'License to operate pharmacy or medical facility',
    descriptionAr: 'رخصة لتشغيل صيدلية أو منشأة طبية',
    rating: 4.1,
    reviews: 98,
    timeText: '15-20',
    timeUnit: 'business days',
    cost: '2500',
    currency: 'QAR',
    category: 'health',
    type: 'Incomplete Digital',
    serviceCenterId: 1
  },
  '17': {
    id: '17',
    titleEn: 'Vaccination Certificate',
    titleAr: 'شهادة التطعيم',
    entityEn: 'Ministry of Public Health',
    entityAr: 'وزارة الصحة العامة',
    descriptionEn: 'Official vaccination record and certificates',
    descriptionAr: 'سجل التطعيم الرسمي والشهادات',
    rating: 4.7,
    reviews: 445,
    timeText: '1',
    timeUnit: 'business days',
    cost: '25',
    currency: 'QAR',
    category: 'health',
    type: 'Digital',
    url: 'https://www.moph.gov.qa'
  },
  '18': {
    id: '18',
    titleEn: 'Medical Fitness Report',
    titleAr: 'تقرير اللياقة الطبية',
    entityEn: 'Ministry of Public Health',
    entityAr: 'وزارة الصحة العامة',
    descriptionEn: 'Medical fitness certificate for employment',
    descriptionAr: 'شهادة اللياقة الطبية للتوظيف',
    rating: 4.3,
    reviews: 312,
    timeText: '2-3',
    timeUnit: 'business days',
    cost: '100',
    currency: 'QAR',
    category: 'health',
    type: 'Digital',
    url: 'https://www.moph.gov.qa'
  },
  '19': {
    id: '19',
    titleEn: 'Degree Attestation',
    titleAr: 'توثيق الشهادة',
    entityEn: 'Ministry of Education and Higher Education',
    entityAr: 'وزارة التعليم والتعليم العالي',
    descriptionEn: 'Authenticate educational certificates and degrees',
    descriptionAr: 'توثيق الشهادات والدرجات التعليمية',
    rating: 4.2,
    reviews: 267,
    timeText: '5-7',
    timeUnit: 'business days',
    cost: '150',
    currency: 'QAR',
    category: 'education',
    type: 'Incomplete Digital',
    serviceCenterIds: [1, 2] // Available at multiple centers
  },
  '20': {
    id: '20',
    titleEn: 'School Enrollment',
    titleAr: 'تسجيل المدرسة',
    entityEn: 'Ministry of Education and Higher Education',
    entityAr: 'وزارة التعليم والتعليم العالي',
    descriptionEn: 'Enroll children in public and private schools',
    descriptionAr: 'تسجيل الأطفال في المدارس العامة والخاصة',
    rating: 4.4,
    reviews: 189,
    timeText: '3-5',
    timeUnit: 'business days',
    cost: '0',
    currency: 'QAR',
    category: 'education',
    type: 'Digital',
    url: 'https://www.edu.gov.qa'
  }
};

export const getServiceById = (id: string): Service | undefined => {
  return servicesData[id];
};

export const serviceCenters = [
  {
    id: 1,
    nameEn: 'Al Rayyan Service Center',
    nameAr: 'مركز خدمات الريان',
    addressEn: 'Al Rayyan City, Doha',
    addressAr: 'مدينة الريان، الدوحة'
  },
  {
    id: 2,
    nameEn: 'The Pearl Service Center',
    nameAr: 'مركز خدمات اللؤلؤة',
    addressEn: 'The Pearl Island, Doha',
    addressAr: 'جزيرة اللؤلؤة، الدوحة'
  },
  {
    id: 3,
    nameEn: 'Al Khor Service Center',
    nameAr: 'مركز خدمات الخور',
    addressEn: 'Al Khor City',
    addressAr: 'مدينة الخور'
  }
];

export const getServiceCenterForService = (serviceCenterId: number) => {
  return serviceCenters.find(c => c.id === serviceCenterId);
};

export const getServiceCentersForService = (service: Service) => {
  // If service has multiple centers
  if (service.serviceCenterIds && service.serviceCenterIds.length > 0) {
    return serviceCenters.filter(c => service.serviceCenterIds!.includes(c.id));
  }
  // If service has single center (legacy support)
  if (service.serviceCenterId) {
    const center = serviceCenters.find(c => c.id === service.serviceCenterId);
    return center ? [center] : [];
  }
  return [];
};
