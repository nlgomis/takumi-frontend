"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JapaneseAddressInput } from "@/components/JapaneseAddressInput";
import { Input } from "@/components/ui/input";
import { getCurrentUser, updateUser } from "@/services/authService";
import { getCart } from "@/services/cartService";
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user data
        const userResponse = await getCurrentUser();
        if (userResponse.success) {
          setUserData(userResponse.data);
          setAddressData({
            name: userResponse.data.name || "",
            address: userResponse.data.address || "",
          });
        }

        // Fetch cart data
        const cartResponse = await getCart();
        if (cartResponse.success) {
          setCart(cartResponse.data);
        }
      } catch (error) {
        setError(error.message || "データの取得に失敗しました。");
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddressChange = (field) => (value) => {
    setAddressData(prev => ({
      ...prev,
      [field]: typeof value === 'object' ? value.target.value : value
    }));
  };

  const handleAddressSubmit = async () => {
    try {
      setError(null);
      const response = await updateUser({
        name: addressData.name,
        address: addressData.address,
        gender: userData?.gender || ''
      });

      if (response.success) {
        setUserData(prev => ({
          ...prev,
          name: addressData.name,
          address: addressData.address
        }));
        setIsUpdatingAddress(false);
      }
    } catch (error) {
      setError(error.message || "住所の更新に失敗しました。");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(price);
  };

  const calculateTotal = () => {
    if (!cart?.products?.length) return 0;
    return cart.products.reduce((total, item) => {
      return total + (item.product.price * item.units);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const needsAddress = !userData?.address;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ご注文内容の確認</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">配送先住所</CardTitle>
                {!isUpdatingAddress && userData?.address && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsUpdatingAddress(true)}
                  >
                    変更
                  </Button>
                )}
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent>
                {isUpdatingAddress || needsAddress ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">お名前</label>
                      <Input
                        value={addressData.name}
                        onChange={handleAddressChange('name')}
                        placeholder="配送先のお名前"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">住所</label>
                      <JapaneseAddressInput
                        value={addressData.address}
                        onChange={handleAddressChange('address')}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      {!needsAddress && (
                        <Button
                          variant="outline"
                          onClick={() => setIsUpdatingAddress(false)}
                        >
                          キャンセル
                        </Button>
                      )}
                      <Button
                        onClick={handleAddressSubmit}
                        disabled={!addressData.name || !addressData.address}
                      >
                        保存
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-muted-foreground">{userData.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">注文内容</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart?.products.map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-20 h-20">
                      <img
                        src={item.product.thumbnailImg}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        数量: {item.units}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice(item.product.price * item.units)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">注文内容の確認</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>小計</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>配送料</span>
                  <span>無料</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>合計</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={needsAddress || isUpdatingAddress}
                >
                  注文を確定する
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}