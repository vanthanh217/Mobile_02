import { cartService } from "@/api/cart-api";
import { getProductItem, getRelatedProducts } from "@/api/product-api";
import { wishlistService } from "@/api/wishlist-api";
import { IMAGE_URL } from "@/constants";
import { useCart } from "@/contexts/CartContext";
import { Brand, Product, User } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const USER_ID = 2;

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number | string>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { triggerRefreshCart, userId } = useCart();

  const increaseQuantity = () =>
    setQuantity((prev) => (typeof prev === "number" ? prev + 1 : 1));
  const decreaseQuantity = () => {
    if (typeof quantity === "number" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleQuantityChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity(parsedValue);
    } else if (value === "") {
      setQuantity("");
    }
  };

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

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductItem(slug as string);
        setProduct(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);
  const brand = product?.brand as Brand;

  useEffect(() => {
    (async () => {
      try {
        const data = await getRelatedProducts(slug as string);
        setRelatedProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addToCart = async () => {
    if (!user) {
      Toast.show({
        type: "info",
        text1: "Please sign in before add to cart!",
        autoHide: true,
        visibilityTime: 500,
      });
      return;
    }

    try {
      setLoading(true);
      await cartService.addToCart(userId || user.user_id || USER_ID, {
        productId: product?.id || 1,
        quantity: Number(quantity),
      });
      triggerRefreshCart();
      Toast.show({
        type: "success",
        text1: "Add to cart successfully!",
        autoHide: true,
        visibilityTime: 500,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Error when add to cart",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async () => {
    if (!user) {
      Toast.show({
        type: "info",
        text1: "Please sign in before add to wishlist!",
        autoHide: true,
        visibilityTime: 500,
      });
      return;
    }

    try {
      setLoading(true);
      await wishlistService.addToWishlist(user.user_id, product?.id || 1);
      Toast.show({
        type: "success",
        text1: "Add to wishlist successfully!",
        autoHide: true,
        visibilityTime: 500,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Error when add to wishlist",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <View className="flex flex-row items-center justify-between p-2 mt-10 mb-4">
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
              onPress={() => router.push("/")}
            >
              <Ionicons name="chevron-back-outline" size={24} color="#757575" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
              onPress={addToWishlist}
            >
              <Ionicons name="heart-outline" size={24} color="#757575" />
            </TouchableOpacity>
          </View>
          <View className="h-[275px] rounded-xl overflow-hidden mb-4">
            <Image
              source={{ uri: `${IMAGE_URL}/products/${product?.images[0]}` }}
              className="object-cover w-full h-full"
            />
          </View>
          <View className="mb-4">
            <Text className="text-lg font-semibold uppercase text-slate-400">
              {brand?.name}
            </Text>
            <Text className="mb-2 text-lg font-medium" numberOfLines={2}>
              {product?.name}
            </Text>
            <View className="flex flex-row items-center gap-x-2">
              {/* Current price */}
              <Text className="text-2xl font-semibold text-textRed">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product?.price ?? 0)}
              </Text>
            </View>
            <View className="flex flex-row flex-wrap items-center p-4 rounded-full gap-x-5">
              <View className="flex flex-row items-center justify-between bg-[#F5F5F5] border border-silver rounded-lg max-w-[160px] h-12">
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="flex flex-row items-center justify-center w-[35%] relative"
                  onPress={increaseQuantity}
                >
                  <Ionicons name="add-sharp" size={22} color="#757575" />
                </TouchableOpacity>
                <TextInput
                  value={String(quantity)}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                  className="flex-1 w-10 text-lg font-semibold text-center"
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="flex flex-row items-center justify-center w-[35%]"
                  onPress={decreaseQuantity}
                >
                  <Ionicons name="remove-sharp" size={22} color="#757575" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                className="flex flex-row items-center justify-center w-[180px] h-12 rounded-lg bg-sky-400"
                onPress={addToCart}
              >
                <Text className="text-xl font-semibold text-white">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mb-4">
              <Text className="mb-2 text-xl font-semibold">Description</Text>
              <Text className="text-sm text-slate-600">
                {product?.description}
              </Text>
            </View>
          </View>
        </View>
        <View className="px-4">
          <Text className="mb-4 text-lg font-semibold uppercase">
            Related product
          </Text>
          <View>
            {relatedProducts &&
              relatedProducts.map((item) => {
                const brand = item.brand as Brand;
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    onPress={() => {
                      router.push({
                        pathname: "/products/[slug]/page",
                        params: { slug: item.slug },
                      });
                    }}
                  >
                    <View className="flex flex-row mb-3">
                      <View className="w-2/5 h-[120px] mb-1 rounded-lg overflow-hidden mr-3">
                        <Image
                          source={{
                            uri: `${IMAGE_URL}/products/${item?.images[0]}`,
                          }}
                          className="object-cover w-full h-full"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-xl font-semibold uppercase text-slate-500">
                          {brand?.name}
                        </Text>
                        <Text
                          numberOfLines={2}
                          className="text-lg font-semibold"
                        >
                          {item?.name}
                        </Text>
                        <Text className="text-lg font-semibold text-textRed">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item?.price ?? 0)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetail;
