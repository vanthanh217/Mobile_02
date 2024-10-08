import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const HomeProductItem = () => {
  return (
    <>
      <View className="w-[47%] mb-4 mr-2 overflow-hidden bg-white rounded-xl">
        <View className="h-[150px] mb-1">
          <Image
            source={require("@/assets/images/tai-nghe-logitech-g633s.webp")}
            className="w-full h-full"
          />
        </View>
        <View className="p-2">
          <Text className="uppercase text-slate-500">Logitech</Text>
          <Link
            href="/product-detail"
            className="mb-2 font-semibold line-clamp-2"
          >
            Tai nghe Logitech G633S
          </Link>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold text-orange-600">$21</Text>
            <View className="flex items-center p-2 ml-auto bg-orange-600/20 w-11 rounded-xl">
              <Ionicons name="bag-outline" size={24} color={"#f97316"} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeProductItem;
