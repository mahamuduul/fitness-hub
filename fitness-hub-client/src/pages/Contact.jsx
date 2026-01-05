import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { messageAPI } from '../services/api';
import { FaEnvelope, FaUser, FaPaperPlane, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill all fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    const result = await messageAPI.create(formData);
    
    if (result.success) {
      setFormData({ name: '', email: '', message: '' });
      showToast('Message sent successfully!', 'success');
    } else {
      showToast(result.error || 'Failed to send message. Please try again.', 'error');
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="px-[100px]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full mb-4">
            <FaEnvelope />
            <span className="font-bold text-sm">Get In Touch</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-600">Have questions? Send us a message and we'll get back to you soon.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-900">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-900">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-900">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Type your question or feedback..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none disabled:opacity-50"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-black text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-gray-900 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <p className="text-gray-300 text-sm">info@healthfitnesshub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-gray-900 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone</h4>
                    <p className="text-gray-300 text-sm">+880 1700-000000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-gray-900 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Address</h4>
                    <p className="text-gray-300 text-sm">Rajshahi, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-black text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex justify-between">
                  <span className="font-bold">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
