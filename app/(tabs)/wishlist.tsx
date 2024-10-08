import FarvoriteItem from "@/components/product/FarvoriteItem";
import { Text, View } from "react-native";

export default function WishListScreen() {
  return (
    <>
      <View>
        <View className="mt-10 mb-5">
          <Text className="text-xl font-semibold text-center">Favorite</Text>
        </View>
        <View className="flex flex-col px-3">
          <FarvoriteItem />
          <FarvoriteItem />
          <FarvoriteItem />
          <FarvoriteItem />
        </View>
      </View>
    </>
  );
}
