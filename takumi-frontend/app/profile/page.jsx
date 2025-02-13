"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JapaneseAddressInput } from "@/components/JapaneseAddressInput";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser, updateUser } from "@/services/authService";
import { createMaster } from "@/services/shokuninService";
import { createProduct, getAllMasters } from "@/services/productService";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    gender: "",
    cart: null,
    orders: []
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await getCurrentUser();
        if (response.success) {
          setUserData(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    router.push('/auth/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setStatus({ type: '', message: '' });
      
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('ユーザー情報が見つかりません。');
      }

      const updateData = {
        name: userData.name,
        address: userData.address,
        gender: userData.gender || ''
      };

      const response = await updateUser(updateData);

      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({
          ...currentUser,
          ...updateData
        }));

        setStatus({ 
          type: 'success', 
          message: "プロフィールを更新しました。"
        });
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || "プロフィールの更新に失敗しました。"
      });
    }
  };

  const getGenderValue = (gender) => {
    return gender === "" ? "other" : gender;
  };

  const [masterData, setMasterData] = useState({
    name: "",
    romajiName: "",
    description: "",
    address: "",
    style: "",
    image: null
  });
  const [masterStatus, setMasterStatus] = useState({ type: '', message: '' });
  const [imagePreview, setImagePreview] = useState(null);

  const handleMasterChange = (e) => {
    const { name, value } = e.target;
    setMasterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMasterData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMasterSubmit = async () => {
    try {
      setMasterStatus({ type: '', message: '' });

      // Validate all fields first
      if (!masterData.name || !masterData.romajiName || !masterData.description || 
          !masterData.address || !masterData.style || !masterData.image) {
        const missingFields = [];
        if (!masterData.name) missingFields.push('名前');
        if (!masterData.romajiName) missingFields.push('ローマ字表記');
        if (!masterData.description) missingFields.push('説明');
        if (!masterData.address) missingFields.push('住所');
        if (!masterData.style) missingFields.push('スタイル');
        if (!masterData.image) missingFields.push('画像');

        setMasterStatus({
          type: 'error',
          message: `次の項目を入力してください: ${missingFields.join(', ')}`
        });
        return;
      }

      // Log the data being sent
      console.log('Submitting master data:', {
        name: masterData.name,
        romajiName: masterData.romajiName,
        description: masterData.description,
        address: masterData.address,
        style: masterData.style,
        imageFile: masterData.image
      });

      const response = await createMaster(masterData);

      if (response.success) {
        setMasterStatus({
          type: 'success',
          message: '職人を登録しました。'
        });
        // Reset form
        setMasterData({
          name: "",
          romajiName: "",
          description: "",
          address: "",
          style: "",
          image: null
        });
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Master registration error:', error);
      setMasterStatus({
        type: 'error',
        message: error.message || '職人の登録に失敗しました。'
      });
    }
  };

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    units: "",
    category: "",
    master: "",
    thumbnailImg: null,
    images: null
  });
  const [mastersList, setMastersList] = useState([]);
  const [productStatus, setProductStatus] = useState({ type: '', message: '' });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  
  // Add this useEffect to fetch masters
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await getAllMasters();
        if (response.success) {
          setMastersList(response.data);
        }
      } catch (error) {
        console.error('Error fetching masters:', error);
      }
    };
  
    if (isAuthenticated) {
      fetchMasters();
    }
  }, [isAuthenticated]);
  
  // Add these handlers
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData(prev => ({
        ...prev,
        thumbnailImg: file
      }));
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setProductData(prev => ({
        ...prev,
        images: files
      }));
  
      // Create previews
      const previews = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          setImagesPreview([...previews]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleProductSubmit = async () => {
    try {
      setProductStatus({ type: '', message: '' });
  
      // Validate all fields
      if (!productData.title || !productData.description || !productData.price || !productData.units || 
          !productData.category || !productData.master || !productData.thumbnailImg || 
          !productData.images) {
        const missingFields = [];
        if (!productData.title) missingFields.push('商品名');
        if (!productData.description) missingFields.push('説明');
        if (!productData.price) missingFields.push('価格');
        if (!productData.units) missingFields.push('在庫数');
        if (!productData.category) missingFields.push('カテゴリー');
        if (!productData.master) missingFields.push('職人');
        if (!productData.thumbnailImg) missingFields.push('サムネイル画像');
        if (!productData.images) missingFields.push('商品画像');
  
        setProductStatus({
          type: 'error',
          message: `次の項目を入力してください: ${missingFields.join(', ')}`
        });
        return;
      }
  
      const response = await createProduct(productData);
  
      if (response.success) {
        setProductStatus({
          type: 'success',
          message: '商品を登録しました。'
        });
        // Reset form
        setProductData({
          title: "",
          description: "",
          price: "",
          units: "",
          category: "",
          master: "",
          thumbnailImg: null,
          images: null
        });
        setThumbnailPreview(null);
        setImagesPreview([]);
      }
    } catch (error) {
      console.error('Product registration error:', error);
      setProductStatus({
        type: 'error',
        message: error.message || '商品の登録に失敗しました。'
      });
    }
  };
  return (
    <div className="bg-white p-4 space-y-6">
      <div className="border rounded-lg">
        <div className="space-y-0.5 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              アカウント設定と通知設定を管理します。
            </p>
          </div>
          <Button 
            variant="destructive"
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        </div>
        <Separator />
        
        {status.message && (
          <div className={`mx-6 mt-6 p-4 rounded-md ${
            status.type === 'error' ? 'bg-red-50 text-red-900' : 'bg-green-50 text-green-900'
          }`}>
            {status.message}
          </div>
        )}

        <div className="p-6">
          <Tabs defaultValue="profile" orientation="vertical" className="flex space-x-12">
          <TabsList className="w-[200px] bg-transparent flex flex-col justify-start h-full space-y-1">
              <TabsTrigger 
                value="profile" 
                className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
              >
                プロフィール
              </TabsTrigger>
              <TabsTrigger 
                value="master" 
                className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
              >
                職人登録
              </TabsTrigger>
              <TabsTrigger 
                value="product" 
                className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-muted"
              >
                商品登録
              </TabsTrigger>
            </TabsList>
           
            <TabsContent value="profile" className="flex-1 lg:max-w-2xl mt-0">
              {isLoading || !isAuthenticated ? (
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Separator />
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="flex justify-end">
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">プロフィール</h3>
                    <p className="text-sm text-muted-foreground">
                      サイト上でのあなたの表示内容です。
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        ユーザー名
                      </label>
                      <Input
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                      />
                      <p className="text-sm text-muted-foreground">
                        これはあなたの公開表示名です。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        メールアドレス
                      </label>
                      <Input
                        name="email"
                        value={userData.email}
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">
                        メールアドレスは認証済みのため変更できません。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        住所
                      </label>
                      <JapaneseAddressInput
                        value={userData.address}
                        onChange={(value) => handleChange({ target: { name: 'address', value }})}
                      />
                      <p className="text-sm text-muted-foreground">
                        注文時の配送先住所です。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        性別
                      </label>
                      <Select 
                        value={getGenderValue(userData.gender)}
                        onValueChange={(value) => handleChange({ target: { name: 'gender', value }})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="性別を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">男性</SelectItem>
                          <SelectItem value="female">女性</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmit}
                        className="bg-primary text-primary-foreground shadow hover:bg-primary/90"
                      >
                        変更を保存
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>


            <TabsContent value="master" className="flex-1 lg:max-w-2xl mt-0">
      {isLoading || !isAuthenticated ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">職人登録</h3>
            <p className="text-sm text-muted-foreground">
              新しい職人の情報を登録します。
            </p>
          </div>
          <Separator />
          
          {masterStatus.message && (
            <div className={`p-4 rounded-md ${
              masterStatus.type === 'error' ? 'bg-red-50 text-red-900' : 'bg-green-50 text-green-900'
            }`}>
              {masterStatus.message}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">名前</label>
                <Input
                  name="name"
                  value={masterData.name}
                  onChange={handleMasterChange}
                  placeholder="職人の名前"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ローマ字表記</label>
                <Input
                  name="romajiName"
                  value={masterData.romajiName}
                  onChange={handleMasterChange}
                  placeholder="職人の名前（ローマ字）"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">住所</label>
                <Input
                  name="address"
                  value={masterData.address}
                  onChange={handleMasterChange}
                  placeholder="都道府県または市区町村"
                />
                <p className="text-sm text-muted-foreground">
                  都道府県または市区町村のみを入力してください
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">職人スタイル</label>
                <Input
                  name="style"
                  value={masterData.style}
                  onChange={handleMasterChange}
                  placeholder="陶芸家、木工職人など"
                />
                <p className="text-sm text-muted-foreground">
                  職人の専門分野や作風を入力してください
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">説明</label>
              <textarea
                name="description"
                value={masterData.description}
                onChange={handleMasterChange}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="職人の説明や経歴など"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">画像</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {imagePreview ? (
                    <div className="w-full h-full relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">クリックして画像をアップロード</p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleMasterSubmit}
                disabled={!masterData.name || !masterData.romajiName || !masterData.description || 
                         !masterData.address || !masterData.style || !masterData.image}
              >
                登録する
              </Button>
            </div>
          </div>
        </div>
      )}
    </TabsContent>


    <TabsContent value="product" className="flex-1 lg:max-w-2xl mt-0">
              {isLoading || !isAuthenticated ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-64" />
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">商品登録</h3>
                    <p className="text-sm text-muted-foreground">
                      新しい商品を登録します。
                    </p>
                  </div>
                  <Separator />
                  
                  {productStatus.message && (
                    <div className={`p-4 rounded-md ${
                      productStatus.type === 'error' ? 'bg-red-50 text-red-900' : 'bg-green-50 text-green-900'
                    }`}>
                      {productStatus.message}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">商品名</label>
                      <Input
                        name="title"
                        value={productData.title}
                        onChange={handleProductChange}
                        placeholder="商品名を入力"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">説明</label>
                      <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleProductChange}
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="商品の説明"
                      />
                    </div>

                    {/* Add this in the grid section with units and category */}
<div className="grid grid-cols-3 gap-4">
  <div className="space-y-2">
    <label className="text-sm font-medium">価格 (円)</label>
    <Input
      name="price"
      type="number"
      min="0"
      value={productData.price}
      onChange={handleProductChange}
      placeholder="価格を入力"
    />
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium">在庫数</label>
    <Input
      name="units"
      type="number"
      min="0"
      value={productData.units}
      onChange={handleProductChange}
      placeholder="在庫数を入力"
    />
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium">カテゴリー</label>
    <Select
      value={productData.category}
      onValueChange={(value) => handleProductChange({ target: { name: 'category', value }})}
    >
      <SelectTrigger>
        <SelectValue placeholder="カテゴリーを選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="decorative_plate">飾り皿 (Decorative Plates)</SelectItem>
        <SelectItem value="teaware_cup">カップ＆ソーサー (Cups & Saucers)</SelectItem>
        <SelectItem value="teaware_bowl">お茶碗 (Tea Bowls)</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">職人を選択</label>
                      <Select
                        value={productData.master}
                        onValueChange={(value) => handleProductChange({ target: { name: 'master', value }})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="職人を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {mastersList.map((master) => (
                            <SelectItem key={master._id} value={master._id}>
                              {master.name} 
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">サムネイル画像</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          {thumbnailPreview ? (
                            <div className="w-full h-full relative">
                              <img
                                src={thumbnailPreview}
                                alt="Thumbnail Preview"
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">クリックしてサムネイル画像をアップロード</p>
                              <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                            </div>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">商品画像（複数可）</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          {imagesPreview.length > 0 ? (
                            <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                              {imagesPreview.map((preview, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">クリックして商品画像をアップロード</p>
                              <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                            </div>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImagesChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleProductSubmit}
                        disabled={!productData.title || !productData.description || !productData.units || 
                                !productData.category || !productData.master || !productData.thumbnailImg || 
                                !productData.images}
                      >
                        商品を登録
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}