import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { messageAPI, gymAPI, userAPI } from '../services/api';
import { FaUserShield, FaInbox, FaTrash, FaEnvelope, FaClock, FaUser, FaCheckCircle, FaDumbbell, FaUsers, FaAppleAlt, FaPlus, FaEdit, FaTimes, FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';

const Admin = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('messages');
  
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  
  const [gyms, setGyms] = useState([]);
  const [gymsLoading, setGymsLoading] = useState(false);
  const [showGymForm, setShowGymForm] = useState(false);
  const [editingGym, setEditingGym] = useState(null);
  const [gymFormData, setGymFormData] = useState({
    name: '',
    location: '',
    description: '',
    trainers: '',
    contact: '',
    website: '',
    image: '',
    mapEmbed: ''
  });
  
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Diet Plans state
  const [dietPlans, setDietPlans] = useState([]);
  const [dietPlansLoading, setDietPlansLoading] = useState(false);
  const [showDietForm, setShowDietForm] = useState(false);
  const [editingDiet, setEditingDiet] = useState(null);
  const [dietFormData, setDietFormData] = useState({
    name: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    meals: ''
  });

  const loadMessages = async () => {
    setMessagesLoading(true);
    const result = await messageAPI.getAll();
    if (result.success) {
      setMessages(result.data);
    } else {
      showToast('Failed to load messages', 'error');
    }
    setMessagesLoading(false);
  };

  const loadGyms = async () => {
    setGymsLoading(true);
    const result = await gymAPI.getAll();
    if (result.success) {
      setGyms(result.data);
    } else {
      showToast('Failed to load gyms', 'error');
    }
    setGymsLoading(false);
  };

  const loadUsers = async () => {
    setUsersLoading(true);
    const result = await userAPI.getAll();
    if (result.success) {
      setUsers(result.data);
    } else {
      showToast('Failed to load users', 'error');
    }
    setUsersLoading(false);
  };

  // Load Diet Plans (mock data for now - can be connected to API later)
  const loadDietPlans = async () => {
    setDietPlansLoading(true);
    // Mock data - replace with actual API call when backend is ready
    setTimeout(() => {
      setDietPlans([
        { _id: '1', name: 'Weight Loss Plan', description: 'Low calorie diet for weight loss', calories: 1500, protein: 120, carbs: 150, fats: 50, meals: '6 small meals per day' },
        { _id: '2', name: 'Muscle Gain Plan', description: 'High protein diet for muscle building', calories: 3000, protein: 200, carbs: 350, fats: 80, meals: '5 meals with protein supplements' },
        { _id: '3', name: 'Balanced Diet', description: 'Balanced nutrition for maintenance', calories: 2000, protein: 150, carbs: 200, fats: 65, meals: '3 main meals + 2 snacks' }
      ]);
      setDietPlansLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (!auth || !auth.isAdmin) {
      showToast('Admin access only', 'error');
      navigate('/login');
      return;
    }
    loadMessages();
  }, [auth, navigate, showToast]);

  useEffect(() => {
    if (activeTab === 'gyms' && gyms.length === 0) {
      loadGyms();
    } else if (activeTab === 'users' && users.length === 0) {
      loadUsers();
    } else if (activeTab === 'diet' && dietPlans.length === 0) {
      loadDietPlans();
    }
  }, [activeTab]);

  const handleDeleteMessage = async (id) => {
    const result = await messageAPI.delete(id);
    if (result.success) {
      showToast('Message deleted successfully', 'success');
      loadMessages();
    } else {
      showToast('Failed to delete message', 'error');
    }
  };

  const handleMarkAsRead = async (id) => {
    const result = await messageAPI.markAsRead(id);
    if (result.success) {
      showToast('Message marked as read', 'success');
      loadMessages();
    } else {
      showToast('Failed to update message', 'error');
    }
  };

  const handleGymFormChange = (e) => {
    setGymFormData({ ...gymFormData, [e.target.name]: e.target.value });
  };

  const handleGymSubmit = async (e) => {
    e.preventDefault();
    const gymData = {
      ...gymFormData,
      trainers: gymFormData.trainers.split(',').map(t => t.trim()).filter(t => t)
    };

    let result;
    if (editingGym) {
      result = await gymAPI.update(editingGym._id, gymData);
    } else {
      result = await gymAPI.create(gymData);
    }

    if (result.success) {
      showToast(editingGym ? 'Gym updated successfully' : 'Gym added successfully', 'success');
      setShowGymForm(false);
      setEditingGym(null);
      setGymFormData({ name: '', location: '', description: '', trainers: '', contact: '', website: '', image: '', mapEmbed: '' });
      loadGyms();
    } else {
      showToast('Failed to save gym', 'error');
    }
  };

  const handleEditGym = (gym) => {
    setEditingGym(gym);
    setGymFormData({
      name: gym.name,
      location: gym.location,
      description: gym.description,
      trainers: Array.isArray(gym.trainers) ? gym.trainers.join(', ') : gym.trainers,
      contact: gym.contact || '',
      website: gym.website || '',
      image: gym.image || '',
      mapEmbed: gym.mapEmbed || ''
    });
    setShowGymForm(true);
  };

  const handleDeleteGym = async (id) => {
    const result = await gymAPI.delete(id);
    if (result.success) {
      showToast('Gym deleted successfully', 'success');
      loadGyms();
    } else {
      showToast('Failed to delete gym', 'error');
    }
  };

  const cancelGymForm = () => {
    setShowGymForm(false);
    setEditingGym(null);
    setGymFormData({ name: '', location: '', description: '', trainers: '', contact: '', website: '', image: '', mapEmbed: '' });
  };

  // Diet Plan handlers
  const handleDietFormChange = (e) => {
    setDietFormData({ ...dietFormData, [e.target.name]: e.target.value });
  };

  const handleDietSubmit = async (e) => {
    e.preventDefault();
    // Mock submission - replace with actual API call when backend is ready
    if (editingDiet) {
      showToast('Diet plan updated successfully', 'success');
    } else {
      showToast('Diet plan added successfully', 'success');
    }
    setShowDietForm(false);
    setEditingDiet(null);
    setDietFormData({ name: '', description: '', calories: '', protein: '', carbs: '', fats: '', meals: '' });
    loadDietPlans();
  };

  const handleEditDiet = (diet) => {
    setEditingDiet(diet);
    setDietFormData({
      name: diet.name,
      description: diet.description,
      calories: diet.calories,
      protein: diet.protein,
      carbs: diet.carbs,
      fats: diet.fats,
      meals: diet.meals
    });
    setShowDietForm(true);
  };

  const handleDeleteDiet = async () => {
    // Mock deletion - replace with actual API call when backend is ready
    showToast('Diet plan deleted successfully', 'success');
    loadDietPlans();
  };

  const cancelDietForm = () => {
    setShowDietForm(false);
    setEditingDiet(null);
    setDietFormData({ name: '', description: '', calories: '', protein: '', carbs: '', fats: '', meals: '' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="px-[100px]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full mb-4">
            <FaUserShield />
            <span className="font-bold text-sm">Admin Panel</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Admin Dashboard</h1>
          <p className="text-gray-600">Manage messages, gyms, users, and diet plans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <FaInbox className="text-gray-900 text-xl" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{messages.length}</h3>
            <p className="text-sm text-gray-200">Total Messages</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <FaDumbbell className="text-gray-900 text-xl" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{gyms.length}</h3>
            <p className="text-sm text-gray-200">Total Gyms</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <FaUsers className="text-gray-900 text-xl" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{users.length}</h3>
            <p className="text-sm text-gray-200">Total Users</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <FaAppleAlt className="text-gray-900 text-xl" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{dietPlans.length}</h3>
            <p className="text-sm text-gray-200">Diet Plans</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex gap-1 p-2">
              <button onClick={() => setActiveTab('messages')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'messages' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}>
                <FaInbox />Messages
              </button>
              <button onClick={() => setActiveTab('gyms')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'gyms' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}>
                <FaDumbbell />Gyms
              </button>
              <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}>
                <FaUsers />Users
              </button>
              <button onClick={() => setActiveTab('diet')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'diet' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}>
                <FaAppleAlt />Diet Plans
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'messages' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Contact Messages</h2>
                  <span className="text-sm text-gray-600">{messages.filter(m => !m.isRead).length} unread</span>
                </div>
                {messagesLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FaInbox className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message._id} className={`bg-white border ${message.isRead ? 'border-gray-200' : 'border-gray-900 bg-gray-50'} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                              {!message.isRead && <span className="px-2 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">NEW</span>}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1"><FaEnvelope className="text-xs" />{message.email}</span>
                              <span className="flex items-center gap-1"><FaClock className="text-xs" />{formatDate(message.createdAt)}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{message.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                          {!message.isRead && (
                            <button onClick={() => handleMarkAsRead(message._id)} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
                              <FaCheckCircle />Mark as Read
                            </button>
                          )}
                          <button onClick={() => handleDeleteMessage(message._id)} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium">
                            <FaTrash />Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'gyms' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Gym Management</h2>
                  <button onClick={() => setShowGymForm(true)} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-bold shadow-lg">
                    <FaPlus />Add New Gym
                  </button>
                </div>

                {showGymForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
                        <h3 className="text-2xl font-black text-gray-900">{editingGym ? 'Edit Gym' : 'Add New Gym'}</h3>
                        <button onClick={cancelGymForm} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                          <FaTimes className="text-gray-600" />
                        </button>
                      </div>
                      <form onSubmit={handleGymSubmit} className="p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Gym Name *</label>
                          <input type="text" name="name" value={gymFormData.name} onChange={handleGymFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., PowerFit Gym" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Location *</label>
                          <input type="text" name="location" value={gymFormData.location} onChange={handleGymFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., 123 Main St, City" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Description *</label>
                          <textarea name="description" value={gymFormData.description} onChange={handleGymFormChange} required rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="Brief description of the gym..."></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Trainers (comma-separated) *</label>
                          <input type="text" name="trainers" value={gymFormData.trainers} onChange={handleGymFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., John Doe, Jane Smith" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Contact Phone</label>
                          <input type="text" name="contact" value={gymFormData.contact} onChange={handleGymFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., +1 234 567 8900" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Website URL</label>
                          <input type="url" name="website" value={gymFormData.website} onChange={handleGymFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="https://example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Image URL *</label>
                          <input type="url" name="image" value={gymFormData.image} onChange={handleGymFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="https://example.com/gym-image.jpg" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Google Maps Embed URL</label>
                          <input type="text" name="mapEmbed" value={gymFormData.mapEmbed} onChange={handleGymFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="Google Maps embed link" />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <button type="submit" className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-bold">{editingGym ? 'Update Gym' : 'Add Gym'}</button>
                          <button type="button" onClick={cancelGymForm} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {gymsLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gyms...</p>
                  </div>
                ) : gyms.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FaDumbbell className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No gyms yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gyms.map((gym) => (
                      <div key={gym._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                        <img src={gym.image} alt={gym.name} className="w-full h-48 object-cover" />
                        <div className="p-6">
                          <h3 className="text-xl font-black text-gray-900 mb-2">{gym.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <FaMapMarkerAlt /><span>{gym.location}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-4">{gym.description}</p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <FaUser className="text-gray-400" />
                              <span className="text-gray-600">{Array.isArray(gym.trainers) ? gym.trainers.join(', ') : gym.trainers}</span>
                            </div>
                            {gym.contact && (
                              <div className="flex items-center gap-2 text-sm">
                                <FaPhone className="text-gray-400" />
                                <span className="text-gray-600">{gym.contact}</span>
                              </div>
                            )}
                            {gym.website && (
                              <div className="flex items-center gap-2 text-sm">
                                <FaGlobe className="text-gray-400" />
                                <a href={gym.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 pt-4 border-t border-gray-200">
                            <button onClick={() => handleEditGym(gym)} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
                              <FaEdit />Edit
                            </button>
                            <button onClick={() => handleDeleteGym(gym._id)} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium">
                              <FaTrash />Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">User Management</h2>
                </div>
                {usersLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No users yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">User</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Role</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Provider</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Last Login</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {user.photoURL ? (
                                  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'U'}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-gray-900">{user.displayName}</p>
                                  <p className="text-xs text-gray-500">{user.firebaseUid}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-gray-900 text-white' : user.role === 'trainer' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>{user.role}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-700 capitalize">{user.provider}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(user.lastLogin)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'diet' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Diet Plans Management</h2>
                  <button onClick={() => setShowDietForm(true)} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-bold shadow-lg">
                    <FaPlus />Add Diet Plan
                  </button>
                </div>

                {showDietForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
                        <h3 className="text-2xl font-black text-gray-900">{editingDiet ? 'Edit Diet Plan' : 'Add New Diet Plan'}</h3>
                        <button onClick={cancelDietForm} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                          <FaTimes className="text-gray-600" />
                        </button>
                      </div>
                      <form onSubmit={handleDietSubmit} className="p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Plan Name *</label>
                          <input type="text" name="name" value={dietFormData.name} onChange={handleDietFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., Weight Loss Plan" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Description *</label>
                          <textarea name="description" value={dietFormData.description} onChange={handleDietFormChange} required rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="Brief description..."></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold mb-2 text-gray-900">Calories *</label>
                            <input type="number" name="calories" value={dietFormData.calories} onChange={handleDietFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., 2000" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2 text-gray-900">Protein (g) *</label>
                            <input type="number" name="protein" value={dietFormData.protein} onChange={handleDietFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., 150" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold mb-2 text-gray-900">Carbs (g) *</label>
                            <input type="number" name="carbs" value={dietFormData.carbs} onChange={handleDietFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., 200" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2 text-gray-900">Fats (g) *</label>
                            <input type="number" name="fats" value={dietFormData.fats} onChange={handleDietFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., 65" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-900">Meals Schedule *</label>
                          <input type="text" name="meals" value={dietFormData.meals} onChange={handleDietFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="e.g., 3 main meals + 2 snacks" />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <button type="submit" className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-bold">{editingDiet ? 'Update Plan' : 'Add Plan'}</button>
                          <button type="button" onClick={cancelDietForm} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {dietPlansLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading diet plans...</p>
                  </div>
                ) : dietPlans.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FaAppleAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No diet plans yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dietPlans.map((diet) => (
                      <div key={diet._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                        <h3 className="text-xl font-black text-gray-900 mb-2">{diet.name}</h3>
                        <p className="text-gray-700 text-sm mb-4">{diet.description}</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-600 mb-1">Calories</p>
                            <p className="text-lg font-black text-gray-900">{diet.calories}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-600 mb-1">Protein</p>
                            <p className="text-lg font-black text-gray-900">{diet.protein}g</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-600 mb-1">Carbs</p>
                            <p className="text-lg font-black text-gray-900">{diet.carbs}g</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-600 mb-1">Fats</p>
                            <p className="text-lg font-black text-gray-900">{diet.fats}g</p>
                          </div>
                        </div>
                        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-600 mb-1">Meal Schedule</p>
                          <p className="text-sm text-gray-900 font-medium">{diet.meals}</p>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                          <button onClick={() => handleEditDiet(diet)} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
                            <FaEdit />Edit
                          </button>
                          <button onClick={() => handleDeleteDiet(diet._id)} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium">
                            <FaTrash />Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
