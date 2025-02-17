// services/orderService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    const response = await fetch(`${API_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '注文の作成に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '注文履歴の取得に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Get orders error:', error);
    throw error;
  }
};