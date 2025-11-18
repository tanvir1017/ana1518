import { motion } from "motion/react";
import { useEffect, useState } from "react";
import AboutUsScreen from "./components/AboutUsScreen";
import AccountScreen from "./components/AccountScreen";
import AccountSecurityScreen from "./components/AccountSecurityScreen";
import AppointmentBookingScreen from "./components/AppointmentBookingScreen";
import AppointmentDetailsScreen from "./components/AppointmentDetailsScreen";
import BottomNavigation from "./components/BottomNavigation";
import ChatbotScreen from "./components/ChatbotScreen";
import ContactSupportScreen from "./components/ContactSupportScreen";
import EditProfileScreen from "./components/EditProfileScreen";
import EParticipationScreen from "./components/EParticipationScreen";
import FeedbackTrackerScreen from "./components/FeedbackTrackerScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import HelpCenterScreen from "./components/HelpCenterScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import NewsArticleScreen from "./components/NewsArticleScreen";
import NewsListScreen from "./components/NewsListScreen";
import NotificationScreen from "./components/NotificationScreen";
import PolicyConsultationDetailScreen from "./components/PolicyConsultationDetailScreen";
import PolicyConsultationScreen from "./components/PolicyConsultationScreen";
import PrivacySettingsScreen from "./components/PrivacySettingsScreen";
import RateAppScreen from "./components/RateAppScreen";
import ReportIssueScreen from "./components/ReportIssueScreen";
import SatisfactionIndexScreen from "./components/SatisfactionIndexScreen";
import ServiceCatalogScreen from "./components/ServiceCatalogScreen";
import ServiceCenterScreen from "./components/ServiceCenterScreen";
import ServiceCentersScreen from "./components/ServiceCentersScreen";
import ServiceDetailsScreen from "./components/ServiceDetailsScreen";
import ServiceFeedbackSurveyScreen from "./components/ServiceFeedbackSurveyScreen";
import SignupScreen from "./components/SignupScreen";
import SplashScreen from "./components/SplashScreen";
import { Toaster } from "./components/ui/sonner";
import DataManager, { UserData } from "./components/utils/dataManager";

