import { useState, useEffect } from 'react';
import { gymAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { FaDumbbell, FaMapMarkerAlt, FaClock, FaPhone, FaSearch } from 'react-icons/fa';

const Gym = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [currentMap, setCurrentMap] = useState({
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684642.8334545856!2d88.007293927101!3d23.73078974460826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ae8b2c58d3%3A0xf3a351f17f9e1b2e!2sBangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
    label: 'General area (Bangladesh)'
  });

  // Fetch gyms from backend
  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      const result = await gymAPI.getAll();
      
      if (result.success) {
        setGyms(result.data);
      } else {
        showToast('Failed to load gyms. Showing default data.', 'error');
        // Fallback to static data if backend fails
        setGyms([
          {
            name: 'Muscle Care Gym',
            location: 'Rajshahi',
            hours: '7:00–22:00',
            trainers: 'Mim (Strength)',
            phone: '01700-000000',
            image: '/health-fitness-hub-updated/assets/images/gym1.jpg',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3634.3323137113116!2d88.5726558!3d24.3697405!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef1f59523c69%3A0xf0088928fb4fc143!2sMuscle%20Care%20Gym!5e0!3m2!1sen!2sde!4v1757417654870!5m2!1sen!2sde'
          },
          {
            name: 'Fitlife Gym - Kadirganj Branch',
            location: 'Rajshahi',
            hours: '6:00–23:00',
            trainers: 'Rumi (Weight Loss)',
            phone: '01800-000000',
            image: '/health-fitness-hub-updated/assets/images/gym2.jpg',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.193527948253!2d88.5998906!3d24.374570199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef5e1542e94d%3A0x475194d02eb509e7!2sFitlife%20Gym%20-%20Kadirganj%20Branch!5e0!3m2!1sen!2sde!4v1757455929259!5m2!1sen!2sde'
          },
          {
            name: 'Fitness Zone Rajshahi-New Market Branch',
            location: 'Rajshahi',
            hours: '8:00–21:00',
            trainers: 'Jitu (CrossFit), Omi (Mobility)',
            phone: '01600-000000',
            image: '/health-fitness-hub-updated/assets/images/gym3.jpg',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.2360770625246!2d88.6012631!3d24.3730896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa313de8807%3A0x248e098f99a76a04!2sFitness%20Zone%20Rajshahi-New%20Market%20Branch!5e0!3m2!1sen!2sde!4v1757455986640!5m2!1sen!2sde'
          }
        ]);
      }
      setLoading(false);
    };

    fetchGyms();
  }, [showToast]);

  const handleLocationClick = (gym) => {
    setCurrentMap({
      src: gym.mapSrc,
      label: gym.name
    });
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-[100px]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full mb-4">
            <FaDumbbell />
            <span className="font-bold text-sm">Fitness Centers</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Nearby Gyms & Trainer Information</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <FaSearch className="text-sm" />
            Tip: press <kbd className="bg-gray-200 px-2 py-1 rounded border border-gray-300 text-xs font-mono">Ctrl</kbd> + <kbd className="bg-gray-200 px-2 py-1 rounded border border-gray-300 text-xs font-mono">F</kbd> to search.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading gyms...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {gyms.map((gym, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={gym.image} 
                  alt={`${gym.name} photo`}
                  className="w-full h-[200px] object-cover block"
                />
                <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {gym.location}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-3">{gym.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <FaClock className="text-gray-900" />
                    <span className="font-medium">{gym.hours}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-gray-900">Trainers:</span> {gym.trainers}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <FaPhone className="text-gray-900" />
                    <span className="font-medium">{gym.phone}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleLocationClick(gym)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  <FaMapMarkerAlt />
                  See Location on Map
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <div>
              <h2 id="map" className="text-2xl font-black text-gray-900">Interactive Map</h2>
              <p className="text-sm text-gray-600" aria-live="polite">
                Currently showing: <span className="font-bold text-gray-900">{currentMap.label}</span>
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden w-full pt-[56.25%] rounded-2xl border-2 border-gray-200">
            <iframe
              title="Map"
              src={currentMap.src}
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gym;
