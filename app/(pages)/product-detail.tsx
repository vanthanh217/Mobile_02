import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProductDetail = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

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
              onPress={() => alert("Button Pressed!")}
            >
              <Link href={"/"}>
                <Ionicons
                  name="chevron-back-outline"
                  size={24}
                  color="#757575"
                />
              </Link>
            </TouchableOpacity>
          </View>
          <View className="h-[275px] rounded-xl overflow-hidden mb-4">
            <Image
              source={require("@/assets/images/tai-nghe-logitech-g633s.webp")}
              className="object-cover w-full h-full"
            />
          </View>
          <View className="mb-4">
            <Text className="text-lg font-semibold uppercase text-slate-400">
              Asus
            </Text>
            <Text className="mb-2 text-base font-medium" numberOfLines={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              ratione aliquid officiis
            </Text>
            <View className="flex flex-row items-center gap-x-2">
              {/* Current price */}
              <Text className="text-2xl font-semibold text-textRed">$40</Text>
              {/* Discount price */}
              <Text className="text-xl font-medium text-silver">$50</Text>
            </View>
            <View className="mb-4">
              <Text className="mb-2 text-xl font-semibold">Description</Text>
              <Text className="text-sm text-slate-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur saepe eos ipsa consectetur natus. Ratione dignissimos
                earum adipisci, deserunt alias molestias possimus ab corrupti
                deleniti ad tempore nemo enim sunt quod impedit blanditiis modi
                minus voluptatem quasi atque temporibus fugit. Error saepe
                architecto quasi tempore iusto expedita sunt accusantium
                officiis aspernatur doloribus, sed esse, eveniet harum sequi.
                Nulla error molestias incidunt dolor, magni, odit perspiciatis
                quis voluptate consequuntur obcaecati laboriosam eum. Fugit
                vitae unde eveniet consectetur illum consequatur atque,
                excepturi harum veritatis! Veniam voluptatibus laborum
                consequuntur unde reiciendis incidunt quia eveniet quo
                consectetur harum? Error veritatis nostrum asperiores eos
                quisquam.
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
