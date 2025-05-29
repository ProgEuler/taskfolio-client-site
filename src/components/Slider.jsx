import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Rocket, Users, Globe, Zap, Code, Palette, Camera, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      title: "Find the Perfect Freelancer for Your Project",
      subtitle: "Connect with skilled professionals from around the world",
      description: "Post your project and receive competitive bids from talented freelancers ready to bring your vision to life.",
      buttonText: "Post a Project",
      bgGradient: "from-blue-600 via-purple-600 to-indigo-100",
      icon: Rocket,
      floatingIcons: [
        { Icon: Code, x: 15, y: 20, delay: 0 },
        { Icon: Palette, x: 85, y: 15, delay: 0.5 },
        { Icon: Camera, x: 10, y: 70, delay: 1 },
        { Icon: MessageCircle, x: 80, y: 75, delay: 1.5 }
      ]
    },
    {
      title: "Build Your Dream Team",
      subtitle: "Access a global network of creative professionals",
      description: "From web developers to graphic designers, find experts who understand your vision and deliver exceptional results.",
      buttonText: "Browse Talent",
      bgGradient: "from-emerald-500 via-teal-500 to-cyan-100",
      icon: Users,
      floatingIcons: [
        { Icon: Globe, x: 20, y: 25, delay: 0 },
        { Icon: Zap, x: 75, y: 20, delay: 0.3 },
        { Icon: Users, x: 15, y: 65, delay: 0.6 },
        { Icon: Rocket, x: 85, y: 70, delay: 0.9 }
      ]
    },
    {
      title: "Scale Your Business Faster",
      subtitle: "Turn ideas into reality with expert freelancers",
      description: "Whether you need a quick fix or a complete overhaul, our platform connects you with professionals who deliver quality work on time.",
      buttonText: "Get Started",
      bgGradient: "from-orange-600 via-red-400 to-pink-300",
      icon: Zap,
      floatingIcons: [
        { Icon: Code, x: 25, y: 30, delay: 0.2 },
        { Icon: Globe, x: 70, y: 25, delay: 0.4 },
        { Icon: Palette, x: 20, y: 60, delay: 0.8 },
        { Icon: Camera, x: 80, y: 65, delay: 1.2 }
      ]
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const currentSlideData = slides[currentSlide];
  const MainIcon = currentSlideData.icon;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}>
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 bg-white/20 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating Icons */}
      {currentSlideData.floatingIcons.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <div
            key={index}
            className="absolute text-white/30 animate-float"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`
            }}
          >
            <IconComponent size={32} />
          </div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Main Icon with animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-6">
                <MainIcon size={64} className="text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Text Content with slide animation */}
          <div className={`transform transition-all duration-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
              {currentSlideData.subtitle}
            </p>
            <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
              {currentSlideData.description}
            </p>

            {/* CTA Button with hover effects */}
            <button className="group relative px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <Link to={'/add-tasks'} className="relative z-10">{currentSlideData.buttonText}</Link>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 group"
        disabled={isAnimating}
      >
        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 group"
        disabled={isAnimating}
      >
        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Slider;