type Screen =
  | "splash"
  | "login"
  | "signup"
  | "forgot-password"
  | "home"
  | "e-participation"
  | "policy-consultation"
  | "policy-consultation-detail"
  | "news-article"
  | "service-catalog"
  | "service-details-1"
  | "service-details-2"
  | "service-details-3"
  | "service-details-4"
  | "service-details-5"
  | "service-details-6"
  | "service-details-7"
  | "service-details-8"
  | "service-details-9"
  | "service-details-10"
  | "service-details-11"
  | "service-details-12"
  | "service-details-13"
  | "service-details-14"
  | "service-details-15"
  | "service-details-16"
  | "service-details-17"
  | "service-details-18"
  | "service-details-19"
  | "service-details-20"
  | "service-centers"
  | "service-center"
  | "service-feedback-survey"
  | "feedback-tracker"
  | "satisfaction-index"
  | "chatbot"
  | "about"
  | "account"
  | "news-list"
  | "notifications"
  | "appointment-booking"
  | "appointment-details"
  | "account-security"
  | "privacy-settings"
  | "help-center"
  | "contact-support"
  | "report-issue"
  | "edit-profile"
  | "rate-app";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | undefined>(
    undefined
  );
  const [selectedCenter, setSelectedCenter] = useState<any>(undefined);
  const [selectedCenterId, setSelectedCenterId] = useState<number | undefined>(
    undefined
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedConsultationId, setSelectedConsultationId] = useState<
    number | undefined
  >(undefined);
  const [selectedNewsId, setSelectedNewsId] = useState<number | undefined>(
    undefined
  );
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | undefined
  >(undefined);
  const [selectedServiceName, setSelectedServiceName] = useState<
    string | undefined
  >(undefined);
  const [previousScreen, setPreviousScreen] = useState<Screen | undefined>(
    undefined
  );
  const [preSelectedServiceName, setPreSelectedServiceName] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    // Check for existing user session
    const currentUser = DataManager.getCurrentUser();
    if (currentUser) {
      setUserData(currentUser);
      setIsAuthenticated(true);
      setLanguage(currentUser.settings.language);
    }

    // Start with splash screen
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        if (!isAuthenticated) {
          setCurrentScreen("login");
        } else {
          setCurrentScreen("home");
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, currentScreen]);

  const handleLogin = (email: string, password: string) => {
    try {
      console.log("=== APP HANDLELOGIN START ===");
      console.log("App: handleLogin called for:", email);

      // Check localStorage first
      const storedUsers = localStorage.getItem("sharek_users");
      console.log(
        "App: Stored users in localStorage:",
        storedUsers ? "Found" : "Not found"
      );

      const user = DataManager.validateCredentials(email, password);
      console.log(
        "App: DataManager.validateCredentials result:",
        user ? "User found" : "No user"
      );

      if (user) {
        console.log("App: User validated, setting up session...");
        console.log("App: User data:", {
          email: user.profile.email,
          name: user.profile.name,
        });

        setUserData(user);
        setIsAuthenticated(true);
        setLanguage(user.settings.language);
        DataManager.setCurrentUser(email);
        setCurrentScreen("home");

        console.log("App: All state updated, authentication complete");
        console.log("App: isAuthenticated will be:", true);
        console.log("App: currentScreen will be:", "home");
        console.log("=== APP HANDLELOGIN SUCCESS ===");
        return true;
      }

      console.log("App: Login failed - user validation failed");
      console.log("=== APP HANDLELOGIN FAILED ===");
      return false;
    } catch (error) {
      console.error("App: Error in handleLogin:", error);
      console.log("=== APP HANDLELOGIN ERROR ===");
      return false;
    }
  };

  const handleSignup = (profileData: any) => {
    try {
      console.log("=== APP HANDLESIGNUP START ===");
      console.log("App: handleSignup called with:", {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        nationality: profileData.nationality,
      });

      const userProfile = {
        id: Date.now().toString(),
        name: profileData.name,
        email: profileData.email,
        password: profileData.password,
        phone: profileData.phone,
        nationality: profileData.nationality,
        created: new Date().toISOString(),
      };

      console.log("App: Creating user with profile...");
      const newUser = DataManager.createUser(userProfile);
      console.log("App: User created:", newUser ? "Success" : "Failed");

      if (newUser) {
        console.log("App: Setting up user session...");
        setUserData(newUser);
        setIsAuthenticated(true);
        setLanguage(newUser.settings.language);
        DataManager.setCurrentUser(profileData.email);
        setCurrentScreen("home");

        console.log("App: Signup completed successfully");
        console.log("App: isAuthenticated will be:", true);
        console.log("App: currentScreen will be:", "home");
        console.log("=== APP HANDLESIGNUP SUCCESS ===");
      } else {
        console.error("App: Failed to create user");
        console.log("=== APP HANDLESIGNUP FAILED ===");
      }
    } catch (error) {
      console.error("App: Error in handleSignup:", error);
      console.log("=== APP HANDLESIGNUP ERROR ===");
    }
  };

  const handleLogout = () => {
    DataManager.clearCurrentUser();
    setUserData(null);
    setIsAuthenticated(false);
    setCurrentScreen("login");
  };

  const handleProfileUpdate = (updatedUserData: UserData) => {
    setUserData(updatedUserData);
  };

  const handleLanguageChange = (newLanguage: "en" | "ar") => {
    setLanguage(newLanguage);
    if (userData) {
      DataManager.updateUserSettings(userData.profile.email, {
        language: newLanguage,
      });
      const updatedUser = DataManager.getUser(userData.profile.email);
      if (updatedUser) {
        setUserData(updatedUser);
      }
    }
  };

  const navigateToScreen = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    if (data?.appointmentId) {
      setAppointmentId(data.appointmentId);
    } else {
      setAppointmentId(undefined);
    }

    if (data?.centerId) {
      setSelectedCenterId(data.centerId);
      if (data?.centerName) {
        setSelectedCenter({
          id: data.centerId,
          name: data.centerName,
          address: data.centerAddress || "",
        });
      }
    } else if (
      screen !== "appointment-booking" &&
      screen !== "service-center"
    ) {
      setSelectedCenter(undefined);
      setSelectedCenterId(undefined);
    }

    if (data?.consultationId) {
      setSelectedConsultationId(data.consultationId);
    } else if (screen !== "policy-consultation-detail") {
      setSelectedConsultationId(undefined);
    }

    if (data?.newsId) {
      setSelectedNewsId(data.newsId);
    } else if (screen !== "news-article") {
      setSelectedNewsId(undefined);
    }

    if (data?.serviceId) {
      setSelectedServiceId(data.serviceId);
      setSelectedServiceName(data.serviceName);
    } else if (screen !== "service-feedback-survey") {
      setSelectedServiceId(undefined);
      setSelectedServiceName(undefined);
    }

    // Handle appointment booking navigation with service name and previous screen
    if (screen === "appointment-booking") {
      if (data?.serviceName) {
        setPreSelectedServiceName(data.serviceName);
      } else {
        setPreSelectedServiceName(undefined);
      }
      if (data?.previousScreen) {
        setPreviousScreen(data.previousScreen as Screen);
      } else {
        setPreviousScreen(undefined);
      }
    } else {
      setPreSelectedServiceName(undefined);
      setPreviousScreen(undefined);
    }

    // Trigger refresh for service center when navigating back to it
    if (screen === "service-center" || screen === "service-centers") {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const renderScreen = () => {
    const userEmail = userData?.profile.email || "";

    switch (currentScreen) {
      case "splash":
        return <SplashScreen />;
      case "login":
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "signup":
        return (
          <SignupScreen
            onSignup={handleSignup}
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordScreen
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "home":
        return (
          <HomeScreen
            userData={userData}
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "e-participation":
        return (
          <EParticipationScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "policy-consultation":
        return (
          <PolicyConsultationScreen
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "policy-consultation-detail":
        return (
          <PolicyConsultationDetailScreen
            onNavigate={navigateToScreen}
            language={language}
            consultationId={selectedConsultationId}
          />
        );
      case "news-article":
        return (
          <NewsArticleScreen
            onNavigate={navigateToScreen}
            language={language}
            newsId={selectedNewsId}
          />
        );
      case "service-catalog":
        return (
          <ServiceCatalogScreen
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "service-details-1":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="1"
          />
        );
      case "service-details-2":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="2"
          />
        );
      case "service-details-3":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="3"
          />
        );
      case "service-details-4":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="4"
          />
        );
      case "service-details-5":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="5"
          />
        );
      case "service-details-6":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="6"
          />
        );
      case "service-details-7":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="7"
          />
        );
      case "service-details-8":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="8"
          />
        );
      case "service-details-9":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="9"
          />
        );
      case "service-details-10":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="10"
          />
        );
      case "service-details-11":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="11"
          />
        );
      case "service-details-12":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="12"
          />
        );
      case "service-details-13":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="13"
          />
        );
      case "service-details-14":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="14"
          />
        );
      case "service-details-15":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="15"
          />
        );
      case "service-details-16":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="16"
          />
        );
      case "service-details-17":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="17"
          />
        );
      case "service-details-18":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="18"
          />
        );
      case "service-details-19":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="19"
          />
        );
      case "service-details-20":
        return (
          <ServiceDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            serviceId="20"
          />
        );
      case "service-centers":
        return (
          <ServiceCentersScreen
            onNavigate={navigateToScreen}
            language={language}
          />
        );
      case "service-center":
        return (
          <ServiceCenterScreen
            onNavigate={navigateToScreen}
            language={language}
            refreshTrigger={refreshTrigger}
            selectedCenterId={selectedCenterId}
            userEmail={userEmail}
          />
        );
      case "service-feedback-survey":
        return (
          <ServiceFeedbackSurveyScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
            serviceId={selectedServiceId}
            serviceName={selectedServiceName}
          />
        );
      case "feedback-tracker":
        return (
          <FeedbackTrackerScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "satisfaction-index":
        return (
          <SatisfactionIndexScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "chatbot":
        return (
          <ChatbotScreen onNavigate={navigateToScreen} language={language} />
        );
      case "about":
        return (
          <AboutUsScreen onNavigate={navigateToScreen} language={language} />
        );
      case "account":
        return (
          <AccountScreen
            userData={userData}
            onLogout={handleLogout}
            onNavigate={navigateToScreen}
            language={language}
            setLanguage={handleLanguageChange}
          />
        );
      case "news-list":
        return (
          <NewsListScreen onNavigate={navigateToScreen} language={language} />
        );
      case "notifications":
        return (
          <NotificationScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "appointment-booking":
        return (
          <AppointmentBookingScreen
            onNavigate={navigateToScreen}
            language={language}
            selectedCenter={selectedCenter}
            userEmail={userEmail}
            preSelectedServiceName={preSelectedServiceName}
            previousScreen={previousScreen}
          />
        );
      case "appointment-details":
        return (
          <AppointmentDetailsScreen
            onNavigate={navigateToScreen}
            language={language}
            appointmentId={appointmentId}
          />
        );
      case "account-security":
        return (
          <AccountSecurityScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "privacy-settings":
        return (
          <PrivacySettingsScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "help-center":
        return (
          <HelpCenterScreen onNavigate={navigateToScreen} language={language} />
        );
      case "contact-support":
        return (
          <ContactSupportScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "report-issue":
        return (
          <ReportIssueScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      case "edit-profile":
        return (
          <EditProfileScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case "rate-app":
        return (
          <RateAppScreen
            onNavigate={navigateToScreen}
            language={language}
            userEmail={userEmail}
          />
        );
      default:
        return (
          <HomeScreen
            userData={userData}
            onNavigate={navigateToScreen}
            language={language}
          />
        );
    }
  };

  const showBottomNav =
    isAuthenticated &&
    currentScreen !== "splash" &&
    currentScreen !== "login" &&
    currentScreen !== "signup" &&
    currentScreen !== "forgot-password";

  return (
    <div
      className={`min-h-screen bg-gray-50 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      {/* Mobile App Container */}
      <div className="mx-auto max-w-sm min-h-screen bg-white shadow-2xl relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative min-h-screen"
        >
          {renderScreen()}

          {showBottomNav && (
            <BottomNavigation
              currentScreen={currentScreen}
              onNavigate={navigateToScreen}
              language={language}
              userData={userData}
            />
          )}
        </motion.div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
