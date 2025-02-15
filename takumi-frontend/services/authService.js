// services/authService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      // Dispatch storage event to trigger AuthButton update
      window.dispatchEvent(new Event('storage'));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      window.dispatchEvent(new Event('storage'));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      throw new Error('認証が必要です。');
    }

    const user = JSON.parse(storedUser);
    
    // Log the request details for debugging
    console.log('Making request to:', `${API_URL}/auth/me`);
    console.log('With token:', token);
    console.log('User ID:', user.id);

    const response = await fetch(`${API_URL}/auth/me/${user.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'ユーザー情報の取得に失敗しました。');
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('getCurrentUser error:', error);
    throw error;
  }
};
// services/authService.js
export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      throw new Error('認証が必要です。');
    }

    const { id } = JSON.parse(storedUser);

    const response = await fetch(`${API_URL}/auth/users/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user data');
    }

    return data;
  } catch (error) {
    console.error('updateUser error:', error);
    throw error;
  }
};