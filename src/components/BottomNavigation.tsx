import React from 'react';
import { motion } from 'motion/react';
import { Home, MessageCircle, Info, User } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

export default function BottomNavigation({ currentScreen, onNavigate, language }: BottomNavigationProps) {
  const texts = {
    en: {
      home: 'Home',
      chatbot: 'Assistant',
      about: 'About',
      account: 'Account'
    },
    ar: {
      home: 'الرئيسية',
      chatbot: 'المساعد',
      about: 'عن شارك',
      account: 'الحساب'
    }
  };

  const t = texts[language];

  const navItems = [
    { icon: Home, label: t.home, screen: 'home' },
    { icon: MessageCircle, label: t.chatbot, screen: 'chatbot' },
    { icon: Info, label: t.about, screen: 'about' },
    { icon: User, label: t.account, screen: 'account' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          
          return (
            <motion.button
              key={item.screen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center space-y-1 py-1 px-2 rounded-lg transition-colors"
            >
              <div className={`p-1.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-[#468BA4] to-[#1E425E] text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isActive ? 'text-[#468BA4]' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}