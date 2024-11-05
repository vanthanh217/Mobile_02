import { cartService } from "@/api/cart-api";
import { IMAGE_URL } from "@/constants";
import { useCart } from "@/contexts/CartContext";
import { Brand, Product, User } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

interface HomeProductItemProps {
  product: Product;
}

const HomeProductItem: React.FC<HomeProductItemProps> = ({ product }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const brand = product?.brand as Brand;
  const { triggerRefreshCart } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUser();
  }, []);

  const addToCart = async () => {
    if (!user) {
      Toast.show({ type: "info", text1: "Please sign in before add to cart!" });
      return;
    }

    try {
      setIsLoading(true);
      await cartService.addToCart(user.user_id, {
        productId: product.id,
        quantity: 1,
      });
      triggerRefreshCart();
      Toast.show({
        type: "success",
        text1: "Add to cart successfully!",
        autoHide: true,
        visibilityTime: 700,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Error when add to cart",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View className="w-[48%] mb-4 overflow-hidden bg-white rounded-xl">
        <Link
          href={{
            pathname: "/products/[slug]/page",
            params: { slug: product.slug },
          }}
          className="block"
          asChild
        >
          <Pressable>
            <View className="h-[150px] mb-1">
              <Image
                source={{ uri: `${IMAGE_URL}/products/${product.images[0]}` }}
                className="w-full h-full"
              />
            </View>
          </Pressable>
        </Link>
        <View className="p-2">
          <Text className="uppercase text-slate-500">{brand.name}</Text>
          <Link
            href={{
              pathname: "/products/[slug]/page",
              params: { slug: product.slug },
            }}
            className="h-8 mb-2 font-semibold"
            numberOfLines={2}
          >
            {product.name}
          </Link>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold text-orange-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={addToCart}
              disabled={isLoading}
              className={`flex items-center p-2 ml-auto ${
                isLoading ? "bg-gray-300" : "bg-orange-600/20"
              } w-11 rounded-xl`}
            >
              <Ionicons
                name="bag-outline"
                size={24}
                color={isLoading ? "#666" : "#f97316"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeProductItem;
