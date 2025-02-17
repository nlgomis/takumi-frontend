import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Wallet, 
  AlertCircle 
} from 'lucide-react';

const PaymentSection = ({ onPaymentSubmit, isProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    else if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }
    // Format CVC
    else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = () => {
    if (paymentMethod === 'credit-card') {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
        setError('有効なカード番号を入力してください。');
        return false;
      }
      if (!cardDetails.name) {
        setError('カード名義人を入力してください。');
        return false;
      }
      if (!cardDetails.expiry || !cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
        setError('有効な有効期限を入力してください。');
        return false;
      }
      if (!cardDetails.cvc || cardDetails.cvc.length !== 3) {
        setError('有効なセキュリティコードを入力してください。');
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onPaymentSubmit({ paymentMethod, cardDetails });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">お支払い方法</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}

          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                クレジットカード
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="convenience-store" id="convenience-store" />
              <Label htmlFor="convenience-store" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                コンビニ払い
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'credit-card' && (
            <div className="space-y-4 pt-4">
              <Separator className="mb-4" />
              
              <div className="space-y-2">
                <Label htmlFor="card-number">カード番号</Label>
                <Input
                  id="card-number"
                  name="number"
                  placeholder="4242 4242 4242 4242"
                  value={cardDetails.number}
                  onChange={handleInputChange}
                  maxLength="19"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">カード名義人</Label>
                <Input
                  id="card-name"
                  name="name"
                  placeholder="TARO YAMADA"
                  value={cardDetails.name}
                  onChange={handleInputChange}
                  className="uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-expiry">有効期限</Label>
                  <Input
                    id="card-expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-cvc">セキュリティコード</Label>
                  <Input
                    id="card-cvc"
                    name="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={handleInputChange}
                    maxLength="3"
                    type="password"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'convenience-store' && (
            <div className="pt-4">
              <Separator className="mb-4" />
              <p className="text-sm text-muted-foreground">
                注文確定後、お支払い用のバーコードを発行します。
                コンビニエンスストアでバーコードを提示してお支払いください。
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;