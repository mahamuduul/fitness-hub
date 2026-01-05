import { useState } from 'react';
import { FaUserMd, FaSearch, FaHospital, FaPhone, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const Medical = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    {
      name: 'Assoc. Prof. Dr. Md. Rais Uddin Mondol',
      specialty: 'Cardiology',
      credentials: 'MBBS, FCPS (Medicine), MD (Cardiology), Fellow (WHO)',
      position: 'Associate Professor, Cardiology — Rajshahi Medical College & Hospital (RMCH)',
      chamber: 'Popular Diagnostic Center, House #474, Chowdhury Tower, Laxmipur, Rajshahi',
      visiting: '4:00–10:00 pm (Fri closed)',
      appointment: '+8809666787811',
      image: 'https://www.doctorbangladesh.com/wp-content/uploads/2020/09/Dr.-Md.-Rais-Uddin-Mondol.jpg'
    },
    {
      name: 'Assoc. Prof. Dr. Md. Ayub Ali',
      specialty: 'Cardiology',
      credentials: 'MBBS (Dhaka), MCPS (Medicine), MD (Cardiology)',
      position: 'Associate Professor, Cardiology — RMCH',
      chamber: 'Biopath Diagnostic Center, Beside Medical College, Sipaipara, Rajshahi',
      visiting: '5:00–8:00 pm (Fri closed)',
      appointment: '+8801308441306',
      image: 'https://www.doctorbangladesh.com/wp-content/uploads/Dr.-Md.-Ayub-Ali.jpg'
    },
    {
      name: 'Prof. Dr. B.K. Dam',
      specialty: 'Orthopedics & Trauma',
      credentials: 'MBBS, MS (Ortho Surgery), FICS (USA), Member (AAOS)',
      position: 'Principal & Head, Orthopedic Surgery — Barind Medical College & Hospital',
      chamber: 'City Diagnostic Center, Beside Education Board, Greater Road, Laxmipur, Rajshahi',
      visiting: '7:00–8:00 am & 5:00–8:00 pm (Fri closed)',
      appointment: '+8801714228295',
      image: 'https://www.doctorbangladesh.com/wp-content/uploads/Prof.-Dr.-B.K.-Dam.jpg'
    },
    {
      name: 'Prof. Dr. Md. Kafil Uddin',
      specialty: 'Neurology / Neuromedicine',
      credentials: 'MBBS, MCPS (Medicine), MD (Neurology)',
      position: 'Professor & Head, Neuromedicine — RMCH',
      chamber: 'Popular Diagnostic Center, House #474, Chowdhury Tower, Laxmipur, Rajshahi',
      visiting: '5:00–11:00 pm (Sat, Sun, Thu) • 10:00–11:00 pm (Mon, Tue, Wed)',
      appointment: '+8809666787811',
      image: 'https://www.doctorbangladesh.com/wp-content/uploads/2020/09/Prof.-Dr.-Md.-Kafil-Uddin.jpg'
    },
    {
      name: 'Prof. Dr. Md. Abdul Alim',
      specialty: 'Gastroenterology & Liver Medicine',
      credentials: 'MBBS, FCPS (Medicine), MD (Gastroenterology), FACP (USA)',
      position: 'Professor, Gastroenterology — RMCH',
      chamber: 'Labaid Diagnostic, House #621, Shershah Road, Rajpara, Laxmipur, Rajshahi – 6000',
      visiting: '5:00–9:00 pm (Fri closed)',
      appointment: '+8801766661144',
      image: 'https://bangladeshhealthalliance.com/wp-content/uploads/2023/02/Prof.-Dr.-Md.-Abdul-Alim-194x262.jpg'
    },
    {
      name: 'Dr. Noor-E-Atia Lovely',
      specialty: 'Gynecology & Obstetrics',
      credentials: 'MBBS, BCS (Health), FCPS (OBGYN)',
      position: 'Resident Surgeon (Gynae & Obs) — RMCH',
      chamber: 'Islami Bank Hospital, Medical Mor, Laxmipur — 2:30–8:00 pm (Fri closed) • Labaid Diagnostic, House #621, Shershah Road — 2:30–6:00 pm (Fri closed)',
      visiting: '2:30–8:00 pm',
      appointment: '+8801777242536',
      image: 'https://bangladeshhealthalliance.com/wp-content/uploads/2023/07/Dr.-Noor-E-Atia-Lovely-194x262.jpg'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const searchableText = `${doctor.name} ${doctor.specialty} ${doctor.credentials} ${doctor.position}`.toLowerCase();
    return searchableText.includes(query);
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-[100px]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full mb-4">
            <FaUserMd />
            <span className="font-bold text-sm">Medical Services</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Medical Guidelines & Doctor Information</h1>
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-xl">
            <FaExclamationTriangle className="text-yellow-600 text-lg" />
            <p className="text-sm text-yellow-800 font-medium">
              Always consult a licensed physician for personal medical advice.
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg mb-8">
          <div className="p-6">
            <label htmlFor="doctorSearch" className="block text-sm font-bold mb-3 text-gray-900 flex items-center gap-2">
              <FaSearch />
              Search Doctors
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaUserMd />
              </div>
              <input
                id="doctorSearch"
                type="search"
                placeholder="Type a name or specialty (e.g., 'Cardiology', 'Noor')"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
            <div className="text-sm mt-3 text-gray-600 flex items-center gap-2" aria-live="polite">
              <FaCheckCircle className="text-green-600" />
              {searchQuery ? `Showing ${filteredDoctors.length} of ${doctors.length} doctors for "${searchQuery}".` : `Showing all ${doctors.length} doctors.`}
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-6">Popular Doctors in Rajshahi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gray-900 p-4">
                <img
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty} (Rajshahi)`}
                  className="w-full h-[280px] object-contain bg-white rounded-2xl"
                />
              </div>
              <div className="p-6">
                <div className="inline-block bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  {doctor.specialty}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium">{doctor.credentials}</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <FaHospital className="text-gray-900 mt-0.5 flex-shrink-0" />
                    <span>{doctor.position}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <FaHospital className="text-gray-900 mt-0.5 flex-shrink-0" />
                    <span><span className="font-bold">Chamber:</span> {doctor.chamber}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <FaClock className="text-gray-900 mt-0.5 flex-shrink-0" />
                    <span><span className="font-bold">Hours:</span> {doctor.visiting}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-gray-900" />
                    <span className="font-bold">{doctor.appointment}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-6">General Guidelines</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-8">
            <ul className="ml-6 list-disc space-y-3 text-gray-300">
              <li className="leading-relaxed">150–300 minutes of moderate activity weekly; strength train 2–3 days.</li>
              <li className="leading-relaxed">Balanced diet: whole foods, fiber, lean protein, healthy fats, hydrate well.</li>
              <li className="leading-relaxed">Sleep 7–9 hours; manage stress with breath-work & mindfulness.</li>
              <li className="leading-relaxed">If you have chronic conditions, follow your doctor&apos;s plan.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Medical;
