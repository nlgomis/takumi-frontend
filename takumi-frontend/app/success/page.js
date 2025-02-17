"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertCircle } from 'lucide-react';
import CheckoutProgress from '@/components/CheckoutProgress';
import { createOrder } from '@/services/orderService';
import { dispatchCartUpdate } from '@/lib/events';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const handleOrdersClick = () => {
    router.push('/profile?tab=orders');
  };
  useEffect(() => {
    const finalizeOrder = async () => {
      try {
        setIsProcessing(true);
        setError(null);
        
        const response = await createOrder();
        
        if (response.success) {
          // Dispatch cart update event to refresh cart count
          dispatchCartUpdate({ products: [] });
        } else {
          throw new Error(response.message || '注文の作成に失敗しました。');
        }
      } catch (error) {
        console.error('Order creation error:', error);
        
        // If we haven't exceeded max retries, try again
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          return;
        }
        
        setError(error.message || '注文の作成に失敗しました。');
      } finally {
        setIsProcessing(false);
      }
    };

    if (isProcessing) {
      finalizeOrder();
    }
  }, [retryCount]);

  const handleRetry = () => {
    setIsProcessing(true);
    setRetryCount(0);
    setError(null);
  };

  if (error) {
    return (
      <div className="min-h-screen pt-12">
        <div className="container mx-auto p-4">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                
                <h1 className="text-2xl font-bold mb-4">
                  エラーが発生しました
                </h1>
                
                <p className="text-muted-foreground mb-8">
                  {error}
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={handleRetry}
                    className="w-full md:w-auto md:min-w-[200px]"
                  >
                    もう一度試す
                  </Button>
                  
                  <Button 
                    onClick={() => router.push('/cart')}
                    variant="outline"
                    className="w-full md:w-auto md:min-w-[200px]"
                  >
                    カートに戻る
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen pt-12">
        <div className="container mx-auto p-4">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <div className="animate-pulse space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  注文を処理中です...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12">
      <div className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto">
          <CheckoutProgress currentStep={3} />
          
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                ご注文ありがとうございます
              </h1>
              
              <p className="text-muted-foreground mb-8">
                ご注文の確認メールをお送りしました。<br />
                商品の発送準備が整い次第、発送のお知らせメールをお送りいたします。
              </p>

              <div className="space-y-4">
                <Button 
  onClick={handleOrdersClick}                  variant="outline"
                  className="w-full md:w-auto md:min-w-[200px]"
                >
                  注文履歴を確認
                </Button>
                
                <Button 
                  onClick={() => router.push('/products')}
                  className="w-full md:w-auto md:min-w-[200px]"
                >
                  買い物を続ける
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}