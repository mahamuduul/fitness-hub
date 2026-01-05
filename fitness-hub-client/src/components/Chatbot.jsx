import { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 I\'m your Health & Fitness Hub assistant. How can I help you today?',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Medical related queries
    if (message.includes('doctor') || message.includes('medical') || message.includes('health')) {
      return 'Our Medical page connects you with expert doctors in Rajshahi. You can find specialists in Cardiology, Neurology, Orthopedics, and more. Visit the Medical section to see doctor profiles, chamber locations, and contact information.';
    }

    // Gym related queries
    if (message.includes('gym') || message.includes('fitness center') || message.includes('workout')) {
      return 'We list 30+ premium gyms and fitness centers across Rajshahi. Each gym offers modern equipment, expert trainers, and various membership plans. Check out our Gym page to find a location near you!';
    }

    // Nutrition related queries
    if (message.includes('nutrition') || message.includes('food') || message.includes('diet') || message.includes('calories') || message.includes('protein')) {
      return 'Our Nutrition Guide provides detailed macro information for healthy foods including calories, protein, carbs, fat, and quantity. You can search for specific foods to see their nutritional values per 100g.';
    }

    // Diet calculator queries
    if (message.includes('calculate') || message.includes('macro') || message.includes('calorie calculator')) {
      return 'The Diet Calculator helps you calculate your daily caloric and macro needs based on your personal data. Visit the Diet page to get personalized recommendations!';
    }

    // Mind training queries
    if (message.includes('mind') || message.includes('meditation') || message.includes('yoga') || message.includes('mental') || message.includes('stress')) {
      return 'Our Mind Training section offers guidance on meditation and yoga practices. Learn breathing techniques, mindfulness exercises, and mental wellness tips to reduce stress and improve focus.';
    }

    // About queries
    if (message.includes('about') || message.includes('what is') || message.includes('who are')) {
      return 'Health & Fitness Hub is your complete wellness platform offering medical consultancy, nutrition guidance, diet planning, gym finder, and mental wellness resources—all in one place for the Rajshahi community.';
    }

    // Contact queries
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return 'You can reach us through the Contact page. We\'re here to help with any questions about our services, gym memberships, or medical consultations.';
    }

    // Registration/Login queries
    if (message.includes('register') || message.includes('sign up') || message.includes('account') || message.includes('login')) {
      return 'You can create an account by clicking the Register button in the navigation. This allows you to save your preferences, track your progress, and get personalized recommendations.';
    }

    // Features overview
    if (message.includes('feature') || message.includes('service') || message.includes('offer')) {
      return 'We offer:\n• Medical Consultancy - Find expert doctors\n• Gym Finder - 30+ fitness centers\n• Nutrition Guide - Detailed food macros\n• Diet Calculator - Personalized plans\n• Mind Training - Meditation & yoga\n• Wellness Tips - Health guidelines';
    }

    // Location queries
    if (message.includes('location') || message.includes('where') || message.includes('rajshahi')) {
      return 'We primarily serve the Rajshahi area with comprehensive listings of doctors, gyms, and wellness centers throughout the city. Our platform helps you find nearby healthcare and fitness facilities.';
    }

    // Help/Navigation
    if (message.includes('help') || message.includes('how') || message.includes('navigate')) {
      return 'You can navigate through our website using the menu:\n• Home - Overview & features\n• Medical - Find doctors\n• Gym - Browse fitness centers\n• Nutrition - Food guide\n• Diet - Calculate macros\n• Mind - Mental wellness\n• About - Learn about us\n• Contact - Get in touch';
    }

    // Default response
    return 'I can help you with information about:\n• Finding doctors and medical services\n• Locating gyms and fitness centers\n• Nutrition and food macros\n• Diet calculations\n• Mind training and wellness\n• General website navigation\n\nWhat would you like to know more about?';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // Get bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputMessage),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputMessage('');
  };

  const quickQuestions = [
    'Find doctors',
    'Browse gyms',
    'Nutrition info',
    'Calculate diet',
    'Mental wellness'
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chatbot"
      >
        <FaComments className="text-2xl group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaRobot className="text-gray-900 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-white">Health Hub Assistant</h3>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chatbot"
            >
              <FaTimes className="text-white text-lg" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-gray-900 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs font-bold text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
              />
              <button
                type="submit"
                className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputMessage.trim()}
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
