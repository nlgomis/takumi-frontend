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
import PaymentSection from '@/components/PaymentSection';
import CheckoutProgress from '@/components/CheckoutProgress';

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
  // Add this state to your existing states
const [isProcessingPayment, setIsProcessingPayment] = useState(false);

// Add this handler function
const handlePaymentSubmit = async (paymentData) => {
  try {
    setIsProcessingPayment(true);
    setError(null);
    
    // Here you would typically:
    // 1. Validate the payment details
    // 2. Send them to your payment processor
    // 3. Create the order in your database
    // 4. Clear the cart
    // 5. Redirect to success page
    
    console.log('Processing payment:', paymentData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to success page
    router.push('/success');
  } catch (error) {
    setError(error.message || 'お支払い処理中にエラーが発生しました。');
  } finally {
    setIsProcessingPayment(false);
  }
};
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
        <div className="max-w-6xl mx-auto">
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
    <div className="min-h-screen">
    <CheckoutProgress currentStep={2} />
    
    <div className="container mx-auto px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">ご注文内容の確認</h1>
          <Button
            variant="outline"
            onClick={() => router.push('/cart')}
            className="border-muted-foreground/20 hover:bg-muted/20"
          >
            カートに戻る
          </Button>
        </div>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Checkout Flow */}
            <div className="lg:col-span-8 space-y-6">
              {/* Shipping Address */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">配送先住所</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      商品の配送先情報を入力してください
                    </p>
                  </div>
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
                      <div className="flex justify-end space-x-2 pt-2">
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

              {/* Payment Section */}
              <PaymentSection 
                onPaymentSubmit={handlePaymentSubmit}
                isProcessing={isProcessingPayment}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-4 space-y-6">
                {/* Order Items Summary */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">注文内容</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart?.products.map((item) => (
                      <div key={item.product._id} className="flex items-start space-x-4 py-2">
                        <div className="flex-shrink-0 w-16 h-16">
                          <img
                            src={item.product.thumbnailImg}
                            alt={item.product.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.product.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            数量: {item.units}
                          </p>
                          <p className="text-sm font-medium">
                            {formatPrice(item.product.price * item.units)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Price Summary */}
                <Card className="shadow-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>小計</span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>配送料</span>
                        <span>無料</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>合計</span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                      <Button 
                        className="w-full mt-4 bg-[#b1947f] hover:bg-[#b1947f]/90" 
                        size="lg"
                        disabled={needsAddress || isUpdatingAddress || isProcessingPayment}
                        onClick={() => document.querySelector('form')?.requestSubmit()}
                      >
                        {isProcessingPayment ? '処理中...' : '注文を確定する'}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground pt-2">
                        注文を確定すると、利用規約に同意したことになります。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}