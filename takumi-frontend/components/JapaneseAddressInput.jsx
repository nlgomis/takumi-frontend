"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

export function JapaneseAddressInput({ value = "", onChange }) {
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");

  // Parse initial value
  useEffect(() => {
    if (value) {
      try {
        const parts = value.split(" ");
        const postalMatch = parts.find(p => p.match(/^\d{3}-\d{4}$/));
        const prefMatch = PREFECTURES.find(p => parts.includes(p));
        
        if (postalMatch) setPostalCode(postalMatch);
        if (prefMatch) {
          setPrefecture(prefMatch);
          const remainingParts = parts.slice(parts.indexOf(prefMatch) + 1);
          if (remainingParts.length > 0) {
            setCity(remainingParts[0] || "");
            setStreet(remainingParts[1] || "");
            setBuilding(remainingParts.slice(2).join(" ") || "");
          }
        }
      } catch (error) {
        console.error('Error parsing address:', error);
      }
    }
  }, [value]);

  const updateAddress = (newPostal, newPref, newCity, newStreet, newBuilding) => {
    const parts = [
      newPostal,
      newPref,
      newCity,
      newStreet,
      newBuilding
    ].filter(Boolean);
    
    onChange(parts.join(" "));
  };

  const handlePostalChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 7) value = value.slice(0, 7);
    if (value.length > 3) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    }
    setPostalCode(value);
    updateAddress(value, prefecture, city, street, building);
  };

  const handlePrefectureChange = (value) => {
    setPrefecture(value);
    updateAddress(postalCode, value, city, street, building);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    updateAddress(postalCode, prefecture, e.target.value, street, building);
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
    updateAddress(postalCode, prefecture, city, e.target.value, building);
  };

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);
    updateAddress(postalCode, prefecture, city, street, e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">郵便番号</label>
        <Input
          placeholder="123-4567"
          value={postalCode}
          onChange={handlePostalChange}
          maxLength={8}
          className="w-32"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">都道府県</label>
        <Select
          value={prefecture}
          onValueChange={handlePrefectureChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="都道府県を選択" />
          </SelectTrigger>
          <SelectContent>
            {PREFECTURES.map((pref) => (
              <SelectItem key={pref} value={pref}>
                {pref}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">市区町村</label>
        <Input
          placeholder="市区町村"
          value={city}
          onChange={handleCityChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">番地</label>
        <Input
          placeholder="番地"
          value={street}
          onChange={handleStreetChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">建物名・部屋番号（任意）</label>
        <Input
          placeholder="建物名・部屋番号"
          value={building}
          onChange={handleBuildingChange}
        />
      </div>
    </div>
  );
}