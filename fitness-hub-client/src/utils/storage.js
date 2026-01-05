// Utility functions for localStorage operations

export const saveMessage = (payload) => {
  const arr = JSON.parse(localStorage.getItem('hh_messages') || '[]');
  arr.push({ ...payload, ts: Date.now() });
  localStorage.setItem('hh_messages', JSON.stringify(arr));
};

export const getMessages = () => {
  return JSON.parse(localStorage.getItem('hh_messages') || '[]');
};

export const clearMessages = () => {
  localStorage.removeItem('hh_messages');
};
