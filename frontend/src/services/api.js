const API_BASE_URL = 'http://localhost:8080';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const api = {
  // Auth APIs
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return data;
  },

  register: async (username, email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.username || err.email || err.password || err.error || 'Registration failed');
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Analysis APIs
  analyzeEmail: async (content) => {
    const res = await fetch(`${API_BASE_URL}/analysis/email`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error('Email analysis failed');
    return res.json();
  },

  analyzeUrl: async (content) => {
    const res = await fetch(`${API_BASE_URL}/analysis/url`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error('URL analysis failed');
    return res.json();
  },

  analyzeScreenshot: async (file, description) => {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }
    const res = await fetch(`${API_BASE_URL}/analysis/screenshot`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    });
    if (!res.ok) throw new Error('Screenshot analysis failed');
    return res.json();
  },

  // Dashboard APIs
  getStats: async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
  },

  getRecent: async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard/recent`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch recent analyses');
    return res.json();
  },

  getSummary: async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard/summary`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch threat summary');
    return res.json();
  },

  // Graph APIs
  getNetwork: async () => {
    const res = await fetch(`${API_BASE_URL}/graph/network`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch graph network');
    return res.json();
  },

  // Search APIs
  search: async (query) => {
    const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },
};
