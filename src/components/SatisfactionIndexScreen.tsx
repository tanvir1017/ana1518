import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart3,
  PieChart,
  Users,
  Star,
  Building2,
  Calendar,
  Filter,
  Download,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface SatisfactionIndexScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function SatisfactionIndexScreen({ onNavigate, language }: SatisfactionIndexScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [userRating, setUserRating] = useState<{[key: string]: number}>({});

  const texts = {
    en: {
      title: 'Satisfaction Index',
      subtitle: 'Citizen Satisfaction Analytics',
      overview: 'Overview',
      services: 'Services',
      entities: 'Entities',
      trends: 'Trends',
      myRatings: 'My Ratings',
      avgSatisfaction: 'Average Satisfaction',
      totalResponses: 'Total Responses',
      improvementRate: 'Improvement Rate',
      activeServices: 'Active Services',
      satisfactionByService: 'Satisfaction by Service',
      satisfactionByEntity: 'Satisfaction by Entity',
      monthlyTrend: 'Monthly Trend',
      compareEntities: 'Compare Entities',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      poor: 'Poor',
      responses: 'responses',
      viewDetails: 'View Details',
      download: 'Download Report',
      filter: 'Filter',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      allEntities: 'All Entities',
      rateService: 'Rate Service',
      updateRating: 'Update Rating',
      satisfactionDistribution: 'Satisfaction Distribution',
      entityComparison: 'Entity Comparison',
      trendAnalysis: 'Trend Analysis',
      ratingUpdated: 'Rating Updated Successfully!'
    },
    ar: {
      title: 'مؤشر الرضا',
      subtitle: 'تحليلات رضا المواطنين',
      overview: 'نظرة عامة',
      services: 'الخدمات',
      entities: 'الجهات',
      trends: 'الاتجاهات',
      myRatings: 'تقييماتي',
      avgSatisfaction: 'متوسط الرضا',
      totalResponses: 'إجمالي الردود',
      improvementRate: 'معدل التحسن',
      activeServices: 'الخدمات النشطة',
      satisfactionByService: 'الرضا حسب الخدمة',
      satisfactionByEntity: 'الرضا حسب الجهة',
      monthlyTrend: 'الاتجاه الشهري',
      compareEntities: 'مقارنة الجهات',
      excellent: 'ممتاز',
      good: 'جيد',
      average: 'متوسط',
      poor: 'ضعيف',
      responses: 'ردود',
      viewDetails: 'عرض التفاصيل',
      download: 'تحميل التقرير',
      filter: 'تصفية',
      thisMonth: 'هذا الشهر',
      lastMonth: 'الشهر الماضي',
      quarterly: 'ربع سنوي',
      yearly: 'سنوي',
      allEntities: 'جميع الجهات',
      rateService: 'قيم الخدمة',
      updateRating: 'تحديث التقييم',
      satisfactionDistribution: 'توزيع الرضا',
      entityComparison: 'مقارنة الجهات',
      trendAnalysis: 'تحليل الاتجاهات',
      ratingUpdated: 'تم تحديث التقييم بنجاح!'
    }
  };

  const t = texts[language];

  // Sample data with period filtering
  const getOverviewData = () => {
    const baseData = {
      thisMonth: { avgSatisfaction: 4.2, totalResponses: 12547, improvementRate: 8.5, activeServices: 127 },
      lastMonth: { avgSatisfaction: 4.1, totalResponses: 11203, improvementRate: 6.2, activeServices: 124 },
      quarterly: { avgSatisfaction: 4.3, totalResponses: 35890, improvementRate: 12.3, activeServices: 129 },
      yearly: { avgSatisfaction: 4.1, totalResponses: 145670, improvementRate: 15.7, activeServices: 132 }
    };
    return baseData[selectedPeriod as keyof typeof baseData] || baseData.thisMonth;
  };

  const serviceData = [
    { name: language === 'ar' ? 'تجديد رخصة القيادة' : 'Driving License', satisfaction: 4.5, responses: 2341 },
    { name: language === 'ar' ? 'تجديد جواز السفر' : 'Passport Renewal', satisfaction: 4.3, responses: 1876 },
    { name: language === 'ar' ? 'خدمات الصحة' : 'Health Services', satisfaction: 4.1, responses: 3215 },
    { name: language === 'ar' ? 'التعليم' : 'Education', satisfaction: 3.9, responses: 1654 },
    { name: language === 'ar' ? 'الإسكان' : 'Housing', satisfaction: 3.7, responses: 987 }
  ];

  const entityData = [
    { name: language === 'ar' ? 'وزارة الداخلية' : 'Ministry of Interior', satisfaction: 4.4, responses: 5432, color: '#468BA4' },
    { name: language === 'ar' ? 'وزارة الصحة' : 'Ministry of Health', satisfaction: 4.1, responses: 3876, color: '#066F71' },
    { name: language === 'ar' ? 'وزارة التعليم' : 'Ministry of Education', satisfaction: 3.9, responses: 2543, color: '#109375' },
    { name: language === 'ar' ? 'وزارة البلدية' : 'Ministry of Municipality', satisfaction: 3.8, responses: 1987, color: '#891638' }
  ];

  const trendData = [
    { month: 'Jan', satisfaction: 3.8 },
    { month: 'Feb', satisfaction: 3.9 },
    { month: 'Mar', satisfaction: 4.0 },
    { month: 'Apr', satisfaction: 4.1 },
    { month: 'May', satisfaction: 4.2 },
    { month: 'Jun', satisfaction: 4.3 }
  ];

  const distributionData = [
    { name: t.excellent, value: 45, color: '#109375' },
    { name: t.good, value: 35, color: '#468BA4' },
    { name: t.average, value: 15, color: '#066F71' },
    { name: t.poor, value: 5, color: '#891638' }
  ];

  const myRatingsData = [
    { id: 1, service: language === 'ar' ? 'تجديد رخصة القيادة' : 'Driving License Renewal', currentRating: 4, lastRated: '2024-01-15' },
    { id: 2, service: language === 'ar' ? 'خدمات جواز السفر' : 'Passport Services', currentRating: 5, lastRated: '2024-01-10' },
    { id: 3, service: language === 'ar' ? 'الفحص الطبي' : 'Medical Checkup', currentRating: 3, lastRated: '2024-01-05' }
  ];

  const handleRateService = (serviceId: number, rating: number) => {
    setUserRating(prev => ({ ...prev, [serviceId]: rating }));
    // Simulate API call
    setTimeout(() => {
      alert(t.ratingUpdated);
    }, 500);
  };

  const renderStarRating = (serviceId: number, currentRating: number) => {
    const rating = userRating[serviceId] || currentRating;
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRateService(serviceId, star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  const overviewData = getOverviewData();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
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
              <h1 className="text-lg font-medium">{t.title}</h1>
              <p className="text-white/80 text-sm">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Period Filter */}
        <div className="px-6 pb-6">
          <div className="flex space-x-2 rtl:space-x-reverse">
            {['thisMonth', 'lastMonth', 'quarterly', 'yearly'].map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                size="sm"
                variant={selectedPeriod === period ? 'default' : 'ghost'}
                className={`text-xs rounded-full px-4 py-2 ${
                  selectedPeriod === period
                    ? 'bg-white text-primary shadow-md'
                    : 'text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {t[period as keyof typeof t]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{t.avgSatisfaction}</p>
                  <p className="font-medium text-lg">{overviewData.avgSatisfaction}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{t.totalResponses}</p>
                  <p className="font-medium text-lg">{overviewData.totalResponses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{t.improvementRate}</p>
                  <p className="font-medium text-lg">+{overviewData.improvementRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{t.activeServices}</p>
                  <p className="font-medium text-lg">{overviewData.activeServices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 shadow-md">
            {[
              { value: 'overview', label: t.overview },
              { value: 'services', label: t.services },
              { value: 'entities', label: t.entities },
              { value: 'myRatings', label: t.myRatings }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                  activeTab === tab.value
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <TabsContent value="overview" className="space-y-4">
            {/* Satisfaction Distribution */}
            <Card className="bg-white shadow-md rounded-xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t.satisfactionDistribution}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card className="bg-white shadow-md rounded-xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t.trendAnalysis}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3.5, 4.5]} />
                      <Line 
                        type="monotone" 
                        dataKey="satisfaction" 
                        stroke="#468BA4" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card className="bg-white shadow-md rounded-xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t.satisfactionByService}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[0, 5]} />
                      <Bar dataKey="satisfaction" fill="#468BA4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entities" className="space-y-4">
            <Card className="bg-white shadow-md rounded-xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t.entityComparison}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entityData.map((entity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{entity.name}</h4>
                        <p className="text-xs text-gray-500">{entity.responses} {t.responses}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium text-sm">{entity.satisfaction}</span>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entity.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="myRatings" className="space-y-4">
            {myRatingsData.map((service) => (
              <Card key={service.id} className="bg-white shadow-md rounded-xl border-0">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm mb-1">{service.service}</h3>
                      <p className="text-xs text-gray-500">Last rated: {service.lastRated}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{t.rateService}:</p>
                      {renderStarRating(service.id, service.currentRating)}
                    </div>
                    
                    {/* Update Rating button only shows if user hasn't rated yet or rating is different from current */}
                    {userRating[service.id] && userRating[service.id] !== service.currentRating ? (
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-accent text-white text-xs px-6 py-2 rounded-lg shadow-sm"
                          onClick={() => handleRateService(service.id, userRating[service.id])}
                        >
                          {t.updateRating}
                        </Button>
                      </div>
                    ) : userRating[service.id] ? (
                      <div className="flex justify-end">
                        <p className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                          {language === 'ar' ? 'تم التقييم' : 'Rated'}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}