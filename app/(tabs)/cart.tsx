import { cartService } from "@/api/cart-api";
import CartItem from "@/components/product/CartItem";
import { useCart } from "@/contexts/CartContext";
import { Cart, CartItem as CartItemResponse, User } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const USER_ID = 2;

const CartScreen = () => {
  const [user, setUser] = useState<User>();
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { refreshCart, setUserId, userId } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          if (parsedUser.id) {
            setUserId(Number(parsedUser.id));
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await cartService.getCartItems(
          userId || user?.user_id || USER_ID
        );
        setCart(data);
        setCartItems(data.items);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshCart, userId]);

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
          <Text className="text-lg">({cart?.totalItems} item)</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="h-[420px] mb-7"
        >
          <View className="px-2">
            <View className="ml-3">
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : error ? (
                <Text className="text-textRed">Error: {error}</Text>
              ) : (
                cartItems &&
                cartItems.map((item) => {
                  return (
                    <CartItem
                      key={item.product.id}
                      item={item.product}
                      userId={user?.user_id || USER_ID}
                      qty={item.quantity}
                    />
                  );
                })
              )}
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
              <Text className="text-lg font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(cart?.totalAmount || 0)}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-medium">Shipping:</Text>
              <Text className="text-lg font-medium">$0</Text>
            </View>
          </View>
          <View>
            <View className="flex flex-row justify-between px-4 py-3">
              <Text className="text-xl font-semibold">Total amount:</Text>
              <Text className="text-xl font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(cart?.totalAmount || 0)}
              </Text>
            </View>

            <Link
              href={{
                pathname: "/order/payment-method",
                params: {
                  totalAmount: cart?.totalAmount || 0,
                  userId: user?.user_id || USER_ID,
                },
              }}
              asChild
            >
              <TouchableOpacity
                activeOpacity={0.9}
                className="flex flex-row items-center justify-center h-12 bg-sky-400"
              >
                <Text className="text-lg font-semibold text-white uppercase">
                  Payment
                </Text>
              </TouchableOpacity>
            </Link>
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
