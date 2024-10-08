import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CartItem = () => {
  return (
    <>
      <View className="flex flex-row items-center px-1 py-2 mb-1 border rounded-lg gap-x-3 border-slate-400">
        <View className="w-[100px] h-[100px] rounded-lg overflow-hidden">
          <Image
            source={require("@/assets/images/tai-nghe-logitech-g633s.webp")}
            className="object-cover w-full h-full"
          />
        </View>
        <View className="flex-1">
          {/* Top */}
          <View className="mb-2">
            <Text className="text-base font-semibold uppercase text-slate-400">
              Asus
            </Text>
            <Text className="mb-2 font-medium" numberOfLines={1}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quod
              delectus error tenetur ipsum fuga, inventore accusantium quasi
              harum similique sint exercitationem doloribus quidem magni, velit
              porro dignissimos dicta possimus!
            </Text>
            {/* Price */}
            <View className="flex flex-row items-center gap-x-2">
              {/* Current price */}
              <Text className="text-lg font-semibold text-textRed">$40</Text>
              {/* Discount price */}
              <Text className="text-base font-medium text-silver">$50</Text>
            </View>
          </View>
          {/* Bottom */}
          <View className="flex flex-row items-center gap-x-3">
            <View className="flex flex-row items-center bg-[#F5F5F5] border border-silver rounded-lg max-w-[160px] h-10">
              <TouchableOpacity
                activeOpacity={0.9}
                className="flex flex-row items-center justify-center w-[35%]"
                onPress={() => alert("Button Pressed!")}
              >
                <Ionicons name="add-sharp" size={22} color="#757575" />
              </TouchableOpacity>
              <TextInput
                value="1"
                className="flex-1 w-10 text-lg font-semibold text-center"
              />
              <TouchableOpacity
                activeOpacity={0.9}
                className="flex flex-row items-center justify-center w-[35%]"
                onPress={() => alert("Button Pressed!")}
              >
                <Ionicons name="remove-sharp" size={22} color="#757575" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
              onPress={() => alert("Button Pressed!")}
            >
              <Ionicons name="heart-outline" size={22} color="#757575" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
              onPress={() => alert("Button Pressed!")}
            >
              <Ionicons name="trash-outline" size={22} color="#757575" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default CartItem;
