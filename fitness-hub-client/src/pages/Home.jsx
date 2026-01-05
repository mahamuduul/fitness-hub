import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaDumbbell, FaAppleAlt, FaBrain, FaUserMd, FaCalculator, FaMapMarkerAlt, FaSpa, FaFire, FaUsers, FaStar, FaCheckCircle, FaChartLine, FaClock } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (slider && !$(slider).hasClass('slick-initialized')) {
        $(slider).slick({
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          arrows: true,
          infinite: true,
          pauseOnHover: true,
          adaptiveHeight: true
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (slider && $(slider).hasClass('slick-initialized')) {
        $(slider).slick('unslick');
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Slider - Full Width */}
      <section className="p-0 m-0 w-full overflow-hidden">
        <div ref={sliderRef} className="hero-slider w-full">
          {/* Slide 1 - Medical & Fitness */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[500px] md:min-h-[600px] flex items-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="px-[100px] py-20 md:py-24 w-full relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                    <FaHeartbeat className="text-white text-sm" />
                    <span className="text-white text-sm font-medium">Complete Health Platform</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Your Fitness Journey
                    <span className="block text-gray-300">Starts Here</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Expert medical consultancy, personalized nutrition, and premium gym access—all in one platform.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link to="/medical" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                      <FaUserMd className="text-lg" />
                      Find Doctors
                      <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/gym" className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-all border border-white/30">
                      <FaDumbbell className="text-lg" />
                      Browse Gyms
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
                        <FaUserMd className="text-2xl text-gray-900" />
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2">Expert Doctors</h3>
                      <p className="text-sm text-gray-300">Trusted medical guidance</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all mt-8">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
                        <FaMapMarkerAlt className="text-2xl text-gray-900" />
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2">Local Gyms</h3>
                      <p className="text-sm text-gray-300">Find nearby centers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Nutrition & Diet */}
          <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 min-h-[500px] md:min-h-[600px] flex items-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="px-[100px] py-20 md:py-24 w-full relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="hidden md:block">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 max-w-md">
                    <div className="flex items-center gap-3 mb-6">
                      <FaAppleAlt className="text-3xl text-white" />
                      <h3 className="text-2xl font-bold text-white">Daily Nutrition</h3>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Protein</span>
                          <span className="font-bold text-white">150g</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                          <div className="bg-white h-3 rounded-full transition-all" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Carbs</span>
                          <span className="font-bold text-white">200g</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                          <div className="bg-gray-400 h-3 rounded-full transition-all" style={{width: '60%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Fats</span>
                          <span className="font-bold text-white">70g</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                          <div className="bg-gray-500 h-3 rounded-full transition-all" style={{width: '50%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                    <FaAppleAlt className="text-white text-sm" />
                    <span className="text-white text-sm font-medium">Smart Nutrition</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Personalized
                    <span className="block text-gray-300">Diet Planning</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Calculate macros, explore healthy foods, and get customized plans for your goals.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link to="/diet" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                      <FaCalculator className="text-lg" />
                      Calculate Macros
                      <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/nutrition" className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-all border border-white/30">
                      Browse Foods
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Mind & Wellness */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[500px] md:min-h-[600px] flex items-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="px-[100px] py-20 md:py-24 w-full relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                    <FaBrain className="text-white text-sm" />
                    <span className="text-white text-sm font-medium">Mental Wellness</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Mindfulness &
                    <span className="block text-gray-300">Inner Peace</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Guided breathing, yoga flows, and meditation for stress relief and mental clarity.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link to="/mind" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                      <FaSpa className="text-lg" />
                      Start Session
                      <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/about" className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-all border border-white/30">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="relative">
                    <div className="w-72 h-72 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <div className="w-56 h-56 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
                          <FaBrain className="text-6xl text-gray-900" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-6 -right-6 bg-white px-5 py-3 rounded-xl shadow-2xl border border-gray-200">
                      <p className="text-sm font-bold text-gray-900">5 min session</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Trusted by thousands for their health journey</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600 font-medium">Happy Users</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600 font-medium">Expert Doctors</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaDumbbell className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-2">30+</h3>
              <p className="text-gray-600 font-medium">Partner Gyms</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600 font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Box Features */}
      <div className="px-[100px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Large Feature Card - Medical */}
          <Link to="/medical" className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all no-underline">
            <img src="https://www.globalhealthinternational.org/wp-content/uploads/2020/02/Depositphotos_100565644_xl-2015.jpg" alt="Medical" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
            <div className="relative p-10 h-full flex flex-col justify-end min-h-[500px]">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaUserMd className="text-4xl text-gray-900" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Medical Consultancy</h3>
              <p className="text-lg text-gray-200 mb-6">Connect with expert doctors. Evidence-based health tips and professional medical guidance at your fingertips.</p>
              <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                <span>Explore Doctors</span>
                <HiArrowRight className="text-xl" />
              </div>
            </div>
          </Link>

          {/* Nutrition Card */}
          <Link to="/nutrition" className="group relative rounded-3xl shadow-lg hover:shadow-xl transition-all no-underline">
            <img src="https://kbth.gov.gh/wp-content/uploads/2025/05/Nutrition-Wave-Article-Marty-Gallagher.jpg" alt="Nutrition" className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="bg-white p-6 rounded-b-3xl border-x border-b border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -mt-14 shadow-lg relative z-10">
                <FaAppleAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Nutrition Guide</h3>
              <p className="text-sm text-gray-600 mb-4">Detailed macros for healthy foods</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm group-hover:gap-3 transition-all">
                <span>View Foods</span>
                <HiArrowRight />
              </div>
            </div>
          </Link>

          {/* Mind Training Card */}
          <Link to="/mind" className="group relative rounded-3xl shadow-lg hover:shadow-xl transition-all no-underline">
            <img src="https://arohanyoga.com/wp-content/uploads/2024/03/Meditation-vs.-Yoga.jpg" alt="Mind" className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="bg-white p-6 rounded-b-3xl border-x border-b border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -mt-14 shadow-lg relative z-10">
                <FaBrain className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Mind Training</h3>
              <p className="text-sm text-gray-600 mb-4">Meditation & yoga basics</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Start Practice</span>
                <HiArrowRight />
              </div>
            </div>
          </Link>

          {/* Diet Plans Card */}
          <Link to="/diet" className="group relative rounded-3xl shadow-lg hover:shadow-xl transition-all no-underline">
            <img src="https://images.apollo247.in/pd-cms/cms/2025-05/AdobeStock_345968560.jpg?tr=q-80,f-webp,w-450,dpr-3,c-at_max%201350w" alt="Diet" className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="bg-white p-6 rounded-b-3xl border-x border-b border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -mt-14 shadow-lg relative z-10">
                <FaCalculator className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Diet Calculator</h3>
              <p className="text-sm text-gray-600 mb-4">Calculate your macros instantly</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <HiArrowRight />
              </div>
            </div>
          </Link>

          {/* Wellness & Spa Card */}
          <Link to="/mind" className="group relative rounded-3xl shadow-lg hover:shadow-xl transition-all no-underline">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop" alt="Wellness" className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="bg-white p-6 rounded-b-3xl border-x border-b border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -mt-14 shadow-lg relative z-10">
                <FaSpa className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Wellness & Spa</h3>
              <p className="text-sm text-gray-600 mb-4">Relaxation & recovery tips</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Explore More</span>
                <HiArrowRight />
              </div>
            </div>
          </Link>

          {/* Gym Finder Card - Wide */}
          <Link to="/gym" className="md:col-span-2 group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all no-underline">
            <div className="grid md:grid-cols-2">
              <div className="bg-white p-8 flex flex-col justify-center border-l border-t border-b border-gray-200">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FaDumbbell className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Find Local Gyms</h3>
                <p className="text-gray-600 mb-4">Discover nearby fitness centers with expert trainers and modern equipment.</p>
                <div className="flex items-center gap-2 text-gray-900 font-bold group-hover:gap-3 transition-all">
                  <span>Browse Gyms</span>
                  <HiArrowRight className="text-xl" />
                </div>
              </div>
              <div className="hidden md:block relative h-full min-h-[280px]">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" alt="Gym" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaMapMarkerAlt className="text-5xl mx-auto mb-3" />
                    <p className="text-lg font-black">30+ Locations</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* About Card */}
          <Link to="/about" className="group relative rounded-3xl shadow-lg hover:shadow-xl transition-all no-underline">
            <img src="https://www.shutterstock.com/image-vector/why-choose-us-symbol-text-260nw-2396164945.jpg" alt="About" className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="bg-white p-6 rounded-b-3xl border-x border-b border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -mt-14 shadow-lg relative z-10">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Why Choose Us?</h3>
              <p className="text-sm text-gray-600 mb-4">Simple, practical, and local</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Learn More</span>
                <HiArrowRight />
              </div>
            </div>
          </Link>

          {/* Contact Card */}
          <Link to="/contact" className="group relative rounded-3xl shadow-lg hover:shadow-xl transition-all no-underline">
            <img src="https://www.scalarat.com/wp-content/uploads/2022/11/contact-us.jpg" alt="Contact" className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="bg-white p-6 rounded-b-3xl border-x border-b border-gray-200">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform -mt-14 shadow-lg relative z-10">
                <FaMapMarkerAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600 mb-4">Questions? Send a message</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Get in Touch</span>
                <HiArrowRight />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-300">Complete health and fitness platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <FaCheckCircle className="text-4xl text-white mb-4" />
              <h3 className="text-xl font-black text-white mb-3">Evidence-Based</h3>
              <p className="text-gray-300">All our content is backed by scientific research and expert recommendations.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <FaChartLine className="text-4xl text-white mb-4" />
              <h3 className="text-xl font-black text-white mb-3">Track Progress</h3>
              <p className="text-gray-300">Monitor your health metrics and fitness journey with our integrated tools.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <FaClock className="text-4xl text-white mb-4" />
              <h3 className="text-xl font-black text-white mb-3">24/7 Access</h3>
              <p className="text-gray-300">Access resources, calculators, and information anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-[100px] py-20">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="relative z-10">
            <FaFire className="text-6xl text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Life?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of people achieving their health and fitness goals with our comprehensive platform.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                Get Started Free
                <HiArrowRight className="text-lg" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-all border border-white/30">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-slider .slick-dots {
          bottom: 12px;
        }
      `}</style>
    </div>
  );
};

export default Home;
