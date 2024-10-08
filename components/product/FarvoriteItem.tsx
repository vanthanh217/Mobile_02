import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const FarvoriteItem = () => {
  return (
    <>
      <View className="p-2 mb-2 overflow-hidden bg-white rounded-xl">
        <View className="flex flex-row items-center">
          <View className="w-[100px] h-[100px] rounded-lg overflow-hidden">
            <Image
              source={require("@/assets/images/tai-nghe-logitech-g633s.webp")}
              className="object-cover w-full h-full"
            />
          </View>
          <View className="flex flex-row items-center flex-1">
            <View className="flex-1">
              <Text className="text-lg font-semibold uppercase text-slate-500">
                Asus
              </Text>
              <Text className="font-medium" numberOfLines={1}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                ad.
              </Text>
              <View className="flex flex-row items-center gap-x-2">
                {/* Current price */}
                <Text className="text-lg font-semibold text-textRed">$40</Text>
                {/* Discount price */}
                <Text className="text-base font-medium text-silver">$50</Text>
              </View>
            </View>
            <View className="p-2 ml-5 rounded-lg bg-textRed/10">
              <Ionicons name="trash-outline" size={22} color={"#f61a3d"} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default FarvoriteItem;
