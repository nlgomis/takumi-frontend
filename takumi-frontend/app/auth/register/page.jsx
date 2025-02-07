"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { register } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません。");
      setLoading(false);
      return;
    }

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Registration successful
      if (response.success) {
        // Redirect to home page or dashboard
        router.push('/');
      }
    } catch (err) {
      setError(err.message || "登録に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto pt-20 px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-8">
            <h2 className="text-2xl text-center mb-8">新規登録</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  ユーザー名
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="username"
                    type="text"
                    placeholder="ユーザー名を入力"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="メールアドレスを入力"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  パスワード
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    placeholder="パスワードを入力"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  パスワード（確認）
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="パスワードを再入力"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#14171A] text-white py-3 rounded-md hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "登録中..." : "登録"}
              </button>

              <div className="text-center text-sm text-gray-600">
                すでにアカウントをお持ちの方は{" "}
                <Link 
                  href="/auth/login" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  ログイン
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}