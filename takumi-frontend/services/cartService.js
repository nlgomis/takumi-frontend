// services/cartService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const getCart = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'カートの取得に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Get cart error:', error);
    throw error;
  }
};

export const addToCart = async (productId, units) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    const response = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, units })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'カートへの追加に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
};

export const updateCartItem = async (productId, units) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    const response = await fetch(`${API_URL}/cart/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, units })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'カートの更新に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Update cart error:', error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    const response = await fetch(`${API_URL}/cart/remove`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'カートからの削除に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Remove from cart error:', error);
    throw error;
  }
};