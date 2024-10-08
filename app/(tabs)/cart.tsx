import CartItem from "@/components/product/CartItem";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CartScreen = () => {
  return (
    <>
      <View className="relative">
        {/* Header */}
        <View
          style={styles.header}
          className="flex flex-row items-center px-4 mt-10 gap-x-2"
        >
          <Text style={styles.title} className="font-medium">
            Cart
          </Text>
          <Text className="text-lg">(0 item)</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="h-[420px] mb-7"
        >
          <View className="px-2">
            <View className="ml-3">
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </View>
          </View>
        </ScrollView>
        <View>
          <View className="px-4 py-5 border-y border-silver">
            <Text className="mb-3 text-xl font-semibold capitalize">
              Cart total
            </Text>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-medium">Subtotal:</Text>
              <Text className="text-lg font-medium">$40</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-medium">Shipping:</Text>
              <Text className="text-lg font-medium">$0</Text>
            </View>
          </View>
          <View>
            <View className="flex flex-row justify-between px-4 py-3">
              <Text className="text-xl font-semibold">Total amount:</Text>
              <Text className="text-xl font-semibold">$40</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center h-12 bg-sky-400"
            >
              <Text className="text-lg font-semibold text-white uppercase">
                Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
});
