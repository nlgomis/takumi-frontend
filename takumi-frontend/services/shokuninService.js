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


export const getAllMasters = async () => {
  try {
    const response = await fetch(`${API_URL}/shokunin`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '職人一覧の取得に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Get masters error:', error);
    throw error;
  }
};



/*
レスポンスデータの構造:
{
  success: true,
  data: {
    // 職人情報
    _id: string,            // 職人のMongoDBオブジェクトID
    customId: string,       // 職人に割り当てられた固有ID
    name: string,           // 職人の名前（日本語）
    romajiName: string,     // 職人の名前（ローマ字）
    description: string,    // 職人の説明
    address: string,        // 職人の住所
    style: string,          // 職人の専門分野/スタイル
    image: string,          // 職人のプロフィール画像のURL
    createdAt: Date,        // 作成日時
    updatedAt: Date,        // 最終更新日時
    
    // この職人の商品一覧
    products: [{
      _id: string,          // 商品のMongoDBオブジェクトID
      title: string,        // 商品名
      description: string,  // 商品の説明
      price: number,        // 商品の価格
      units: number,        // 在庫数
      category: string,     // 商品カテゴリー
      thumbnailImg: string, // 商品サムネイル画像のURL
      images: [string],     // 商品画像URLの配列
      createdAt: Date,      // 作成日時
      updatedAt: Date       // 最終更新日時
    }]
  },
  message: string           // レスポンスメッセージ（日本語）
}
*/

export const getMasterWithProducts = async (id) => {
  try {
    const response = await fetch(`${API_URL}/shokunin/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '職人情報の取得に失敗しました。');
    }

    return data;
  } catch (error) {
    console.error('Get master with products error:', error);
    throw error;
  }
};