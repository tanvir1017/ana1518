export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  nationality?: string;
  profilePhoto?: string;
  dateOfBirth?: string;
  address?: string;
  created: string;
}

export interface UserSettings {
  notifications: boolean;
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface UserData {
  profile: UserProfile;
  settings: UserSettings;
  feedbackCount: number;
  satisfactionRatings: Array<{
    service: string;
    rating: number;
    date: string;
  }>;
  serviceCenterRatings: Array<{
    centerId: number;
    centerName: string;
    rating: number;
    date: string;
  }>;
  appointments: Array<{
    id: string;
    service: string;
    date: string;
    status: 'scheduled' | 'completed' | 'cancelled';
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    type: 'info' | 'warning' | 'success';
  }>;
}

export const QATAR_NATIONALITIES = [
  'Qatari',
  'Saudi Arabian',
  'Emirati',
  'Kuwaiti',
  'Bahraini',
  'Omani',
  'Egyptian',
  'Lebanese',
  'Syrian',
  'Jordanian',
  'Palestinian',
  'Iraqi',
  'Yemeni',
  'Sudanese',
  'Moroccan',
  'Tunisian',
  'Algerian',
  'Libyan',
  'Pakistani',
  'Indian',
  'Bangladeshi',
  'Sri Lankan',
  'Filipino',
  'Indonesian',
  'Malaysian',
  'Thai',
  'Vietnamese',
  'Chinese',
  'Japanese',
  'Korean',
  'Iranian',
  'Turkish',
  'Afghan',
  'Ethiopian',
  'Eritrean',
  'Somali',
  'Kenyan',
  'Tanzanian',
  'Ugandan',
  'Ghanaian',
  'Nigerian',
  'South African',
  'British',
  'American',
  'Canadian',
  'Australian',
  'French',
  'German',
  'Italian',
  'Spanish',
  'Dutch',
  'Swedish',
  'Norwegian',
  'Russian',
  'Ukrainian',
  'Polish',
  'Czech',
  'Hungarian',
  'Romanian',
  'Bulgarian',
  'Croatian',
  'Serbian',
  'Bosnian',
  'Albanian',
  'Greek',
  'Portuguese',
  'Brazilian',
  'Argentinian',
  'Colombian',
  'Venezuelan',
  'Chilean',
  'Peruvian',
  'Mexican',
  'Other'
];

class DataManager {
  private static readonly STORAGE_KEY = 'sharek_app_data';
  private static readonly USERS_KEY = 'sharek_users';

  static saveUser(userData: UserData): void {
    // Get users directly from localStorage without triggering getAllUsers() 
    // to prevent circular dependency during user creation
    const stored = localStorage.getItem(this.USERS_KEY);
    const users = stored ? JSON.parse(stored) : {};
    users[userData.profile.email] = userData;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static getUser(email: string): UserData | null {
    const users = this.getAllUsers();
    return users[email] || null;
  }

  static getAllUsers(): Record<string, UserData> {
    console.log('DataManager: getAllUsers called');
    const stored = localStorage.getItem(this.USERS_KEY);
    console.log('DataManager: Stored users data:', stored ? 'Found' : 'Not found');
    
    let users = stored ? JSON.parse(stored) : {};
    console.log('DataManager: Parsed users count:', Object.keys(users).length);
    
    // Create default test users if none exist and not already in the process of creating them
    if (Object.keys(users).length === 0 && !this.isCreatingDefaultUsers) {
      console.log('DataManager: No users found, creating default users...');
      this.isCreatingDefaultUsers = true;
      this.createDefaultUsers();
      this.isCreatingDefaultUsers = false;
      users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '{}');
      console.log('DataManager: Default users created, count:', Object.keys(users).length);
      console.log('DataManager: User emails:', Object.keys(users));
    }
    
    return users;
  }

  private static isCreatingDefaultUsers = false;

  private static createDefaultUsers(): void {
    console.log('DataManager: createDefaultUsers called');
    const defaultUsers = [
      {
        id: 'test1',
        name: 'Ahmed Al-Mansouri',
        email: 'test@sharek.gov.qa',
        password: 'test123',
        phone: '+974 5555 1234',
        nationality: 'Qatari',
        created: new Date().toISOString()
      },
      {
        id: 'demo1',
        name: 'Sara Al-Thani',
        email: 'demo@sharek.gov.qa',
        password: 'demo123',
        phone: '+974 5555 5678',
        nationality: 'Qatari',
        created: new Date().toISOString()
      },
      {
        id: 'admin1',
        name: 'Mohamed Al-Kuwari',
        email: 'admin@sharek.gov.qa',
        password: 'admin123',
        phone: '+974 5555 9999',
        nationality: 'Qatari',
        created: new Date().toISOString()
      }
    ];

    console.log('DataManager: Creating', defaultUsers.length, 'default users');
    defaultUsers.forEach((profile, index) => {
      console.log(`DataManager: Creating user ${index + 1}:`, profile.email);
      this.createUser(profile);
    });
    console.log('DataManager: All default users created');
  }

