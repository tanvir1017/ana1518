import sharekTransparentLogo from 'figma:asset/fd4137f34a2286d10bfa9fbfcd8d577373b5669b.png';
import React from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import sharekLogo from 'figma:asset/307168283984054de7263dc347347d1949d6d643.png';
import {
  ArrowLeft,
  Building2,
  Users,
  Target,
  Award,
  Phone,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

interface AboutUsScreenProps {
  onNavigate: (screen: string) => void;
  language: "en" | "ar";
}

export default function AboutUsScreen({
  onNavigate,
  language,
}: AboutUsScreenProps) {
  const texts = {
    en: {
      title: "About Sharek",
      subtitle: "Empowering Citizen Participation",
      mission: "Our Mission",
      vision: "Our Vision",
      values: "Our Values",
      contact: "Contact Information",
      socialMedia: "Follow Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      version: "Version 1.0.0",
      missionText:
        "To create an inclusive platform that enables citizens and residents to actively participate in shaping Qatar's future through meaningful engagement with government policies and services.",
      visionText:
        "To be the leading digital platform for citizen engagement in the Middle East, fostering transparency, innovation, and collaborative governance.",
      valuesItems: [
        {
          title: "Transparency",
          description:
            "We believe in open and transparent communication between government and citizens.",
        },
        {
          title: "Innovation",
          description:
            "We continuously innovate to improve the citizen experience and engagement.",
        },
        {
          title: "Inclusivity",
          description:
            "We ensure all voices are heard regardless of background or circumstance.",
        },
        {
          title: "Excellence",
          description:
            "We strive for excellence in all our services and interactions.",
        },
      ],
      aboutCGB: "About CGB",
      cgbDescription:
        "The Civil Service and Government Development Bureau (CGB) is the leading government entity responsible for developing human resources in the civil service and enhancing government performance in Qatar.",
      cgbMission:
        "To develop an efficient and effective civil service that supports Qatar National Vision 2030.",
      sharekPlatform: "Sharek Platform",
      sharekDescription:
        "Sharek is an innovative e-participation platform that bridges the gap between government and citizens, enabling meaningful dialogue and collaborative decision-making.",
      features: "Key Features",
      featuresItems: [
        "Policy consultations and feedback",
        "Service quality monitoring",
        "Real-time satisfaction tracking",
        "Digital participation tools",
        "Transparent government communication",
        "Multilingual support (Arabic & English)",
      ],
    },
    ar: {
      title: "عن شارك",
      subtitle: "تمكين مشاركة المواطنين",
      mission: "مهمتنا",
      vision: "رؤيتنا",
      values: "قيمنا",
      contact: "معلومات التواصل",
      socialMedia: "تابعنا",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      version: "الإصدار 1.0.0",
      missionText:
        "إنشاء منصة شاملة تمكن المواطنين والمقيمين من المشاركة الفعالة في صياغة مستقبل قطر من خلال التفاعل الهادف مع السياسات والخدمات الحكومية.",
      visionText:
        "أن نكون المنصة الرقمية الرائدة لمشاركة المواطنين في الشرق الأوسط، وتعزيز الشفافية والابتكار والحوكمة التشاركية.",
      valuesItems: [
        {
          title: "الشفافية",
          description:
            "نؤمن بالتواصل المفتوح والشفاف بين الحكومة والمواطنين.",
        },
        {
          title: "الابتكار",
          description:
            "نبتكر باستمرار لتحسين تجربة المواطن ومشاركته.",
        },
        {
          title: "الشمولية",
          description:
            "نضمن سماع جميع الأصوات بغض النظر عن الخلفية أو الظروف.",
        },
        {
          title: "التميز",
          description:
            "نسعى للتميز في جميع خدماتنا وتفاعلاتنا.",
        },
      ],
      aboutCGB: "عن ديوان الخدمة المدنية",
      cgbDescription:
        "ديوان الخدمة المدنية وتطوير الحكومة هو الجهة الحكومية الرائدة المسؤولة عن تطوير الموارد البشرية في الخدمة المدنية وتعزيز الأداء الحكومي في قطر.",
      cgbMission:
        "تطوير خدمة مدنية كفؤة وفعالة تدعم رؤية قطر الوطنية 2030.",
      sharekPlatform: "منصة شارك",
      sharekDescription:
        "شارك ��ي منصة مشاركة إلكترونية مبتكرة تسد الفجوة بين الحكومة والمواطنين، وتمكن الحوار الهادف وصنع القرار التشاركي.",
      features: "الميزات الرئيسية",
      featuresItems: [
        "استشارات السياسات والتعليقات",
        "مراقبة جودة الخدمة",
        "تتبع الرضا في الوقت الفعلي",
        "أدوات المشاركة الرقمية",
        "التواصل الحكومي الشفاف",
        "الدعم متعدد اللغات (العربية والإنجليزية)",
      ],
    },
  };

  const t = texts[language];

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+974 4000 4000",
      action: "tel:+97440004000",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@sharek.gov.qa",
      action: "mailto:info@sharek.gov.qa",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.sharek.gov.qa",
      action: "https://www.sharek.gov.qa",
    },
    {
      icon: MapPin,
      label: "Address",
      value:
        language === "ar"
          ? "الدوحة، دولة قطر"
          : "Doha, State of Qatar",
      action: null,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "#",
      color: "text-blue-600",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "#",
      color: "text-blue-400",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "text-pink-600",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "#",
      color: "text-blue-700",
    },
  ];

  const statistics = [
    {
      value: "50K+",
      label: language === "ar" ? "مستخدم نشط" : "Active Users",
    },
    {
      value: "127",
      label:
        language === "ar"
          ? "خدمة حكومية"
          : "Government Services",
    },
    {
      value: "23",
      label:
        language === "ar"
          ? "استشارة مفتوحة"
          : "Open Consultations",
    },
    {
      value: "94%",
      label:
        language === "ar" ? "معدل الرضا" : "Satisfaction Rate",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center p-6 pt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("home")}
            className="mr-4 rtl:mr-0 rtl:ml-4"
          >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </motion.button>
          <div>
            <h1 className="text-xl font-medium">{t.title}</h1>
            <p className="text-white/80 text-sm">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Hero Section */}
        <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-xl border border-gray-100">
                <ImageWithFallback 
                  src={sharekTransparentLogo} 
                  alt="Sharek Logo" 
                  className="w-full h-full object-contain"
                  fallback={sharekLogo}
                />
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              {t.sharekPlatform}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t.sharekDescription}
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="text-center p-3 bg-gray-50 rounded-xl"
                >
                  <p className="text-xl font-medium text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Card className="bg-white shadow-md rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Target className="w-5 h-5 text-primary" />
                <span>{t.mission}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                {t.missionText}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Award className="w-5 h-5 text-secondary" />
                <span>{t.vision}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                {t.visionText}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Users className="w-5 h-5 text-accent" />
              <span>{t.values}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {t.valuesItems.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="p-4 bg-gray-50 rounded-xl"
                >
                  <h4 className="font-medium text-gray-800 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* About CGB */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Building2 className="w-5 h-5 text-destructive" />
              <span>{t.aboutCGB}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t.cgbDescription}
            </p>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-800 font-medium text-sm">
                {t.cgbMission}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle>{t.features}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {t.featuresItems.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700 text-sm">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle>{t.contact}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className={`flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-xl ${
                    contact.action
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                  }`}
                  onClick={() =>
                    contact.action &&
                    window.open(contact.action, "_blank")
                  }
                >
                  <contact.icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-sm">
                      {contact.value}
                    </p>
                  </div>
                  {contact.action && (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
          <CardHeader>
            <CardTitle>{t.socialMedia}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-6 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-white shadow-md rounded-2xl border-0">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center space-x-6 rtl:space-x-reverse mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600"
              >
                {t.privacy}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600"
              >
                {t.terms}
              </Button>
            </div>
            <p className="text-gray-500 text-sm">{t.version}</p>
            <p className="text-gray-400 text-xs mt-2">
              © 2024 Civil Service and Government Development
              Bureau
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}