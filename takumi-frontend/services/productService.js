const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const createProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('認証が必要です。');
      }
  
      // Validate all required fields
      if (!productData.title || !productData.engTitle || !productData.description || !productData.price || !productData.units || 
          !productData.category || !productData.master || !productData.thumbnailImg || 
          !productData.images) {
        throw new Error('全ての項目を入力してください。');
      }
  
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('engTitle', productData.engTitle);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('units', productData.units);
      formData.append('category', productData.category);
      formData.append('jpCategory', productData.jpCategory);
      formData.append('master', productData.master);
      formData.append('thumbnailImg', productData.thumbnailImg);
      
      // Append multiple images
      Array.from(productData.images).forEach((image) => {
        formData.append('images', image);
      });
  
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || '商品の登録に失敗しました。');
      }
  
      return data;
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  };

export const getAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || '商品の取得に失敗しました。');
      }
  
      return data;
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  };

export const getProductById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || '商品の取得に失敗しました。');
      }
  
      return data;
    } catch (error) {
      console.error('Get product error:', error);
      throw error;
    }
  };