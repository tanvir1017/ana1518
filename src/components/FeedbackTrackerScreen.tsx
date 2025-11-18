// @ts-nocheck
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface FeedbackTrackerScreenProps {
  onNavigate: (screen: string) => void;
  language: "en" | "ar";
}

export default function FeedbackTrackerScreen({
  onNavigate,
  language,
}: FeedbackTrackerScreenProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const texts = {
    en: {
      title: "Feedback Tracker",
      subtitle: "Track Your Submissions",
      all: "All",
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
      searchPlaceholder: "Search feedback...",
      filter: "Filter",
      viewDetails: "View Details",
      caseNumber: "Case Number",
      status: "Status",
      submittedOn: "Submitted On",
      lastUpdate: "Last Update",
      entityResponse: "Entity Response",
      timeline: "Timeline",
      noResponse: "No response yet",
      responseReceived: "Response Received",
      feedbackSubmitted: "Feedback Submitted",
      underReview: "Under Review",
      resolved: "Resolved",
      description: "Description",
      attachments: "Attachments",
      relatedCase: "Related Case",
    },
    ar: {
      title: "متتبع التعليقات",
      subtitle: "تتبع مقترحاتك",
      all: "الكل",
      open: "مفتوح",
      inProgress: "قيد المراجعة",
      resolved: "تم الحل",
      searchPlaceholder: "البحث في التعليقات...",
      filter: "تصفية",
      viewDetails: "عرض التفاصيل",
      caseNumber: "رقم القضية",
      status: "الحالة",
      submittedOn: "تم التقديم في",
      lastUpdate: "آخر تحديث",
      entityResponse: "رد الجهة",
      timeline: "الجدول الزمني",
      noResponse: "لا يوجد رد بعد",
      responseReceived: "تم استلام الرد",
      feedbackSubmitted: "تم تقديم التعليق",
      underReview: "قيد المراجعة",
      resolved: "تم الحل",
      description: "الوصف",
      attachments: "المرفقات",
      relatedCase: "قضية ذات صلة",
    },
  };

  const t = texts[language];

  const feedbackItems = [
    {
      id: 1,
      caseNumber: "FB-2024-0001",
      title:
        language === "ar"
          ? "تحسين خدمة تجديد رخصة القيادة"
          : "Improve Driving License Renewal Service",
      entity: language === "ar" ? "وزارة الداخلية" : "Ministry of Interior",
      status: "resolved",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-20",
      description:
        language === "ar"
          ? "أقترح تسريع عملية تجديد رخصة القيادة وتقليل الوقت المطلوب"
          : "I suggest speeding up the driving license renewal process and reducing the required time",
      hasResponse: true,
      response:
        language === "ar"
          ? "شكراً لتعليقكم. تم تطبيق نظام جديد لتسريع عملية التجديد بنسبة 50%"
          : "Thank you for your feedback. A new system has been implemented to speed up the renewal process by 50%",
    },
    {
      id: 2,
      caseNumber: "FB-2024-0002",
      title:
        language === "ar"
          ? "إضافة خدمة حجز المواعيد عبر الإنترنت"
          : "Add Online Appointment Booking Service",
      entity:
        language === "ar" ? "وزارة الصحة العامة" : "Ministry of Public Health",
      status: "in-progress",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      description:
        language === "ar"
          ? "يرجى إضافة خدمة حجز المواعيد الطبية عبر الإنترنت"
          : "Please add online medical appointment booking service",
      hasResponse: false,
      response: null,
    },
    {
      id: 3,
      caseNumber: "FB-2024-0003",
      title:
        language === "ar"
          ? "تطوير تطبيق الخدمات الحكومية"
          : "Improve Government Services App",
      entity:
        language === "ar"
          ? "ديوان الخدمة المدنية وتطوير الحكومة"
          : "Civil Service and Government Development Bureau",
      status: "open",
      submittedDate: "2024-01-20",
      lastUpdate: "2024-01-20",
      description:
        language === "ar"
          ? "أقترح إضافة المزيد من الخدمات والميزات في التطبيق"
          : "I suggest adding more services and features to the app",
      hasResponse: false,
      response: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-amber-100 text-amber-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return AlertCircle;
      case "in-progress":
        return Clock;
      case "resolved":
        return CheckCircle;
      default:
        return MessageSquare;
    }
  };

  const filteredFeedback = feedbackItems.filter((item) => {
    // Filter by active tab
    const matchesTab =
      activeTab === "all" ||
      item.status === activeTab ||
      (activeTab === "inProgress" && item.status === "in-progress");

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.entity.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  if (selectedFeedback) {
    const feedback = feedbackItems.find((f) => f.id === selectedFeedback);
    if (!feedback) return null;

    const StatusIcon = getStatusIcon(feedback.status);

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFeedback(null)}
              className="mr-4 rtl:mr-0 rtl:ml-4 p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium">{feedback.caseNumber}</h1>
              <p className="text-white/80 text-sm">{feedback.entity}</p>
            </div>
          </div>
        </div>

        <div className="px-6">
          {/* Case Overview */}
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge
                    className={`${getStatusColor(
                      feedback.status
                    )} border-0 mb-2`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {t[feedback.status as keyof typeof t] || feedback.status}
                  </Badge>
                  <h2 className="font-medium text-gray-800 mb-2">
                    {feedback.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {feedback.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t.submittedOn}</p>
                  <p className="text-sm font-medium flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {feedback.submittedDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t.lastUpdate}</p>
                  <p className="text-sm font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {feedback.lastUpdate}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{feedback.entity}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-800 mb-4">{t.timeline}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-800">
                      {t.feedbackSubmitted}
                    </p>
                    <p className="text-xs text-gray-500">
                      {feedback.submittedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      feedback.status !== "open" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <Eye
                      className={`w-4 h-4 ${
                        feedback.status !== "open"
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-800">
                      {t.underReview}
                    </p>
                    <p className="text-xs text-gray-500">
                      {feedback.status !== "open"
                        ? feedback.lastUpdate
                        : "Pending"}
                    </p>
                  </div>
                </div>

                {feedback.hasResponse && (
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">
                        {t.responseReceived}
                      </p>
                      <p className="text-xs text-gray-500">
                        {feedback.lastUpdate}
                      </p>
                    </div>
                  </div>
                )}

                {feedback.status === "resolved" && (
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">
                        {t.resolved}
                      </p>
                      <p className="text-xs text-gray-500">
                        {feedback.lastUpdate}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Entity Response */}
          <Card className="bg-white shadow-md rounded-2xl border-0">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-800 mb-4">
                {t.entityResponse}
              </h3>
              {feedback.hasResponse ? (
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                    {feedback.response}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-100">
                    <div className="flex items-center text-sm text-blue-600">
                      <Building2 className="w-3 h-3 mr-1" />
                      {feedback.entity}
                    </div>
                    <span className="text-xs text-blue-500">
                      {feedback.lastUpdate}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t.noResponse}</p>
                </div>
              )}
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
            onClick={() => onNavigate("home")}
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
        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl border shadow-sm mb-6 h-12">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium px-3"
            >
              {t.all}
            </TabsTrigger>
            <TabsTrigger
              value="open"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium px-3"
            >
              {t.open}
            </TabsTrigger>
            <TabsTrigger
              value="inProgress"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium px-3"
            >
              {t.inProgress}
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs font-medium px-3"
            >
              {t.resolved}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => {
                const StatusIcon = getStatusIcon(feedback.status);

                return (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white shadow-md rounded-2xl border-0 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                              <Badge
                                className={`${getStatusColor(
                                  feedback.status
                                )} border-0`}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {t[feedback.status as keyof typeof t] ||
                                  feedback.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {feedback.caseNumber}
                              </span>
                            </div>

                            <h3 className="font-medium text-gray-800 mb-2 leading-tight">
                              {feedback.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {feedback.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 space-x-4 rtl:space-x-reverse">
                              <div className="flex items-center">
                                <Building2 className="w-3 h-3 mr-1" />
                                {feedback.entity}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {feedback.submittedDate}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {t.lastUpdate}: {feedback.lastUpdate}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => setSelectedFeedback(feedback.id)}
                            className="bg-primary hover:bg-secondary text-white"
                          >
                            {t.viewDetails}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