  static createUser(profile: UserProfile): UserData {
    console.log('DataManager: Creating user with profile:', profile.email);
    const userData: UserData = {
      profile,
      settings: {
        notifications: true,
        language: 'en',
        theme: 'light',
        emailNotifications: true,
        smsNotifications: true,
      },
      feedbackCount: 0,
      satisfactionRatings: [],
      serviceCenterRatings: [],
      appointments: [],
      notifications: [
        {
          id: '1',
          title: 'Welcome to Sharek!',
          message: 'Thank you for joining Qatar\'s digital government platform.',
          date: new Date().toISOString(),
          read: false,
          type: 'success'
        }
      ]
    };
    
    this.saveUser(userData);
    console.log('DataManager: User created and saved successfully for:', profile.email);
    return userData;
  }

  static updateUserProfile(email: string, profileUpdates: Partial<UserProfile>): UserData | null {
    const userData = this.getUser(email);
    if (!userData) return null;

    userData.profile = { ...userData.profile, ...profileUpdates };
    this.saveUser(userData);
    return userData;
  }

  static updateUserSettings(email: string, settingsUpdates: Partial<UserSettings>): UserData | null {
    const userData = this.getUser(email);
    if (!userData) return null;

    userData.settings = { ...userData.settings, ...settingsUpdates };
    this.saveUser(userData);
    return userData;
  }

  static addFeedback(email: string): void {
    const userData = this.getUser(email);
    if (userData) {
      userData.feedbackCount += 1;
      this.saveUser(userData);
    }
  }

  static addSatisfactionRating(email: string, service: string, rating: number): void {
    const userData = this.getUser(email);
    if (userData) {
      userData.satisfactionRatings.push({
        service,
        rating,
        date: new Date().toISOString()
      });
      this.saveUser(userData);
    }
  }

  static addAppointment(email: string, appointment: { service: string; date: string }): string {
    const userData = this.getUser(email);
    if (userData) {
      const appointmentId = `apt_${Date.now()}`;
      userData.appointments.push({
        id: appointmentId,
        service: appointment.service,
        date: appointment.date,
        status: 'scheduled'
      });
      this.saveUser(userData);
      return appointmentId;
    }
    return '';
  }

  static addNotification(email: string, notification: Omit<UserData['notifications'][0], 'id'>): void {
    const userData = this.getUser(email);
    if (userData) {
      userData.notifications.unshift({
        ...notification,
        id: `notif_${Date.now()}`
      });
      this.saveUser(userData);
    }
  }

  static markNotificationAsRead(email: string, notificationId: string): void {
    const userData = this.getUser(email);
    if (userData) {
      const notification = userData.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        this.saveUser(userData);
      }
    }
  }

  static validateCredentials(email: string, password: string): UserData | null {
    try {
      console.log('DataManager: validateCredentials called for:', email);
      
      // Directly get user without calling getAllUsers to prevent recursion
      const userData = this.getUser(email);
      console.log('DataManager: User found:', userData ? 'Yes' : 'No');
      
      if (userData) {
        const passwordMatch = userData.profile.password === password;
        console.log('DataManager: Password match:', passwordMatch);
        
        if (passwordMatch) {
          console.log('DataManager: Credentials validated successfully');
          return userData;
        }
      }
      
      console.log('DataManager: Credentials validation failed');
      return null;
    } catch (error) {
      console.error('DataManager: Error in validateCredentials:', error);
      return null;
    }
  }

  static emailExists(email: string): boolean {
    return this.getUser(email) !== null;
  }

  static getCurrentUser(): UserData | null {
    const currentUserEmail = localStorage.getItem('current_user_email');
    return currentUserEmail ? this.getUser(currentUserEmail) : null;
  }

  static setCurrentUser(email: string): void {
    localStorage.setItem('current_user_email', email);
  }

  static clearCurrentUser(): void {
    localStorage.removeItem('current_user_email');
  }

  static getUnreadNotificationCount(email: string): number {
    const userData = this.getUser(email);
    return userData ? userData.notifications.filter(n => !n.read).length : 0;
  }

  static addServiceCenterRating(email: string, centerId: number, centerName: string, rating: number): void {
    const userData = this.getUser(email);
    if (userData) {
      // Initialize serviceCenterRatings if it doesn't exist (for legacy user data)
      if (!userData.serviceCenterRatings) {
        userData.serviceCenterRatings = [];
      }
      
      // Check if user has already rated this center
      const existingRatingIndex = userData.serviceCenterRatings.findIndex(r => r.centerId === centerId);
      
      if (existingRatingIndex !== -1) {
        // Update existing rating
        userData.serviceCenterRatings[existingRatingIndex] = {
          centerId,
          centerName,
          rating,
          date: new Date().toISOString()
        };
      } else {
        // Add new rating
        userData.serviceCenterRatings.push({
          centerId,
          centerName,
          rating,
          date: new Date().toISOString()
        });
      }
      
      this.saveUser(userData);
    }
  }

  static getServiceCenterRating(email: string, centerId: number): number | null {
    const userData = this.getUser(email);
    if (userData) {
      // Initialize serviceCenterRatings if it doesn't exist (for legacy user data)
      if (!userData.serviceCenterRatings) {
        userData.serviceCenterRatings = [];
      }
      
      const rating = userData.serviceCenterRatings.find(r => r.centerId === centerId);
      return rating ? rating.rating : null;
    }
    return null;
  }
}

export default DataManager;