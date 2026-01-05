// Mind page - Meditation and Yoga (simplified version)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaSpa, FaPlay, FaPause, FaRedo, FaOm, FaHeart } from 'react-icons/fa';

const Mind = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Ready'); // 'Inhale', 'Hold', 'Exhale', 'Ready'

  useEffect(() => {
    let interval = null;
    let breathInterval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);

      // Breathing pattern: 4s inhale, 4s hold, 6s exhale
      let cycleTime = 0;
      breathInterval = setInterval(() => {
        cycleTime = (cycleTime + 1) % 14; // 14 second cycle
        if (cycleTime < 4) {
          setBreathPhase('Inhale');
        } else if (cycleTime < 8) {
          setBreathPhase('Hold');
        } else {
          setBreathPhase('Exhale');
        }
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setBreathPhase('Complete!');
    }

    return () => {
      clearInterval(interval);
      clearInterval(breathInterval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    if (timeLeft === 0) {
      setTimeLeft(300);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(300);
    setBreathPhase('Ready');
  };

  const getCircleScale = () => {
    if (breathPhase === 'Inhale') return 'scale-110';
    if (breathPhase === 'Exhale') return 'scale-90';
    return 'scale-100';
  };

  const getCircleColor = () => {
    if (breathPhase === 'Inhale') return 'from-blue-200 via-blue-100 to-blue-200';
    if (breathPhase === 'Hold') return 'from-purple-200 via-purple-100 to-purple-200';
    if (breathPhase === 'Exhale') return 'from-green-200 via-green-100 to-green-200';
    return 'from-gray-100 via-gray-50 to-gray-100';
  };
  return (
    <section className="py-12 bg-gray-50">
      <div className="px-[100px]">
        {/* Hero */}
        <div className="rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mb-8 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <FaBrain className="text-white text-sm" />
              <span className="text-white text-sm font-medium">Mental Wellness</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Meditation & Yoga</h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-6 leading-relaxed">
              Breathe, move, and reset. Short guided breathing, a beginner-friendly flow, and simple routines you can actually keep.
            </p>
            <Link 
              to="#breathing" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all shadow-lg no-underline"
            >
              <FaPlay />
              Start 5-min Session
            </Link>
          </div>
        </div>

        {/* Breathing Section */}
        <div id="breathing" className="mb-12">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                <FaHeart className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Guided Breathing</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose a pattern below and follow these simple steps for a 5-minute mindful breathing session.
            </p>
            
            <div className={`bg-gradient-to-br ${getCircleColor()} rounded-full w-56 h-56 mx-auto my-8 shadow-2xl border-4 border-gray-900 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${getCircleScale()}`}>
              <FaSpa className={`text-6xl text-gray-900 ${isRunning ? 'animate-pulse' : ''}`} />
            </div>
            
            <div className="text-center mb-6">
              <p className="text-2xl font-black text-gray-900 mb-2">{breathPhase}</p>
              <p className="text-lg text-gray-600 font-mono">{formatTime(timeLeft)}</p>
            </div>

            <div className="flex gap-3 justify-center flex-wrap mb-6">
              <button 
                onClick={handleStart}
                disabled={isRunning}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  isRunning 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <FaPlay />
                Start
              </button>
              <button 
                onClick={handlePause}
                disabled={!isRunning}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  !isRunning 
                    ? 'border-2 border-gray-300 bg-white text-gray-400 cursor-not-allowed' 
                    : 'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FaPause />
                Pause
              </button>
              <button 
                onClick={handleReset}
                disabled={timeLeft === 300 && !isRunning}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  timeLeft === 300 && !isRunning
                    ? 'border-2 border-gray-300 bg-white text-gray-400 cursor-not-allowed' 
                    : 'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FaRedo />
                Reset
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                <FaOm className="text-gray-900" />
                <span className="font-medium">Tip: Try daily — morning before screens, midday break, and before bed.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Yoga Flow */}
        <h2 className="text-3xl font-black text-gray-900 mb-6">Beginner Yoga Flow (10–12 min)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Mountain (Tadasana)', desc: 'Ground feet hip-width. Lengthen spine. Soften shoulders. 5 breaths.', image: 'https://yogajala.com/wp-content/uploads/2022/01/Tadasana-mountain-pose.jpg' },
            { name: 'Forward Fold (Uttanasana)', desc: 'Hinge at hips, slight knee bend, crown heavy. 5–8 breaths.', image: 'https://www.gaia.com/wp-content/uploads/standing-forward-fold-share.jpg' },
            { name: 'Low Lunge (Anjaneyasana)', desc: 'Knee over ankle, back knee down or lifted, chest open. 5 breaths/side.', image: 'https://www.yogateket.com/image/original/DSC_9006.jpg' },
            { name: 'Downward Dog', desc: 'Hips back and up, long spine, generous knee bend if needed. 5–8 breaths.', image: 'https://experiencelife.lifetime.life/wp-content/uploads/2024/07/so24-bid-downward-facing-dog.jpg' },
            { name: 'Child\'s Pose (Balasana)', desc: 'Knees wide or together, forearms down, breathe into back ribs. 6–10 breaths.', image: 'https://i.ytimg.com/vi/2MJGg-dUKh0/maxresdefault.jpg' },
            { name: 'Seated Twist', desc: 'Lift tall on inhale, twist gently on exhale. 5 breaths/side.', image: 'https://experiencelife.lifetime.life/wp-content/uploads/2022/03/may22-bid-seated-twist.jpg' }
          ].map((pose, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={pose.image}
                  alt={pose.name}
                  className="w-full h-[220px] object-cover bg-gray-50"
                />
                <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <FaOm />
                  Pose {index + 1}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{pose.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pose.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mind;
