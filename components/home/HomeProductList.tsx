import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import HomeProductItem from "../product/HomeProductItem";
import { getAllProductsOrByCategory } from "@/api/product-api";
import { Product } from "@/interfaces";

const HomeProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsOrByCategory(category);
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-3">
          <View className="flex flex-row flex-wrap justify-between">
            {/* Product Item  */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text className="text-textRed">Error: {error}</Text>
            ) : (
              products &&
              products.map((product) => (
                <HomeProductItem key={product.id} product={product} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeProductList;
