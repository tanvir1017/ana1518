import {
  ArrowLeft,
  Eye,
  Heart,
  ImagePlus,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Search,
  Send,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import DataManager from "./utils/dataManager";
const aishaProfileImage =
  "https://img.alicdn.com/imgextra/i1/1750671382/O1CN01fkNdEU1M509UQPyLo_!!1750671382.jpg";
interface EParticipationScreenProps {
  onNavigate: (screen: string) => void;
  language: "en" | "ar";
  userEmail: string;
}

export default function EParticipationScreen({
  onNavigate,
  language,
  userEmail,
}: EParticipationScreenProps) {
  const [activeTab, setActiveTab] = useState("surveys");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(
    null
  );
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(false);
  const [newIdea, setNewIdea] = useState("");
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState<{ [key: string]: any }>(
    {}
  );
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});
  const [userVotedPolls, setUserVotedPolls] = useState<Set<number>>(new Set());
  const [userCompletedSurveys, setUserCompletedSurveys] = useState<Set<number>>(
    new Set()
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  // Get user data for profile info
  const userData = DataManager.getUser(userEmail);
  const userProfilePhoto = userData?.profile.profilePhoto || aishaProfileImage;
  const userName =
    userData?.profile.name || (language === "ar" ? "مستخدم" : "User");

  // Load user participation data from localStorage
  React.useEffect(() => {
    const votedPolls = JSON.parse(
      localStorage.getItem("sharek_voted_polls") || "[]"
    );
    const completedSurveys = JSON.parse(
      localStorage.getItem("sharek_completed_surveys") || "[]"
    );
    setUserVotedPolls(new Set(votedPolls));
    setUserCompletedSurveys(new Set(completedSurveys));
  }, []);

  // Inappropriate keywords filter
  const inappropriateKeywords = [
    "hate",
    "stupid",
    "idiot",
    "damn",
    "hell",
    "kill",
    "die",
    "bomb",
    "attack",
    "violence",
    // Arabic inappropriate words
    "غبي",
    "احمق",
    "كراهية",
    "قتل",
    "موت",
    "عنف",
    "هجوم",
  ];

  const checkInappropriateContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return inappropriateKeywords.some((keyword) =>
      lowerText.includes(keyword.toLowerCase())
    );
  };

  // Default forum ideas
  const defaultForumIdeas = [
    {
      id: 1,
      title:
        language === "ar"
          ? "تطوير النقل العام في قطر"
          : "Improving Public Transportation in Qatar",
      description:
        language === "ar"
          ? "اقتراحات لتحسين شبكة النقل العام وزيادة الكفاءة"
          : "Suggestions for improving public transport network and increasing efficiency",
      author: language === "ar" ? "أحمد المنصوري" : "Ahmed Al-Mansoori",
      avatar: aishaProfileImage,
      timestamp: language === "ar" ? "منذ يومين" : "2 days ago",
      category: language === "ar" ? "النقل" : "Transportation",
      likes: 24,
      replies: 12,
      views: 156,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: language === "ar" ? "سارة الكواري" : "Sara Al-Kuwari",
          text:
            language === "ar"
              ? "فكرة ممتازة! نحتاج فعلاً لتحسين النقل العام"
              : "Excellent idea! We really need better public transport",
          timestamp: language === "ar" ? "منذ يوم" : "1 day ago",
          avatar: aishaProfileImage,
        },
      ],
    },
    {
      id: 2,
      title:
        language === "ar"
          ? "مستقبل التعليم الرقمي"
          : "Future of Digital Education",
      description:
        language === "ar"
          ? "كيف يمكن تطوير التعليم الرقمي ليواكب التطورات التكنولوجية؟"
          : "How can we develop digital education to keep up with technological advances?",
      author: language === "ar" ? "فاطمة الأنصاري" : "Fatima Al-Ansari",
      avatar: aishaProfileImage,
      timestamp: language === "ar" ? "منذ 3 أيام" : "3 days ago",
      category: language === "ar" ? "التعليم" : "Education",
      likes: 18,
      replies: 8,
      views: 89,
      isLiked: false,
      comments: [],
    },
  ];

  // State for forum ideas with localStorage persistence
  const [forumIdeas, setForumIdeas] = useState(() => {
    const savedIdeas = localStorage.getItem("sharek_forum_ideas");
    return savedIdeas ? JSON.parse(savedIdeas) : defaultForumIdeas;
  });

  // Save forum ideas to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("sharek_forum_ideas", JSON.stringify(forumIdeas));
  }, [forumIdeas]);

  const surveys = [
    {
      id: 1,
      title:
        language === "ar"
          ? "تطوير الخدمات الصحية"
          : "Healthcare Services Development",
      description:
        language === "ar"
          ? "ساعدنا في تحسين جودة الرعاية الصحية"
          : "Help us improve healthcare quality",
      participants: 1247 + (userCompletedSurveys.has(1) ? 1 : 0),
      daysLeft: 12,
      estimatedTime: 8,
      completed: userCompletedSurveys.has(1),
      questions: [
        {
          id: 1,
          type: "rating",
          question:
            language === "ar"
              ? "كيف تقيم الخدمات الصحية الحالية؟"
              : "How do you rate current healthcare services?",
          options:
            language === "ar"
              ? ["ممتاز", "جيد", "متوسط", "ضعيف"]
              : ["Excellent", "Good", "Average", "Poor"],
        },
        {
          id: 2,
          type: "text",
          question:
            language === "ar"
              ? "ما هي اقتراحاتك لتحسين الخدمات؟"
              : "What are your suggestions for improvement?",
        },
      ],
    },
    {
      id: 2,
      title:
        language === "ar" ? "تقييم النقل العام" : "Public Transport Evaluation",
      description:
        language === "ar"
          ? "قيم تجربتك مع وسائل النقل العام"
          : "Evaluate your public transport experience",
      participants: 892 + (userCompletedSurveys.has(2) ? 1 : 0),
      daysLeft: 8,
      estimatedTime: 5,
      completed: userCompletedSurveys.has(2),
      questions: [
        {
          id: 1,
          type: "rating",
          question:
            language === "ar"
              ? "كيف تقيم خدمة النقل العام؟"
              : "How do you rate public transport service?",
          options:
            language === "ar"
              ? ["ممتاز", "جيد", "متوسط", "ضعيف"]
              : ["Excellent", "Good", "Average", "Poor"],
        },
      ],
    },
    {
      id: 3,
      title:
        language === "ar"
          ? "تقييم الخدمات الرقمية الحكومية"
          : "Digital Government Services Assessment",
      description:
        language === "ar"
          ? "ساعدنا في تطوير الخدمات الإلكترونية الحكومية"
          : "Help us improve digital government services",
      participants: 1567 + (userCompletedSurveys.has(3) ? 1 : 0),
      daysLeft: 15,
      estimatedTime: 6,
      completed: userCompletedSurveys.has(3),
      questions: [
        {
          id: 1,
          type: "rating",
          question:
            language === "ar"
              ? "كيف تقيم سهولة استخدام الخدمات الرقمية؟"
              : "How do you rate the ease of use of digital services?",
          options:
            language === "ar"
              ? ["سهل جداً", "سهل", "متوسط", "صعب"]
              : ["Very Easy", "Easy", "Average", "Difficult"],
        },
        {
          id: 2,
          type: "rating",
          question:
            language === "ar"
              ? "ما مدى رضاك عن سرعة المعالجة؟"
              : "How satisfied are you with processing speed?",
          options:
            language === "ar"
              ? ["راضي جداً", "راضي", "محايد", "غير راضي"]
              : ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied"],
        },
        {
          id: 3,
          type: "text",
          question:
            language === "ar"
              ? "ما الخدمات الجديدة التي تريد إضافتها؟"
              : "What new services would you like to see added?",
        },
      ],
    },
    {
      id: 4,
      title:
        language === "ar"
          ? "استطلاع رضا المواطنين عن البيئة"
          : "Citizen Satisfaction Survey on Environment",
      description:
        language === "ar"
          ? "شاركنا رأيك في المبادرات البيئية والاستدامة"
          : "Share your views on environmental initiatives and sustainability",
      participants: 934 + (userCompletedSurveys.has(4) ? 1 : 0),
      daysLeft: 20,
      estimatedTime: 7,
      completed: userCompletedSurveys.has(4),
      questions: [
        {
          id: 1,
          type: "rating",
          question:
            language === "ar"
              ? "كيف تقيم جهود قطر في حماية البيئة؟"
              : "How do you rate Qatar's environmental protection efforts?",
          options:
            language === "ar"
              ? ["ممتاز", "جيد", "متوسط", "يحتاج تحسين"]
              : ["Excellent", "Good", "Average", "Needs Improvement"],
        },
        {
          id: 2,
          type: "rating",
          question:
            language === "ar"
              ? "ما أهمية الطاقة المتجددة بالنسبة لك؟"
              : "How important is renewable energy to you?",
          options:
            language === "ar"
              ? ["مهم جداً", "مهم", "متوسط الأهمية", "غير مهم"]
              : [
                  "Very Important",
                  "Important",
                  "Moderately Important",
                  "Not Important",
                ],
        },
        {
          id: 3,
          type: "text",
          question:
            language === "ar"
              ? "ما اقتراحاتك لتحسين البيئة في قطر؟"
              : "What are your suggestions for improving Qatar's environment?",
        },
      ],
    },
    {
      id: 5,
      title:
        language === "ar"
          ? "تقييم جودة التعليم العالي"
          : "Higher Education Quality Assessment",
      description:
        language === "ar"
          ? "ساعدنا في تطوير جودة التعليم الجامعي في قطر"
          : "Help us improve the quality of university education in Qatar",
      participants: 1203 + (userCompletedSurveys.has(5) ? 1 : 0),
      daysLeft: 18,
      estimatedTime: 10,
      completed: userCompletedSurveys.has(5),
      questions: [
        {
          id: 1,
          type: "rating",
          question:
            language === "ar"
              ? "كيف تقيم جودة التعليم العالي في قطر؟"
              : "How do you rate the quality of higher education in Qatar?",
          options:
            language === "ar"
              ? ["ممتاز", "جيد جداً", "جيد", "متوسط", "ضعيف"]
              : ["Excellent", "Very Good", "Good", "Average", "Poor"],
        },
        {
          id: 2,
          type: "rating",
          question:
            language === "ar"
              ? "ما مدى ملاءمة المناهج لسوق العمل؟"
              : "How suitable are the curricula for the job market?",
          options:
            language === "ar"
              ? ["ملائم جداً", "ملائم", "��توسط", "غير ملائم"]
              : ["Very Suitable", "Suitable", "Average", "Not Suitable"],
        },
        {
          id: 3,
          type: "text",
          question:
            language === "ar"
              ? "ما التخصصات التي تحتاج تطوير أكثر؟"
              : "Which specializations need more development?",
        },
      ],
    },
  ];

  const polls = [
    {
      id: 1,
      title:
        language === "ar"
          ? "أفضل وقت لفعاليات المجتمع"
          : "Best Time for Community Events",
      description:
        language === "ar"
          ? "ما هو أفضل وقت لإقامة الفعاليات المجتمعية؟"
          : "What is the best time to hold community events?",
      totalVotes: 1534 + (userVotedPolls.has(1) ? 1 : 0),
      daysLeft: 5,
      options: [
        {
          id: 1,
          text: language === "ar" ? "المساء (6-9 مساءً)" : "Evening (6-9 PM)",
          votes: 645,
          percentage: 42,
        },
        {
          id: 2,
          text: language === "ar" ? "نهاية الأسبوع" : "Weekends",
          votes: 512,
          percentage: 33,
        },
        {
          id: 3,
          text:
            language === "ar" ? "بعد الظهر (2-5 مساءً)" : "Afternoon (2-5 PM)",
          votes: 377,
          percentage: 25,
        },
      ],
    },
    {
      id: 2,
      title:
        language === "ar"
          ? "أولوية مشاريع التطوير"
          : "Development Projects Priority",
      description:
        language === "ar"
          ? "ما هو أهم مشروع تطوير في رأيك؟"
          : "What is the most important development project in your opinion?",
      totalVotes: 2103 + (userVotedPolls.has(2) ? 1 : 0),
      daysLeft: 10,
      options: [
        {
          id: 1,
          text: language === "ar" ? "تطوير الصحة" : "Healthcare Development",
          votes: 841,
          percentage: 40,
        },
        {
          id: 2,
          text: language === "ar" ? "تطوير التعليم" : "Education Development",
          votes: 631,
          percentage: 30,
        },
        {
          id: 3,
          text:
            language === "ar"
              ? "تطوير البنية التحتية"
              : "Infrastructure Development",
          votes: 631,
          percentage: 30,
        },
      ],
    },
    {
      id: 3,
      title:
        language === "ar"
          ? "أفضل طريقة للتواصل الحكومي"
          : "Best Government Communication Method",
      description:
        language === "ar"
          ? "كيف تفضل أن تتواصل الحكومة معك؟"
          : "How do you prefer the government to communicate with you?",
      totalVotes: 1789 + (userVotedPolls.has(3) ? 1 : 0),
      daysLeft: 7,
      options: [
        {
          id: 1,
          text: language === "ar" ? "التطبيقات الذكية" : "Mobile Apps",
          votes: 715,
          percentage: 40,
        },
        {
          id: 2,
          text: language === "ar" ? "الرسائل النصية" : "SMS Messages",
          votes: 537,
          percentage: 30,
        },
        {
          id: 3,
          text: language === "ar" ? "البريد الإلكتروني" : "Email",
          votes: 358,
          percentage: 20,
        },
        {
          id: 4,
          text: language === "ar" ? "وسائل التواصل الاجتماعي" : "Social Media",
          votes: 179,
          percentage: 10,
        },
      ],
    },
    {
      id: 4,
      title:
        language === "ar"
          ? "أولوية المبادرات البيئية"
          : "Environmental Initiatives Priority",
      description:
        language === "ar"
          ? "ما أهم مبادرة بيئية يجب التركيز عليها؟"
          : "What is the most important environmental initiative to focus on?",
      totalVotes: 2456 + (userVotedPolls.has(4) ? 1 : 0),
      daysLeft: 12,
      options: [
        {
          id: 1,
          text:
            language === "ar"
              ? "تقليل النفايات البلاستيكية"
              : "Reducing Plastic Waste",
          votes: 982,
          percentage: 40,
        },
        {
          id: 2,
          text:
            language === "ar"
              ? "زيادة المساحات الخضراء"
              : "Increasing Green Spaces",
          votes: 737,
          percentage: 30,
        },
        {
          id: 3,
          text: language === "ar" ? "الطاقة المتجددة" : "Renewable Energy",
          votes: 491,
          percentage: 20,
        },
        {
          id: 4,
          text: language === "ar" ? "توفير المياه" : "Water Conservation",
          votes: 246,
          percentage: 10,
        },
      ],
    },
    {
      id: 5,
      title:
        language === "ar"
          ? "تفضيل أنواع الفعاليات الثقافية"
          : "Cultural Events Preference",
      description:
        language === "ar"
          ? "ما نوع الفعاليات الثقافية التي تفضلها أكثر؟"
          : "What type of cultural events do you prefer most?",
      totalVotes: 1345 + (userVotedPolls.has(5) ? 1 : 0),
      daysLeft: 14,
      options: [
        {
          id: 1,
          text: language === "ar" ? "المعارض الفنية" : "Art Exhibitions",
          votes: 404,
          percentage: 30,
        },
        {
          id: 2,
          text: language === "ar" ? "العروض المسرحية" : "Theater Performances",
          votes: 404,
          percentage: 30,
        },
        {
          id: 3,
          text:
            language === "ar" ? "المهرجانات التراثية" : "Heritage Festivals",
          votes: 336,
          percentage: 25,
        },
        {
          id: 4,
          text: language === "ar" ? "الحفلات الموسيقية" : "Music Concerts",
          votes: 201,
          percentage: 15,
        },
      ],
    },
  ];

  const toggleLike = (id: number) => {
    setForumIdeas((prev) => {
      const updated = prev.map((idea) => {
        if (idea.id === id) {
          const newIsLiked = !idea.isLiked;
          return {
            ...idea,
            isLiked: newIsLiked,
            likes: newIsLiked ? idea.likes + 1 : idea.likes - 1,
          };
        }
        return idea;
      });
      return updated;
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(
          language === "ar"
            ? "حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت)"
            : "Image size too large (max 5MB)"
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setUploadedImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedImageFile(null);
  };

  const handleSubmitIdea = () => {
    if (newIdea.trim() && newIdeaTitle.trim()) {
      if (
        checkInappropriateContent(newIdea) ||
        checkInappropriateContent(newIdeaTitle)
      ) {
        toast.error(
          language === "ar"
            ? "يحتوي المحتوى على كلمات غير مناسبة"
            : "Content contains inappropriate words"
        );
        return;
      }

      const newForumIdea = {
        id: Date.now(),
        title: newIdeaTitle,
        description: newIdea,
        author: userName,
        avatar: userProfilePhoto,
        timestamp: language === "ar" ? "الآن" : "Just now",
        category: language === "ar" ? "عام" : "General",
        likes: 0,
        replies: 0,
        views: 1,
        isLiked: false,
        comments: [],
        image: uploadedImage || undefined,
      };

      setForumIdeas((prev) => [newForumIdea, ...prev]);
      setNewIdea("");
      setNewIdeaTitle("");
      setUploadedImage(null);
      setUploadedImageFile(null);
      setShowNewIdeaForm(false);
      toast.success(
        language === "ar" ? "تم نشر الفكرة بنجاح!" : "Idea posted successfully!"
      );
    }
  };

  const handleAddComment = (discussionId: number) => {
    if (newComment.trim()) {
      if (checkInappropriateContent(newComment)) {
        toast.error(
          language === "ar"
            ? "يحتوي التعليق على كلمات غير مناسبة"
            : "Comment contains inappropriate words"
        );
        return;
      }

      const comment = {
        id: Date.now(),
        author: userName,
        text: newComment,
        timestamp: language === "ar" ? "الآن" : "Just now",
        avatar: userProfilePhoto,
      };

      setForumIdeas((prev) =>
        prev.map((idea) => {
          if (idea.id === discussionId) {
            return {
              ...idea,
              comments: [...idea.comments, comment],
              replies: idea.replies + 1,
            };
          }
          return idea;
        })
      );

      setNewComment("");
      toast.success(
        language === "ar"
          ? "تم إضافة التعليق بنجاح!"
          : "Comment added successfully!"
      );
    }
  };

  const handleSubmitSurvey = (surveyId: number) => {
    // Add to completed surveys
    const newCompletedSurveys = new Set([...userCompletedSurveys, surveyId]);
    setUserCompletedSurveys(newCompletedSurveys);
    localStorage.setItem(
      "sharek_completed_surveys",
      JSON.stringify([...newCompletedSurveys])
    );

    toast.success(
      language === "ar"
        ? "تم إرسال الاستطلاع بنجاح!"
        : "Survey submitted successfully!"
    );
    setSelectedSurvey(null);
    setSurveyAnswers({});
  };

  const handleSubmitVote = (pollId: number) => {
    if (selectedOptions[pollId]) {
      const newVotedPolls = new Set([...userVotedPolls, pollId]);
      setUserVotedPolls(newVotedPolls);
      localStorage.setItem(
        "sharek_voted_polls",
        JSON.stringify([...newVotedPolls])
      );

      toast.success(
        language === "ar" ? "تم التصويت بنجاح!" : "Vote submitted successfully!"
      );
      setSelectedPoll(null);
    }
  };

  const texts = {
    en: {
      title: "E-Participation",
      subtitle: "Your Voice Shapes Qatar",
      surveys: "Surveys",
      polls: "Polls",
      forums: "Forums",
      searchPlaceholder: "Search topics, surveys, polls...",
      participants: "participants",
      daysLeft: "days left",
      completed: "Completed",
      takeSurvey: "Take Survey",
      vote: "Vote",
      joinDiscussion: "Join Discussion",
      estimatedTime: "min estimated",
      newIdea: "Share New Idea",
      shareIdea: "Share your thoughts and ideas",
      submitIdea: "Submit Idea",
      cancel: "Cancel",
      titlePlaceholder: "Enter your idea title...",
      ideaPlaceholder: "Describe your idea in detail...",
      submitSurvey: "Submit Survey",
      submitVote: "Submit Vote",
      addComment: "Add Comment",
      writeComment: "Write your comment...",
      postComment: "Post Comment",
      backToList: "Back to List",
    },
    ar: {
      title: "المشاركة الإلكترونية",
      subtitle: "صوتك يشكل قطر",
      surveys: "الاستطلاعات",
      polls: "التصويت",
      forums: "المنتديات",
      searchPlaceholder: "البحث في المواضيع، الاستطلاعات، التصويت...",
      participants: "مشارك",
      daysLeft: "يوم متبقي",
      completed: "مكتمل",
      takeSurvey: "إجراء الاستطلاع",
      vote: "تصويت",
      joinDiscussion: "انضم للنقاش",
      estimatedTime: "دقيقة متوقعة",
      newIdea: "شارك فكرة جديدة",
      shareIdea: "شارك أفكارك ومقترحاتك",
      submitIdea: "إرسال الفكرة",
      cancel: "إلغاء",
      titlePlaceholder: "أدخل عنوان فكرتك...",
      ideaPlaceholder: "اوصف فكرتك بالتفصيل...",
      submitSurvey: "إرسال الاستطلاع",
      submitVote: "إرسال التصويت",
      addComment: "إضافة تعليق",
      writeComment: "اكتب تعليقك...",
      postComment: "نشر التعليق",
      backToList: "العودة للقائمة",
    },
  };

  const t = texts[language];

  // Survey Detail View
  if (selectedSurvey) {
    const survey = surveys.find((s) => s.id === selectedSurvey);
    if (!survey) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSurvey(null)}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium leading-tight">
                {survey.title}
              </h1>
              <p className="text-white/80 text-sm">
                {survey.participants} {t.participants}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">{survey.description}</p>

              <div className="space-y-6">
                {survey.questions.map((question) => (
                  <div key={question.id}>
                    <p className="font-medium mb-3">{question.question}</p>

                    {question.type === "rating" && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              onChange={(e) =>
                                setSurveyAnswers((prev) => ({
                                  ...prev,
                                  [`question-${question.id}`]: e.target.value,
                                }))
                              }
                              className="text-primary"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === "text" && (
                      <Textarea
                        placeholder={
                          language === "ar"
                            ? "اكتب إجابتك هنا..."
                            : "Write your answer here..."
                        }
                        className="bg-gray-50 border-gray-200 rounded-xl"
                        rows={4}
                        onChange={(e) =>
                          setSurveyAnswers((prev) => ({
                            ...prev,
                            [`question-${question.id}`]: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => handleSubmitSurvey(survey.id)}
            className="w-full h-12 bg-primary hover:bg-accent text-white"
          >
            {t.submitSurvey}
          </Button>
        </div>
      </div>
    );
  }

  // Poll Detail View
  if (selectedPoll) {
    const poll = polls.find((p) => p.id === selectedPoll);
    if (!poll) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPoll(null)}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium leading-tight">
                {poll.title}
              </h1>
              <p className="text-white/80 text-sm">
                {poll.totalVotes} {t.participants}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">{poll.description}</p>

              <div className="space-y-4">
                {poll.options.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedOptions[poll.id] === option.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <input
                            type="radio"
                            name={`poll-${poll.id}`}
                            value={option.id}
                            checked={selectedOptions[poll.id] === option.id}
                            onChange={() =>
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [poll.id]: option.id,
                              }))
                            }
                            className="text-primary"
                          />
                          <span className="text-gray-800">{option.text}</span>
                        </div>
                        <span className="font-medium text-primary">
                          {option.percentage}%
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${option.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        {option.votes} votes
                      </div>
                    </label>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => handleSubmitVote(poll.id)}
            disabled={!selectedOptions[poll.id] || userVotedPolls.has(poll.id)}
            className="w-full h-12 bg-primary hover:bg-accent text-white disabled:opacity-50"
          >
            {userVotedPolls.has(poll.id)
              ? language === "ar"
                ? "تم التصويت مسبقاً"
                : "Already Voted"
              : t.submitVote}
          </Button>
        </div>
      </div>
    );
  }

  // Discussion Detail View
  if (selectedDiscussion) {
    const discussion = forumIdeas.find((d) => d.id === selectedDiscussion);
    if (!discussion) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center p-6 pt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDiscussion(null)}
              className="mr-4 rtl:mr-0 rtl:ml-4"
            >
              <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-lg font-medium leading-tight">
                {discussion.title}
              </h1>
              <p className="text-white/80 text-sm">{discussion.author}</p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-4 relative z-10">
          {/* Discussion Content */}
          <Card className="bg-white shadow-lg rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <ImageWithFallback
                  src={discussion.avatar}
                  alt={discussion.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {discussion.author}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {discussion.timestamp}
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">
                  {discussion.category}
                </Badge>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {discussion.description}
              </p>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <Button
                    onClick={() => toggleLike(discussion.id)}
                    variant="ghost"
                    size="sm"
                    className={`${
                      discussion.isLiked ? "text-red-500" : "text-gray-500"
                    } hover:text-red-500`}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        discussion.isLiked ? "fill-current" : ""
                      }`}
                    />
                    {discussion.likes}
                  </Button>

                  <div className="flex items-center text-gray-500 text-sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {discussion.replies}
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {discussion.views}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="bg-white shadow-md rounded-2xl border-0 mb-6">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-800 mb-4">
                {language === "ar" ? "التعليق��ت" : "Comments"}
              </h3>

              {/* Existing Comments */}
              <div className="space-y-4 mb-6">
                {discussion.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-xl"
                  >
                    <ImageWithFallback
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                        <p className="font-medium text-sm text-gray-800">
                          {comment.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {comment.timestamp}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t.writeComment}
                    className="bg-gray-50 border-gray-200 rounded-xl resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={() => handleAddComment(discussion.id)}
                    className="bg-primary hover:bg-accent text-white"
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t.postComment}
                  </Button>
                </div>
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
          <div className="flex items-center">
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl border shadow-sm h-12 mb-6">
            <TabsTrigger
              value="surveys"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm"
            >
              {t.surveys}
            </TabsTrigger>
            <TabsTrigger
              value="polls"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm"
            >
              {t.polls}
            </TabsTrigger>
            <TabsTrigger
              value="forums"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm"
            >
              {t.forums}
            </TabsTrigger>
          </TabsList>

          {/* Surveys Tab */}
          <TabsContent value="surveys">
            <div className="space-y-4">
              {surveys
                .filter(
                  (survey) =>
                    survey.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    survey.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((survey) => (
                  <motion.div
                    key={survey.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white shadow-md rounded-2xl border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-800 mb-2">
                          {survey.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {survey.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">
                              {survey.participants}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.participants}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-orange-500">
                              {survey.daysLeft}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.daysLeft}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-green-500">
                              {survey.estimatedTime}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.estimatedTime}
                            </p>
                          </div>
                        </div>

                        <Button
                          onClick={() => setSelectedSurvey(survey.id)}
                          disabled={userCompletedSurveys.has(survey.id)}
                          className="w-full bg-primary hover:bg-accent text-white disabled:bg-gray-300 disabled:text-gray-500"
                        >
                          {userCompletedSurveys.has(survey.id)
                            ? language === "ar"
                              ? "تم الإكمال"
                              : "Completed"
                            : t.takeSurvey}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Polls Tab */}
          <TabsContent value="polls">
            <div className="space-y-4">
              {polls
                .filter(
                  (poll) =>
                    poll.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    poll.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((poll) => (
                  <motion.div
                    key={poll.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white shadow-md rounded-2xl border-0">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-gray-800 mb-2">
                          {poll.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {poll.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">
                              {poll.totalVotes}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.participants}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-orange-500">
                              {poll.daysLeft}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t.daysLeft}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {userVotedPolls.has(poll.id) && (
                              <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                {language === "ar" ? "تم التصويت" : "Voted"}
                              </Badge>
                            )}
                          </div>
                          <Button
                            onClick={() => setSelectedPoll(poll.id)}
                            disabled={userVotedPolls.has(poll.id)}
                            className="bg-primary hover:bg-accent text-white disabled:bg-gray-300 disabled:text-gray-500"
                          >
                            {userVotedPolls.has(poll.id)
                              ? language === "ar"
                                ? "تم التصويت"
                                : "Voted"
                              : t.vote}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Forums Tab - FIXED LAYOUT */}
          <TabsContent value="forums">
            <div className="space-y-4">
              {/* Share New Idea Button */}
              <Card className="bg-gradient-to-r from-accent to-primary text-white shadow-md rounded-2xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-2">{t.newIdea}</h3>
                      <p className="text-white/80 text-sm">{t.shareIdea}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNewIdeaForm(true)}
                      className="bg-white/20 p-3 rounded-xl"
                    >
                      <Lightbulb className="w-6 h-6" />
                    </motion.button>
                  </div>
                </CardContent>
              </Card>

              {/* New Idea Form */}
              {showNewIdeaForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white shadow-md rounded-2xl border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800">
                          {t.shareIdea}
                        </h3>
                        <Button
                          onClick={() => setShowNewIdeaForm(false)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <Input
                          value={newIdeaTitle}
                          onChange={(e) => setNewIdeaTitle(e.target.value)}
                          placeholder={t.titlePlaceholder}
                          className="bg-gray-50 border-gray-200 rounded-xl"
                        />
                        <Textarea
                          value={newIdea}
                          onChange={(e) => setNewIdea(e.target.value)}
                          placeholder={t.ideaPlaceholder}
                          rows={4}
                          className="bg-gray-50 border-gray-200 rounded-xl resize-none"
                        />

                        {/* Image Upload Section */}
                        <div className="space-y-2">
                          <label
                            htmlFor="forum-image-upload"
                            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <ImagePlus className="w-5 h-5 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {language === "ar"
                                ? "إضافة صورة (اختياري)"
                                : "Add image (optional)"}
                            </span>
                          </label>
                          <input
                            id="forum-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />

                          {uploadedImage && (
                            <div className="relative rounded-xl overflow-hidden">
                              <img
                                src={uploadedImage}
                                alt="Upload preview"
                                className="w-full h-48 object-cover"
                              />
                              <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-full hover:bg-destructive/90 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-3 rtl:space-x-reverse">
                          <Button
                            onClick={handleSubmitIdea}
                            className="flex-1 bg-primary hover:bg-accent text-white"
                          >
                            {t.submitIdea}
                          </Button>
                          <Button
                            onClick={() => {
                              setShowNewIdeaForm(false);
                              setNewIdea("");
                              setNewIdeaTitle("");
                              setUploadedImage(null);
                              setUploadedImageFile(null);
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            {t.cancel}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Forum Ideas - FIXED LAYOUT */}
              {forumIdeas
                .filter(
                  (idea) =>
                    idea.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    idea.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white shadow-md rounded-2xl border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse mb-4">
                          <ImageWithFallback
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {discussion.author}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  {discussion.timestamp}
                                </p>
                              </div>
                              <Badge className="bg-primary/10 text-primary border-0">
                                {discussion.category}
                              </Badge>
                            </div>

                            <h3 className="font-medium text-gray-800 mb-2 leading-tight">
                              {discussion.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {discussion.description}
                            </p>

                            {/* Display uploaded image if exists */}
                            {(discussion as any).image && (
                              <div className="mt-3 rounded-xl overflow-hidden">
                                <img
                                  src={(discussion as any).image}
                                  alt="Forum post image"
                                  className="w-full max-h-80 object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* FIXED FORUM LAYOUT */}
                        <div className="border-t pt-4 mt-4">
                          <div className="space-y-3">
                            {/* Engagement Stats - Top Row */}
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <Button
                                onClick={() => toggleLike(discussion.id)}
                                variant="ghost"
                                size="sm"
                                className={`${
                                  discussion.isLiked
                                    ? "text-red-500"
                                    : "text-gray-500"
                                } hover:text-red-500 h-8 px-2`}
                              >
                                <Heart
                                  className={`w-4 h-4 mr-1 ${
                                    discussion.isLiked ? "fill-current" : ""
                                  }`}
                                />
                                {discussion.likes}
                              </Button>

                              <div className="flex items-center text-gray-500 text-sm">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {discussion.replies}
                              </div>

                              <div className="flex items-center text-gray-500 text-sm">
                                <Eye className="w-4 h-4 mr-1" />
                                {discussion.views}
                              </div>
                            </div>

                            {/* Join Discussion Button - Full Width Bottom Row */}
                            <Button
                              onClick={() =>
                                setSelectedDiscussion(discussion.id)
                              }
                              className="w-full bg-primary hover:bg-accent text-white h-11 rounded-xl"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              {t.joinDiscussion}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
