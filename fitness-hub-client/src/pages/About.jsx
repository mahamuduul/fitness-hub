import { Link } from 'react-router-dom';
import { FaDumbbell, FaUserMd, FaAppleAlt, FaSpa, FaCalculator, FaCheckCircle, FaBrain, FaHeart, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="px-[100px]">
        {/* Hero */}
        <div className="rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mb-8 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <FaHeart className="text-white text-sm" />
              <span className="text-white text-sm font-medium">About Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Why Choose Health & Fitness Hub?</h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-6 leading-relaxed">
              One clean place for your healthy life: local gyms, trusted doctors, accurate nutrition, mindful practice, and practical diet planning—aligned with a modern, fast experience.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/mind" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all shadow-lg">
                <FaSpa />
                Start a 5-min Breath
              </Link>
              <Link to="/diet" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-all">
                <FaCalculator />
                Calculate Your Macros
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Holistic', desc: 'Gyms, doctors, nutrition, yoga & diet—together.', icon: <FaHeart className="text-2xl" /> },
            { title: 'Local Focus', desc: 'Bangladesh-friendly examples & practical details.', icon: <FaUsers className="text-2xl" /> },
            { title: 'Fast & Clean', desc: 'Lightweight pages, responsive cards, minimal clutter.', icon: <FaCheckCircle className="text-2xl" /> },
            { title: 'Practical & Safe', desc: 'Clear disclaimers; content designed to guide, not replace care.', icon: <FaBrain className="text-2xl" /> }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white mb-3">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Why Us */}
        <h2 className="text-3xl font-black text-gray-900 mb-6">Why Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'All-in-one Experience',
              icon: <FaDumbbell className="text-2xl" />,
              items: ['Find gyms & see locations fast.', 'Browse popular doctors with chambers/hours.', 'Nutrition cards with per-100 g macros.']
            },
            {
              title: 'Evidence-Informed',
              icon: <FaCheckCircle className="text-2xl" />,
              items: ['Reasonable macro targets (protein-forward).', 'Breathing patterns used by coaches & clinics.', 'Simple, trackable routines you\'ll keep.']
            },
            {
              title: 'Made for Busy People',
              icon: <FaBrain className="text-2xl" />,
              items: ['5–10 minute yoga flows & breath sessions.', 'Quick meal ideas & batch-prep tips.', 'Clean navigation, mobile-first.']
            }
          ].map((section, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-900 mb-4">
                {section.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">{section.title}</h3>
              <ul className="ml-4 list-disc text-sm space-y-2 text-gray-300">
                {section.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <h2 className="text-3xl font-black text-gray-900 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: '1) Check Your Baseline', desc: 'Open the calculator to get calories & macros that fit your life and activity.' },
            { title: '2) Pick Simple Routines', desc: 'Try a 5-minute breath, a short yoga flow, and 2–3 easy meals you can repeat.' },
            { title: '3) Iterate Weekly', desc: 'Adjust calories ±200–300 kcal, keep protein steady, and track small wins.' }
          ].map((step, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="text-3xl font-black text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Clarity', desc: 'No fluff—just the steps that matter.' },
            { title: 'Consistency', desc: 'Small daily actions beat big once-a-week efforts.' },
            { title: 'Community', desc: 'Built to be shared, adapted, and improved together.' }
          ].map((value, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-gray-900">{value.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-3xl font-black text-gray-900 mb-6">FAQ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { q: 'Is this medical advice?', a: 'No. It\'s educational. For personal care, consult a licensed physician.' },
            { q: 'How accurate are macros?', a: 'They\'re estimates based on your inputs—adjust weekly based on results & energy.' },
            { q: 'Can I add my own gyms or doctors?', a: 'Yes—extend the HTML cards or hook up a small JSON source later.' }
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <details>
                <summary className="font-bold cursor-pointer text-gray-900 mb-2">{faq.q}</summary>
                <p className="text-sm mt-2 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
