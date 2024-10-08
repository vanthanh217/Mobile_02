import HomeProductItem from "@/components/product/HomeProductItem";
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
          <Ionicons name="menu-sharp" size={30} />
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
      <View className="px-5">
        <View className="h-[200px] rounded-[15px] overflow-hidden mb-4">
          <Image
            source={require("@/assets/images/slide_2.jpg")}
            className="object-cover w-full h-full"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="px-3 mb-4">
        <Text className="mb-2 text-lg">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row gap-x-4">
            <View className="rounded-[10px] flex flex-row items-center gap-x-2 bg-[#651fff33] group px-3 py-1">
              <Ionicons name="headset-outline" size={24} color={"#651fff"} />
              <Text className="font-semibold text-primary">Headphone</Text>
            </View>
            <View className="rounded-[10px] flex flex-row items-center gap-x-2 bg-[#651fff33] group px-3 py-1">
              <Ionicons name="headset-outline" size={24} color={"#651fff"} />
              <Text className="font-semibold text-primary">Headphone</Text>
            </View>
            <View className="rounded-[10px] flex flex-row items-center gap-x-2 bg-[#651fff33] group px-3 py-1">
              <Ionicons name="headset-outline" size={24} color={"#651fff"} />
              <Text className="font-semibold text-primary">Headphone</Text>
            </View>
            <View className="rounded-[10px] flex flex-row items-center gap-x-2 bg-[#651fff33] group px-3 py-1">
              <Ionicons name="headset-outline" size={24} color={"#651fff"} />
              <Text className="font-semibold text-primary">Headphone</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Product */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-3">
          <View className="flex flex-row flex-wrap">
            {/* Product Item  */}
            <HomeProductItem />
            <HomeProductItem />
            <HomeProductItem />
            <HomeProductItem />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
