// services/shokuninService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const createMaster = async (masterData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('認証が必要です。');
    }

    // Validate all required fields before sending
    if (!masterData.name || !masterData.romajiName || !masterData.description || 
        !masterData.address || !masterData.style || !masterData.image) {
      throw new Error('全ての項目を入力してください。');
    }

    // Create FormData object and append all fields
    const formData = new FormData();
    formData.append('name', masterData.name);
    formData.append('romajiName', masterData.romajiName);
    formData.append('description', masterData.description);
    formData.append('address', masterData.address);
    formData.append('style', masterData.style);
    formData.append('image', masterData.image);

    // Debug logging
    console.log('Sending master data:', {
      name: masterData.name,
      romajiName: masterData.romajiName,
      description: masterData.description,
      address: masterData.address,
      style: masterData.style,
      image: masterData.image.name
    });

    const response = await fetch(`${API_URL}/shokunin`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Server response:', data);
      throw new Error(data.message || '職人の登録に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Create master error:', error);
    throw error;
  }
};