"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllProducts } from "@/services/productService";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProducts();
        if (response.success) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.engTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||

        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "unitsHigh":
        result.sort((a, b) => b.units - a.units);
        break;
      case "unitsLow":
        result.sort((a, b) => a.units - b.units);
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, sortOrder, products]);

  // Calculate pagination values
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Format price in Japanese style
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(price);
  };

  // Handle navigation to product details
  const handleViewDetails = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="bg-white p-4 space-y-6">
      <div className="border rounded-lg">
        <div className="space-y-0.5 p-6">
          <h2 className="text-2xl font-bold tracking-tight">商品一覧</h2>
          <p className="text-muted-foreground">
            {filteredProducts.length}件の商品を表示しています。
          </p>
        </div>
        <Separator />

        {/* Search and Filter Section - Horizontal layout */}
        <div className="p-6 flex justify-center items-center gap-4">
          {/* Search bar */}
          <div className="relative w-[500px]">
            <Input
              placeholder="商品名や説明文で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          </div>

          {/* Filter dropdown */}
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[240px] py-6 text-lg">
              <SelectValue placeholder="並び順" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">新着順</SelectItem>
              <SelectItem value="oldest">古い順</SelectItem>
              <SelectItem value="priceHigh">価格が高い順</SelectItem>
              <SelectItem value="priceLow">価格が低い順</SelectItem>
              <SelectItem value="unitsHigh">在庫が多い順</SelectItem>
              <SelectItem value="unitsLow">在庫が少ない順</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <Card 
                  key={product._id} 
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => handleViewDetails(product._id)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.thumbnailImg}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-semibold text-lg">
                      {formatPrice(product.price)}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <p className={`text-sm ${product.units === 0 ? 'text-red-500 font-semibold' : 'text-muted-foreground'}`}>
                      残り{product.units}点
                    </p>
                    <Button 
                      className="bg-[#b1947f] hover:bg-[#b1947f]/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(product._id);
                      }}
                    >
                      詳細を見る
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Show "No results" message when no products match the search */}
            {currentProducts.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                検索条件に一致する商品が見つかりませんでした。
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="p-6 flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}