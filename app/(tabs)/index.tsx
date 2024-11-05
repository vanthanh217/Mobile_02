import { searchProducts } from "@/api/product-api";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryWrap from "@/components/home/CategoryWrap";
import HomeProductList from "@/components/home/HomeProductList";
import { IMAGE_URL } from "@/constants";
import { Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText) {
        const response = await searchProducts(searchText);
        setProducts(response);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <View className="w-full h-full">
      {/* Header */}
      <View className="p-5 mb-5 mt-7">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
            <Image source={require("@/assets/images/Logo02.png")} />
            <Text className="text-4xl font-semibold text-primary">Gear-K</Text>
          </View>
          <Link href={"/sign-in"}>
            <Ionicons name="menu-sharp" size={30} />
          </Link>
        </View>
      </View>
      {/* Search */}
      <View className="relative mb-4 px-7">
        <TextInput
          placeholder="Find your product..."
          value={searchText}
          onChangeText={setSearchText}
          className="px-4 py-2 border rounded-lg text-slate-500 focus:border-primary"
        />
        {products.length > 0 && (
          <View className="absolute z-50 w-full p-2 bg-white rounded-lg top-full left-7 max-h-[300px]">
            <ScrollView className="flex-1">
              {products.map((item) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={item.id}
                  className="flex flex-row pb-1 mb-2 last:mb-0"
                  onPress={() => {
                    router.push({
                      pathname: "/products/[slug]/page",
                      params: { slug: item.slug },
                    });
                  }}
                >
                  <View className="w-[50px] h-[50px] rounded-lg overflow-hidden mr-2">
                    <Image
                      source={{
                        uri: `${IMAGE_URL}/products/${item.images[0]}`,
                      }}
                      className="w-full h-full"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-medium" numberOfLines={2}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      {/* Slider */}
      <View className="relative px-5 h-[200px] mb-2">
        <BannerCarousel />
      </View>

      {/* Categories */}
      <View className="px-3 mb-4">
        <Text className="mb-2 text-lg">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryWrap setCategory={setCategory} />
        </ScrollView>
      </View>

      {/* Product */}
      <HomeProductList category={category} />
    </View>
  );
}
