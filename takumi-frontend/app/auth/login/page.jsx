"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle } from "lucide-react";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);

      if (response.success) {
        router.push('/');
      }
    } catch (err) {
      setError(err.message || "ログインに失敗しました。");
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
      <div className="max-w-md mx-auto pt-28 pb-4">
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-100">
          <div className="p-8">
            <h2 className="text-2xl text-center mb-8">ログイン</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#14171A] text-white py-3 rounded-md hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "ログイン中..." : "ログイン"}
              </button>

              <div className="text-center text-sm">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">または</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                アカウントをお持ちでない方は{" "}
                <Link 
                  href="/auth/register" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  新規登録
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}