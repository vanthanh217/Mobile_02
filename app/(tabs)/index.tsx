import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryWrap from "@/components/home/CategoryWrap";
import HomeProductList from "@/components/home/HomeProductList";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
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
      <View className="mb-4 px-7">
        <TextInput
          placeholder="Try search here..."
          className="px-4 py-2 border rounded-lg text-slate-500 focus:border-primary"
        />
      </View>
      {/* Slider */}
      <View className="relative px-5 h-[200px] mb-2">
        <BannerCarousel />
      </View>

      {/* Categories */}
      <View className="px-3 mb-4">
        <Text className="mb-2 text-lg">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryWrap />
        </ScrollView>
      </View>

      {/* Product */}
      <HomeProductList />
    </View>
  );
}
