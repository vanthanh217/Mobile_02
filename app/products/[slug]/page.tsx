import { getProductItem } from "@/api/product-api";
import { IMAGE_URL } from "@/constants";
import { Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
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

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams();
  const [scrollY, setScrollY] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductItem(slug as string);
        setProduct(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY);
    setIsFixed(currentScrollY > 70);
  };

  return (
    <>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5">
          <View className="p-2 mt-10 mb-4">
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
              onPress={() => router.push("/")}
            >
              <Ionicons name="chevron-back-outline" size={24} color="#757575" />
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
              Asus
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
            <View className="mb-4">
              <Text className="mb-2 text-xl font-semibold">Description</Text>
              <Text className="text-sm text-slate-600">
                {product?.description}
              </Text>
            </View>
          </View>
          <View
            className="flex flex-row items-center p-4 rounded-full gap-x-5 bg-slate-800"
            style={{
              position: "absolute",
              bottom: isFixed ? 20 : 70,
              left: 30,
              right: 30,
              zIndex: 1000,
            }}
          >
            <View className="flex flex-row items-center justify-between bg-[#F5F5F5] border border-silver rounded-lg max-w-[140px] h-10">
              <TouchableOpacity
                className="flex flex-row items-center justify-center w-[35%] relative"
                onPress={() => alert("Button Pressed!")}
              >
                <Ionicons name="add-sharp" size={22} color="#757575" />
              </TouchableOpacity>
              <TextInput
                value="1"
                className="flex-1 w-10 text-lg font-semibold text-center"
              />
              <TouchableOpacity
                className="flex flex-row items-center justify-center w-[35%]"
                onPress={() => alert("Button Pressed!")}
              >
                <Ionicons name="remove-sharp" size={22} color="#757575" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center w-[180px] h-12 rounded-lg bg-sky-400"
            >
              <Text className="text-xl font-semibold text-white">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetail;
